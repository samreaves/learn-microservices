import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../components';
import buildClient from '../api/buildClient';
import { CURRENT_USER_API_PATH } from '../constants';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component { ...pageProps } />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get(CURRENT_USER_API_PATH);

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
        pageProps,
        ...data
    };
};

export default AppComponent;