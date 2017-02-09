<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://"
          + request.getServerName() + ":" + request.getServerPort()
          + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <base href="<%=basePath%>">

  <title>登录-OpenStack</title>
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <style type="text/css"></style>
</head>

<body>
<div>
  <form action="/login" method="post">
    <input type="hidden" name="requestUrl" value="http://172.17.203.101:5000/v2.0/tokens">
    <div>
      <label>用户名:</label>
      <input type="text" value="admin" name="userName"><br>
    </div>
    <div>
      <label>密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
      <input type="password" value="admin" name="passWord"><br>
    </div>
    <input type="submit" value="login">
  </form>
</div>
</body>
</html>
