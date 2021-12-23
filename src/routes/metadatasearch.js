import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router"

const MetadataSearch = props => {

    let navigate = useNavigate();
    let MetadataTitle = ""
    const location = useLocation();

    if (location.pathname === "/metadatasearch") {
        document.title = "Asclepias: Metadata Search"
        MetadataTitle = <h1 className="mt-3">Metadata Search</h1>

    }

    const [inputMetadataSearch, setInputMetadataSearch] = useState({
        startPubYear: "",
        endPubYear: "",
        keywords: "",
        pubName: "",
        otherSearchTerms: "",
        errors: [],
    })

    const onChange = e => {
        setInputMetadataSearch({
            ...inputMetadataSearch,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        let data = {}

        if ((inputMetadataSearch.startPubYear.toString() !== "") || (inputMetadataSearch.endPubYear.toString() !== "")) {
            data["publication_year"] = (inputMetadataSearch.startPubYear.toString() + "--" + inputMetadataSearch.endPubYear.toString())
        }

        if (inputMetadataSearch.keywords.trim() !== "") {
            data["keyword"] = inputMetadataSearch.keywords.trim()
        }

        if (inputMetadataSearch.pubName.trim() !== "") {
            data["journal"] = inputMetadataSearch.pubName.trim()
        }

        if (inputMetadataSearch.otherSearchTerms.trim() !== "") {
            data["q"] = inputMetadataSearch.otherSearchTerms.trim()
        }


        let urlEncoded = new URLSearchParams(data)

        if (validate(data)) {
            navigate(`/metadata?${urlEncoded}`)
        }
        else {
            alert("Error: You must use at least one search term")
        }

    }

    const validate = (data) => {
        let validityStatus = true
        if (Object.entries(data).length === 0) {
            validityStatus = false
        }

        return validityStatus
    }

    return (

        <div className="container">
            {MetadataTitle}
            <p>Find software based on the Metadata of Papers that Cite It</p>


            <form onSubmit={handleSubmit} className="form-container">
                <div className="mb-3">
                    <label htmlFor="keyword-text" className="form-label">Citing Paper Keywords</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type/Paste Keywords Here"
                        id="keyword-text"
                        onChange={onChange}
                        value={inputMetadataSearch.keywords}
                        name="keywords"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pubName-text" className="form-label">Citing Paper Publication Name (e.g., ApJ, MNRAS)</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type/Paste Publication/Journal Names here"
                        id="pubName-text"
                        onChange={onChange}
                        value={inputMetadataSearch.pubName}
                        name="pubName"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="startPubYear-number" className="form-label">Citing Publication Year</label>
                    <div className="row g-2">
                        <div className="col-auto">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Start Year"
                                id="startPubYear-number"
                                onChange={onChange}
                                value={inputMetadataSearch.startPubYear}
                                name="startPubYear"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="End Year"
                                id="endPubYear-number"
                                onChange={onChange}
                                value={inputMetadataSearch.endPubYear}
                                name="endPubYear"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="otherSearchTerms-text" className="form-label">Other Search Terms</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type/Paste Other Search Terms here"
                        id="otherSearchTerms-text"
                        onChange={onChange}
                        value={inputMetadataSearch.otherSearchTerms}
                        name="otherSearchTerms"
                    />
                </div>

                <div className="mb-3">
                    <input type="submit" value="Search" className="btn btn-primary" />
                </div>
            </form>


        </div>


    )

}

export default MetadataSearch