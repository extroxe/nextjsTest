const Koa = require("koa")
const Router = require("koa-router")
const next = require("next")
const session = require("koa-session")
const Redis = require("ioredis")
const auth = require("./server/auth")

const RedisSessionStore = require("./server/session-store")

const dev = process.env.NODE_ENV !== "production"
const app = next({dev})
const handle = app.getRequestHandler()
const PORT = "3000"
const redis = new Redis()
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    server.keys = ['yt develop git']
    const SESSION_CONFIG = {
        key: "jid",
        store: new RedisSessionStore(redis)
    }
    server.use(session(SESSION_CONFIG, server))
    // 配置处理github oauth登录
    auth(server)
    server.use(async (ctx, next) => {
        await next()
        // ctx
    })

    router.get("/test", (ctx) => {
        ctx.body = {success: true}
        ctx.set("ContentType", "application/json")
    })

    router.get("/a/:id", async (ctx) => {
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: "/a",
            query: {id}
        })
        ctx.respond = false
    })

    router.get("/api/user/info", async (ctx) => {
        const user = ctx.session.userInfo
        if (!user) {
            ctx.status = 401
            ctx.body = "need Login"
        } else {
            ctx.body = user
            ctx.set("Content-Type", "application/json")
        }
    })

    router.get("/api/user/mommimi", async (ctx) => {
        ctx.body = {
            data: "sas",
            success: true
        }
        ctx.set("ContentType", "application/json")
    })

    server.use(router.routes())
    server.use(async (ctx, next) => {
            ctx.req.session = ctx.session
            await handle(ctx.req, ctx.res)
            ctx.respond = false
        }
    )

    server.listen(PORT, () => console.log(`http://localhost:${PORT}启动`))
})
