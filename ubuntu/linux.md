### 建立软连接
ln -s original/file/path soft/file/path
### linux后台启动服务
nohup ruby http_server.rb 2>&1 >> log.log 2>&1 /dev/null &
### linux根据关键字得到pid号
pgrep -f keyword