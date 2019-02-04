const path = require('path');

module.exports = {
    entry: "./client/src/index.tsx",
    output: {
        //publicPath: "dist",
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    mode: "development",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [ ".ts", ".tsx", ".js", ".json" ]
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: "./client/tsconfig.json",
                }
            },
            {
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, assume
    // a corresponding global variable exists and use that instead. This is
    // important because it allows us to avoid bundling all of our dependencies
    // and cache libraries in browsers between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};