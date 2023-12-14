import Selector from "./Selector";

function StatusSelector(props) {
    return (
        <Selector {...props}>
            <option value="" disabled>Select a status</option>
        </Selector>
    )
}
export default StatusSelector
