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
### virtualbox安装VboxLinuxAdditions
```
# prepare
$ sudo apt-get install -y linux-headers-generic build-essential dkms
# get the right ISO from http://download.virtualbox.org/virtualbox/
$ wget http://download.virtualbox.org/virtualbox/5.1.6/VBoxGuestAdditions_5.1.6.iso
# create a mount folder
$ sudo mkdir /media/VBoxGuestAdditions
# mount the ISO
$ sudo mount -o loop,ro VBoxGuestAdditions_5.1.6.iso /media/VBoxGuestAdditions
# install the guest additions
$ sudo sh /media/VBoxGuestAdditions/VBoxLinuxAdditions.run
# remove the ISO
$ rm VBoxGuestAdditions_5.1.6.iso
# unmount the ISO
$ sudo umount /media/VBoxGuestAdditions
# remove the mount folder
$ sudo rmdir /media/VBoxGuestAdditions
```