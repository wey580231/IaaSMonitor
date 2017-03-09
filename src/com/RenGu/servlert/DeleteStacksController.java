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
        String requestSign = requestMap.get("sign");
        String requestID = requestMap.get("id");
        String ourSign = DesUtil.encryptBasedDes(DesUtil.getSignStr(requestMap), CommonUtil.KEY);
        if (!requestSign.equals(ourSign)) {
            resp.getWriter().write(CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", requestID));
            return;
        }
        String projectName = requestMap.get("projectName");
        String stackName = requestMap.get("stackName");
//        String projectName = "admin";
//        String stackName = "han";
        loginOpenStack(projectName, requestID, resp);
        stackID = getStackID(stackName, loginToken, orchestrationEndpoint, requestID, resp);
        deleteStack(stackName, stackID, loginToken, orchestrationEndpoint, requestID, resp);
    }

    private String getStackID(String stacksName, String loginToken, String orchestrationEndpoint, String requestID, HttpServletResponse resp) {
        String stackID = "";
        if (stacksName.equals("") || loginToken.equals("") || orchestrationEndpoint.equals("") || requestID.equals("")) {
            try {
                resp.getWriter().write(CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", requestID));
            } catch (IOException e) {
                e.printStackTrace();
            }
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
            try {
                resp.getWriter().write(CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", requestID));
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            e.printStackTrace();
            return stackID;
        }
    }

    private void loginOpenStack(String projectName, String requestID, HttpServletResponse resp) {
        if (projectName.equals("") || requestID.equals("")) {
            try {
                resp.getWriter().write(CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", requestID));
            } catch (IOException e) {
                e.printStackTrace();
            }
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
            try {
                resp.getWriter().write(CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", requestID));
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            e.printStackTrace();
        }
    }

    private void deleteStack(String stacksName, String stackID, String loginToken, String orchestrationEndpoint, String requestID, HttpServletResponse resp) {
        try {
            if (stacksName.equals("") || loginToken.equals("") || orchestrationEndpoint.equals("") || stackID.equals("") || requestID.equals("")) {
                resp.getWriter().write(CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", requestID));
                return;
            }
            HttpServers.doDelete(orchestrationEndpoint + "/stacks/" + stacksName + "/" + stackID, loginToken);
            resp.getWriter().write(CommonUtil.getWrappMessge("000000", "removed", requestID));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
