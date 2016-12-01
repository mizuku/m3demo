"use strict";
let webpack = require("webpack");
let AppCachePlugin = require("appcache-webpack-plugin");

module.exports = {
    entry: "./app/index.ts",
    output: {
        path: "/public/scripts/",
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: "ts-loader", exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"] 
    },
    externals: {
    },
    target: "web",
    cache: false,
    plugins: [
        new AppCachePlugin({
            exclude: [".htaccess"]
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: { comments: false },
            compress: { warnings: false }
        })
    ]
}