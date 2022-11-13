# 运行server需要配置typeorm
在server目录下新建 ormconfig.json,配置如下:
```json
{
	"type": "mysql",
	"host": "your ip",
	"port": your sql port,
	"username": "sql username",
	"password": "password",
	"database": "your config database",
	"synchronize": true,
	"entities": ["src/*/entity/*.ts"],
	"cli": {
		"entitiesDir": "src/*/entity"
	}
}
```
