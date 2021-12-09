import React, { useState, useEffect, useCallback} from "react";
import { useLocation } from "react-router";
import { brokerErrorMessage } from "../helpers/apihelpers"
import MetadataSearchResultsBox from "../components/metadatasearchresultsbox";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const MetadataSearchResults = props => {

    const brokerSearchParams = { publication: "Publication Name", publication_year: "Publication Year", keyword: "Publication Keywords", q: "Other Search Terms" }


    const [resultInfo, setResultInfo] = useState({
        hitsJSON: {}, numHits: 0
    })

    const [errorInfo, setErrorInfo] = useState({
        requestFailed: false, errMsg: []
    })

    const query = useQuery()

    const checkNoURLParams = () => {
        let noParamFlag = true
        Object.keys(brokerSearchParams).forEach(paramName => {
            if (query.has(paramName)) { noParamFlag = false }
        })
        return noParamFlag
    }

    const noParamMessage = () => (
        <div className="alert alert-warning mt-2">Please Use Valid Search Terms</div>
    )

    const noEntryMessage = () => (
        <div className="alert alert-warning mt-2">No software entries were found. Please check your search terms.</div>
    )


    const searchResultHeader = () => {

        const titleString = "Metadata Search for "
        const windowString = "Asclepias Metadata Search: "
        let searchHumanReadable = ""

        Object.keys(brokerSearchParams).forEach(paramName => {
            if (query.has(paramName)) { 
                var paramValue = query.get(paramName)
                if (paramName === "publication_year") {
                    paramValue = paramValue.replace("--", " to ")
                } 
                searchHumanReadable += (brokerSearchParams[paramName] + ": " + paramValue + "; ")
            }
        })

        document.title = (windowString + searchHumanReadable)
        
        return (
            <div className="row">
                <h3 className="mt-2 mb-2 w-100">{titleString + searchHumanReadable}</h3>
            </div>
        )
    }

    const updateBrokerSearchResult = async (newURL) => {
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
            setResultInfo(prevState => ({
                    ...prevState,
                    hitsJSON: json,
                    numHits: json.aggregations.NumberOfTargets.value
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

    const updateBrokerSearchResultProperty = (propName, propValue) => {
        let brokerUrl = new URL(resultInfo.hitsJSON.links.self)
        let params = new URLSearchParams(brokerUrl.search)
        params.set(propName, propValue)
        brokerUrl.search = params
        updateBrokerSearchResult(brokerUrl)
    }

    const loadInitialData = useCallback(() => {
        let brokerUrl = new URL(`${process.env.REACT_APP_BROKER_URL}/metadata`)
        let params = new URLSearchParams()
        Object.keys(brokerSearchParams).forEach(paramName => {
            if (query.has(paramName)) { params.set(paramName, query.get(paramName)) }
        })
        brokerUrl.search = params
        updateBrokerSearchResult(brokerUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        setErrorInfo(prevState => ({ ...prevState, requestFailed: false }))

        console.log("Getting Initial Search Data")
        loadInitialData()

    }, [setErrorInfo, loadInitialData])

    return (
        <div className="container">
            {checkNoURLParams() && noParamMessage()}
            {!checkNoURLParams() && searchResultHeader()}
            {errorInfo.requestFailed && brokerErrorMessage(errorInfo.errMsg)}
            {!errorInfo.requestFailed && !(resultInfo.numHits > 0) && noEntryMessage()}

            {(resultInfo.numHits > 0) && <MetadataSearchResultsBox resultInfo={resultInfo} updateBrokerSearchProperty={updateBrokerSearchResultProperty}/>}

        </div>
    )
}

export default MetadataSearchResults