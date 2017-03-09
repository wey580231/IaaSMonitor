package com.RenGu.servlert;

import com.RenGu.util.CommonUtil;
import com.RenGu.util.DesUtil;
import com.RenGu.util.HttpServers;
import com.RenGu.util.QueryStackThread;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.soap.Node;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.RenGu.util.CommonUtil.requestToMap;
import static com.RenGu.util.HttpServers.doCreatStacks;
import static com.RenGu.util.HttpServers.doLogin;

/**
 * Created by hanch on 2017/2/16.
 */
public class CreatStacksController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //【1】验证请求参数是否正确
        Map<String, String> map = new HashMap<String, String>();
        map = CommonUtil.requestToMap(req);
        //前端ID，向前端写结果时，加入此标志
        String frontId = map.get("id");

//        Enumeration enum1 = req.getParameterNames();
//        while (enum1.hasMoreElements()) {
//            String paramName = (String) enum1.nextElement();
//            String value = req.getParameter(paramName);
//            map.put(paramName, value);
//        }

        String back_sign = map.get("sign");
        String sign = "";
        try {
            sign = DesUtil.encryptBasedDes(DesUtil.getSignStr(map), CommonUtil.KEY);
            if (!back_sign.equals(sign)) {
                String errorMessage = CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", frontId);
                resp.getWriter().write(errorMessage);
                return;
            }
        } catch (Exception e) {
            ////报文解析失败，需要在返回结果中加入当前请求参数的签名，用于前端验证
            String errorMessage = CommonUtil.getWrappMessge("000001", "Request parameters parse failed!", frontId);
            resp.getWriter().write(errorMessage);
            return;
        }

        //【2】获取参数
        String userName = map.get("userName");
        String passWord = map.get("passWord");
        String tenantName = map.get("tenantName");
        String stackName = map.get("stackName");
        int slaveInstancesNode3Num = new Integer(map.get("nodeNum")) - 3;

//        String userName = "admin";
//        String passWord = "admin";
//        String tenantName = "admin";
//        SimpleDateFormat sformat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
//        String stackName = "testStack" + "_" + sformat.format(new Date());
//        int slaveInstancesNode3Num = 1;

        if (tenantName == null) {
            tenantName = userName;
        }

        String loginUrl = "http://172.17.203.101:5000/v2.0/tokens";
        String loginBody = doLogin("admin", "admin", tenantName, loginUrl);

        String masterImage = "hdp-template1";
        String slaveInstancesNode1Image = "hdp-template2";
        String slaveInstancesNode2Image = "hdp-template3";
        String slaveInstancesNode3Image = "hdp-template4";
        String masterFlavor = "ubuntu";
        String slaveFlavor = "ubuntu";
        String template = "{\"heat_template_version\":\"2013-05-23\",\"resources\":{\"Master_Instances\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"" + stackName + "_Master_Instances\",\"image\":\"" + masterImage + "\",\"flavor\":\"" + masterFlavor + "\",\"networks\":[{\"port\":{\"get_resource\":\"Master_Instances_Port\"}}]}},\"Slave_InstancesNode_1\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"" + stackName + "_Slave_InstancesNode_1\",\"image\":\"" + slaveInstancesNode1Image + "\",\"flavor\":\"" + slaveFlavor + "\",\"networks\":[{\"network\":\"admin_internal_net\"}]}},\"Slave_InstancesNode_2\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"" + stackName + "_Slave_InstancesNode_2\",\"image\":\"" + slaveInstancesNode2Image + "\",\"flavor\":\"" + slaveFlavor + "\",\"networks\":[{\"network\":\"admin_internal_net\"}]}},\"Slave_InstancesNode_3_Group\":{\"type\":\"OS::Heat::ResourceGroup\",\"properties\":{\"count\":" + slaveInstancesNode3Num + ",\"resource_def\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"" + stackName + "_Slave_InstancesNode_3_%index%\",\"image\":\"" + slaveInstancesNode3Image + "\",\"flavor\":\"" + slaveFlavor + "\",\"networks\":[{\"network\":\"admin_internal_net\"}]}}}},\"Master_Instances_Port\":{\"type\":\"OS::Neutron::Port\",\"properties\":{\"network_id\":\"020750ef-14c7-4a40-902b-5fef3099e933\",\"fixed_ips\":[{\"subnet_id\":\"1e627c7f-7e34-4fd8-80f1-a1bb045333ac\"}]}},\"Master_Instances_Floating_IP\":{\"type\":\"OS::Neutron::FloatingIP\",\"properties\":{\"floating_network_id\":\"cce5d8e5-0bc0-49db-bdc6-278a79f8b5bc\",\"port_id\":{\"get_resource\":\"Master_Instances_Port\"}}}},\"outputs\":{\"Master_Instances_private_ip\":{\"description\":\"IP address of Master_Instances in private network\",\"value\":{\"get_attr\":[\"Master_Instances\",\"first_address\"]}},\"Master_Instances_public_ip\":{\"description\":\"Floating IP address of Master_Instances in public network\",\"value\":{\"get_attr\":[\"Master_Instances_Floating_IP\",\"floating_ip_address\"]}},\"Slave_InstancesNode_1_private_ip\":{\"description\":\"IP address of Slave_InstancesNode_1 in private network\",\"value\":{\"get_attr\":[\"Slave_InstancesNode_1\",\"first_address\"]}},\"Slave_InstancesNode_2_private_ip\":{\"description\":\"IP address of Slave_InstancesNode_2 in private network\",\"value\":{\"get_attr\":[\"Slave_InstancesNode_2\",\"first_address\"]}},\"Slave_Instances_Group_Networks\":{\"value\":{\"get_attr\":[\"Slave_InstancesNode_3_Group\",\"first_address\"]}}}}";

        //【3】获取token和endpoint
        String token = "";
        String creatStacksUrl = "";
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
        }

        //【4】创建虚拟机
        String resultString = doCreatStacks(template, stackName, token, creatStacksUrl);
        String stackInfoUrl = "";
        try {
            JSONObject jsonObject = new JSONObject(resultString);

            if (jsonObject.has("error")) {
                String errorMessage = jsonObject.getJSONObject("error").getString("message");
                resp.getWriter().write(CommonUtil.getWrappMessge("000001", errorMessage, frontId));
                return;
            }
            stackInfoUrl = jsonObject.getJSONObject("stack").getJSONArray("links").getJSONObject(0).getString("href");

            //启动子线程用于监控当前创建的进度
            QueryStackThread queryThrad = new QueryStackThread(token, stackInfoUrl, frontId);
            Thread thread = new Thread(queryThrad);
            thread.start();

            resp.getWriter().write(CommonUtil.getWrappMessge("000000", "Create in process!", frontId));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}