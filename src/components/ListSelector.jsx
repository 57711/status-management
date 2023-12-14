import { useMemo } from "react"
import Selector from "./Selector.jsx"
import "./List.css"

function List(props) {
    const { name, options, current, onChange, value } = props;
    const filteredOption = useMemo(() => {
        if (current) {
            return options.filter(item => item !== current)
        } else return options
    }, [options, current])

    function handleSelectChange(e) {
        const selected = []
        for (let option of e.target.selectedOptions) {
            selected.push(option.value)
        }
        onChange(selected)
    }

    return (
        <Selector
            className="list"
            name={name}
            options={filteredOption}
            onChange={handleSelectChange}
            value={value}
            multiple
        >
            <option value={current}>self</option>
        </Selector>
    )
}
export default List
