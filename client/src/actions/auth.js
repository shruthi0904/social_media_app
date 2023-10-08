import * as api from '../api/index.js'

// action creators are asynchronous then we have to use redux-thunk meaning that a function returns an async function with a dispatch
export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', payload: data})

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: 'AUTH', payload: data})

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}