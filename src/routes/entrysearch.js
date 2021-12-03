import React, { useState } from "react"
import { useNavigate } from "react-router"

const EntrySearch = props => {

    let navigate = useNavigate();

    const [inputSearch, setInputSearch] = useState({
        searchidentifier: "",
        searchidentifiertype: "choose",
        errors: []
    })

    const onChange = e => {
        setInputSearch({
            ...inputSearch,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log({inputSearch})

        let data = {
            identifier: inputSearch.searchidentifier, 
            identifiertype: inputSearch.searchidentifiertype
        }

        let urlEncoded = new URLSearchParams(data)

        if (validate()){
            navigate(`/entry?${urlEncoded}`)
        }
        else {
            alert("Errors!")
        }

    }

    const validate = () => {
        let validityStatus = true
        if (inputSearch.searchidentifier.trim().length === 0 ){
            validityStatus = false
        }

        if (inputSearch.searchidentifiertype === "choose"){
            validityStatus = false
        }

        return validityStatus

    }

    return (
        <div className="container">
            <h1 className="mt-3">Software Entry Search</h1>
            <p>Find a Software Entry and its Citing Papers by it's DOI, ADS Identifier, Zenodo Identifier, or URL</p>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="mb-3">
                    <label htmlFor="identifier-text" className="form-label">Identifier</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Type/Paste Identifier Here"
                        id="identifier-text" 
                        onChange={onChange}
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
                    <input type="submit" value="Search"  className="btn btn-secondary" />
                </div>
            </form>

        </div>
    )

}

export default EntrySearch