import SearchBar from "./searchbar";
import { Link } from "react-router-dom";
import pateoSVG from '/src/assets/pateo.svg'
function Home() {
    return ( 
        <div className="home">
            <Link className='logoLink' to='/'>
                <img className='logo' src={pateoSVG} />
            </Link>
            <SearchBar />
        </div>
    );
}

export default Home;