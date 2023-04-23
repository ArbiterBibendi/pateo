import searchLogo from '/src/assets/simple-globe-search.svg'

function NavSearchBar() {

    return (
      <form id='navSearchForm' action='search' autoComplete='off'>
        <input 
          id='searchBar' 
          type="text"  
          name='q' 
          placeholder='Search For Patent'
        />
        <input 
          type='image' 
          id='searchButton' 
          src={searchLogo} 
          alt='Submit' 
        />
      </form>
    )
  }
  
  export default NavSearchBar