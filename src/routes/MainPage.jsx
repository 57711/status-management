import { useStore } from '../Store.jsx'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import StatusSelector from '../components/StatusSelector.jsx';
import { canTransferState, findRoute } from '../utils/shortPath.js'

function MainPage() {
    const { currentStatus, allStatus, setCurrentStatus, graph } = useStore()
    const navigate = useNavigate();
    const [q1Selected, setQ1Selected] = useState('')
    const [q1Result, setQ1Result] = useState(null)
    const [q2Selected, setQ2Selected] = useState('')
    const [q2Result, setQ2Result] = useState(null)
    const [q3Result, setQ3Result] = useState(null)

    useEffect(() => {
        setQ1Result(null)
        setQ1Selected('')
        setQ2Result(null)
        setQ2Selected('')
    }, [currentStatus])


    function directToCreate() {
        navigate("/create")
    }
    function directToUpdate(e) {
        navigate(`/update/${e.target.value}`)
    }
    function handleQ1(e) {
        setQ1Selected(e.target.value)
        const { canTransfer } = canTransferState(graph, currentStatus, e.target.value)
        setQ1Result(canTransfer)
    }
    function handleQ2(e) {
        setQ2Selected(e.target.value)
        const route = findRoute(graph, currentStatus, e.target.value)
        setQ2Result(route)
    }
    function changeStatus(e) {
        setQ3Result(null)
        if (currentStatus == null) {
            setCurrentStatus(e.target.value)
        } else if (graph[currentStatus].includes(e.target.value)) {
            setCurrentStatus(e.target.value)
        } else {
            setQ3Result(e.target.value)
        }
    }

    return (<>
        <section>
            Current status is {currentStatus || "empty"} <button onClick={directToCreate}>Create Status</button>
        </section>
        <section>
            Update status: <StatusSelector options={allStatus} onChange={e => directToUpdate(e)} defaultValue="" />?
        </section>
        <section>
            <div>
                Could be transferred to: <StatusSelector options={allStatus} onChange={e => handleQ1(e)} value={q1Selected} />?
            </div>
            {q1Result !== null && <div>
                {q1Result ? "Yes, can be transferred to" : "No, cannot be transferred to"} {q1Selected} from {currentStatus || "empty"}
            </div>}
        </section>
        <section>
            <div>
                How could be transferred to <StatusSelector options={allStatus} onChange={e => handleQ2(e)} value={q2Selected} /> ?
            </div>

            {q2Result !== null && <div>
                {q2Result || `Can not be transferred to ${q2Selected}`}
            </div>}
        </section>
        <section>
            <div>
                Transferred to <StatusSelector options={allStatus} onChange={e => changeStatus(e)} defaultValue="" /> ?
            </div>
            {q3Result !== null && <div>Can not be transferred to {q3Result}</div>}
        </section>
    </>)
}

export default MainPage
