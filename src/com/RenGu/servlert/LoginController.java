package com.RenGu.servlert;

import com.RenGu.util.HttpServers;
import com.RenGu.util.OpenStackInfo;
import com.RenGu.util.Token;
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

        if (name != null && passWord != null && name.length() > 0 && passWord.length() > 0) {
            HttpServers.doLogin(name, passWord, requestUrl);
            resp.getWriter().write(OpenStackInfo.printAll());
            resp.getWriter().write("-------------------------------------------- ---------------------------------------------------------------------------------\n");
            resp.getWriter().write(Token.printAll());
        }

    }
}