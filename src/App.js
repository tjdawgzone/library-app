import './App.css';
import React, {useState} from 'react'
import Explore from './components/Explore'
import Library from './components/Library'
import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import LibraryProvider from './contexts/libraryContext.js'
import ResultsProvider from './contexts/resultsContext'
import Home from './components/Home'


function App() {
  return (
    <main>
      <Navbar/>
      <ResultsProvider>
      <LibraryProvider>
      <Switch>
          <Route path="/" component={()=><Home/>} exact/>
          <Route path="/explore" component={()=><Explore/>} />
          <Route path="/library" component={()=><Library/>} />
          <Route component={Error} />
      </Switch>
      </LibraryProvider>
      </ResultsProvider>
    </main>
  );
}
export default App;
