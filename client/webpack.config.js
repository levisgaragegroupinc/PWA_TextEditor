const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "PWA Text Editor",
        short_name: "JATE",
        description: "Progressive web app text editor.",
        // select a background color #000000
        background_color: "#141C3A",
        // select a theme color #000000
        theme_color: "#141C3A",
        start_url: "/", // debate in class as to whether the dot in front of the slash is needed.
        publicPath: "/", // debate in class as to whether the dot in front of the slash is needed.
        icons: [
          {
            // fill in the name of the icon image file(s)
            src: path.resolve("src/images/logo.png"),
            // fill in the image sizes.
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"), // file name is src here instead of assets as in the mini project.
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // look for files that end in .css
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          // look for files that end in .js / but exclude node_modules
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
