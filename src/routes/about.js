import React from "react";
import ReactPlayer from "react-player/youtube";

const About = props => {

    const peopleData = [
        {personName: "Julie Steffen", personOrganization: "American Astronomical Society"},
        {personName: "August Muench", personOrganization: "American Astronomical Society"},
        {personName: "Alberto Accomazzi", personOrganization: "SAO/NASA Astrophysics Data System"},
        {personName: "Edwin Henneken", personOrganization: "SAO/NASA Astrophysics Data System"},
        {personName: "Taylor Jacovich", personOrganization: "SAO/NASA Astrophysics Data System"},
        {personName: "Sergio Blanco-Cuaresma", personOrganization: "SAO/NASA Astrophysics Data System"},
        {personName: "Alexandros Ioannidis", personOrganization: "Zenodo"},
        {personName: "Lars Holm Nielsen", personOrganization: "Zenodo"},
        {personName: "Mattias Wångblad", personOrganization: "Winter Way"},
        {personName: "Mubdi Rahman", personOrganization: "Sidrat Research"},

    ]

    const makePeopleCards = () => (
        <>
        {peopleData.map(({personName, personOrganization}) => (

            <div className="col" key={personName}>
            <div className="card text-center h-100">
                <div className="card-body">
                    <h5 className="card-title">{personName}</h5>
                    <p className="card-text">{personOrganization}</p>
                </div>
            </div>
            </div>

        )) }

        </>
    )

    document.title = "Asclepias: About Asclepias"

    return (
        <div className="container pt-3 mt-5">
            <h1>About the Asclepias Project</h1>

            <p className="pt-3 fs-5">
                Discovery in astronomy is being driven by the development of new software tools within every aspect of our science. The Asclepias project, a project of the AAS, NASA ADS, and Zenodo, was born out of scientists' need to distribute, discover, and track software as it is used in astronomy.  This tool allows you to connect the software tools and the scientific results, making your progress faster, more open, and reproducible.
            </p>

            <p className="pt-1 fs-5">
                The development of the code for the Asclepias project is entirely open-source and freely available on the <a href="https://github.com/asclepias">GitHub repository</a>. Extensive documentation on the Asclepias Broker, including the structure of how it connects citations is available at the <a href="https://asclepias-broker.readthedocs.io/en/latest/">Read the Docs</a> page.  
            </p>

            <div style={{paddingTop:"56.25%", position:"relative"}} className="mx-auto mb-5">
            <ReactPlayer url='https://www.youtube.com/watch?v=0_5b_NZ-vbY' width="100%" height="100%" style={{position:"absolute", top:0, left:0}}/>
            </div>

            <h3 className="pt-5">How do Software Entries make it into Asclepias</h3>
            <p className="pt-1 fs-5">
            All software that appears in Asclepias is cited by an academic publication (or ArXiv preprint) that appears in the <a href="http://ui.adsabs.harvard.edu">Astrophysics Data System</a>. The citation should use, preferably, a Digital Object Identifier (or DOI), or a GitHub repository link (to a repository as a whole, or a specific release). We recommend uploading a version of your software to <a href="https://zenodo.org/">Zenodo</a>, which can import the specific version of your software from GitHub, and generates a DOI to cite. The first time the software is cited in a publication, it will be "harvested" by Asclepias, and will be available to be found!
            </p>

            <h3 className="pt-3">The Team</h3>
            <p className="pt-1 fs-5">
                The Asclepias project has a large group of contributors who have made this effort a success. The team includes:   
            </p>

            <div className="row row-cols-1 row-cols-md-4 g-4 pb-3">

            {makePeopleCards()}

            </div>


            <h3>Questions?</h3>
            <p className="pt-1 fs-5 pb-3">
                Do you have questions, bug reports, or feature requests for the team? Contact us here at <a href="mailto:asclepias@aas.org">asclepias@aas.org</a> 
            </p>

        </div> 
    )
}

export default About