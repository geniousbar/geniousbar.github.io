创建只读用户给所有数据库:

=========================

grant select on \*.\* to 'read_from_mysql'@'%' identified by '...';

flush privileges;

===========================