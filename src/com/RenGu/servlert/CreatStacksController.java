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
        int slaveInstancesNode3Num = new Integer(req.getParameter("slaveNum"));
        String masterImage = "Fedora 25 Cloud Base";
        String slaveInstancesNode1Image = "Fedora 25 Cloud Base";
        String slaveInstancesNode2Image = "Fedora 25 Cloud Base";
        String slaveInstancesNode3Image = "Fedora 25 Cloud Base";
        String masterFlavor = "ubuntu";
        String slaveFlavor = "ubuntu";
        String template = "{\"heat_template_version\":\"2013-05-23\",\"resources\":{\"Master_Instances\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Master_Instances\",\"image\":\""+masterImage+"\",\"flavor\":\""+masterFlavor+"\",\"networks\":[{\"port\":{\"get_resource\":\"Master_Instances_Port\"}}]}},\"Slave_InstancesNode_1\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Slave_InstancesNode_1\",\"image\":\""+slaveInstancesNode1Image+"\",\"flavor\":\""+slaveFlavor+"\",\"networks\":[{\"network\":\"admin_internal_net\"}]}},\"Slave_InstancesNode_2\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Slave_InstancesNode_2\",\"image\":\""+slaveInstancesNode2Image+"\",\"flavor\":\""+slaveInstancesNode2Image+"\",\"networks\":[{\"network\":\"admin_internal_net\"}]}},\"Slave_InstancesNode_3_Group\":{\"type\":\"OS::Heat::ResourceGroup\",\"properties\":{\"count\":"+slaveInstancesNode3Num+",\"resource_def\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Slave_InstancesNode_3_%index%\",\"image\":\""+slaveInstancesNode3Image+"\",\"flavor\":\""+slaveFlavor+"\",\"networks\":[{\"network\":\"admin_internal_net\"}]}}}},\"Master_Instances_Port\":{\"type\":\"OS::Neutron::Port\",\"properties\":{\"network_id\":\"020750ef-14c7-4a40-902b-5fef3099e933\",\"fixed_ips\":[{\"subnet_id\":\"1e627c7f-7e34-4fd8-80f1-a1bb045333ac\"}]}},\"Master_Instances_Floating_IP\":{\"type\":\"OS::Neutron::FloatingIP\",\"properties\":{\"floating_network_id\":\"cce5d8e5-0bc0-49db-bdc6-278a79f8b5bc\",\"port_id\":{\"get_resource\":\"Master_Instances_Port\"}}}},\"outputs\":{\"Master_Instances_private_ip\":{\"description\":\"IP address of Master_Instances in private network\",\"value\":{\"get_attr\":[\"Master_Instances\",\"first_address\"]}},\"Master_Instances_public_ip\":{\"description\":\"Floating IP address of Master_Instances in public network\",\"value\":{\"get_attr\":[\"Master_Instances_Floating_IP\",\"floating_ip_address\"]}},\"Slave_InstancesNode_1_private_ip\":{\"description\":\"IP address of Slave_InstancesNode_1 in private network\",\"value\":{\"get_attr\":[\"Slave_InstancesNode_1\",\"first_address\"]}},\"Slave_InstancesNode_2_private_ip\":{\"description\":\"IP address of Slave_InstancesNode_2 in private network\",\"value\":{\"get_attr\":[\"Slave_InstancesNode_2\",\"first_address\"]}},\"Slave_Instances_Group_Networks\":{\"value\":{\"get_attr\":[\"Slave_InstancesNode_3_Group\",\"first_address\"]}}}}";
        System.out.println(template);
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
