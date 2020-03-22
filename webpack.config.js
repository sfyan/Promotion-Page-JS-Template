const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')


//创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin(
{
	template: path.join(__dirname,"./src/index.html"),
	filename: "index.html"
})

//向外暴露一个打包的配置对象(webpack基于node构建，支持所有node API和语法)
//webpack默认只能打包处理.js,其他后缀名文件要配置第三方loader
module.exports = {
	mode: 'production',
	plugins: [
		htmlPlugin
	],
	module: { //所有第三方 模块的配置规则
		rules: [
			// { test: /\.css$/, use:['style-loader',{ loader: 'css-loader', options: { importLoaders: 1, modules:{localIdentName: '[path][name]-[local]-[hash:5]'} }}]}, // 加modules参数启用css模块化
			{ test: /\.scss$/, use:['style-loader','css-loader','sass-loader']}, // 加modules参数启用css模块化
			{ test: /\.css$/, use:['style-loader','css-loader']}, 
			{ test: /\.ttf|woff|woff2|eot|svg|png|gif|jpg|webp$/, use:'url-loader'}, //字体文件处理
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.vue'],
		alias:{
			'@': path.join(__dirname, './src')
		}
    },
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        open:true,
        port:8080,

        before(app){
            app.get('/haha', function(req, res) {
              res.send(req.query);
            });
          }
        
    }
}
