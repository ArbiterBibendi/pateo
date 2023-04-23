import { Route, Routes } from 'react-router-dom'
import PatentListing from './PatentListing'
import NotFound from './NotFound'
import './App.css'

import Home from './Home'

function App() {

  return (
    <>
    <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/search/' Component={PatentListing}/>
      <Route path='*' Component={NotFound} />
    </Routes>
    </>
  )
}

export default App