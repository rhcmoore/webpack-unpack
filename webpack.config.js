const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    devtool: "cheap-module-eval-source-map", // get source maps - for debugging in browser
    entry: "./src/index.js", // tells webpack to look at index and analyze dependencies
    output: {  // create new folder with file
        path: path.resolve(__dirname, "dist"), // where file should be stored
        filename: "bundle.js", // name of bundled JS file
        publicPath: "" // where files are put (root vs. nested folder)
    },
    resolve: { // provide extensions to files when not provided
        extensions: [".js", ".jsx"]
    },
    module: { // loaders to handle file/module types
        rules: [
            {
                test: /\.js$/, // if we're in a .js file...
                loader: "babel-loader", // ...apply this loader (configured in .babelrc)
                exclude: /node_modules/ // don't transform these, they're already optimized
            },
            {
                test: /\.css$/, // CSS files
                exclude: /node_modules/,
                use: [ // use 'use' to apply multiple loaders
                    { 
                        loader: "style-loader" // runs last
                    }, 
                    {
                        loader: "css-loader", // runs before style-loader
                        options: {
                            importLoaders: 1, // for postcss-loader running first
                            modules: true, // enables CSS modules
                            localIdentName: '[name]__[local]__[hash:base64:5]' // define unique generated name for CSS classes
                        }
                    },
                    {
                        loader: "postcss-loader", // runs before css-loader (bottom to top)
                        options: {
                            ident: "postcss",
                            plugins: () => {
                                autoprefixer({
                                    browsers: [
                                        ">1%",
                                        "last 2 versions"
                                    ]
                                })
                            }
                        }
                    }
                ]
            }
        ]
    },
};