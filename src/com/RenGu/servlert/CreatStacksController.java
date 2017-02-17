package com.RenGu.servlert;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.RenGu.util.HttpServers.doCreatStacks;
import static com.RenGu.util.HttpServers.doLogin;

/**
 * Created by hanch on 2017/2/16.
 */
public class CreatStacksController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String token = "";
        String creatStacksUrl = "";
        String userName = req.getParameter("userName");
        String passWord = req.getParameter("passWord");
        String tenantName = req.getParameter("tenantName");
        String loginUrl = "http://172.17.203.101:5000/v2.0/tokens";
        String stackName = req.getParameter("stackName");
        String loginBody = doLogin(userName, passWord, tenantName, loginUrl);
        int masterNum = new Integer(req.getParameter("masterNum"));
        int slaveNum = new Integer(req.getParameter("slaveNum"));
        String masterImage = "Fedora 25 Cloud Base";
        String slaveImage = "Fedora 25 Cloud Base";
        String masterFlavor = "ubuntu";
        String slaveFlavor = "ubuntu";
        String template = "{\"heat_template_version\":\"2013-05-23\",\"resources\":{\"Master_Instances_Group\":{\"type\":\"OS::Heat::ResourceGroup\",\"properties\":{\"count\":" + masterNum + ",\"resource_def\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Master_Instances_%index%\",\"image\":\"" + masterImage + "\",\"flavor\":\"" + masterFlavor + "\",\"networks\":[{\"network\":\"admin_internal_net\"}]}}}},\"Slave_Instances_Group\":{\"type\":\"OS::Heat::ResourceGroup\",\"properties\":{\"count\":" + slaveNum + ",\"resource_def\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Slave_Instances_%index%\",\"image\":\"" + slaveImage + "\",\"flavor\":\"" + slaveFlavor + "\",\"networks\":[{\"network\":\"admin_internal_net\"}]}}}}},\"outputs\":{\"Master_Instances_Group_Networks\":{\"value\":{\"get_attr\":[\"Master_Instances_Group\",\"networks\"]}},\"Slave_Instances_Group_Networks\":{\"value\":{\"get_attr\":[\"Slave_Instances_Group\",\"networks\"]}}}}";
        try {
            JSONObject jsonObject = new JSONObject(loginBody);
            token = jsonObject.getJSONObject("access").getJSONObject("token").getString("id");
            JSONArray serviceCatalogJSONArray = jsonObject.getJSONObject("access").getJSONArray("serviceCatalog");
            for (int i = 0; i < serviceCatalogJSONArray.length(); i++) {
                JSONObject tempJsonObject = serviceCatalogJSONArray.getJSONObject(i);
                if (tempJsonObject.getString("type").equals("orchestration")) {
                    JSONArray enterPointJsonArray = tempJsonObject.getJSONArray("endpoints");
                    creatStacksUrl = enterPointJsonArray.getJSONObject(0).getString("adminURL") + "/stacks";
                    break;
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
            resp.setStatus(405);
        }
        String resultString = doCreatStacks(template, stackName, token, creatStacksUrl);
        resp.setStatus(200);
        resp.getWriter().write(resultString);
    }
}
