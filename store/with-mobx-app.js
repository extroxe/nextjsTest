import {useStaticRendering} from 'mobx-react';

import PostStore from './PostStore';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

function initializeStore(userInfo) {
    return new PostStore(userInfo)
}

export default (Comp) => {
    class withReduxApp extends React.Component {
        constructor(props) {
            super(props)
            // getInitialProps创建了store 这里为什么又重新创建一次？
            // 因为服务端执行了getInitialProps之后 返回给客户端的是序列化后的字符串
            // redux里有很多方法 不适合序列化存储
            // 所以选择在getInitialProps返回initialReduxState初始的状态
            // 再在这里通过initialReduxState去创建一个完整的store
            this.reduxStore = initializeStore(props.initialMobxState)
        }

        render() {
            const { Component, pageProps, ...rest } = this.props
            return (
                <Comp
                    {...rest}
                    Component={Component}
                    pageProps={pageProps}
                    reduxStore={this.reduxStore}
                />
            )
        }
    }

    // 这个其实是_app.js的getInitialProps
    // 在服务端渲染和客户端路由跳转时会被执行
    // 所以非常适合做redux-store的初始化
    withReduxApp.getInitialProps = async (ctx) => {
        let reduxStore

        if (isServer) {
            const { ctx: { req } } = ctx
            const { session } = req
            if (session && session.userInfo) {
                reduxStore = initializeStore(session.userInfo)
            } else {
                reduxStore = initializeStore()
            }
        } else {
            reduxStore = initializeStore()
        }

        ctx.reduxStore = reduxStore

        let appProps = {}
        if (typeof Comp.getInitialProps === 'function') {
            appProps = await Comp.getInitialProps(ctx)
        }

        return {
            ...appProps,
            initialMobxState: reduxStore}
    }

    return withReduxApp
}