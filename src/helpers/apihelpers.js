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