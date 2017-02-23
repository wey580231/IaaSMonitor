package com.RenGu.servlert;

import com.RenGu.util.HttpServers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * post请求用于处理页面登录
 * get请求用于在angularJs初始化时获取该用户登录时所返回的信息(endPoints)
 */

public class LoginController extends HttpServlet {

    private final String SaveLogin = "LoginToken";
    private final String Reload = "Reload";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String name = req.getParameter("userName");
        String passWord = req.getParameter("passWord");
        String tenantName = req.getParameter("tenantName");
        String requestUrl = req.getParameter("requestUrl");
        String requestMethod = req.getParameter("method");

        if (name != null && passWord != null && tenantName != null && name.length() > 0 && passWord.length() > 0 && tenantName.length() > 0) {
            String result = HttpServers.doLogin(name, passWord, tenantName, requestUrl);
            if (result.contains("access")) {
                req.getSession().setAttribute(SaveLogin, result);
                if (requestMethod == null) {
                    resp.sendRedirect("MainDetail.jsp");
                } else if (requestMethod != null && requestMethod.equals(Reload)) {
                    String res = "{\"result\":\"success\"}";
                    resp.getWriter().write(res);
                }
            } else if (result.contains("error")) {
                if (requestMethod == null) {
                    req.getSession().setAttribute("errorInfo", "Login Error!");
                    resp.sendRedirect("index.jsp");
                } else {
                    String res = "{\"result\":\"Login Error!\"}";
                    resp.getWriter().write(res);
                }
            }
        } else {
            if (requestMethod == null) {
                req.getSession().setAttribute("errorInfo", "Empty Parameters!");
                resp.sendRedirect("index.jsp");
            } else if (requestMethod.equals(Reload)) {
                String res = "{\"result\":\"Empty Parameters!\"}";
                resp.getWriter().write(res);
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
            resp.sendRedirect("index.jsp");
        } else {
            resp.getWriter().write("Error!!!");
        }
    }
}