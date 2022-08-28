/**
 * 
 * @param numOfResult 
 * @param beginBasDt 
 * @param endBasDt 
 * @param dataKey 
 * ServiceKey  : 서비스에 필요한 키   BwCTkUa396a0utQN0pACjyNZZg0sBM9crfzmXn3VXbqyb99aR5ESFVdKPJir2bGxQ9BG5dIa9WZCUqZ3Ts6NUg%3D%3D
 * numOfResult : 가져올 검색 값 갯수
 * resultType : json
 * beginBasDt : 검색을 시작할 날짜
 * mrktCls : KOSPI, KOSDAK 구분
 * beginTrqu : 거래량 최소값.
 */

 const serviceKey = 'BwCTkUa396a0utQN0pACjyNZZg0sBM9crfzmXn3VXbqyb99aR5ESFVdKPJir2bGxQ9BG5dIa9WZCUqZ3Ts6NUg%3D%3D'


async function Stock( resultType : string, numOfRows : string = '1000', beginBasDt : string = '20220801'){



    const querySet : {[key : string] : any} = {
        resultType,
        numOfRows,
        beginBasDt ,
    }

    let queryList : string[] = [''];
    Object.keys(querySet).forEach(query=> {
        // console.log(query)
        // console.log(querySet[query])
        const queryDatum = `${query}=${querySet[query]}`;
        queryList.push(queryDatum);
    })

    const queryData = queryList.join('&');
    // console.log(queryData)

    // API 신청 부분
     const response = await fetch(`https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${serviceKey}${queryData}`);
     const data = await response.json()
     const stocks = await data.response.body.items

    console.log(stocks)
    return stocks;
}

async function DetailStock(detailStock : String) {

    const today : String = '20220826';   // 추후 new date 로 생성해야 함.
    const fromDay : String = `${Number(today) - 1}`;
    console.log(fromDay)
    const response = await fetch(`https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${serviceKey}`);
}

export {Stock, DetailStock};

