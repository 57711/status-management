import { Link } from 'react-router-dom'
import { useState, useId } from 'react'
import ListSelector from '../components/ListSelector.jsx'
import { useStore } from '../Store.jsx'
import { useNavigate } from 'react-router-dom'



function CreatePage() {
    const { allStatus, dispatch } = useStore()
    const statusInputId = useId();
    const [selectedStatus, setSelectedStatus] = useState([])
    const [inputStatus, setInputStatus] = useState([])
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const { statusName } = Object.fromEntries(new FormData(e.target))
        if (!statusName) return
        if(allStatus.includes(statusName)) return
        dispatch({
            type: "incert",
            payload: { [statusName]: selectedStatus },
        })
        navigate("/")
    }

    return (
        <>
            <Link to="/">Main Page</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={statusInputId}>Status Name:</label>
                    <input id={statusInputId} name="statusName" placeholder='new status name' onInput={e => setInputStatus(e.target.value)}></input>
                </div>
                <div>
                    Could be transferred to:
                    <ListSelector
                        name="selected"
                        options={allStatus}
                        current={inputStatus}
                        onChange={setSelectedStatus}
                        value={selectedStatus}
                    />
                </div>
                <div>
                    <button type='submit'>Create Status</button>
                </div>
            </form>
        </>
    )
}
export default CreatePage
