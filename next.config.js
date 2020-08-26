const withCss = require("@zeit/next-css")
const withSass = require("@zeit/next-sass")
const config = require("./config")
const configs = {
    // distDir: "dest",
    generateEtags: true,
    onDemandEntries: {
        maxInactiveAgs: 25 * 1000,
        pagesBufferLength: 2
    },
    pageExtensions: ['jsx', 'js', 'tsx'],
    generateBuildId: async () => {
        if (process.env) {

        }
        return null
    },
    webpack(config, options) {
        return config
    },
    webpackDevMiddleware: config => {
        return config
    },

    env:{
        customKey: "value",
    },

    serverRuntimeConfig:{
        mySecret:"secret",
        secondSecret: process.env.SECOND_SECRET,
    },

    publicRuntimeConfig: {
        staticFolder: "/static",
    }
}
if (typeof require !== "undefined") {
    require.extensions[".css"] = file = {}
}

const GITHUB_URL = "https://github.com/login/oauth/authorize"
module.exports = withSass(withCss({
    cssModules: true,
    publicRuntimeConfig: {
        GITHUB_URL,
        OAUTH_URL: `${GITHUB_URL}?client_id=${config.github.client_id}`,
    }
}))
