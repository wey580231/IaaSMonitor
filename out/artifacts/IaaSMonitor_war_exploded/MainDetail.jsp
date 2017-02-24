<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%
    String path = request.getContextPath();
    String pageInfo = request.getRequestURI();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + pageInfo;
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html ng-app="app">
<head>
    <title>使用概况</title>
    <base href="<%=basePath%>">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="awesome/font-awesome.min.css" rel="stylesheet">
    <%--<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">--%>
    <script src="javascript/jquery-3.1.1.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="javascript/circliful.js"></script>
    <link href="css/jquery.circliful.css" rel="stylesheet" type="text/css"/>
    <link href="css/loaders.min.css" rel="stylesheet" type="text/css">
    <style type="text/css">
        body {
            margin-left: 50px;
        }

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

        dl {
            clear: left;
        }

        dt {
            width: 160px;
            margin: 2px;
        }

        dt, dd {
            float: left;
            overflow: hidden;
        }

        h2, h3, h4, h5 {
            clear: left;
            display: block;
            font-weight: 500;
        }

        .infoGroup {
            display: block;
            padding-top: 15px;
            margin-bottom: 40px;
        }

        pre {
            font-size: 12px;
        }

        #bg {
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 1001;
            -moz-opacity: 0.7;
            opacity: .70;
            filter: alpha(opacity=50);
        }

        #show {
            position: absolute;
            top: 25%;
            left: 45%;
            width: 10%;
            height: 10%;
            padding: 8px;
            z-index: 1002;
            overflow: auto;
            -moz-opacity: 0.7;
            opacity: .70;
            filter: alpha(opacity=50);
        }

        #mainTable thead tr {
            cursor: pointer;
        }

        .headAsc {
            background-image: url('image/arrow_drop_up.png');
            background-repeat: no-repeat;
            background-position: right 5px center;
        }

        .headDesc {
            background-image: url('image/arrow_drop_down.png');
            background-repeat: no-repeat;
            background-position: right 5px center;
        }

    </style>
</head>

<body>

<%--<div class="navbar">--%>
<%--<div class="navbar-inner">--%>
<%--<div class="container">--%>
<%--<a class="brand" href=" ">IaaS Monitor</a>--%>
<%--<div class="nav-collapse collapse">--%>
<%--<ul class="nav" style="float:right">--%>
<%--<li><a href="#loginOut">注 销</a></li>--%>
<%--</ul>--%>
<%--</div><!--/.nav-collapse -->--%>
<%--</div><!-- Container -->--%>
<%--</div><!-- Nav Bar - Inner -->--%>
<%--</div><!-- Nav Bar -->--%>

<div class="container-fluid">
    <div class="row-fluid">
        <%--<div class="span2">--%>
        <%--<div class="accordion" id="accordion-536559">--%>
        <%--<div class="accordion-group">--%>
        <%--<div class="accordion-heading">--%>
        <%--<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"--%>
        <%--force-Href="#showSummary">概况</a>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div class="accordion-group">--%>
        <%--<div class="accordion-heading">--%>
        <%--<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"--%>
        <%--data-target="#showVMSummary">虚拟机</a>--%>
        <%--</div>--%>
        <%--<div id="showVMSummary" class="accordion-body collapse">--%>
        <%--<div class="accordion-inner">--%>
        <%--<ul style="height:auto">--%>
        <%--&lt;%&ndash;<li><a force-Href="#showServersInfo"><i class="glyphicon glyphicon-user"></i>概况</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showInstances"><i class="glyphicon glyphicon-th-list"></i>实例</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showImages"><i class="glyphicon glyphicon-asterisk"></i>镜像</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showSafety"><i class="glyphicon glyphicon-edit"></i>访问与安全</a></li>&ndash;%&gt;--%>
        <%--<li><a force-Href="#showStacks"><i class="glyphicon glyphicon-edit"></i>栈</a></li>--%>
        <%--</ul>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>

        <%--&lt;%&ndash;<div class="accordion-group">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-heading">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"&ndash;%&gt;--%>
        <%--&lt;%&ndash;data-target="#showNetSummary">网络</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div id="showNetSummary" class="accordion-body collapse">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-inner">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<ul style="height:auto">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showNetwork"><i class="glyphicon glyphicon-network"></i>网络</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showRoute"><i class="glyphicon glyphicon-th-list"></i>路由</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showPort"><i class="glyphicon glyphicon-th-list"></i>端口</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showSecurityGroups"><i&ndash;%&gt;--%>
        <%--&lt;%&ndash;class="glyphicon glyphicon-th-list"></i>安全组</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showListSubnets"><i class="glyphicon glyphicon-th-list"></i>子网</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showListFloatingIPs"><i class="glyphicon glyphicon-th-list"></i>IP地址</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</ul>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-group">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-heading">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"&ndash;%&gt;--%>
        <%--&lt;%&ndash;data-target="#showLSSummary">对象存储</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div id="showLSSummary" class="accordion-body collapse">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-inner">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<ul style="height:auto">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showListContainers"><i class="glyphicon glyphicon-user"></i>容器</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</ul>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-group">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-heading">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"&ndash;%&gt;--%>
        <%--&lt;%&ndash;data-target="#showIdentitySummary">身份管理</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div id="showIdentitySummary" class="accordion-body collapse">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-inner">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<ul style="height:auto">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showProgram"><i class="glyphicon glyphicon-user"></i>项目</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<li><a force-Href="#showUser"><i class="glyphicon glyphicon-th-list"></i>用户</a></li>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</ul>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-group">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<div class="accordion-heading">&ndash;%&gt;--%>
        <%--&lt;%&ndash;<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-536559"&ndash;%&gt;--%>
        <%--&lt;%&ndash;force-Href="#showSystemSummary">系统信息</a>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
        <%--</div>--%>
        <%--</div>--%>
        <div class="span12">
            <ng-view></ng-view>
        </div>
        <div id="bg" ng-show="showContent" style="display:block"></div>
        <div id="show" ng-show="showContent" style="display:block">
            <div class="loader" onclick="">
                <div class="loader-inner ball-grid-pulse">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
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
<script src="app/components/servers/instanceDetail.js"></script>
<script src="app/components/servers/safety.js"></script>
<script src="app/components/servers/stacks.js"></script>
<script src="app/components/servers/stackDetail.js"></script>

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

<script src="app/components/user/programDetail.js"></script>

<script src="app/components/servers/keypairDetail.js"></script>

<script src="app/components/user/loginOut.js"></script>

<%--summary--%>
<script src="app/components/summary/totalSummary.js"></script>
<script src="app/components/servers/resourceDetail.js"></script>
<script src="app/components/servers/portDetail.js"></script>

<script src="javascript/ng-i18next.min.js"></script>
</html>
