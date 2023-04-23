import { Link } from "react-router-dom";
import NavSearchBar from "./NavSearchBar";
import pateoSVG from '/src/assets/pateo.svg'

function NavBar() {
    return (
        <>
            <nav>
                <Link className="bannerLink" to='/'>
                    <img className='banner' src={pateoSVG} />
                </Link>
                <NavSearchBar id='navSearch' />
            </nav>
        </>
    );
}

export default NavBar;