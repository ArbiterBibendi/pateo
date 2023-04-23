import { Link } from "react-router-dom";
import NavSearchBar from "./NavSearchBar";

function NavBar() {
    return (
        <>
            <nav>
                <Link to='/'>
                    <img className='banner' src="/src/assets/pateo.svg" />
                </Link>
                <NavSearchBar id='navSearch' />
            </nav>
        </>
    );
}

export default NavBar;