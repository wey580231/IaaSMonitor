package com.RenGu.servlert;

import com.RenGu.util.HttpServers;
import com.RenGu.util.Token;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by wey580231 on 2017/2/9.
 */
public class MainController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Recive Request *************************");
        Cookie[] cookies = req.getCookies();
        String token = null;
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(Token.TokenName)) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        String result = "";
        if (token != null) {
           result = HttpServers.doGet("http://172.17.201.101:8774/v2/e589d645bcac441594aa38e830912cb4/servers/detail",token);
        }
        resp.getWriter().write(result);
    }
}
