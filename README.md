#在server目录下新建 ormconfig.json,配置如下:
```json
{
	"type": "mysql",
	"host": "your ip",
	"port": 3306,
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
