import React from "react"
import { removeDuplicatesTwoProps } from "../helpers/apihelpers"

const SoftwareEntryDetails = props => {

    const entryMetadata = props.entryInfo.citedJSON.hits.hits[0].metadata.Target

    const authors = entryMetadata.Creator
    const keywords = entryMetadata.Keywords
    const pubDate = entryMetadata.PublicationDate
    const publisher = entryMetadata.Publisher
    const identifierData = entryMetadata.Identifier

    const uniqueIdentifierData = removeDuplicatesTwoProps(identifierData, "IDScheme", "ID")


    return (
        <div className="container">
            <div className="row">
                <h3 className="mt-2 mb-2 w-100">{entryMetadata.Title}</h3>
            </div>
            <div className="row">
                <div className="fs-5 pb-0">
                    <ul className="list-inline mb-3">
                        {
                            authors.map((author) => (
                                <li className="list-inline-item" key={author.Name}>{author.Name}; </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="container d-flex justify-content-between">

                {(entryMetadata.hasOwnProperty("PublicationDate")) &&                    
                    <div className="mb-2">
                        <h6 className="mb-0">Publication Date</h6>
                        {pubDate}
                    </div>
                }

                {(entryMetadata.hasOwnProperty("Keywords")) &&
                    <div className="mb-2">
                        <h6 className="mb-0">Keywords</h6>
                        <ul className="list-inline">
                            {
                                keywords.map((keyword) => (
                                    <li className="list-inline-item" key={keyword.Keyword}>{keyword.Keyword};</li>
                                ))
                            }
                        </ul>
                    </div>
                }

                {(entryMetadata.hasOwnProperty("Publisher")) &&
                    <div className="mb-2">
                        <h6 className="mb-0">Publisher</h6>
                        <ul className="list-inline">
                            {
                                publisher.map((publisher) => (
                                    <li className="list-inline-item" key={publisher.Name}>{publisher.Name}; </li>
                                ))
                            }
                        </ul>
                </div>
                }
            </div>
            <div className="d-flex justify-content-evenly flex-wrap">
                        {
                            uniqueIdentifierData.map((idInfo) => (
                                (idInfo.hasOwnProperty("IDURL")) && 
                                <a className="btn btn-outline-primary btn-sm my-2 mx-2" href={idInfo.IDURL} key={idInfo.ID}>{idInfo.IDScheme.toUpperCase()}: {idInfo.ID}</a>
                            ) )
                        }
            </div>

        </div>
    )

}

export default SoftwareEntryDetails