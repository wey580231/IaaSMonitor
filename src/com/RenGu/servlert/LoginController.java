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

            if (result.contains("access")) {
                req.getSession().setAttribute(SaveLogin, result);
                resp.sendRedirect("/MainDetail.jsp");
            } else if (result.contains("error")) {
                req.getSession().setAttribute("errorInfo", "登录失败，请重新输入!");
                resp.sendRedirect("/index.jsp");
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String url = req.getHeader("url");
        if (url != null && url.equals("getEndPoint")) {
            String token = (String) req.getSession().getAttribute(SaveLogin);
            resp.getWriter().write(token);
        } else if (url != null && url.equals("reload")) {
            req.getSession().setAttribute(SaveLogin, "");
            resp.sendRedirect("/index.jsp");
        } else {
            resp.getWriter().write("Error!!!");
        }
    }
}