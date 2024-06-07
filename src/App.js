import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  pageSize = 9;
  render() {
    return (
      <div>
        <Router>
            <Navbar/>
              <Routes>
                <Route exact path='/' element={<News pageSize={this.pageSize} country={"in"} category={"general"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/business' element={<News pageSize={this.pageSize} country={"in"} category={"business"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/entertainment' element={<News pageSize={this.pageSize} country={"in"} category={"entertainment"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/general' element={<News pageSize={this.pageSize} country={"in"} category={"general"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/health' element={<News pageSize={this.pageSize} country={"in"} category={"health"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/science' element={<News pageSize={this.pageSize} country={"in"} category={"science"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/sports' element={<News pageSize={this.pageSize} country={"in"} category={"sports"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/technology' element={<News pageSize={this.pageSize} country={"in"} category={"technology"}/>}/>
              </Routes>
        </Router>
        
      </div>
    )
  }
}

