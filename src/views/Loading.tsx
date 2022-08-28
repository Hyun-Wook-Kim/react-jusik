/** 
 * 주식 가격을 불러올 때 까지 로딩창 띄워 놓기
 * 주식 가격이 다 불러와지면 destroy
 **/

import '../style/loading.scss'

function Loading(){



    return(
        <div className="lsp">
            <div className="dim"></div>
            <div className="loading"><h3>로딩중....</h3></div>
        </div>
    )

}

export default Loading;