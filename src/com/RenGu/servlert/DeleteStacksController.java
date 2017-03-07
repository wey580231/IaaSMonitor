package com.RenGu.servlert;

import com.RenGu.util.HttpServers;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by hanch on 2017/3/7.
 */
public class DeleteStacksController extends HttpServlet {

    private String loginToken = "";
    private String orchestrationEndpoint = "";
    private String stackID = "";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String projectName = "admin";
        String stackName = "han";
        loginOpenStack(projectName);
        stackID = getStackID(stackName, loginToken, orchestrationEndpoint);
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
