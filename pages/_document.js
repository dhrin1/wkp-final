import Document, {Html, Head, Main, NextScript} from 'next/document'


class MyDocument extends Document {
    render(){
        return(
            <Html lang='en'>
                <Head>
                    <script src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`}></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument

