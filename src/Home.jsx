import SearchBar from "./searchbar";
import { Link } from "react-router-dom";
import pateoSVG from '/src/assets/pateo.svg'
function Home() {
    return (
        <>
            <div className="home">
                <Link className='logoLink' to='/'>
                    <img className='logo' src={pateoSVG} />
                </Link>
                <SearchBar />
            </div>
            <footer>
                <p class='acknowledgement'>Powered by&nbsp;</p>
                <a class='acknowledgement' id='ackLink' target='_blank' href='https://www.patentsview.org/'>PatentsView</a>
            </footer>
        </>
    );
}

export default Home;