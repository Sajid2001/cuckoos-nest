import { createContext, useReducer } from "react";

export const TweetsContext = createContext();

export const tweetsReducer = (state,action) => {
    switch(action.type){
        case 'SET_TWEETS':
            return{
                tweets:action.payload
            }
        case 'CREATE_TWEET':
            return{
                tweets:[action.payload,...state.tweets]
            }
        case 'DELETE_TWEET':
            return{
                tweets: state.tweets.filter((tweet) => tweet.message !== action.payload.message)
            }
        default:
            return state
    }
}

export const TweetsContextProvider = ({children}) => {
    const[state,dispatch] = useReducer(tweetsReducer, {
        tweets:[]
    })

    
    return (
        <TweetsContext.Provider value={{...state, dispatch}}>
            { children }
        </TweetsContext.Provider>
    )
}
