import {withRouter} from "next/router"
import Router from "next/router";
// import moment from "moment";
import Title from "antd/lib/skeleton/Title";

const A = ({router, name, time}) => {
    const gotoHome = () => {
        Router.push("/")
    }
    return <>
        <span>{time}</span>
        <div onClick={gotoHome}>测试 ahome {name}</div></>
}

A.getInitialProps = async (ctx) => {
    const moment = await import("moment")
    return {
        name: "AName",
        time: moment.default(Date.now() - 60 * 1000).fromNow()
    }
}

export default withRouter(A)