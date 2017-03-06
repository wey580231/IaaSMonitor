package com.RenGu.servlert;

import com.RenGu.util.HttpPostBodyMaker;
import com.RenGu.util.HttpServers;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by hanch on 2017/2/20.
 */
public class SyncUsersController extends HttpServlet {
    private String keystoneEndpoints = "http://172.17.201.101:35357/v3";
    private String _member_RoleID = "9fe2ff9ee4384b1894a90878d3e92bab";
    private String adminUserID = "5de810ca20ef4a42a8b6712da94ad3d0";
    private String adminRoleID = "90024088340f4630961dbb7ce177b924";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        syncUsers();
    }

    private void syncUsers() {
        String loginToken = loginOpenStack();
        ArrayList<String> projectNames = getProjectNames(loginToken);
        ArrayList<String> userNames = getUserNames(loginToken);
        ArrayList<HashMap<String, String>> postgreSQLUserInfo = getPostgreSQLUserInfo();

        for (HashMap<String, String> tempHashMap : postgreSQLUserInfo) {
            String userName = tempHashMap.get("userName");
            String passWord = tempHashMap.get("passWord");

            //创建Project
            String projectResponseString = HttpServers.doPost(keystoneEndpoints + "/projects", loginToken, HttpPostBodyMaker.createProject(userName + "'s Porject", userName));
            String projectID = "";
            try {
                JSONObject responseJsonObject = new JSONObject(projectResponseString);
                projectID = responseJsonObject.getJSONObject("project").getString("id");
            } catch (JSONException e) {
                //无法创建成功时在现有的项目表中查找后返回ID
                String listPorojectJsonObjectString = HttpServers.doGet(keystoneEndpoints + "/projects", loginToken);
                try {
                    JSONObject listPorojectJsonObject = new JSONObject(listPorojectJsonObjectString);
                    JSONArray projectsArraylist = listPorojectJsonObject.getJSONArray("projects");
                    for (int j = 0; j < projectsArraylist.length(); j++) {
                        String tempString = projectsArraylist.getJSONObject(j).getString("name");
                        if (userName.equals(tempString)) {
                            projectID = projectsArraylist.getJSONObject(j).getString("id");
                        }
                    }
                } catch (JSONException e1) {
                    e1.printStackTrace();
                }
            }

            //创建User
            String userID = "";
            if (!projectID.equals("")) {
                String userResponseString = HttpServers.doPost(keystoneEndpoints + "/users", loginToken, HttpPostBodyMaker.createUser(projectID, userName, passWord));
                try {
                    JSONObject userResponseJsonObject = new JSONObject(userResponseString);
                    userID = userResponseJsonObject.getJSONObject("user").getString("id");
                } catch (JSONException e) {
                    //无法创建成功时在现有的用户表中查询后返回用户ID
                    String listUserJsonObjectString = HttpServers.doGet(keystoneEndpoints + "/users", loginToken);
                    try {
                        JSONObject listUserJsonObject = new JSONObject(listUserJsonObjectString);
                        JSONArray usersArraylist = listUserJsonObject.getJSONArray("users");
                        for (int j = 0; j < usersArraylist.length(); j++) {
                            String tempString = usersArraylist.getJSONObject(j).getString("name");
                            if (userName.equals(tempString)) {
                                userID = usersArraylist.getJSONObject(j).getString("id");
                            }
                        }
                    } catch (JSONException e1) {
                        e1.printStackTrace();
                    }
                }
                //以admin角色添加admin用户
                String putAdminUrl = keystoneEndpoints + "/projects/" + projectID + "/users/" + adminUserID + "/roles/" + adminRoleID + "";
                HttpServers.doPut(putAdminUrl,loginToken);
                //以_Member_角色添加用户
                String putUserUrl = keystoneEndpoints + "/projects/" + projectID + "/users/" + userID + "/roles/" + _member_RoleID + "";
                HttpServers.doPut(putUserUrl,loginToken);
            }
        }
    }

    private ArrayList<HashMap<String, String>> getPostgreSQLUserInfo() {
        ArrayList<HashMap<String, String>> postgreSQLUserInfo = new ArrayList();
        String databaseUrl = "jdbc:postgresql://172.17.203.171:5524/uaadb";
        String databaseUserName = "uaaadmin";
        String databasePassWord = "c1oudc0w";

        try {
            Class.forName("org.postgresql.Driver");
                Connection connection = DriverManager.getConnection(databaseUrl, databaseUserName, databasePassWord);
            String SQL = "select * from users";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(SQL);
            while (resultSet.next()) {
                HashMap<String, String> postgreSQLUserData = new HashMap();
                postgreSQLUserData.put("userName", resultSet.getString("username"));
                postgreSQLUserData.put("passWord", resultSet.getString("password"));
                postgreSQLUserInfo.add(postgreSQLUserData);
            }
            return postgreSQLUserInfo;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return postgreSQLUserInfo;
        } catch (SQLException e) {
            e.printStackTrace();
            return postgreSQLUserInfo;
        }
    }

    private ArrayList<String> getProjectNames(String loginToken) {
        ArrayList<String> projectNames = new ArrayList();
        String projectNamesJson = HttpServers.doGet(keystoneEndpoints + "/projects", loginToken);
        try {
            JSONObject jsonObject = new JSONObject(projectNamesJson);
            JSONArray projects = jsonObject.getJSONArray("projects");
            for (int i = 0; i < projects.length(); i++) {
                String projectName = projects.getJSONObject(i).getString("name");
                projectNames.add(projectName);
            }
            return projectNames;
        } catch (JSONException e) {
            e.printStackTrace();
            return projectNames;
        }

    }

    private ArrayList<String> getUserNames(String loginToken) {
        ArrayList<String> userNames = new ArrayList();
        String userNamesJson = HttpServers.doGet(keystoneEndpoints + "/users", loginToken);
        try {
            JSONObject jsonObject = new JSONObject(userNamesJson);
            JSONArray userNamesArray = jsonObject.getJSONArray("users");
            for (int i = 0; i < userNamesArray.length(); i++) {
                String projectName = userNamesArray.getJSONObject(i).getString("name");
                userNames.add(projectName);
            }
            return userNames;
        } catch (JSONException e) {
            e.printStackTrace();
            return userNames;
        }

    }

    private String loginOpenStack() {
        try {
            String loginJsonBody = HttpServers.doLogin("admin", "admin", "admin", "http://172.17.203.101:5000/v2.0/tokens");
            JSONObject jsonObject = new JSONObject(loginJsonBody);
            String loginToken = jsonObject.getJSONObject("access").getJSONObject("token").getString("id");
            return loginToken;
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }
}
