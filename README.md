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
  output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        //это необходимо для того,чтобы картинки попадали в папку dist
        assetModuleFilename: "assets/[hash][ext]"
    },
```

* npm i -D copy-webpack-plugin

(copy file from one dir to another)

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

* npm i -D clean-webpack-plugin

(clean dir dist after new build)

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

* npm i -D css-loader sass-loader sass mini-css-extract-plugin

(for work with styles )

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//чтобы подключить стили в сборке
 entry: ['./src/index.ts','./src/style.scss'],
 
  rules: [
            //for ts
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // for assets(images)
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            //for assets(fonts)
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            //for css
            //это вставляет css in bundle.js
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            //for sass
            {
                test:/\.s[ac]ss/i,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            }
        ]
    },

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
            cleanStaleWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            //так будет называться в dist bundle with styles
            filename:'[name].[contenthash].css'
        })
    ],
   ```

* add mode: development or production

```
package.json

"scripts": {
"build": "webpack",
"dev": "webpack --env develop"
},

webpack.config.js

//develop поскольку наша ф-ция в качестве аргумента принимает env,а in package.json in script "dev":" webpack --env development" значение --env является develop
module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    //source-map также нужно включить в tsconfig.json
    devtool: develop ? 'inline-source-map' : 'none',
    entry: ['./src/index.ts', './src/style.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: 'bundle.js',
        //можно filename через шаблон
        filename: "[name].[contenthash].js",
        //это необходимо для того,чтобы картинки попадали в папку dist
        assetModuleFilename: "assets/[hash][ext]"
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
            // for assets(images)
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            //for assets(fonts)
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            //for css
            //это вставляет css in bundle.js
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            //for sass
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
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
            cleanStaleWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            //так будет называться в dist bundle with styles
            filename: '[name].[contenthash].css'
        })
    ],
    // это позволяет при импортах не указывать расширения данных файлов
    //import {test} from "./test"; example this
    resolve: {
        extensions: ['.ts', '.js']
    }
});
```

* add function devServer for mode development for live reload browser when have been changes in code

  npm i webpack-dev-server

```
const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        //open browser by default
        open: true,
        //reload page in browser
        hot: true,
        //open page on port 8080
        port: 8080,
        //если есть папка параллельно с srс,то ее указываем здесь
       // contentBase: path.join(__dirname, 'public')
    }
}

//develop поскольку наша ф-ция в качестве аргумента принимает env,а in package.json in script "dev":" webpack --env development" значение --env является develop
module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    //source-map также нужно включить в tsconfig.json
    devtool: develop ? 'inline-source-map' : 'none',
    entry: ['./src/index.ts', './src/style.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: 'bundle.js',
        //можно filename через шаблон
        filename: "[name].[contenthash].js",
        //это необходимо для того,чтобы картинки попадали в папку dist
        assetModuleFilename: "assets/[hash][ext]"
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
            // for assets(images)
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            //for assets(fonts)
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            //for css
            //это вставляет css in bundle.js
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            //for sass
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
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
            cleanStaleWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            //так будет называться в dist bundle with styles
            filename: '[name].[contenthash].css'
        })
    ],
    // это позволяет при импортах не указывать расширения данных файлов
    //import {test} from "./test"; example this
    resolve: {
        extensions: ['.ts', '.js']
    },
    ...devServer(develop)
});
```

* npm i -D eslint-webpack-plugin eslint
* npm i -D eslint-plugin-import eslint-config-airbnb-typescript typescript-parser @typescript-eslint/eslint-plugin

add eslint for webpack

* add file .eslintrc

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint",
    "import"
  ],
  "rules": {
    "@typescript-eslint/no-var-requires": 0,
    "no-plusplus": "off",
    "no-console": "warn",
    "max-len": [
      "warn",
      {
        "code": 120
      }
    ],
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "@typescript-eslint/indent": [
      "warn",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "import/prefer-default-export": "off",
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ]
  },
  "ignorePatterns": [
    "*config.js"
  ]
}
```
* add function esLingPlug

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        //open browser by default
        open: true,
        //reload page in browser
        hot: true,
        //open page on port 8080
        port: 8080,
        //если есть папка параллельно с srс,то ее указываем здесь
        // contentBase: path.join(__dirname, 'public')
    }
}
//чтобы ESLint запускался только для production
//проверять файлы с расширением ts and js
const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({extensions: ['ts', 'js']})];

//develop поскольку наша ф-ция в качестве аргумента принимает env,а in package.json in script "dev":" webpack --env development" значение --env является develop
module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    //source-map также нужно включить в tsconfig.json
    devtool: develop ? 'inline-source-map' : false,
    entry: ['./src/index.ts', './src/style.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: 'bundle.js',
        //можно filename через шаблон
        filename: "[name].[contenthash].js",
        //это необходимо для того,чтобы картинки попадали в папку dist
        assetModuleFilename: "assets/[hash][ext]"
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
            // for assets(images)
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            //for assets(fonts)
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            //for css
            //это вставляет css in bundle.js
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            //for sass
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },

        ]
    },
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
            cleanStaleWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            //так будет называться в dist bundle with styles
            filename: '[name].[contenthash].css'
        }),
        //проверять файлы с расширением ts and js
        // new ESLintPlugin({extensions: ['ts', 'js']})
        ...esLintPlugin(develop),
],
// это позволяет при импортах не указывать расширения данных файлов
//import {test} from "./test"; example this
resolve: {
    extensions: ['.ts', '.js']
}
,
...
devServer(develop)
})
```
