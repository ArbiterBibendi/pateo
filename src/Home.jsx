import SearchBar from "./searchbar";
import pateoSVG from '/src/assets/pateo.svg'
function Home() {
    return ( 
        <>
            <img id='logo' src={pateoSVG} />
            <SearchBar />
        </>
    );
}

export default Home;