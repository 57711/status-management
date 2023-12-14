function reducer(state, action) {
    switch (action.type) {
        case 'incert': {
            return {
                ...state,
                ...action.payload,
            };
        }
        case 'delete': {
            const newState = {}
            Object.keys(state).forEach(key => {
                if (key == action.payload) return
                newState[key] = state[key].filter(item => item != action.payload)
            })
            return newState;
        }
        case 'update': {
            const { key, value } = action.payload
            return {
                ...state,
                [key]: value,
            }
        }
    }
}
export default reducer
