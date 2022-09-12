/**
 * 주식 가격을 불러와서 보여주는 곳.
 * 주식 data를 받아 와야 함. (어디에서 받아올 겨?)
 * 
 */

import { SetStateAction, useEffect, useState, Dispatch}  from "react";
import React from 'react'
import { Stock } from "../vendor/Stock";
import DetailPop from "./DetailPop";
import Loading from './Loading';
import StockDetail from "./StockDetail";


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
    srtnCd: string,

}


function StockBoard({setLoaded, loaded} : {setLoaded : Function, loaded : boolean}) {

    console.log('엄마 리렌더링')

    const [stockInfo, setStockInfo] = useState<Stocks[]>([]);
    const today: string = '20220907'
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [showDetail, setShowDetail] = useState<Boolean>(false);
    const [detailStock, setDetailStock] = useState<String>('')

    useEffect(() => {
        // if(loaded) return;
            setIsLoading(true)
            Stock('json', '20', today).then(stocks => { setStockInfo(stocks.item); 
                setIsLoading(false)
            });

            return () => {
                setLoaded(true)
                console.log('destroy')
            }
    }, [])


    return (
        <>
            {isLoading && <Loading></Loading>}
            {showDetail &&  <DetailPop setShowDetail={setShowDetail} detailStock={detailStock}></DetailPop>}
            <ul className="stock-array">
                {stockInfo.length > 0 && stockInfo.map(stock => {
                    return (
                        <StockDetail stock={stock} setShowDetail={setShowDetail} setDetailStock={setDetailStock}></StockDetail>
                    )
                })}
            </ul>
        </>
    )

}


export default React.memo(StockBoard) ;