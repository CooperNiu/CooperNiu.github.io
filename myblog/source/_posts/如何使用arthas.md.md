# 如何使用Arthas热更新代码？

## 一、Arthas 是什么?

`Arthas(阿尔萨斯)` 是阿里开源的一个Java在线分析诊断工具

## 二、如何启动

```shell
[root]# java -jar arthas-boot.jar   --target-ip 172.17.72.201
[INFO] arthas-boot version: 3.1.0
[INFO] Found existing java process, please choose one and hit RETURN.
* [1]: 28679 demo-0.0.1-SNAPSHOT.jar
1
```

## 三、具体功能

1.   ### Dashboard命令

![Dashboard命令界面](https://img-blog.csdnimg.cn/20200206200642543.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpbnpoaWZ1MQ==,size_16,color_FFFFFF,t_70)

2.   ### Thread（线程监控）

```
thread -n 3 #当前最忙的前N个线程
thread -b, ##找出当前阻塞其他线程的线程
thread -n 3 -i 1000 #间隔一定时间后展示
```

3.   #### jad 反编译

     当挂载上 Arthas 之后，执行

     ```shell
     $ jad --source-only moe.cnkirito.arthas.demo.HelloService > /tmp/HelloService.java
     ```

4.   #### sc查找类加载器的hash值

     ```shell
     sc -d moe.cnkirito.arthas.demo.HelloService | grep classLoaderHash
     ```

5.   #### mc内存编译

```shell
$ mc -c 18b4aac2 /tmp/HelloService.java -d /tmp
Memory compiler output:
/tmp/moe/cnkirito/arthas/demo/HelloService.class
```

使用 `-c` 指定类加载器的 hash 值。编译完成后，/tmp 目录下会生成对应的 class 字节码文件

6.   #### redefine 热更新代码

     ```javascript
     $ redefine /tmp/moe/cnkirito/arthas/demo/HelloService.class
     ```

## 彩蛋：快捷热部署方法

直接把class文件上传，使用6. redefine热更新代码即可，redefine后面跟着class文件在服务器上的绝对路径

### 常见问题

### redefine 使用限制

-   不允许新增或者删除 field/method 会出现类似下面的提示 `redefine error! java.lang.UnsupportedOperationException: class redefinition failed: attempted to change the schema (add/remove fields)`
-   运行中的方法不会立刻生效，会在下一次进入该方法时才能生效。 很好理解，并发问题