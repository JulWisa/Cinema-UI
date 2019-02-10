module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: "./script/app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
};