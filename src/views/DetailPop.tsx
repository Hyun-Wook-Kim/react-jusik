import { useEffect, useState } from "react";

const DetailPop = ({setShowDetail, detailStock} : {setShowDetail : Function, detailStock : String}) => {

    type Stocks = {
        itmsNm: string,
        trPrc: string,
        trqu: string,
        price: string,
        fltRt: string,
        mrktTotAmt: string,
        srtnCd : string,
    }

    const serviceKey = 'BwCTkUa396a0utQN0pACjyNZZg0sBM9crfzmXn3VXbqyb99aR5ESFVdKPJir2bGxQ9BG5dIa9WZCUqZ3Ts6NUg%3D%3D';
    const [detailStockChart, setDetailStockChart] : [Array<Stocks>, Function] = useState([])




    useEffect(()=>{
        async function bringPastData(detailStock : String){

            const querySet : {[key : string] : any} = {
                resultType : 'json',
                numOfRows : 32,
                beginBasDt : '20220701',
                endBasDt : '20220801',
                likeSrtnCd : detailStock
                
            }
    
            let queryList : string[] = [''];
            Object.keys(querySet).forEach(query=> {
                const queryDatum = `${query}=${querySet[query]}`;
                queryList.push(queryDatum);
            })
            const queryData = queryList.join('&');
    
            console.log(queryData)
    
            const response = await fetch(`https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${serviceKey}${queryData}`);
    
            console.log(`https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${serviceKey}${queryData}`)
    
            console.log('https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=BwCTkUa396a0utQN0pACjyNZZg0sBM9crfzmXn3VXbqyb99aR5ESFVdKPJir2bGxQ9BG5dIa9WZCUqZ3Ts6NUg%3D%3D&numOfRows=10&resultType=json&beginBasDt=20220724&endBasDt=20220801&likeSrtnCd=900110')
    
            // const response = await fetch('https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=BwCTkUa396a0utQN0pACjyNZZg0sBM9crfzmXn3VXbqyb99aR5ESFVdKPJir2bGxQ9BG5dIa9WZCUqZ3Ts6NUg%3D%3D&numOfRows=10&resultType=json&beginBasDt=20220724&endBasDt=20220801&likeSrtnCd=900110')
            const data = await response.json()
            const detailStocks = await data.response.body.items
            console.log(detailStocks.item)
    
            setDetailStockChart(detailStocks.item);

    
        }
    
        bringPastData(detailStock);
    },[])
    
    detailStockChart.map(item => {
        console.log(item)
    })

    


    return (
        <>
            <div className="pop-wrapper">
                <div className="pop-inner">
                    <div className="pop-content">
                        <div className="close-btn" onClick={()=>{setShowDetail(false)}}>X</div>
                        <div className="title">가격 변동</div>
                        <div className="desc">
                            {detailStockChart.map(item => {
                                return <li>{Math.round(Number(item.trPrc) / Number(item.trqu)) }</li>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPop;