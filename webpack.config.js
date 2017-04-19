var webpack=require("webpack");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var HtmlPlugin=require("html-webpack-plugin");
var OpenBrowserPlugin=require("open-browser-webpack-plugin");
module.exports={
//	entry:"./src/script/app.js",
	entry:{
		app:"./src/script/app.js"
	},
	output:{
		path:__dirname +"/build",
//		filename:"app.js"
		filename:"[name]_[hash].js"
	},

	devServer:{
		contentBase:"./build",
		host:"localhost",
		port:7000
	},

	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader'
			},
//			{
//				test:/\.css$/,
//				loader:"style-loader!css-loader"
//			},
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:"css-loader"
				})
			},
//			{
//				test:/\.scss$/,
//				loader:"style-loader!css-loader!sass-loader"
//			}
			{
				test:/\.scss$/,
				loader:ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:"css-loader!sass-loader"
				})
			}
		]
	},
	plugins:[
		new ExtractTextPlugin({
			filename:"[name]_[hash].css",
			allChunks:true,
			disable:false
		}),
		new HtmlPlugin({
			template:"./src/index.ejs",
			filename:"index.html",
			title:"豆瓣电影",
			name:"kailong"
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false
			},
			output:{
				comments:false
			}
		})
//		new OpenBrowserPlugin({
//			url:"http://localhost:7000"
//		})
	]
	
}
