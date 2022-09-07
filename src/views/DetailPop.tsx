import { useEffect, useState } from "react";
import { Stocks  } from "./StockBoard";

const DetailPop = ({setShowDetail, detailStock} : {setShowDetail : Function, detailStock : String}) => {

    // type Stocks = {
    //     itmsNm: string,
    //     trPrc: string,
    //     trqu: string,
    //     price: string,
    //     fltRt: string,
    //     mrktTotAmt: string,
    //     srtnCd : string,
    // }

    const serviceKey = 'BwCTkUa396a0utQN0pACjyNZZg0sBM9crfzmXn3VXbqyb99aR5ESFVdKPJir2bGxQ9BG5dIa9WZCUqZ3Ts6NUg%3D%3D';
    // const [detailStockChart, setDetailStockChart] : [Array<Stocks>, Function] = useState([]);


                                                        // 같은 말인데, 
//                                                         Stocks[] - empty array 가능
                                                        // [Stocks] - empty array 불가능

    const [detailStockChart, setDetailStockChart] =  useState<Stocks[]>([])






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
            const data = await response.json()
            const detailStocks = await data.response.body.items
            setDetailStockChart(detailStocks.item);

            


        }
    
        bringPastData(detailStock);
    },[])
    

    
    function drawGraph(){

            // DOMElement 선택할 때 UseRef 사용 가능 https://react.vlpt.us/basic/10-useRef.html


        const canvas = document.getElementById('price-change') as HTMLCanvasElement;
        const ctx = canvas && canvas.getContext('2d')

        if(detailStockChart.length !== 0 && ctx){
            let priceArr : Array<number> = []
            let maxPrice : number;
            let minPrice : number;
    
            detailStockChart.forEach(item => {
                priceArr.push(Math.round(Number(item.trPrc) / Number(item.trqu)))
            })
    
            maxPrice = Math.max(...priceArr)
            minPrice = Math.min(...priceArr)

            const canvasWrap = document.querySelector('.canvas-wrap') as HTMLElement;
            canvas.width = canvasWrap?.clientWidth;
            canvas.height = canvasWrap?.clientHeight;
            const width = canvas.width;
            const height = canvas.height;
            const floor = 30;
            const maxVal = maxPrice - minPrice;
            let i = 0;

            for (const stock of detailStockChart){
                const value = ((Math.round(Number(stock.trPrc) / Number(stock.trqu))  - minPrice) / (maxVal)) * height;
                const valueWidth = width / detailStockChart.length;
                ctx.fillStyle = "white";
                ctx.fillRect(valueWidth * i, height - value - floor, valueWidth, value + floor);
                i++;
            }



            window.addEventListener('resize',()=>{
                    drawGraph();
            })

    
            
    
        }

    }
    console.log(detailStockChart)
    

    drawGraph();


    return (
        <>
            <div className="pop-wrapper">
                <div className="pop-inner">
                    <div className="pop-content">
                        <div className="close-btn" onClick={()=>{setShowDetail(false)}}>X</div>
                        <div className="title">가격 변동</div>

                        <div className="canvas-wrap">

                            <p>최대가격 : <span id="max-price"></span></p>
                            <canvas id="price-change">
                            </canvas>
                            <p>최소가격 : <span id="min-price"></span></p>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPop;