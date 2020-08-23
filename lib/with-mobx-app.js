import React from "react"
import useStores from "../store/useStore"

export default (Comp) => {
    // const {testConsole} = useStores()
    // testConsole()
    const WithMobxApp = (props) => {
        const {Component, pageProps, ...rest} = props

        return (
            <Comp
                {...rest}
                Component={Component}
                pageProps={pageProps}
                // reduxStore={this.reduxStore}
            />
        )
    }

    return WithMobxApp
}

