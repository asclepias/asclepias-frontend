import React from "react";

const CitationItem = props => {


    return (
        <li className="list-group-item" key={props.citationItem.id + "key"}>
            <div className="mx-2" id={props.citationItem.id + "body"}>
                <div className="fw-bold fs-5">{props.citationItem.metadata.Source.Title}</div>
                <div className="">
                    <ul className="list-inline text-muted">
                        {
                            props.citationItem.metadata.Source.Creator.map((author) => (
                                <li className="list-inline-item" key={author.Name}>{author.Name}; </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="d-flex justify-content-between mt-3">
                
                    <div className="col">
                        <div>{props.citationItem.metadata.Source.Publisher[0].Name}</div>
                    </div>
                    <div className="col">
                        <div>{props.citationItem.metadata.Source.PublicationDate}</div>
                    </div>
                
                </div>

                {(props.citationItem.metadata.Source.hasOwnProperty("Keywords")) &&
                    <div className="col mt-3">
                        <strong className="">Keywords</strong>
                        <ul className="list-inline">
                            {
                                props.citationItem.metadata.Source.Keywords.map((keyword) => (
                                    <li className="list-inline-item  fw-lighter" key={keyword.Keyword}>{keyword.Keyword}; </li>
                                ))
                            }
                        </ul>
                    </div>
                }

                <div className="d-grid gap-2 d-md-block my-3">
                    {
                        props.citationItem.metadata.Source.Identifier.map((citeId) => (
                            <a className="btn btn-primary btn-sm me-2" href={citeId.IDURL} key={citeId.IDScheme.toUpperCase() + citeId.ID}>{citeId.IDScheme.toUpperCase()}: {citeId.ID}</a>
                        ))
                    }
                </div>

            </div>

        </li>

    )
}

export default CitationItem