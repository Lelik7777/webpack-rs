# Webpack

* npm i --save-dev webpack webpack-cli
* create webpack.config.js and copy simple config from [https://webpack.js.org/](https://webpack.js.org/)
```
const path = require('path');

module.exports = {
entry: './src/index.js',
output: {
path: path.resolve(__dirname, 'dist'),
filename: 'bundle.js',
},
}
```
