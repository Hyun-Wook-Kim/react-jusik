import { Stocks } from "../views/StockBoard";
import React from 'react'




const StockDetail = (stock : {stock : Stocks, setShowDetail : Function, setDetailStock : Function})  => {

        console.log('자식 리렌더링')

    
    const {itmsNm, trPrc, trqu, fltRt, mrktTotAmt, srtnCd } = stock.stock;
    const {setShowDetail, setDetailStock} = stock;

    return (
        <li className="stock-item" key={itmsNm} onClick={() => { setShowDetail(true); setDetailStock(srtnCd) }}> <h2>{itmsNm}</h2>
        {Number(fltRt) >= 5.0 ? <span title="이전 가격 대비 5% 이상 성장한 주식입니다" className="positive"></span> : ''}
        {Number(fltRt) <= -5.0 ? <span title="이전 가격 대비 5% 이상 감소한 주식입니다" className="negative"></span> : ''}
            <ul className="stock-info-array">
                <li className="stock-info">거래대금 : {trPrc}</li>
                <li className="stock-info">거래량 : {trqu}</li>
                <li className="stock-info">주당  가격 : {Math.round(Number(trPrc) / Number(trqu))}</li>
                <li className="stock-info">등략률 : {fltRt}</li>
                <li className="stock-info">시가총액 : {mrktTotAmt}</li>
            </ul>
        </li>
    )

}

export default React.memo(StockDetail) 
// export default StockDetail