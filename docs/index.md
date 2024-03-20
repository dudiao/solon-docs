---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Solon"
  text: "更快、更小、更简单"
  tagline: Java “生态型”应用开发框架
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: 更快
    details: 启动快 5 ～ 10 倍，也支持 Graalvm Native Image
  - title: 更小
    details: 内存省 1/3 ~ 1/2；打包缩到 1/2 ~ 1/10
  - title: 更简单
    details: 同时支持 java8, java11, java17, java21
---

::: code-group

<<< @/../src/main/java/docs/index/App.java#snippet [Java]

```kotlin [Kotlin]
@Controller
class App {
    //注解模式
    @Get
    @Socket
    @Mapping("/hello2")
    fun hello(@Param(defaultValue = "world") name: String): String {
        return String.format("Hello %s!", name)
    }
}

fun main(args: Array<String>) {
    Solon.start(App::class.java, args) { app ->
        //手写模式
        app.get("/hello1") { ctx -> ctx.output("Hello world!") }
    }
}
```

```groovy [Groovy]
@Controller
class App {
    static void main(String[] args){
        Solon.start(App.class, args, app->{
            //手写模式
            app.get("/hello1", ctx -> ctx.output("Hello world!"))
        })
    }

    //注解模式
    @Get
    @Socket
    @Mapping("/hello2")
    String hello(@Param(defaultValue = "world") String name) {
        return String.format("Hello %s!", name)
    }
}
```
:::