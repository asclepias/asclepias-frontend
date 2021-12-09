import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import CitationBox from "../components/citationbox"
import SoftwareEntryDetails from "../components/SoftwareEntryDetails";
import { brokerErrorMessage } from "../helpers/apihelpers"

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const brokerSearchParams = { 
    journal: "Publication Name", 
    publication_year: "Publication Year", 
    keyword: "Publication Keywords", 
    q: "Other Search Terms" 
}

const SoftwareEntry = props => {

    const [entryInfo, setEntryInfo] = useState({
        citedJSON: {}, numCitedHits: 0
    })

    const [errorInfo, setErrorInfo] = useState({
        requestFailed: false, errMsg: []
    })

    const query = useQuery()
    const identifier = query.get("identifier")
    const identifiertype = query.get("identifiertype")
    let metadataFilter = ""
    let metadataParams = new URLSearchParams()
    Object.keys(brokerSearchParams).forEach(paramName => {
        if (query.has(paramName)) { 
            metadataParams.set(paramName, query.get(paramName))
            metadataFilter = metadataParams.toString()
        }
    })
    const metadataSearchTerms = (metadataFilter === "") ? "" : ("&"+metadataFilter)

    const checkNoURLParams = () => {
        let noParams = true

        if (query.has("identifier") & query.has("identifiertype")) {
            noParams = false
        }

        return noParams
    }

    // On Mount

    useEffect(() => {

        const getCitationData = () => {
            const queryCitationUrl = `${process.env.REACT_APP_BROKER_URL}/relationships?id=${identifier}&scheme=${identifiertype}&relation=isCitedBy${metadataSearchTerms}`
            updateBrokerCitationResult(queryCitationUrl)
        }

        setErrorInfo(prevState => ({ ...prevState, requestFailed: false }))

        getCitationData()

    }, [setEntryInfo, setErrorInfo, identifiertype, identifier, metadataSearchTerms])

    const updateBrokerCitationResult = async (newURL) => {
        try {
            const response = await fetch(
                newURL,
                {
                    "method": "GET",
                    "headers": {
                        "accept": "application/json"
                    }
                }
            )
            if (!response.ok) {
                throw Error(response.statusText)
            }
            const json = await response.json()
            setEntryInfo(prevState => ({
                    ...prevState,
                    citedJSON: json,
                    numCitedHits: json.hits.total
                }))
            setErrorInfo(
                prevState => ({...prevState, requestFailed: false})
            )
        } catch(err) {
                console.log(err);
                setErrorInfo(prevState => ({
                        ...prevState,
                        requestFailed: true,
                        errMsg: err
                }))
        }
        

    }

    const updateBrokerCitationProperty = (propName, propValue) => {
        let brokerUrl = new URL(entryInfo.citedJSON.links.self)
        let params = new URLSearchParams(brokerUrl.search)
        params.set(propName, propValue)
        brokerUrl.search = params
        updateBrokerCitationResult(brokerUrl)
    }

    // Message if there's no search terms
    const noParamMessage = () => {
        return (
            <div className="alert alert-warning mt-2">Please Use Valid Search Terms</div>
        )
    }

    // Message if there's no entry found
    const noEntryMessage = () => {
        document.title = "Asclepias: Software Entry: No Entry Found"
        return (
            <div className="container">
                <h2 className="mt-2 mb-3"> No Entry Found </h2>
                <p className="text-center fs-5">No entries found for <strong> {identifiertype.toUpperCase()}: {identifier}</strong>. Is the identifier or identifier type correct?</p>
            </div>
        )
    }

    useEffect(() => {
        return () => {
          console.log("Cleaning up...")
        }
      }, [])

    return (
        <div className="container">
            {checkNoURLParams() && noParamMessage()}
            {errorInfo.requestFailed && brokerErrorMessage(errorInfo.errMsg)}
            {!errorInfo.requestFailed && !(entryInfo.numCitedHits > 0) && noEntryMessage()}

            {((entryInfo.numCitedHits) > 0) && 
            <SoftwareEntryDetails entryInfo={entryInfo} />  }

            {(entryInfo.numCitedHits > 0) && 
            <CitationBox 
                entryInfo={entryInfo} 
                updateBrokerCitationProperty={updateBrokerCitationProperty}
                metadataFilter={metadataFilter}
                brokerSearchParams={brokerSearchParams}
            />}

        </div>
    )

}

export default SoftwareEntry