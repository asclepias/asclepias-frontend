import React from "react";

const spinnerStyle = {
    width: "20rem",
    height: "20rem"
}

const LoadingAnimation = () => {
    return (
        <div className="d-flex justify-content-center py-5 my-5">
            <div className="spinner-border text-primary" style={spinnerStyle} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default LoadingAnimation