import React, { Dispatch, useState } from 'react';
import './style/main.scss';
import StockBoard from './views/StockBoard';
import Home from './views/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './views/NavBar';

function App() {

 const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
        <div className="App section--lg">
        <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/stock-list' element={<StockBoard setLoaded={setLoaded} loaded={loaded}></StockBoard>}></Route>
          </Routes>

    </div>
    </BrowserRouter>

  );
}

export default App;
