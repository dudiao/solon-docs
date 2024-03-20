# 示例速览
## 约定

```
//资源路径约定（不用配置；也不能配置）
resources/app.yml（ 或 app.properties ） #为应用配置文件

resources/static/    或者 resources/WEB-INF/static/ #为静态文件根目录（目录二选一，v2.2.10 后支持）
resources/templates/ 或者 resources/WEB-INF/templates/  #为视图模板文件根目录（目录二选一，v2.2.10 后支持）

//调试模式约定：
启动参数添加：--debug=1
```

## 配置示例

pom.xml

```xml
<parent>
    <groupId>org.noear</groupId>
    <artifactId>solon-parent</artifactId>
    <version>${solon.version}</version>
</parent>

<dependencies>
    <dependency>
        <!-- 引入 Web 快速开发集成包 -->
        <groupId>org.noear</groupId>
        <artifactId>solon-web</artifactId>
    </dependency>
</dependencies>

<build>
    <finalName>${project.artifactId}</finalName>
    <plugins>
        <plugin>
          <!-- 引入打包插件 -->
          <groupId>org.noear</groupId>
          <artifactId>solon-maven-plugin</artifactId>
      </plugin>
    </plugins>
</build>
```

app.yml

```yml
server.port: 8080

solon.app:
  group: "demo"
  name: "demoapp"
```


## Web 示例（mvc）

```java
//打包插件，通过此注解确认主类
@SolonMain 
public class DemoApp{
    public static void main(String[] args){
        Solon.start(DemoApp.class, args);
    }
}

/*
 * mvc控制器
 */
@Controller
public class DemoController{
    //for all (http, socket, websocket)
    @Mapping("/hallo/{u_u}")
    public ModelAndView hallo(String u_u){
        return new ModelAndView("hallo.ftl");
    }
    
    //for web socket （需支持 websocket 的插件）
    @WebSocket
    @Mapping("/hallo/{u_u}")
    public ModelAndView hallo_ws(String u_u){
        return new ModelAndView("hallo.ftl");
    }
}
```

## Scheduling 示例（job）
```java
@Scheduled(cron = "0 0/1 * * * ? *")
public class HelloTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Hello world");
    }
}
```


## Remoting 示例（rpc）

```java
// - interface : 定义协议
public interface DemoService{
    void setName(Integer user_id, String name);
}

// - server : 实现协议
@Mapping("demo")
@Remoting
public class DemoServiceImp implements DemoService{
    public void setName(int user_id, String name){
        
    }
}

// - client - 简单示例
//注入模式
@NamiClient("http://127.0.0.1:8080/demo/") 
DemoService client;

//手动模式
DemoService client = Nami.builder().url("http://127.0.0.1:8080/demo/").create(DemoService.class); 
client.setName(1,'');


```

## 应用配置获取示例
```java
//手动模式
Solon.cfg().get("app_key"); //=>String
Solon.cfg().getInt("app_id",0); //=>int
Solon.cfg().getProp("app_ds"); //=>Properties
Solon.cfg().getBean("app_ds", HikariDataSource.class); //=>HikariDataSource

//注入模式
@Configuration
public class DemoConfig{
    @Inject("${app_key}")
    String app_key;

    @Inject("${app_title:Solon}")
    String app_title;
    
    @Bean
    public DataSource app_ds(@Inject("${app_ds}") HikariDataSource ds){
        return ds;
    }
}
```

## 全局过滤器控制示例（获取异常、响应计时、未处理、状态码等处理）

```java
@Slf4j
@Component
public class DemoFilter implements Filter {
    @Override
    public void doFilter(Context ctx, FilterChain chain) throws Throwable {
        //1.开始计时（用于计算响应时长）
        long start = System.currentTimeMillis();
        try {
            chain.doFilter(ctx);

            //2.未处理设为404状态
            if(!ctx.getHandled()){
                ctx.status(404);
            }
            
            if (ctx.status() == 404) { //3.404状态的定制（也可对别的状态处理）
                ctx.output("没有：（");
            }
        } catch (Throwable e) {
            //4.异常捕促与控制
            ctx.status(500);
            log.error(e);
        }

        //5.获得接口响应时长
        long times = System.currentTimeMillis() - start;
        System.out.println("用时："+ times);
    }
}
```

## 事务与缓存控制示例（+验证）
```java
@Valid
@Controller
public class DemoController{
    @Db
    BaseMapper<UserModel> userService;
    
    @Tran
    @NotZero("user_id")
    @CacheRemove(tags = "user_${user_id}")
    @Mapping("/user/update")
    public void udpUser(int user_id, UserModel user){
        userService.updateById(user);
    }

    @NotZero("user_id")
    @Cache(tags = "user_${user_id}")
    public UserModel getUser(int user_id){
        return userService.selectById(user_id);
    }
}
```

## 文件上传与下载示例
```java
@Controller
public class DemoController{
    @Mapping("/file/upload")
    public void upload(UploadedFile file){
        IoUtil.save(file.getContent(), "/data/file_" + file.getName());
    }

    @Mapping("/file/down")
    public DownloadedFile down(Context ctx, String path){
        URL uri = Utils.getResource(path);
        
        return new DownloadedFile("json/text", uri.openStream(), "test.json");
    }
}
```


## 体外扩展加载 jar 示例
```
demoApp.jar             #主程序
ext/                    #扩展目录
ext/ext.markdown.jar    #MD格式支持扩展包
```

## 单链接双向 Rpc 示例（客户端链上服务端之后，形成双向 RPC）
```java 
//server
@Socket
@Mapping("/demoh/rpc")
@Remoting
public class HelloRpcServiceImpl implements HelloRpcService {
    public String hello(String name) {
        //此处，可以根据 client session 创建一个连接 client 的 rpc service
        NameRpcService rpc = SocketD.create(Context.current(), NameRpcService.class);

        String name2 = rpc.name(name);

        return "name=" + name;
    }
}

//client
HelloRpcService rpc = SocketD.create("tcp://localhost:"+_port, HelloRpcService.class);

String rst = rpc.hello("noear");
```

## Solon Cloud 配置服务使用示例
```java
@Controller
public class DemoController {
    //注入模式
    @CloudConfig(value = "user.name", autoRefreshed = true)
    String userName;
    
    @Mapping("/")
    public void run() {
        //手动模式
        userName = CloudClient.config().pull("user.name").value();
    }
}
```

## Solon Cloud 事件总线使用示例
```java
//事件订阅与消费
@CloudEvent("hello.demo")
public class DemoEvent implements CloudEventHandler {
    @Override
    public boolean handle(Event event) throws Throwable {
        //返回成功
        return true;
    }
}

//事件产生
CloudClient.event().publish(new Event("hello.demo", msg));
```

## Solon Cloud 分布式任务使用示例
```java
//注解模式 - Hander 风格
@CloudJob("JobHandlerDemo1")
public class JobHandlerDemo1 implements CloudJobHandler {
    @Override
    public void handle(Context ctx) throws Throwable {
        //任务处理
    }
}

//手动模式
CloudClient.job().register("JobHandlerDemo3","",c->{
    //任务处理 
});
```