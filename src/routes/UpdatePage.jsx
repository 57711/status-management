import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useStore } from '../Store.jsx'
import ListSelector from '../components/ListSelector.jsx'
import { useEffect, useState } from 'react'




function UpdatePage() {
    const { status: modifyStatus } = useParams()
    const { allStatus, graph, dispatch, currentStatus } = useStore()
    const [selectedStatus, setSelectedStatus] = useState(graph[modifyStatus])
    const navigate = useNavigate();

    useEffect(() => {
        if (!allStatus.includes(modifyStatus)) {
            navigate('/')
        }
    }, [])

    function handleDelete() { 
        dispatch({
            type: 'delete',
            payload: modifyStatus,
        })
        navigate("/")
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({
            type: "update",
            payload: { key: modifyStatus, value: selectedStatus },
        })
        navigate("/")
    }
    const isDisabled = currentStatus == modifyStatus


    return (
        <>
            <Link to="/">Main Page</Link>
            <div>
                Status Name: {modifyStatus} <button onClick={handleDelete} disabled={isDisabled}>delete</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    Could be transferred to:
                    <ListSelector
                        name="selected"
                        options={allStatus}
                        current={modifyStatus}
                        onChange={setSelectedStatus}
                        value={selectedStatus}
                    />
                </div>
                <div>
                    <button type='submit'>Update Status</button>
                </div>
            </form>
        </>
    )
}

export default UpdatePage
