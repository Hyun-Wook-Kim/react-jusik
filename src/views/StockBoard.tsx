/**
 * 주식 가격을 불러와서 보여주는 곳.
 * 주식 data를 받아 와야 함. (어디에서 받아올 겨?)
 * 
 */

import { useEffect, useState } from "react";
import {Stock}  from "../vendor/Stock";
import Loading from './Loading'


/**
 * itmsNm : 종목명
 * TrPrc : 거래대금
 * Trqu : 거래량
 * fltRt : 등락률
 * MrktToAmt : 시가총액
 */
export type Stocks = {
    itmsNm: string,
    trPrc: string,
    trqu: string,
    price: string,
    fltRt: string,
    mrktTotAmt: string,
    srtnCd : string,

}


function StockBoard( {setShowDetail, setDetailStock } : { setShowDetail : Function, setDetailStock : Function} ) {
    const [stockInfo, setStockInfo] = useState<Stocks[]>([]);
    const today: string = '20220821'
    const [isLoading, setIsLoading] = useState<Boolean>(true)


    useEffect(() => {
        setTimeout(() => {
            Stock('json', '50', today).then(stocks => { setStockInfo(stocks.item); setIsLoading(false) });
        }, 5000)
    }, [])

    // console.log(setShowDetail)

    return (
        
        <>
            { isLoading && <Loading></Loading> }
            
            {/* {stockInfo.length > 0 ? <h2>있음</h2> : <h2>없음</h2>} */}
            <ul className="stock-array">
                {stockInfo.length > 0 && stockInfo.map(stock => {
                    return (
                        <li className="stock-item" key={stock.itmsNm} onClick={ ()=>{setShowDetail(true); setDetailStock(stock.srtnCd)}}> <h1>{stock.itmsNm}</h1>
                            <ul className="stock-info-array">
                                <li className="stock-info">거래대금 : {stock.trPrc}</li>
                                <li className="stock-info">거래량 : {stock.trqu}</li>
                                <li className="stock-info">주당  가격 : {Math.round(Number(stock.trPrc) / Number(stock.trqu)) }</li>
                                <li className="stock-info">등략률 : {stock.fltRt}</li>
                                <li className="stock-info">시가총액 : {stock.mrktTotAmt}</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </>
    )

}


export default StockBoard;