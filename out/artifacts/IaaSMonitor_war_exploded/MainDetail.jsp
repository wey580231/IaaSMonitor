<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html ng-app="app">
<head>
    <base href="<%=basePath%>">

    <title>使用概况</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <link href="bootstrap/css/bootstrap.css" rel="stylesheet">
    <script src="javascript/jquery-3.1.1.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <style type="text/css">

        a, a:hover {
            text-decoration: none;
        }

        .accordion-group ul {
            margin: 0px;
        }

        .accordion-inner li {
            display: block;
            height: 30px;
            margin-bottom: 1px;
            padding:2px;
            line-height: 30px;
        }

        .accordion-inner li a {
            display: block;
        }

        .accordion-inner li a:hover {
            background-color: rgba(238, 238, 238, 0.36);
        }

    </style>
</head>

<body>

<div class="container-fluid">
    <div class="row-fluid">
        <div class="span12" style="height:auto;">
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row-fluid">
        <div class="span2">
            <div class="accordion" id="accordion-536559">
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           href="#accordion-element-36460">概况</a>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           href="#accordion-element-754634">虚拟机</a>
                    </div>
                    <div id="accordion-element-754634" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <ul style="height:auto">
                                <li><a href="#"><i class="glyphicon glyphicon-user"></i>概况</a></li>
                                <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>实例</a></li>
                                <li><a href="#"><i class="glyphicon glyphicon-asterisk"></i>镜像</a></li>
                                <li><a href="#"><i class="glyphicon glyphicon-edit"></i>访问安全</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           href="#accordion-element-754636">网络</a>
                    </div>
                    <div id="accordion-element-754636" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <ul style="height:auto">
                                <li><a href="#"><i class="glyphicon glyphicon-user"></i>网络</a></li>
                                <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>路由</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           href="#accordion-element-654636">身份管理</a>
                    </div>
                    <div id="accordion-element-654636" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <ul style="height:auto">
                                <li><a href="#"><i class="glyphicon glyphicon-user"></i>项目</a></li>
                                <li><a href="#"><i class="glyphicon glyphicon-th-list"></i>用户</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           href="#accordion-element-654638">系统信息</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="span10">
            <ng-view></ng-view>
        </div>
    </div>
</div>

</body>

<script src="javascript/angular.js"></script>
<script src="javascript/angular-route.js"></script>
<script src="javascript/angular-animate.js"></script>
<script src="app.js"></script>
<script src="app/components/servers/serversInfo.js"></script>

<script>
//    $(document).ready(function(){
//
//        loadData();
//
//        function loadData() {
//            var returnvalue;
//            var options = {
//                type: 'GET',
//                url: "/mainController",
//                async:false,
//                success: function (data) {
//                    alert("success");
//                },
//                dataType: "json",
//                error: function (data) {
//                    alert("error");
//                }
//            };
//            $.ajax(options);
//            return returnvalue;
//        }
//    });

</script>
</html>
