import { createContext, useReducer } from "react";

export const OwnTweetsContext = createContext();

export const ownTweetsReducer = (state,action) => {
    switch(action.type){
        case 'SET_OWN_TWEETS':
            return{
                ownTweets:action.payload
            }
        case 'DELETE_OWN_TWEET':
            return{
                ownTweets: state.ownTweets.filter((tweet) => tweet.message !== action.payload.message)
            }
        default:
            return state
    }
}

export const OwnTweetsContextProvider = ({children}) => {
    const[state,dispatch] = useReducer(ownTweetsReducer, {
        ownTweets:[]
    })

    
    return (
        <OwnTweetsContext.Provider value={{...state, dispatch}}>
            { children }
        </OwnTweetsContext.Provider>
    )
}
