package com.RenGu.servlert;

import com.RenGu.util.HttpServers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginController extends HttpServlet {

    private final String SaveLogin = "LoginToken";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String name = req.getParameter("userName");
        String passWord = req.getParameter("passWord");
        String requestUrl = req.getParameter("requestUrl");

        if (name != null && passWord != null && name.length() > 0 && passWord.length() > 0) {
            String result = HttpServers.doLogin(name, passWord, requestUrl);
            req.getSession().setAttribute(SaveLogin, result);
            resp.sendRedirect("/MainDetail.jsp");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("get==========================");
        String token = (String) req.getSession().getAttribute(SaveLogin);
        resp.getWriter().write(token);
    }
}