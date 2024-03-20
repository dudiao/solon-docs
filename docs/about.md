---
outline: deep
---

# 概述

Java “生态型”应用开发框架。<mark>从零开始构建，有自主的标准规范与开放生态</mark>。目前已近14万行代码。

* 追求： **更快、更小、更简单**
* 提倡： **克制、简洁、高效、开放、生态**

### 特色：

更高的计算性价比：

* 降低运行成本：每秒并发高 2～ 3 倍；内存节省 1/3 ~ 1/2

更高的开发效率，更简单的编码体验：

* 降低学习成本：源码简单；新手入门容易；使用方便
* 提高调试效率：重启快 5 ～ 10 倍；更快定位问题

更快的生产与部署体验：

* 服务包更小，CI/DI 更快：打包缩到 1/2 ~ 1/10
* 云原生更友好（镜像拉取快，容器就绪快）：打包缩到 1/2 ~ 1/10，启动快 5 ～ 10 倍

更自由的运行时兼容选择：

* 同时支持 java8、java11、java17、java21 的运行时

### 技术介绍：

同时支持 java8、java11、java17、java21；组合不同的插件应对不同需求；方便定制；快速开发。

* Http、WebSocket、Socket 三种信号统一的开发体验（俗称：三源合一）
* 支持“注解”与“手动”两种模式并重，按需自由操控
* Not Servlet，可以适配任何 Http 通讯框架（所以：最小 0.3m 运行rpc架构）
* [独特的 IOC/AOP 容器设计](/article/241)。**不会因为依赖变多而启动很慢**
* 适合 Web、Scheduling、FaaS、Remoting、Cloud 等任何开发场景
* 兼顾 Handler + Context 和 Listener + Message 两种架构模式
* 强调插件式扩展，可扩展可切换；适应不同的应用场景
* 支持 GraalVm Native Image 打包
* 允许业务插件“热插”、“热拔”、“热管理”

### Hello world：

```java

@SolonMain
public class App {
    public static void main(String[] args) {
        Solon.start(App.class, args, app -> {
            //Handler 模式：
            app.get("/hello", (c) -> c.output("Hello world!"));
        });
    }
}

//Controller 模式：(mvc or rest-api)
@Controller
public class DemoController {
    //限定 put 方法类型
    @Put
    @Mapping("/mvc/hello")
    public String hello(String name) {
        return "Hello " + name;
    }
}

//Remoting 模式：(rpc)
@Mapping("/rpc/hello")
@Remoting
public class HelloServiceImpl implements HelloService {
    @Override
    public String hello() {
        return "Hello world!";
    }
}
```

## 主框架及快速集成开发包（快捷组合包）：

###### 主框架

| 组件                     | 说明                          |
|:-----------------------|:----------------------------|
| org.noear:solon-parent | 框架版本管理                      |
| org.noear:solon        | 主框架                         |
| org.noear:nami         | 伴生框架（做为solon remoting 的客户端） |

###### 快捷组合包及相互关系

| 快捷组合包                                         | 说明                                                     |
|:----------------------------------------------|:-------------------------------------------------------|
| [org.noear:solon-lib](/article/279)           | 快速开发基础组合包                                              |
| [org.noear:solon-job](/article/476)           | =solon-lib + simple job；快速开发定时任务应用                     |
| [org.noear:solon-api](/article/280)           | =solon-lib + smart-http；快速开发接口应用                       |
| [org.noear:solon-web](/article/281)           | =solon-api + freemarker + sessionstate；快速开发WEB应用       |
| [org.noear:solon-web-beetl](/article/282)     | =solon-api + beetl + beetlsql + sessionstate；快速开发WEB应用 |
| [org.noear:solon-web-enjoy](/article/283)     | =solon-api + enjoy + arp + sessionstate；快速开发WEB应用      |
| [org.noear:solon-rpc](/article/284)           | =solon-api + nami；快速开发RPC应用                            |
| [org.noear:solon-cloud](/article/285)         | =solon-rpc + consul；快速开发微服务应用                          |
| [org.noear:solon-cloud-water](/article/286)   | =solon-rpc  + water 套件                                 | 
| [org.noear:solon-cloud-alibaba](/article/287) | =solon-rpc  + alibaba 套件 (nacos, rocketmq, sentinel)   | 

