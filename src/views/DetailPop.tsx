import { useEffect, useState, useRef } from "react";
import { Stocks } from "./StockBoard";


const DetailPop = ({ setShowDetail, detailStock }: { setShowDetail: Function, detailStock: String }) => {

    const maxPriceP = useRef<HTMLParagraphElement>(null);
    const minPriceP = useRef<HTMLParagraphElement>(null);

    const serviceKey = 'BwCTkUa396a0utQN0pACjyNZZg0sBM9crfzmXn3VXbqyb99aR5ESFVdKPJir2bGxQ9BG5dIa9WZCUqZ3Ts6NUg%3D%3D';

    // const [detailStockChart, setDetailStockChart] : [Array<Stocks>, Function] = useState([]);
    // 같은 말인데, 
    //  Stocks[] - empty array 가능
    // [Stocks] - empty array 불가능

    const [detailStockChart, setDetailStockChart] = useState<Stocks[]>([])


    useEffect(() => {
        bringPastData(detailStock);
    }, [])

    async function bringPastData(detailStock: String) {
        const querySet: { [key: string]: any } = {
            resultType: 'json',
            numOfRows: 32,
            beginBasDt: '20220812',
            endBasDt: '20220913',
            likeSrtnCd: detailStock
        }
        let queryList: string[] = [''];
        Object.keys(querySet).forEach(query => {
            const queryDatum = `${query}=${querySet[query]}`;
            queryList.push(queryDatum);
        })
        const queryData = queryList.join('&');
        const response = await fetch(`https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${serviceKey}${queryData}`);
        const data = await response.json()
        const detailStocks = await data.response.body.items
        setDetailStockChart(detailStocks.item);
    }

    function drawGraph() {

        // DOMElement 선택할 때 UseRef 사용 가능 https://react.vlpt.us/basic/10-useRef.html


        const canvas = document.getElementById('price-change') as HTMLCanvasElement;
        const ctx = canvas && canvas.getContext('2d')

        if (detailStockChart.length !== 0 && ctx) {
            let priceArr: Array<number> = []
            let maxPrice: number;
            let minPrice: number;

            detailStockChart.forEach(item => {
                priceArr.push(Math.round(Number(item.trPrc) / Number(item.trqu)))
            })

            maxPrice = Math.max(...priceArr)
            minPrice = Math.min(...priceArr)

            console.log(priceArr)

            const canvasWrap = document.querySelector('.canvas-wrap') as HTMLElement;
            canvas.width = canvasWrap?.clientWidth;
            canvas.height = canvasWrap?.clientHeight;
            const width = canvas.width;
            const height = canvas.height;
            const floor = 0;
            const maxVal = maxPrice - minPrice;
            let i = 0;

            let pathArr: Array<{ x: number, y: number }> = [];

            for (const stock of detailStockChart) {
                const value = ((Math.round(Number(stock.trPrc) / Number(stock.trqu)) - minPrice) / (maxVal)) * height;
                const valueWidth = width / detailStockChart.length;
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(valueWidth * i, height - value - floor, valueWidth, value + floor);

                ctx.beginPath();
                const path =
                {
                    x: valueWidth * i,
                    y: height - value - floor
                }


                pathArr.push(path)
                i++;

            }

            pathArr.forEach((pos, index) => {
                if (index >= pathArr.length - 1) return;
                const toIndex = index + 1

                ctx.lineWidth = 4;
                ctx.strokeStyle = 'red'


                setTimeout(() => {
                    drawAnimate(pathArr, index, ctx)
                }, 150 * index)


                ctx.arc(pathArr[toIndex].x, pathArr[toIndex].y, 2, 0, 2 * Math.PI)

            })




            if (maxPriceP.current !== null) {
                maxPriceP.current.textContent = maxPrice.toString();
            }
            if (minPriceP.current !== null) {
                minPriceP.current.textContent = minPrice.toString();
            }
        }
    }


    function drawAnimate(pathArr: Array<{ x: number, y: number }>, index: number, ctx: CanvasRenderingContext2D) {

        const xDiffer = (pathArr[(index + 1)].x - pathArr[index].x) / 150;
        const yDiffer = (pathArr[(index + 1)].y - pathArr[index].y) / 150;

        for (let j = 0; j < 150; j++) {
            setTimeout(() => {
                ctx.beginPath();
                ctx.moveTo(pathArr[index].x + (xDiffer * j), pathArr[index].y + (yDiffer * j));
                ctx.lineTo(pathArr[index].x + (xDiffer * j + 1), pathArr[index].y + (yDiffer * j + 1));
                ctx.stroke();
            }, 1 * j);
        }
    }


    drawGraph();


    window.addEventListener('resize', () => {
        drawGraph();
    })

    return (
        <>
            <div className="pop-wrapper">
                <div className="pop-inner">
                    <div className="pop-content">
                        <div className="close-btn" onClick={() => { setShowDetail(false) }}>X</div>
                        <div className="title">가격 변동</div>

                        <div className="price-range">최대가격 : <span ref={maxPriceP} id="max-price"></span></div>
                        <div className="canvas-wrap">

                            <canvas id="price-change">
                            </canvas>

                        </div>
                        <div className="price-range">최소가격 : <span ref={minPriceP} id="min-price"></span></div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPop;