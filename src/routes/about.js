import React from "react";

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

            <h3>The Team</h3>
            <p className="pt-1 fs-5">
                The Asclepias project has a large group of contributors who have made this effort a success. The team includes:   
            </p>

            <div className="row row-cols-1 row-cols-md-4 g-4 pb-3">

            {makePeopleCards()}

            </div>


            <h3>Questions?</h3>
            <p className="pt-1 fs-5 pb-3">
                Do you have questions, bug reports, or feature requests for the team? Contact us here at the following e-mail address. 
            </p>

        </div> 
    )
}

export default About