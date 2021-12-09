import React from "react"
import MetadataSearchResultsItem from "./metadatasearchresultsitem"

const MetadataSearchResultsBox = props => {

    const resultHits = props.resultInfo.hitsJSON.aggregations.Target.buckets
    const resultTotalHits = props.resultInfo.numHits
    const resultNumHits = resultHits.length
    const resultPageUrl = new URLSearchParams(props.resultInfo.hitsJSON.links.self)
    const resultPageNum = Number.parseInt(resultPageUrl.get("page"))
    const resultNumItemsPerPage = Number.parseInt(resultPageUrl.get("size"))
    const resultStartHitNum = (resultPageNum - 1) * resultNumItemsPerPage + 1
    const resultEndHitNum = resultStartHitNum + resultNumHits - 1
    const resultTotNumPages = Math.ceil(resultTotalHits/resultNumItemsPerPage)
    var res = [...Array(resultTotNumPages)].map((_, i) => i)

    if (res.length > 10) {
        if (resultPageNum < 5) { res = res.filter( (x) => ( x < 10))}
        else if ( (resultTotNumPages - resultPageNum) < 5 ) {
            res = res.filter((x) => ( x > (resultTotNumPages - 11))) 
        } else {
            res = res.filter((x) => (( x > (resultPageNum - 6) ) && ( x < (resultPageNum + 4) ) ))
        }

    }

    const pageNavBar = () => {
        return(
            <nav aria-label="Result Page Navigation">
            <ul className="pagination justify-content-center mt-3">
                <li className={`page-item ${ (resultPageNum === 1) ? "disabled" : ""}`} key="page-prev"> 
                    <button className="page-link" aria-label="Previous" value={resultPageNum-1}
                    onClick={(e) => props.updateBrokerSearchProperty("page", resultPageNum-1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {
                    res.map((pageIndex) => (
                        <li key={"page" + pageIndex} className={`page-item ${((pageIndex + 1) === resultPageNum) ? "active" : ""} `}>
                            <button value={pageIndex+1} className="page-link" onClick={(e) => props.updateBrokerSearchProperty("page", e.target.value)}>{pageIndex+1}</button></li>
                        )
                    )
                }

                <li className={`page-item ${ (resultPageNum === resultTotNumPages) ? "disabled" : ""}`} key="page-next">
                    <button className="page-link" aria-label="Next" value={resultPageNum+1} 
                    onClick={(e) => props.updateBrokerSearchProperty("page", resultPageNum+1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
        )
    }

    return (
        <div className="container px-0" id="resultList">
        <div className="container d-flex mt-3 mb-2 justify-content-between align-items-end">
            <div className="h4"> Results </div>
            <div> Items {resultStartHitNum} - {resultEndHitNum} of {resultTotalHits}</div>
        </div>
        <ol className="list-group">
        {resultHits.map((result) => <MetadataSearchResultsItem resultItem={result.first.hits.hits[0]._source.Target} docCount={result.doc_count} key={result.key}/>)}
        </ol>
        {pageNavBar()}
    </div>
    )
}

export default MetadataSearchResultsBox