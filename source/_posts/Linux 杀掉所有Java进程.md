---
title: Linux 杀掉所有Java进程
date: 2023-02-14
tags: []
categories: []
---

# [Linux 杀掉所有Java进程](https://www.cnblogs.com/linliquan/p/11252558.html)

 

```
1 ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -9
```

 

管道符"|"用来隔开两个命令，管道符左边命令的输出会作为管道符右边命令的输入。

"ps -ef" 是linux里查看所有进程的命令。这时检索出的进程将作为下一条命令'Jps'的输入。

"grep 'Jps'" 的输出结果是，所有含有关键字'Jps'的进程。

"grep -v 'i' " 是在列出的进程中去除含有关键字"grep"的进程。

"cut -c 9-15" 是截取输入行的第9个字符到第15个字符，而这正好是进程号PID。

"xargs kill -9" 中的 xargs 命令是用来把前面命令的输出结果（PID）作为"kill -9"命令的参数，并执行该命令。"kill -9"会强行杀掉指定进程。





```shell
chgrp -R zyb/zyb .
chown -R zyb/zyb .
```

