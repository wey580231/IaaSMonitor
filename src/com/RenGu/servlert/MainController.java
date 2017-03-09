package com.RenGu.servlert;

import com.RenGu.util.HttpServers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *主要用于处理界面的http请求，解析请求的内容，使用java的网络通信去访问openstack的api，
 * 获取结果后，将结果信息交给页面显示。
 *
 */

public class MainController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String token = req.getHeader("X-Auth-Token");
        String url = req.getHeader("url");

        if (token != null && url != null) {
            String result = HttpServers.doGet(url, token);
            resp.getWriter().write(result);
        }
    }
}
