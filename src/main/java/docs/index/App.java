package docs.index;

import org.noear.solon.Solon;
import org.noear.solon.annotation.Controller;
import org.noear.solon.annotation.Get;
import org.noear.solon.annotation.Mapping;
import org.noear.solon.annotation.Socket;
import org.noear.solon.annotation.SolonMain;

// #region snippet
@SolonMain
@Controller
public class App {
    public static void main(String[] args) {
        Solon.start(App.class, args, app -> {
            //手写模式
            app.get("/hello1", ctx -> ctx.output("Hello world!"));
        });
    }

    //注解模式
    @Get
    @Socket
    @Mapping("/hello2")
    public String hello2(String name) {
        return String.format("Hello %s!", name);
    }
}
// #endregion snippet