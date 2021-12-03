import React, { useState } from "react";
import { useLocation } from "react-router";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SoftwareEntry = props => {

    const [entryInfo, setEntryInfo] = useState({responseJSON: {}})

    const query = useQuery()
    const identifier = query.get("identifier")
    const identifiertype = query.get("identifiertype")

    const checkNoParams = () => {
        let noParams = true

        if (query.has("identifier") &  query.has("identifiertype")) {
            noParams = false
        }

        return noParams
    }

    const getBrokerData = () => {
        fetch(
            `https://asclepias-broker-node.eastus.cloudapp.azure.com/relationships?id=${identifier}&scheme=${identifiertype}&relation=isCitedBy`, 
            {
                "method": "GET",
                "headers": {
                    "accept": "application/json"
                }
            }
        )
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .then(result => setEntryInfo({responseJSON: result}))
        .catch(err => {
            console.log(err);
        })

    }

    // Message if there's no search terms
    const noParamMessage = () => {
        return (
            <div className="alert alert-primary mt-2">Please Use Valid Search Terms</div>
        )
    }

    return (
        <div className="container">
        { checkNoParams() && noParamMessage()}
        </div>
    )

}

export default SoftwareEntry