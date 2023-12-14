import { useState, createContext, useContext, useMemo, useReducer } from 'react'
import GraphReducer from './reducer.js'


const StoreContex = createContext(null);

export const useStore = () => useContext(StoreContex)

const graphInitial = {}

function Store(props) {
  const [graph, dispatch] = useReducer(GraphReducer, graphInitial);
  const [currentStatus, setCurrentStatus] = useState(null)

  const allStatus = useMemo(() => {
    return Object.keys(graph)
  }, [graph])

  const store = {
    currentStatus,
    setCurrentStatus,
    graph,
    dispatch,
    allStatus,
  }
  return (
    <StoreContex.Provider value={store}>
      {props.children}
    </StoreContex.Provider>
  )
}
export default Store
