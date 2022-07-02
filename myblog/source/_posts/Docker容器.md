## Docker数据存储方式

![img](Docker%E5%AE%B9%E5%99%A8.assets/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0V2YW5fTGV1bmc=,size_16,color_FFFFFF,t_70.png)

Docker是通过挂载宿主机文件系统或内存的方式来实现数据存储的，挂载方式有三种:volume、bind mount和tmpfs。

-   volumes - 在宿主的文件系统上的docker工作路径下创建一个文件夹（`/var/lib/docker/volumes`）来存储数据，其他非docker进程是不能修改该路径下的文件，完全由docker来管理
-   bind mounts - 可以存储在宿主机器任何一个地方，但是会依赖宿主机器的目录结构，不能通过docker CLI 去直接管理，并且非docker进程和docker进程都可以修改该路径下的文件
-   tmpfs - 无论是在Docker主机上还是在容器内，tmpfs挂载都不会持久保存在磁盘上，它会将信息存储在宿主机器内存里。 容器在其生存期内可以使用它来存储非持久状态或敏感信息。 例如，在内部，swarm services 使用tmpfs挂载将机密挂载到服务的容器中 或者 我们一些不需要持久化数据的开发测试环境，可以使用tmpfs

https://www.cnblogs.com/evan-liang/p/12372371.html