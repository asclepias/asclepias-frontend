export function removeDuplicatesTwoProps(myArr, prop1, prop2) {
    var flags = {}
    return myArr.filter(
        entry => {
            let tmp_key = entry[prop1].toString().toLowerCase() + "," + entry[prop2].toString().toLowerCase()
            if(flags[tmp_key]) {
                return false
            }
            flags[tmp_key] = true
            return true 
        }
    )
}

export function brokerErrorMessage(errMsg) {
    var errMsgBox;
    if (errMsg.message) {
        errMsgBox = (
            <div className="p-3">
                <strong>Error {errMsg.status}:</strong> {errMsg.message}
            </div>
        )
    }
    document.title = "Asclepias: Server Error"
    return (
        <div className="alert alert-danger mt-2 px-5 pt-4">
            <h4 className="alert-heading">Server Error</h4>
            <p>Apologies, we cannot handle your request right now. Please try again later</p>
            {errMsgBox}
        </div>
    )
}