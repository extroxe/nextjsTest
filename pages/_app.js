import React from 'react';
import App, {Container} from 'next/app';
import {Provider} from 'mobx-react';

import WithMobxApp from '../store/with-mobx-app';

class CustomApp extends App {
    static async getInitialProps(appContext) {
        const {Component} = appContext
        const pageProps = await Component.getInitialProps(appContext);
        // console.log("aaaaaaappProps", pageProps)

        return {
            pageProps,
        };
    }

    render() {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <Provider store={reduxStore}>
                <Container>
                    <Component {...pageProps}/>
                </Container>
            </Provider>
        );
    }
}

export default WithMobxApp(CustomApp);


/*
import { useLocalStore } from 'mobx-react-lite';
import {Provider} from "mobx-react";
import App from 'next/app';
import WithMobxApp from "../lib/with-mobx-app"

function MyApp(props) {
    const { Component, pageProps, lang } = props;
    const store = useLocalStore(() => ({
        rootStore: { lang }
    }));
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    // 服务端获取 lang 的值，通过 props 传递给 MyApp 组件
    const lang = appContext.ctx.req.query.lng;
    return { ...appProps, lang }
};

// export default MyApp
export default WithMobxApp(MyApp);*/
