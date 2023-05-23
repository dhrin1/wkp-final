import '../styles/globals.css'
import Layout from '../components/layouts/Layout'
import { DataProvider } from '../store/GlobalState'

function MyApp({ Component, pageProps }) {

  const Wrapper = Component.Wrapper || EmptyLayout

  return (
    <>
       <DataProvider>
        <Layout>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </Layout>
      </DataProvider>
    </>
   
    
  ) 
}

export default MyApp

const EmptyLayout = ({ children }) => <>{children}</>;
