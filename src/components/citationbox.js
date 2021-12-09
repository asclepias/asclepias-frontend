import React from "react"
import CitationItem from "./citationitem"

const CitationBox = props => {

    var metadataFilterFlag = false
    var searchHumanReadable = ""

    if (props.metadataFilter !== "") {
        metadataFilterFlag = true
        const query = new URLSearchParams(props.metadataFilter)

        Object.keys(props.brokerSearchParams).forEach(paramName => {
            if (query.has(paramName)) { 
                var paramValue = query.get(paramName)
                if (paramName === "publication_year") {
                    paramValue = paramValue.replace("--", " to ")
                } 
                searchHumanReadable += (props.brokerSearchParams[paramName] + ": " + paramValue + "; ")
            }
        })
    }

    const citationHits = props.entryInfo.citedJSON.hits.hits
    const citationTotalHits = props.entryInfo.numCitedHits
    const citationNumHits = citationHits.length
    const citationPageUrl = new URLSearchParams(props.entryInfo.citedJSON.links.self)
    const citationPageNum = Number.parseInt(citationPageUrl.get("page"))
    const citationNumItemsPerPage = Number.parseInt(citationPageUrl.get("size"))
    const citationStartHitNum = (citationPageNum - 1) * citationNumItemsPerPage + 1
    const citationEndHitNum = citationStartHitNum + citationNumHits - 1
    const citationTotNumPages = Math.ceil(citationTotalHits/citationNumItemsPerPage)
    var res = [...Array(citationTotNumPages)].map((_, i) => i)

    if (res.length > 10) {
        if (citationPageNum < 5) { res = res.filter( (x) => ( x < 10))}
        else if ( (citationTotNumPages - citationPageNum) < 5 ) {
            res = res.filter((x) => ( x > (citationTotNumPages - 11))) 
        } else {
            res = res.filter((x) => (( x > (citationPageNum - 6) ) && ( x < (citationPageNum + 4) ) ))
        }

    }

    const pageNavBar = () => {
        return(
            <nav aria-label="Citation Page Navigation">
            <ul className="pagination justify-content-center mt-3">
                <li className={`page-item ${ (citationPageNum === 1) ? "disabled" : ""}`} key="page-prev"> 
                    <button className="page-link" aria-label="Previous" value={citationPageNum-1}
                    onClick={(e) => props.updateBrokerCitationProperty("page", citationPageNum-1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {
                    res.map((pageIndex) => (
                        <li key={"page" + pageIndex} className={`page-item ${((pageIndex + 1) === citationPageNum) ? "active" : ""} `}>
                            <button value={pageIndex+1} className="page-link" onClick={(e) => props.updateBrokerCitationProperty("page", e.target.value)}>{pageIndex+1}</button></li>
                        )
                    )
                }

                <li className={`page-item ${ (citationPageNum === citationTotNumPages) ? "disabled" : ""}`} key="page-next">
                    <button className="page-link" aria-label="Next" value={citationPageNum+1} 
                    onClick={(e) => props.updateBrokerCitationProperty("page", citationPageNum+1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
        )
    }

    return (
        <div className="container px-0" id="citationList">
            <div className="container d-flex mt-3 mb-2 justify-content-between align-items-end">
                <div className="h4 mb-0"> {{metadataFilterFlag} && "Filtered"} Citations </div>
                { {metadataFilterFlag} && 
                (<span className="badge rounded-pill bg-primary">{searchHumanReadable}</span>) }

                <div> Items {citationStartHitNum} - {citationEndHitNum} of {citationTotalHits}</div>
            </div>
            <ol className="list-group">
            {citationHits.map((citation) => <CitationItem citationItem={citation} key={citation.id}/>)}
            </ol>
            {pageNavBar()}
        </div>
    )


}

export default CitationBox