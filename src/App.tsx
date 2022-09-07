import React, { useState } from 'react';
import './style/main.scss';
import StockBoard from './views/StockBoard';
import Loading from './views/Loading'
import DetailPop from './views/DetailPop';

function App() {




const [showDetail, setShowDetail] = useState<Boolean>(false);
const [detailStock, setDetailStock] = useState<String>('')



console.log(showDetail)

  return (
    <div className="App">
      <StockBoard setShowDetail={setShowDetail} setDetailStock={setDetailStock}></StockBoard>
      {showDetail && <DetailPop setShowDetail={setShowDetail} detailStock={detailStock}></DetailPop>}
    </div>
  );
}

export default App;
