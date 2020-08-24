import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return <Html>
            {/* <Head>
                <style>{`.test{color: red}`}</style>
            </Head>*/}
            <body className={"test"} style={{margin: 0}}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    }
}

export default MyDocument
