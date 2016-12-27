### My Docker On Road Dev
```
mysql:
  docker run --name dev_mysql -p 3306:3306 -v /sun/docker_data/mysql:/sun -e MYSQL_ROOT_PASSWORD=sun -d mysql:latest
redis:
  docker run -p 6379:6379 -v /sun/docker_data/redis:/sun -v /sun/docker_data/redis/redis.conf:/usr/local/etc/redis/redis.conf --name dev_redis -d redis:latest redis-server /sun/redis.conf
rails5:
  docker run -t -i -p 3000:3000 -v /sun/phantom/rails5:/sun/rails5 --name dev_rails5 -d rails:latest /bin/bash
rails:
  docker run -t -i -p 3000:3000 -v /sun:/sun --name dev_rails -d rails:latest /bin/bash
```
### 重新安装docker
```
$ sudo apt-get autoremove --purge docker-engine

# Nothing worked until I added this step
$ sudo rm -rfv /var/lib/docker

# Reboot here

$ sudo apt-get update
$ sudo apt-get install docker-engine

```
### Docker导入和导出
```
Export命令用于持久化容器
docker export <CONTAINER ID> > /home/export.tar
Save命令用于持久化镜像
docker save busybox-1 > /home/save.tar
导入export.tar文件
cat /home/export.tar | docker import - busybox-1-export:latest
```