import { BsExclamationTriangleFill } from "react-icons/bs"

export default function NoContent() {
    return (
        <div className="alert alert-danger">
            <BsExclamationTriangleFill className="m-2" size="2em" title="Exclamation Mark"/>
            There is nothing here.
        </div>
    )
}