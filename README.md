# Webpack

* npm i --save-dev webpack webpack-cli
* create webpack.config.js and copy simple config from [https://webpack.js.org/](https://webpack.js.org/)
```
const path = require('path');

module.exports = {
entry: './src/index.ts',
output: {
path: path.resolve(__dirname, 'dist'),
filename: 'bundle.js',
},
}
```
* create dir src and index.ts
* in package.json create script: 
"build":"webpack"
* npm i -D typescript ts-loader   

add typescript for our project
```
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        //in rules add loaders
        rules: [
            //for ts
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    // это позволяет при импортах не указывать расширения данных файлов
    //import {test} from "./test"; example this
    resolve: {
        extensions: ['.ts','.js']
    }
}
```
* tsc --init (create tsconfig.json)
* rename file.js to file.ts and change entry:'./scr/index.ts'
* npm i -D html-webpack-plugin
```
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
entry: './src/index.ts',
output: {
path: path.resolve(__dirname, 'dist'),
filename: 'bundle.js',
},
module: {
//in rules add loaders
rules: [
//for ts
{
test: /\.[tj]s$/,
use: 'ts-loader',
exclude: /node_modules/,
},
]
},
plugins: [
new HtmlWebpackPlugin({
title: "Webpack App",
//template - если есть готовый index.html,то указываем к нему путь
//template: "path to index.html"
})
],
// это позволяет при импортах не указывать расширения данных файлов
//import {test} from "./test"; example this
resolve: {
extensions: ['.ts', '.js']
}
}
```

for assets in rules add object
```
//for assets
{ test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
}
```
and in output add   
```
assetModuleFilename: "assets/[hash][ext]"
```
* npm i -D copy-webpack-plugin (copy file from one dir to another)

in plugins add
```
 const CopyPlugin = require('copy-webpack-plugin');
 plugins: [
        new HtmlWebpackPlugin({
            //просто генeрит пустой index.html with title "Webpack App"
            //title: "Webpack App",
            //template - если есть готовый index.html,то указываем к нему путь
            template: "./src/index.html"
        }),
        new CopyPlugin({
            patterns:[
                //copy from dir public to root dist
                {from:'public',to:'images'}
                //можем указать через to  папку куда копировать
                //patterns: [
                //         { from: "source", to: "dest" },
                //         { from: "other", to: "public" },
            ]
        })
    ],
```
* npm i -D clean-webpack-plugin  (clean dir dist after new build)

```
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
  plugins: [
        new HtmlWebpackPlugin({
            //просто генeрит пустой index.html with title "Webpack App"
            //title: "Webpack App",
            //template - если есть готовый index.html,то указываем к нему путь
            template: "./src/index.html"
        }),
        new CopyPlugin({
            patterns: [
                //copy from dir public to root dist
                {from: 'public', to: 'images'}
                //можем указать через to  папку куда копировать
                //patterns: [
                //         { from: "source", to: "dest" },
                //         { from: "other", to: "public" },
            ]
        }),
        new CleanWebpackPlugin({
            //если картинки не изменились,то не перезаписывать их
            cleanStaleWebpackAssets:false,
        })
    ],
```
