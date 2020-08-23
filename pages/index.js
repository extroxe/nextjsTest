import Link from "next/link"
import {Button} from "antd";
import Router, {withRouter} from "next/router";
import MyContext from "../lib/my-context"
import getConfig from "next/config"
import React, {useEffect} from "react"
import useStores from "../store/useStore"
import PostStore from "../store/PostStore";
import {observer, inject} from "mobx-react";

const {publicRuntimeConfig} = getConfig()

/*@inject("store")
@observer
export default class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <MyContext.Provider value={"contextTest"}>
                <div className="container">
                    <Link href={"/a?id=2"} as={"/a/2"}>a</Link>
                    <br/>
                    <Link href={"/b"} as={"/b"}>b</Link>
                    <Button>Router</Button>
                    自定义document
                    <a href={publicRuntimeConfig.OAUTH_URL}>登录</a>
                </div>
            </MyContext.Provider>
        )
    }
}*/
const Home = ({userRepos}) => {
    return (
        <MyContext.Provider value={"contextTest"}>
            <div className="container">
                <Link href={"/a?id=2"} as={"/a/2"}>a</Link>
                <br/>
                <Link href={"/b"} as={"/b"}>b</Link>
                <Button>Router</Button>
                自定义document
                <a href={publicRuntimeConfig.OAUTH_URL}>登录{userRepos}</a>
            </div>
        </MyContext.Provider>
    )
}

Home.getInitialProps = async ({ctx, reduxStore}) => {
    // console.log("ctx.reqindex", ctx)
    console.log("ctx.reduxStore", reduxStore)
    return {
        userRepos: "userRepos"
    }
}

export default withRouter(Home)
