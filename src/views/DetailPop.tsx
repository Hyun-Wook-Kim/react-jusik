
const DetailPop = ({setShowDetail, detailStock} : {setShowDetail : Function, detailStock : String}) => {

    function bringPastData(detailStock : String) : void{
        
    }

    return (
        <>
            <div className="pop-wrapper">
                <div className="pop-inner">
                    <div className="pop-content">
                        <div className="close-btn" onClick={()=>{setShowDetail(false)}}>X</div>
                        <div className="title">제목</div>
                        <div className="desc">{detailStock}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPop;