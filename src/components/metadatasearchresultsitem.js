import React from "react";
import { Link, useLocation } from "react-router-dom";

const idButtonStyle = {
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis" 
}

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const MetadataSearchResultsItem = props => {

    const primaryIdentifier = props.resultItem.Identifier[0]
    const linkToEntry = `/entry?identifier=${primaryIdentifier.ID}&identifiertype=${primaryIdentifier.IDScheme}`
    const linkToEntryMetadataFilter = linkToEntry+"&"+useQuery().toString()

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start flex-wrap flex-md-nowrap" key={props.resultItem.Title + "key"}>
        <div className="mx-2" id={props.resultItem.Title + "body"}>
            <div className="fw-bold fs-5"><Link to={linkToEntry}>{props.resultItem.Title}</Link></div>

            <div className="">
                <ul className="list-inline text-muted">
                    {   props.resultItem.Creator !== undefined &&
                        props.resultItem.Creator.map((author) => (
                            <li className="list-inline-item" key={author.Name}>{author.Name}; </li>
                        ))
                    }
                </ul>
            </div>

            <div className="d-grid gap-2 d-md-block my-3">
                {
                    props.resultItem.Identifier.map((resultId) => (
                        <a className="btn btn-primary btn-sm me-2 mb-1" 
                        href={resultId.IDURL} 
                        key={resultId.IDScheme.toUpperCase() + resultId.ID}
                        style={idButtonStyle}>
                            {resultId.IDScheme.toUpperCase()}: {resultId.ID}
                        </a>
                    ))
                }
            </div>

        </div>
        <Link to={linkToEntryMetadataFilter}>
            <span className="badge rounded-pill bg-success">{props.docCount} Relevant Citations</span>
        </Link>

    </li>
    )
}

export default MetadataSearchResultsItem