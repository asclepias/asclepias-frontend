import React, { useState, useEffect } from "react";
import { resolvePath, useLocation } from "react-router";
import CitationBox from "../components/citationbox"
import SoftwareEntryDetails from "../components/SoftwareEntryDetails";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SoftwareEntry = props => {

    const [entryInfo, setEntryInfo] = useState({
        citedJSON: {}, numCitedHits: 0, relatedJSON: {}, numRelatedHits: 0
    })

    const [errorInfo, setErrorInfo] = useState({
        requestFailed: false, errMsg: []
    })

    const query = useQuery()
    const identifier = query.get("identifier")
    const identifiertype = query.get("identifiertype")

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
            const queryCitationUrl = `${process.env.REACT_APP_BROKER_URL}/relationships?id=${identifier}&scheme=${identifiertype}&relation=isCitedBy`
            updateBrokerCitationResult(queryCitationUrl)
        }

        setErrorInfo(prevState => ({ ...prevState, requestFailed: false }))

        console.log("Getting Initial Citation Data")
        getCitationData()

    }, [setEntryInfo, setErrorInfo, identifiertype, identifier])

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
            console.log(json)
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
        return (
            <div className="container">
                <h2 className="mt-2 mb-3"> No Entry Found </h2>
                <p className="text-center fs-5">No entries found for <strong> {identifiertype.toUpperCase()}: {identifier}</strong>. Is the identifier or identifier type correct?</p>
            </div>
        )
    }

    // Message Container for Broker/API Errors
    const brokerErrorMessage = (errMsg) => {
        var errMsgBox;
        if (errMsg.message) {
            errMsgBox = (
                <div className="p-3">
                    <strong>Error {errMsg.status}:</strong> {errMsg.message}
                </div>
            )
        }
        return (
            <div className="alert alert-danger mt-2 px-5 pt-4">
                <h4 className="alert-heading">Server Error</h4>
                <p>Apologies, we cannot handle your request right now. Please try again later</p>
                {errMsgBox}
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
            {!(entryInfo.numCitedHits > 0) && noEntryMessage()}

            {((entryInfo.numCitedHits) > 0) && 
            <SoftwareEntryDetails entryInfo={entryInfo} />  }

            {(entryInfo.numCitedHits > 0) && <CitationBox entryInfo={entryInfo} updateBrokerCitationProperty={updateBrokerCitationProperty}/>}

        </div>
    )

}

export default SoftwareEntry