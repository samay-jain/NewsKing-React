import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
            <Navbar/>

              <LoadingBar
              height={3}
              color='#f11946'
              progress={progress}
              />

              <Routes>
                <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"general"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"business"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"entertainment"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"general"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"health"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"science"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"sports"}/>}/>
              </Routes>
              <Routes>
                <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country={"in"} category={"technology"}/>}/>
              </Routes>
        </Router>
        
      </div>
    )
}
export default App;

