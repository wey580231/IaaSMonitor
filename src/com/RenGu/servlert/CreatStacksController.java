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
        String template = "{\"heat_template_version\":\"2015-10-15\",\"description\":\"Simple template to deploy a single compute instance\",\"resources\":{\"my_instance_1\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"admin_pass\":\"ubuntu\",\"key_name\":\"bosh\",\"image\":\"ubuntu-new01\",\"flavor\":\"ubuntu\",\"networks\":[{\"network\":\"020750ef-14c7-4a40-902b-5fef3099e933\"}]}},\"my_instance_2\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"admin_pass\":\"ubuntu\",\"key_name\":\"bosh\",\"image\":\"ubuntu-new01\",\"flavor\":\"ubuntu\",\"networks\":[{\"network\":\"020750ef-14c7-4a40-902b-5fef3099e933\"}]}},\"my_instance_3\":{\"type\":\"OS::Nova::Server\",\"properties\":{\"admin_pass\":\"ubuntu\",\"key_name\":\"bosh\",\"image\":\"ubuntu-new01\",\"flavor\":\"ubuntu\",\"networks\":[{\"network\":\"020750ef-14c7-4a40-902b-5fef3099e933\"}]}}}}";
        String stackName = "test";
        String token = "gAAAAABYpVTX1DUBv245AV27LE_Vuw-faKjjAAxlXfejbdYCFn0If0gAZoF17NeMkTQ4NM1721CQnclDakBFy4chnkEu1s5jXEt4XEnMc0a-zBmhMEn5KqLrfyRuF3sB5jzT6iQXA1m9S7BwC6Fu7gjN9KTdhEyfwFL8sqIJO2cv3DEwgn-QmYA";
        String url = "http://172.17.201.101:8004/v1/e589d645bcac441594aa38e830912cb4" + "/stacks";
        doCreatStacks(template , stackName , token , url);
    }
}
