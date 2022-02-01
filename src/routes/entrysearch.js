import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router"

const EntrySearch = props => {

    let navigate = useNavigate();
    let EntryTitle = ""
    const location = useLocation();

    let defaultPlaceholderText = "Type/Paste Identifier Here";

    if (location.pathname === "/entrysearch") {
        document.title = "Asclepias: Software Entry Search"
        EntryTitle = <h1 className="mt-3">Software Entry Search</h1>
    }


    const [inputSearch, setInputSearch] = useState({
        searchidentifier: "",
        searchidentifiertype: "choose",
        searchplaceholder: defaultPlaceholderText,
        errors: []
    })

    const onChange = e => {

        var newPlaceholderText = defaultPlaceholderText;

        if (e.target.name === "searchidentifiertype") {
            if (e.target.value === "doi") {
                newPlaceholderText =  "10.5281/zenodo.3588521"
            }
            if (e.target.value === "ads") {
                newPlaceholderText =  "2019zndo...3588521N"
            }
            if (e.target.value === "url") {
                newPlaceholderText =  "https://github.com/lmfit/lmfit-py/releases/tag/1.0.0"
            }
        } 

        setInputSearch({
            ...inputSearch,
            [e.target.name]: e.target.value,
            searchplaceholder: newPlaceholderText
        })


    }

    const changeTextToField = () => {
        if (inputSearch.searchidentifier === "") {
            setInputSearch({
                ...inputSearch,
                searchidentifier: inputSearch.searchplaceholder
            })
        }
    }

    const clickIdentifierField = (e) => {
        changeTextToField();
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log({ inputSearch })

        let data = {
            identifier: inputSearch.searchidentifier,
            identifiertype: inputSearch.searchidentifiertype
        }

        let urlEncoded = new URLSearchParams(data)

        if (validate()) {
            navigate(`/entry?${urlEncoded}`)
        }
        else {
            alert("Errors!")
        }

    }

    const validate = () => {
        let validityStatus = true
        if (inputSearch.searchidentifier.trim().length === 0) {
            validityStatus = false
        }

        if (inputSearch.searchidentifiertype === "choose") {
            validityStatus = false
        }

        return validityStatus

    }

    return (
        <div className="container">
            {EntryTitle}

            <p>Find a Software Entry and its Citing Papers by its:<br /> 
            <b>DOI</b> <i>(e.g. 10.5281/zenodo.3588521)</i>,<br />
            <b>ADS Identifier</b> <i>(e.g. 2019zndo...3588521N)</i>, or<br /> 
            <b>URL</b> <i>(e.g. <a href="https://github.com/lmfit/lmfit-py/releases/tag/1.0.0">https://github.com/lmfit/lmfit-py/releases/tag/1.0.0)</a></i></p>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="mb-3">
                    <label htmlFor="identifier-text" className="form-label">Identifier</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={inputSearch.searchplaceholder}
                        id="identifier-text"
                        onChange={onChange}
                        onFocus={clickIdentifierField}
                        value={inputSearch.searchidentifier}
                        name="searchidentifier"
                    />
                    <div className="invalid-feedback">Please Enter a Valid Identifier</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Item2" className="form-label">Identifier Type</label>
                    <select
                        className="form-select"
                        aria-label="Identifier Type"
                        value={inputSearch.searchidentifiertype}
                        onChange={onChange}
                        name="searchidentifiertype"
                    >
                        <option value="choose">Choose Identifier Type</option>
                        <option value="doi">DOI</option>
                        <option value="ads">ADS</option>
                        <option value="url">URL</option>
                    </select>
                    <div className="invalid-feedback">Choose the appropriate identifier type</div>
                </div>
                <div className="mb-3">
                    <input type="submit" value="Search" className="btn btn-primary" />
                </div>
            </form>

        </div>
    )

}

export default EntrySearch