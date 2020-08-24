import Link from "next/link"
import {Button} from "antd";
import Router, {withRouter} from "next/router";
import {observer} from "mobx-react-lite"
import MyContext from "../lib/my-context"
import getConfig from "next/config"
import React, {useEffect} from "react"
import useStores from "../store/useStore"
import PostStore from "../store/PostStore";
// import {observer, inject} from "mobx-react";
import {request} from "../lib/api"

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
const Home = ({userRepos, userInfo}) => {
    const {userInfo: userInfoStore} = useStores()
    console.log("userRepos", userRepos)
    return (
        <MyContext.Provider value={"contextTest"}>
            <div className="container">
                <header className={"header"}>
                    {userInfo && userInfo.login}
                    <a style={{float: "right"}} href={publicRuntimeConfig.OAUTH_URL}>登录</a>
                </header>

                <div className={"parent-box"}>
                    <img className={"avatar"} src={`${userInfo.avatar_url}`} alt=""/>
                    <div style={{width: 800, margin: "0 auto"}}>
                        {userRepos.map(item => <div style={{padding: "15px 0", borderBottom: "1px solid #eee"}}>
                            <h3><a style={{color: "#0366d6", fontSize: "20px"}}>{item.name}</a></h3>
                            <span style={{color: "#333", fontSize: "12px"}}>Full name:{item.full_name}</span>
                            <br/>
                            <span style={{color: "#333", fontSize: "14px"}}>
                                {item.description}
                            </span>
                            <div style={{marginTop: 15, fontSize: 12}}>
                                {item.language && <span style={{display: 'inline-block', marginRight: 15}}> <span style={{display: "inline-block", width: 12, height: 12, marginRight:4, background: item.language ==="Vue" ? "#586069" : "#f1e05a", borderRadius: "50%"}}></span>{item.language}</span>}
                                <span style={{display: 'inline-block'}}>{item.created_at}</span>
                            </div>
                        </div>)}
                    </div>
                </div>
                <style jsx>
                    {`
            .header {
             background: #24292e;
            color: #fff;
            padding: 10px 5px;
            }
            .parent-box{
                margin-top: 100px;
    border-top: 1px solid #e9e9e9;
            }
            .avatar{
            
                width: 150px;
    border-radius: 50%;
    margin: -75px auto 0;
    display: block;}
          `}
                </style>
            </div>
        </MyContext.Provider>
    )
}

Home.getInitialProps = async ({ctx, reduxStore}) => {
    const {userInfo} = reduxStore
    if (!userInfo || !userInfo.id) {
        return {
            userInfo,
            userRepos: []
        }
    }
    const {data: userRepos} = await request(
        {
            url: '/user/repos',
        },
        ctx.req,
        ctx.res,
    )
    return {
        userInfo: reduxStore.userInfo,
        userRepos
    }
}

export default observer(Home)
