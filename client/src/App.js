import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.scss'
import Characters from './components/Characters.js'
import SingleCharacter from './components/SingleCharacter.js'
import TierList from './components/TierList'
import CreateCharacter from './components/CreateCharacter'

import CreateTier from './components/CreateTier.js'

function App() {
  return (
    <div className="App">

      <Router>
        <navbar className='navbar'>
          <div className='logo'>
            <img className='logo-img' src='/img/meleehell.png' alt='' />
          </div>
          <nav>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/all-characters'>All Characters</Link>
          </nav>
        </navbar>
        <div className='content'>
          <div className='spacer'></div>
        <Switch>
          <Route exact path="/">
            <TierList />
          </Route>
          <Route exact path="/all-characters" component={Characters} />
          <Route exact path="/character/:characterId" component={SingleCharacter} />
          <Route exact path="/create-tier" component={CreateTier} />
          <Route exact path="/create-character" component={CreateCharacter}/>

        </Switch>
        </div>
        
        <div className='footer'>
          <div className='bottom-nav'>
            <a className='bottom-nav-link' href=''>Git Hub</a>
          </div>
        </div>

      </Router>
    </div>

  );
}

export default App;
