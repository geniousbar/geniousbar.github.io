### pg创建只读用户
```
SELECT date_trunc('minute', dd) :: TIMESTAMP
FROM generate_series('2016-10-01' :: TIMESTAMP, '2016-12-31' :: TIMESTAMP, '10 minute' :: INTERVAL) dd;

CREATE USER read_from_pg WITH ENCRYPTED PASSWORD 'phantom_smart_huanteng';
GRANT CONNECT ON DATABASE test to read_from_pg;
\c test
GRANT USAGE ON SCHEMA public to read_from_pg;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO read_from_pg;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO read_from_pg;

select * from empsalary;
update empsalary set salary=9999 where empno=10;
```