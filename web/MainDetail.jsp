<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html ng-app="app">
<head>
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
            padding: 2px;
            line-height: 30px;
        }

        .accordion-inner li a {
            display: block;
        }

        .accordion-inner li a:active {
            background-color: lightgray;
        }

        .accordion-inner li a:hover {
            background-color: rgba(238, 238, 238, 0.36);
        }

        table {
            margin: 2px;
        }

        .cellBtn {
            font-size: 13px;
            padding: 2px;
            padding-left: 5px;
            padding-right: 5px;
        }

        .container-fluid {
        margin: 0px;
        padding: 4px;
        }

        td {
            font-size: 13px;
        }

    </style>
</head>

<body>

<div class="navbar">
    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <a class="brand" href=" "><img src="img/logo.png" alt="IaaS Monitor"/></a>
            <div class="nav-collapse collapse">
                <ul class="nav" style="float:right">
                    <li><a href="#loginOut">注 销</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div><!-- Container -->
    </div><!-- Nav Bar - Inner -->
</div><!-- Nav Bar -->

<div class="container-fluid">
    <div class="row-fluid">
        <div class="span2">
            <div class="accordion" id="accordion-536559">
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           force-Href="#showSummary">概况</a>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           data-target="#showVMSummary">虚拟机</a>
                    </div>
                    <div id="showVMSummary" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <ul style="height:auto">
                                <li><a force-Href="#showServersInfo"><i class="glyphicon glyphicon-user"></i>概况</a></li>
                                <li><a force-Href="#showInstances"><i class="glyphicon glyphicon-th-list"></i>实例</a>
                                </li>
                                <li><a force-Href="#showImages"><i class="glyphicon glyphicon-asterisk"></i>镜像</a></li>
                                <li><a force-Href="#showSafety"><i class="glyphicon glyphicon-edit"></i>访问安全</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           data-target="#showNetSummary">网络</a>
                    </div>
                    <div id="showNetSummary" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <ul style="height:auto">
                                <li><a force-Href="#showNetwork"><i class="glyphicon glyphicon-network"></i>网络</a></li>
                                <li><a force-Href="#showRoute"><i class="glyphicon glyphicon-th-list"></i>路由</a></li>
                                <li><a force-Href="#showPort"><i class="glyphicon glyphicon-th-list"></i>端口</a></li>
                                <li><a force-Href="#showSecurityGroups"><i
                                        class="glyphicon glyphicon-th-list"></i>安全组</a>
                                </li>
                                <li><a force-Href="#showListSubnets"><i class="glyphicon glyphicon-th-list"></i>子网</a>
                                </li>
                                <li><a force-Href="#showListFloatingIPs"><i class="glyphicon glyphicon-th-list"></i>IP地址</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           data-target="#showLSSummary">对象存储</a>
                    </div>
                    <div id="showLSSummary" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <ul style="height:auto">
                                <li><a force-Href="#showListContainers"><i class="glyphicon glyphicon-user"></i>容器</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           data-target="#showIdentitySummary">身份管理</a>
                    </div>
                    <div id="showIdentitySummary" class="accordion-body collapse">
                        <div class="accordion-inner">
                            <ul style="height:auto">
                                <li><a force-Href="#showProgram"><i class="glyphicon glyphicon-user"></i>项目</a></li>
                                <li><a force-Href="#showUser"><i class="glyphicon glyphicon-th-list"></i>用户</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-group">
                    <div class="accordion-heading">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"
                           force-Href="#showSystemSummary">系统信息</a>
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

<%--servers--%>
<script src="app/components/servers/serversInfo.js"></script>
<script src="app/components/servers/images.js"></script>
<script src="app/components/servers/instances.js"></script>
<script src="app/components/servers/safety.js"></script>

<%--network--%>
<script src="app/components/network/network.js"></script>
<script src="app/components/network/route.js"></script>
<script src="app/components/network/ListPorts.js"></script>
<script src="app/components/network/ListSecurityGroups.js"></script>
<script src="app/components/network/ListSubnets.js"></script>
<script src="app/components/network/ListFloatingIPs.js"></script>

<%--对象存储-Object Storage 脚本--%>
<script src="app/components/ObjectStorage/ListContainers.js"></script>

<%--user--%>
<script src="app/components/user/program.js"></script>
<script src="app/components/user/user.js"></script>
<script src="app/components/user/login.js"></script>
<script src="app/components/user/userDetail.js"></script>

<script src="app/components/user/programDetail.js"></script>\
<script src="app/components/servers/keypairDetail.js"></script>

<script src="app/components/user/loginOut.js"></script>

<%--summary--%>
<script src="app/components/summary/totalSummary.js"></script>

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
