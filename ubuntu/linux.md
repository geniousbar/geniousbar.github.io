### 建立软连接
ln -s original/file/path soft/file/path
### linux后台启动服务
nohup ruby http_server.rb 2>&1 >> log.log 2>&1 /dev/null &
### linux根据关键字得到pid号
pgrep -f keyword
### linux创建sudo用户
adduser username
usermod -aG sudo username
### sudo免密码
vi /etc/sudoers
root    ALL=(ALL:ALL) ALL
deployer ALL=(ALL) NOPASSWD: ALL
%admin ALL=(ALL) NOPASSWD: ALL
%sudo   ALL=(ALL:ALL) NOPASSWD: ALL