import './App.css';
import React, {useState} from 'react'
import Explore from './components/Explore'
import Library from './components/Library'
import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';

function App() {

  return (
    <main>
      <Navbar/>
      <Switch>
          <Route path="/" component={()=><Explore/>} exact/>
          <Route path="/library" component={()=><Library/>} />
          <Route component={Error} />
      </Switch>
    </main>
  );
}
export default App;
