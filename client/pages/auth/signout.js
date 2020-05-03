import { useEffect } from 'react';
import Router from 'next/router';
import { SIGNOUT_API_PATH } from '../../constants';
import useRequest from '../../hooks/use-request';

export default () => {
    const { doRequest, errors } = useRequest({
        url: SIGNOUT_API_PATH,
        method: 'post',
        body: {},
        onSuccess: (data) => Router.push('/')
    });

    useEffect(() => {
        doRequest()
    }, []);

    return <div>Signing you out...</div>;
}