const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
            cleanStaleWebpackAssets:false,
        })
    ],
    // это позволяет при импортах не указывать расширения данных файлов
    //import {test} from "./test"; example this
    resolve: {
        extensions: ['.ts', '.js']
    }
}