package com.RenGu.servlert;

import com.RenGu.util.HttpServers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by wey580231 on 2017/2/17.
 */
public class ConsoleController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String length = req.getParameter("length");
        String requestUrl = req.getParameter("url");
        String token = req.getHeader("X-Auth-Token");
        if (length != null && requestUrl != null && length.length() > 0 && requestUrl.length() > 0) {
            String body = "{\r\n    \"os-getConsoleOutput\": {\r\n        \"length\": " + length + "\r\n    }\r\n}";
            String result = HttpServers.doPost(requestUrl, token, body);
            resp.setStatus(200);
            resp.getWriter().write(result);
        } else {
            String result = "{\r\n    \"error\":{\r\n    \t\"message\":\"Get console output failed!\"\r\n    }\r\n}";
            resp.setStatus(400);
            resp.getWriter().write(result);
        }
    }
}
