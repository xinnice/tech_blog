# 目录结构

---

- conf 目录：存放 Nginx 的主要配置文件，很多功能实现都是通过配置该目录下的 nginx.conf 文
  件，后面我们会详细介绍。
- docs 目录：存放 Nginx 服务器的主要文档资料，包括 Nginx 服务器的 LICENSE. OpenSSL 的
  LICENSE . PCRE 的 LICENSE 以及 zlib 的 LICENSE ，还包括本版本的 Nginx 服务器升级的版本变
  更说明，以及 README 文档。
- html 目录：存放了两个后缀名为 .html 的静态网页文件，这两个文件与 Nginx 服务器的运行相
  关。
- logs 目录：存放 Nginx 服务器运行的日志文件。
- nginx.exe：启动 Nginx 服务器的 exe 文件，如果 conf 目录下的 nginx.conf 文件配置正确的
  话，通过该文件即可启动 Nginx 服务器。

### nginx.conf 文件配置

```nginx
#并发处理服务 ，一般有多少个CPU核就配置多少
worker_processes 1;
events {
    #支持的最大连接数
    worker_connections 1024;
}
http {
    #响应类型
    include mime.types;
    #默认响应类型
    default_type application/json;
    #是否开启高效文件传输模式
    sendfile on;

    server {
        # 监听端口
        listen 80;
        # 代理主机域名
        server_name localhost;
        # 匹配规则
        location / {
            # 静态文件目录
            root html;
            # 目标服务器
            proxy_pass http:#127.0.0.1:3000;
            # 设置代理的请求头
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            # 默认首页
            index index.html index.htm;
        }
        # 错误页面
        error_page 500 502 503 504 / 50x.html;
        # 指定文件
        location = /50x.html {
            root html;
        }
    }
}
```

```
location [ = | ~ | ~* | ^~] uri {
}
```

1. = ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配成功，就停止继
   续向下搜索并立即处理该请求。
2. ~：用于表示 uri 包含正则表达式，并且区分大小写。
3. ~\*：用于表示 uri 包含正则表达式，并且不区分大小写。
4. ^~：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字符串匹配度最高的
   location 后，立即使用此 location 处理请求，而不再使用 location 块中的正则 uri 和请求字符串做匹
   配
