package com.RenGu.servlert;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.RenGu.util.HttpServers.doCreatStacks;

/**
 * Created by hanch on 2017/2/16.
 */
public class CreatStacksController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
        int masterNum = 1;
        int slaveNum = 3;
        String masterImage = "Fedora 25 Cloud Base";
        String slaveImage = "Fedora 25 Cloud Base";
        String masterFlavor = "ubuntu";
        String slaveFlavor = "ubuntu";
        String stackName = "test";
        String template = "{\"heat_template_version\":\"2013-05-23\",\"resources\":{\"Master_Instances_Group\":{\"type\":\"OS::Heat::ResourceGroup\",\"properties\":{\"count\":" + masterNum + ",\"resource_def\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Master_Instances_%index%\",\"image\":\"" + masterImage + "\",\"flavor\":\"" + masterFlavor + "\",\"networks\":[{\"network\":\"admin_internal_net\"}]}}}},\"Slave_Instances_Group\":{\"type\":\"OS::Heat::ResourceGroup\",\"properties\":{\"count\":" + slaveNum + ",\"resource_def\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"name\":\"Slave_Instances_%index%\",\"image\":\"" + slaveImage + "\",\"flavor\":\"" + slaveFlavor + "\",\"networks\":[{\"network\":\"admin_internal_net\"}]}}}}},\"outputs\":{\"Master_Instances_Group_Networks\":{\"value\":{\"get_attr\":[\"Master_Instances_Group\",\"networks\"]}},\"Slave_Instances_Group_Networks\":{\"value\":{\"get_attr\":[\"Slave_Instances_Group\",\"networks\"]}}}}";
        String token = "gAAAAABYpZMZeXfK7pV0FCQ_v8eu5WmkrNleCbXb2Q7sDX4MmzQQQbT6mIgsOMHT9UrNsMEehMB4jqMv7SS_ThyvPCcN3zAB6llTN6kzeXKoZDpsWke83n3kQvE2n3al2FZzRBoqWeZgv4tDYZXnBzvMLA7zydmQM17Yy7MDXX0EMpcHMB0531Y";
        String url = "http://172.17.201.101:8004/v1/e589d645bcac441594aa38e830912cb4" + "/stacks";
        doCreatStacks(template, stackName, token, url);
    }
}
