import { CURRENT_USER_API_PATH } from '../constants';
import buildClient from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
    return currentUser 
        ? <h1>You are signed in.</h1>
        : <h1>You are not signed in.</h1>;
}

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get(CURRENT_USER_API_PATH);
    return data;
};

export default LandingPage;