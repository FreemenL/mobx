import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import escape from 'jsesc';//给定一些数据，jsesc返回该数据的字符串表示
const fs = require("fs");
const app = express();

app.use("/node_modules",express.static(path.join(__dirname,"../node_modules")));//express 静态资源路径

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const config = require("../webpack.config");
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath }));
app.use(require("webpack-hot-middleware")(compiler,{
    hot: true,  // 是否启用热更新
    historyApiFallback: true, // 所有的url路径均跳转到index.html,需要设置为true，否则比如访问localhost:8888,就跳转不到/home页
    inline: true, // 是否实时刷新，即代码有更改，自动刷新浏览器
    progress: false, // 在控制台输出webpack的编译进度
    quiet: true,
    stats:{
        colors: true // 不同类型的信息用不同的颜色显示
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
}));

const renderFullPage = html =>{
	const initialState = { todos};
	const initialStateJSON = escape(
		JSON.stringify(initialState),
		{isScriptContext: true, json: true }//isScriptContext 转义html 字符串标签
	)
	return `
	<!doctype html>
	<html lang="utf-8">
		<head>
			<!-- /node_modules 路径是因为express 设置了静态资源路径为 ../node_modules  -->
			<link rel="stylesheet" href="/node_modules/todomvc-common/base.css">
			<link rel="stylesheet" href="/node_modules/todomvc-app-css/index.css">
			<script>
				window.initialState = ${initialStateJSON}
			</script>
		</head>
		<body>
			<div id="todoapp" class="todoapp">${html}</div>
			<!-- /static/bundle.js 路径是因为 webpack 设置的静态资源路径为/static/ 输出的filename为bundle.js  -->
			<script src="/static/bundle.js"></script>
			<footer class="info">
				<p>Double-click to edit a todo</p>
				<p>TodoMVC powered by React and <a href="http://github.com/mobxjs/mobx/">MobX</a>. Created by <a href="http://github.com/mweststrate/">mweststrate</a></p>
				<p>Based on the base React TodoMVC by <a href="http://github.com/petehunt/">petehunt</a></p>
				<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			</footer>
		</body>
	</html>
	`
}
let todos = []; 

app.use(bodyParser.json());

app.get("/",(req,res)=>{	
	const page = renderFullPage(" ");
	res.status(200).send(page);
})

app.post("/api/todos",(req,res)=>{
	todos = req.body.todos;
	if(Array.isArray(todos)){
		console.log(`Updated todos (${todos.length})`);
		res.status(201).send(JSON.stringify({success:true}));
	}else{
		res.status(200).send(JSON.stringify({ success: false, error: "expected `todos` to be array" }));
	}
})

app.get("*",(req,res)=>{
	res.status(404).send('Server.js > 404 - Page Not Found');
})

app.use((err, req, res, next) => {
	console.error("Error on request %s %s", req.method, req.url);
	console.error(err.stack);
	res.status(500).send("Server error");
});

process.on('uncaughtException', (err) => {
  fs.writeSync(1, `捕获到异常：${err}\n`);
});

app.listen(3001,()=>{
	console.log("Listening on port 3001");
})














