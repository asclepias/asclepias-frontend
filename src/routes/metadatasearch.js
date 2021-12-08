import React, { useState } from "react"
import { useNavigate } from "react-router"

const MetadataSearch = props => {

    let navigate = useNavigate();

    document.title = "Asclepias: Metadata Search"

    return (

        <div className="container">
        <h1 className="mt-3">Metadata Search</h1>
        <p>Find software based on the Metadata of Papers that Cite It</p>


    </div>

        
    )

}

export default MetadataSearch