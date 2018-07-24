import {} from "dotenv/config";
import webpack from "webpack";
import path from "path";

const LOADER_OPTIONS = {
  debug: true,
  minimize: true,
};
const BUILD_OPTIONS = {
  NODE_ENV: "development"
};
const ENV_SETTINGS = Object.assign({}, process.env, BUILD_OPTIONS);

const config = {
  devtool: "inline-source-map",
  mode: "development",
  entry: ["./src/app.tsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src")
  },
  plugins: [
    new webpack.EnvironmentPlugin(ENV_SETTINGS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin(LOADER_OPTIONS)
  ],
  module: {
    rules: [
      { test: /\.(ts|tsx)?$/, include: path.join(__dirname, "src"), loader: "ts-loader" },
      { test: /(\.css)$/, use: ["style-loader", "css-loader"] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.(woff|woff2)$/, loader: "url-loader", options: { limit: 5000 } },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader", options: { limit: 10000, mimetype: "application/octet-stream" } },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader", options: { limit: 10000, mimetype: "image/svg+xml"} }
    ]
  },
  externals: {
    // don't bundle the 'react' npm package with our bundle.js
    // but get it from a global 'React' variable
    'react': 'React'
  },
};

module.exports = config;
