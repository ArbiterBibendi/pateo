import { useState } from 'react'
import searchLogo from '/src/assets/simple-globe-search.svg'

function SearchBar() {


  const [placeholder, setPlaceholder] = useState(getPlaceholderText());
  function updatePlaceholder(event){
    let placeholderText = getPlaceholderText(event);
    setPlaceholder(placeholderText);
  }
  function getPlaceholderText(event)
  {
    let placeholderText;
    switch (event?.target.id){
      case 'by-inventor':
        placeholderText = 'Search for Patent by Inventor (e.g., Trace Wayne Cody)'
        break;
      default:
        placeholderText = 'Search For Patent by Title (e.g., Robots)'
    }
    return placeholderText;
  }
  return (
    <form id='searchForm' action='./search' autoComplete='off'>
      <div id='searchBarAndButton'>
        <input
          id='searchBar'
          type="text"
          name='q'
          placeholder={placeholder}
        />
        <input type='hidden' name='p' value='1' />
        <input
          type='image'
          id='searchButton'
          src={searchLogo}
          alt='Submit'
        />
      </div>
      <div id='searchTypes' onChange={updatePlaceholder}>
        <input defaultChecked id='by-title' type='radio' className='searchTypeInput' name='searchby' value='title' />
        <label htmlFor='by-title' className='searchTypeLabel'>Search by Title</label>
        <input id='by-inventor' type='radio' className='searchTypeInput' name='searchby' value='inventor'/>
        <label htmlFor='by-inventor' className='searchTypeLabel'>Search by Inventor</label>
      </div>

    </form>
  )
}

export default SearchBar