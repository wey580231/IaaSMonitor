package com.RenGu.servlert;

import com.RenGu.util.HttpServers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by wey580231 on 2017/2/22.
 * 用于通过PaaS监控网页直接点击连接请求，需要对方传递用户名、密码、请求的页面
 * 此处默认tenantName和userName保持一致
 */
public class DispatcherController extends HttpServlet {

    private final String SaveLogin = "LoginToken";

    @Override
    //http://iaasmonitor.paas.casicloud.com/pageDispatcher?userName=admin&passWord=admin&pageType=showSummary_zh_CN
    //http://iaasmonitor.paas.casicloud.com/pageDispatcher?userName=admin&passWord=admin&pageType=showStacks_zh_CN
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("userName");
        String passWord = req.getParameter("passWord");
        String page = req.getParameter("pageType");
        if (name != null && passWord != null && page != null && name.length() > 0 && passWord.length() > 0 && page.length() > 0) {
            String requestUrl = "http://172.17.203.101:5000/v2.0/tokens";
            String tenantName = name;
            String result = HttpServers.doLogin(name, passWord, tenantName, requestUrl);
            if (result.contains("access")) {
                req.getSession().setAttribute(SaveLogin, result);
                if (page != null) {
                    if (page.equals("showSummary_zh_CN")) {
                        resp.sendRedirect("MainDetail.jsp#/showSummary_zh");
                    } else if (page.equals("showStacks_zh_CN")) {
                        resp.sendRedirect("MainDetail.jsp#/showStacks_zh");
                    } else if (page.equals("showSummary_en_US")) {
                        resp.sendRedirect("MainDetail.jsp#/showSummary_en");
                    } else if (page.equals("showStacks_en_US")) {
                        resp.sendRedirect("MainDetail.jsp#/showStacks_en");
                    }
                } else {
                    resp.sendRedirect("index.jsp");
                }
            }
        } else {
            resp.sendRedirect("index.jsp");
        }
    }
}
