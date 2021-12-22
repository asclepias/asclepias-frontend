import './custom.scss'
import React from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import NoContent from './routes/nocontent'
import EntrySearch from './routes/entrysearch'
import SoftwareEntry from './routes/softwareentry'
import MetadataSearch from './routes/metadatasearch'
import MetadataSearchResults from './routes/metadatasearchresults'
import About from './routes/about'

import HomePage from './routes/homepage'

export default function App() {
    return (
        <React.StrictMode>
            <div className="container-fluid p-0 m-0 min-vh-100 d-flex flex-column">
                <Header />

                <div className="container">
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route path="/entrysearch" element={<EntrySearch />} />
                        <Route path="/entry" element={<SoftwareEntry />}>
                            <Route path=":searchquery" element={<SoftwareEntry />} />
                        </Route>
                        <Route path="/metadatasearch" element={<MetadataSearch />} />
                        <Route path="/metadata" element={<MetadataSearchResults />}>
                            <Route path=":searchquery" element={<MetadataSearchResults />} />
                        </Route>
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NoContent />} />
                    </Routes>

                </div>

                <Footer />
            </div>
        </React.StrictMode>
    );
}

