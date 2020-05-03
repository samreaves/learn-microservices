import Link from 'next/link';
import { SIGNUP_FE_PATH, SIGNIN_FE_PATH, SIGNOUT_FE_PATH } from '../constants';

const Header = ({ currentUser }) => {

    const links = [
        !currentUser && { label: 'Sign Up', href: SIGNUP_FE_PATH },
        !currentUser && { label: 'Sign In', href: SIGNIN_FE_PATH },
        currentUser && { label: 'Sign Out', href: SIGNOUT_FE_PATH }
    ].filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return <li key={href} className="nav-link" ><Link href={href}><a>{label}</a></Link></li>
    });
    
    return <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand">GetTix</a>
        </Link>

        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
                {links}
            </ul>
        </div>
    </nav>
}

export { Header };