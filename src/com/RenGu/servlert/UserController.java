package com.RenGu.servlert;

import com.RenGu.util.HttpPostBodyMaker;
import com.RenGu.util.HttpServers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//        String token = req.getHeader("X-Auth-Token");
//
//        String userName = req.getParameter("userName");
//        String email = req.getParameter("email");
//        String password = req.getParameter("password");
//        String mainProgram = req.getParameter("mainProgram");
//        String role = req.getParameter("role");
//        String active = req.getParameter("active");
//        String url = req.getParameter("requestUrl");
//
//        String jsonBody = HttpPostBodyMaker.createUser(userName, password, active, mainProgram);
//
////        System.out.println("JSON:" + jsonBody);
////        System.out.println("url:"+url);
////        System.out.println("token:"+token);
//
//        String result = HttpServers.doPost(url, token, jsonBody);
//        resp.getWriter().write(result);
    }
}
