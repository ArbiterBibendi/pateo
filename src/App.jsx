import { Route, Routes } from 'react-router-dom'
import PatentListings from './PatentListings'
import NotFound from './NotFound'
import './App.css'

import Home from './Home'

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/search/' Component={PatentListings} />
        <Route path='*' Component={NotFound} />
      </Routes>
    </>
  )
}

export default App