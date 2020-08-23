const axios = require("axios")
const config = require("../config")

const {client_secret, client_id, request_token_url} = config.github

module.exports = (server) => {
    server.use(async (ctx, next) => {
        if (ctx.path === "/auth") {
            const code = ctx.query.code;
            if (!code) {
                ctx.body = "code not exist"
                return
            }

            const res = await axios({
                method: "post",
                url: request_token_url,
                data: {
                    client_id,
                    client_secret,
                    code
                },
                headers: {
                    Accept: "application/json"
                }
            })

            if (res.status === 200 && (res.data && !res.data.error)) {
                ctx.session.githubAuth = res.data
                const {access_token, token_type} = res.data
                const userInfoResp = await axios({
                    method: "get",
                    url: "https://api.github.com/user",
                    headers: {
                        "Authorization": `${token_type} ${access_token}`
                    }
                })

                ctx.session.userInfo = userInfoResp.data
                ctx.redirect('/')
            } else {
                const message = res.data && res.data.error
                ctx.body = "request token faild" + message
            }

        } else {
            await next()
        }
    })
}