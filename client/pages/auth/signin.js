import { useState } from 'react';
import Router from 'next/router';
import { SIGNIN_API_PATH } from '../../constants';
import useRequest from '../../hooks/use-request';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: SIGNIN_API_PATH,
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: (data) => Router.push('/')
    });
    
    const onSubmit = async (event) => {
        event.preventDefault();
    
        doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label htmlFor="email-address-input">Email Address</label>
                <input id="email-address-input"
                       className="form-control"
                       type="email"
                       value={email}
                       onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="pw-input">Password</label>
                <input id="pw-input"
                       className="form-control"
                       type="password"
                       value={password}
                       onChange={event => setPassword(event.target.value)}
                />
            </div>
            
            {errors && errors.length > 0 && (<div className="alert alert-danger">
                <ul className="my-0">
                    {errors.map(error => (
                        <li key={error.message}>{error.message}</li>
                    ))}
                </ul>
            </div>)}
            
            <button className="btn btn-primary"
                    type="submit">Sign In</button>
        </form>
    )
}