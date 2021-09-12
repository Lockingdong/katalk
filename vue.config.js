const path = require("path");

const isProd = process.env.NODE_ENV === "production";

let webpackConfig;
if (isProd) {
    webpackConfig = {
        // pages: {
        //     main: {
        //         entry: "src/main.js",
        //         template: "src/templates/main.ejs",
        //         filename: path.resolve(
        //             __dirname,
        //             "../views/components/vPage/main.blade.php"
        //         ),
        //         inject: false,
        //         minify: false
        //     }
        // },

        indexPath: path.resolve(
            __dirname,
            "./views/index.ejs"
        )
    };
} else {
    webpackConfig = {
    };
}

module.exports = {
    ...webpackConfig,
};
