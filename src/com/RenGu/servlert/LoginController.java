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

public class LoginController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String name = req.getParameter("userName");
        String passWord = req.getParameter("passWord");
        String requestUrl = req.getParameter("requestUrl");

        if (name != null && passWord != null && name.length() > 0
                && passWord.length() > 0) {
            String token = HttpServers.doLogin(name, passWord,requestUrl);
            if(token.length() > 0)
            {
                try {
                    JSONObject json = new JSONObject(token);
                    JSONObject obj = json.getJSONObject("access");
                    if(obj!=null)
                    {
                        System.out.println(obj.getJSONObject("token").get("id"));
                    }
                } catch (JSONException e) {
                    System.out.println("解析Json出错！！");
                    e.printStackTrace();
                }

                resp.getWriter().write(token);
            }
        }

    }
}