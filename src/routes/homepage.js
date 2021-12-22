import React from "react";
import EntrySearch from "./entrysearch";
import MetadataSearch from "./metadatasearch";

const HomePage = props => {

    document.title = "Asclepias: Citing Software, Making Science"

    return (
        <div className="container">
            <div className="container gy-5 pt-5 pb-3">
                <div className="fs-1 mt-3 mb-2 px-5">
                    Asclepias connects <b>Astronomy </b>
                    to the <b>Software</b> that makes it happen.
                </div>
                <div className="fs-4 px-5 mt-3">
                    The Asclepias Project builds networks of citations between the astronomical academic literature
                    and software, helping you find the tools to push your research forward.
                </div>
            </div>

            <div className="d-flex px-3 mt-1 justify-content-evenly flex-wrap flex-md-nowrap">
                <div className="card p-0 flex-fill mx-3 bg-light mt-3">
                    <div className="card-header mb-3 fw-bold bg-primary text-white">Metadata Search</div>
                    <MetadataSearch />
                </div>
                <div className="card p-0 flex-fill mx-3 bg-light mt-3">
                    <div className="card-header mb-3 fw-bold bg-primary text-white">Entry Search</div>
                    <EntrySearch />
                </div>
            </div>
        </div>
    )
}

export default HomePage