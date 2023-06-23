import { useAuthContext } from "./useAuthContext"
import { useTweetsContext } from "./useTweetsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: tweetsDispatch } = useTweetsContext()

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout
        dispatch({type:'LOGOUT'})
        tweetsDispatch({type:'SET_TWEETS', payload:[]})
    }

    return {logout}
}