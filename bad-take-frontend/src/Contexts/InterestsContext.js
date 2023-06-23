import { createContext, useReducer } from "react";

export const InterestsContext = createContext();

export const interestsReducer = (state,action) => {
    switch(action.type){
        case 'SET_INTERESTS':
            return{
                interests:action.payload
            }
        case 'CREATE_INTEREST':
            return{
                interests:[action.payload,...state.interests]
            }
        case 'DELETE_INTEREST':
            return{
                interests: state.interests.filter((interest) => interest !== action.payload)
            }
        default:
            return state
    }
}

export const InterestsContextProvider = ({children}) => {
    const[state,dispatch] = useReducer(interestsReducer, {
        interests:[]
    })

    
    return (
        <InterestsContext.Provider value={{...state, dispatch}}>
            { children }
        </InterestsContext.Provider>
    )
}
