package com.RenGu.servlert;

import com.RenGu.util.CommonUtil;
import com.RenGu.util.DesUtil;
import com.RenGu.util.HttpServers;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * Created by hanch on 2017/3/7.
 */
public class DeleteStacksController extends HttpServlet {

    private String loginToken = "";
    private String orchestrationEndpoint = "";
    private String stackID = "";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, String> requestMap;
        requestMap = CommonUtil.requestToMap(req);
        System.out.println(requestMap.toString());
        String requestSign = requestMap.get("sign");
        String ourSign = DesUtil.encryptBasedDes(DesUtil.getSignStr(requestMap), CommonUtil.KEY);
        if (!requestSign.equals(ourSign)) {
            String errorMessage = CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", requestMap.get("id"));
            resp.getWriter().write(errorMessage);
            return;
        }
        String projectName = requestMap.get("projectName");
        String stackName = requestMap.get("stackName");
//        String projectName = "admin";
//        String stackName = "han";
        loginOpenStack(projectName);
        stackID = getStackID(stackName, loginToken, orchestrationEndpoint);
        deleteStack(stackName, stackID, loginToken, orchestrationEndpoint);
    }

    private String getStackID(String stacksName, String loginToken, String orchestrationEndpoint) {
        String stackID = "";
        if (stacksName.equals("") || loginToken.equals("") || orchestrationEndpoint.equals("")) {
            return stackID;
        }
        try {
            String stacksListJsonBody = HttpServers.doGet(orchestrationEndpoint + "/stacks", loginToken);
            JSONObject stacksList = new JSONObject(stacksListJsonBody);
            JSONArray stacksArrayList = stacksList.getJSONArray("stacks");
            for (int i = 0; i < stacksArrayList.length(); i++) {
                JSONObject tempJsonObject = stacksArrayList.getJSONObject(i);
                if (tempJsonObject.getString("stack_name").equals(stacksName)) {
                    stackID = tempJsonObject.getString("id");
                }
            }
            return stackID;
        } catch (JSONException e) {
            e.printStackTrace();
            return stackID;
        }
    }

    private void loginOpenStack(String projectName) {
        if (projectName.equals("")) {
            return;
        }
        try {
            String loginJsonBody = HttpServers.doLogin("admin", "admin", projectName, "http://172.17.203.101:5000/v2.0/tokens");
            JSONObject jsonObject = new JSONObject(loginJsonBody);
            loginToken = jsonObject.getJSONObject("access").getJSONObject("token").getString("id");
            JSONArray serviceCatalogJsonArray = jsonObject.getJSONObject("access").getJSONArray("serviceCatalog");
            for (int i = 0; i < serviceCatalogJsonArray.length(); i++) {
                JSONObject jsonObject1 = serviceCatalogJsonArray.getJSONObject(i);
                if (jsonObject1.getString("name").equals("heat")) {
                    JSONArray endpointsJsonArray = jsonObject1.getJSONArray("endpoints");
                    for (int j = 0; j < endpointsJsonArray.length(); j++) {
                        JSONObject jsonObject2 = endpointsJsonArray.getJSONObject(j);
                        if (jsonObject2.has("adminURL")) {
                            orchestrationEndpoint = jsonObject2.getString("adminURL");
                        }
                    }
                    break;
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void deleteStack(String stacksName, String stackID, String loginToken, String orchestrationEndpoint) {
        if (stacksName.equals("") || loginToken.equals("") || orchestrationEndpoint.equals("") || stackID.equals("")) {
            return;
        }
        HttpServers.doDelete(orchestrationEndpoint + "/stacks/" + stacksName + "/" + stackID, loginToken);
    }
}
