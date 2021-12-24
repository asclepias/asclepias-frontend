import React from "react";

const spinnerStyle = {
    width: "10rem",
    height: "10rem"
}

const LoadingAnimation = () => {
    return (
        <div className="d-flex justify-content-center">
        <div className="spinner-border" style={spinnerStyle} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>

    )
}

export default LoadingAnimation