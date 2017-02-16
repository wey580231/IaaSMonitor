# IaaSMonitor
IaaSMonitor project
* 2017-02-09:项目初始化，添加OkHttp的Jar包。
* 2017-02-09:增加了doLogin()和doGet()方法用于登陆和发起Get请求。
* 2017-02-09:增加Json.jar以及从MyEclipse将已开发的功能迁移。
* 2017-02-09:实现了登陆获取Token的功能。
* 2017-02-09:增加了ErrorResponseCodes类用于显示http的错误信息。
* 2017-02-09:增加bootstrap和jquery，调整登录和主页面的布局。
* 2017-02-09:增加了LoginJson的解析功能，将对应节点的EndpointUrl和Token相关信息保存在内存中。
* 2017-02-09:增加AngularJs，实现登录和主页面的连接，并实现了显示详情页面。
* 2017-02-09:删除ErrorResponseCodes、OpenStackInfo、Token类及相关方法。
* 2017-02-09:增加了doPost()方法HttpPostBodyMaker类用于构造HTTPPost请求的body。
* 2017-02-09:增加AngularJs，实现登录和主页面的连接，并实现了显示详情页面。
* 2017-02-10:增加createMultipleServers()、createServer()、doDelete()的Body构造方法。
* 2017-02-12:增加请求列表服务serviceListService，用于统一管理所有请求的url
* 2017-02-12:增加请求user清单，用于统一管理所有请求的user
* 2017-02-12:增加请求program清单，用于统一管理所有请求的program
* 2017-02-12:增加获取网络信息、路由信息、端口信息、子网列表、端口列表页面。
* 2017-02-12:更新了网络单元下页面的显示信息。
* 2017-02-12:修复登录失败后依然可以跳转问题;修复请求发送两次问题;
* 2017-02-13:添加对象存储分类、增加登陆时的参数项目名称、容器列表清单页面。
* 2017-02-13:增加对象存储页面的窗口遮罩,在遮罩上显示容器内的文件名及文件大小
* 2017-02-13:在HttpPostBodyMaker中增加了createUser方法。
* 2017-02-13:增加因超时跳转至登录，重新登录后，再次跳转至之前请求的页面。
* 2017-02-13:增加创建用户界面；
* 2017-02-13:增加强制刷新当前页面；
* 2017-02-14:增加用户详情页面，实现页面的跳转。
* 2017-02-14:修改网络，增加安全组、浮动IP、servers相关界面的显示功能.
* 2017-02-14:增加用户界面checkbox的全选删除功能(删除部分未写，但实现对某条记录的删除)
* 2017-02-14:增加导航栏、注销功能
* 2017-02-15:增加默认页面；增加分页功能
* 2017-02-15:增加项目和密钥对的详细信息界面。
* 2017-02-15:移除虚拟机下概况页面，建立分页服务，全局访问。
* 2017-02-16:增加首页图表(未实现真实数据显示);增加对stack的显示
* 2017-02-16:调整多个请求访问的处理方式($q.all())
* 2017-02-16:增加大数据集群模板创建虚拟机功能。
* 2017-02-16:增加实例详情

