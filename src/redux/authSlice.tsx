import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    // userInfo: object
    value: number,
    email: string,
    password: string,
    isLogged: boolean,
    isRemember: boolean
}

const initialState: CounterState = {
    value: 0,
    email: '',
    password: '',
    isLogged: false,
    isRemember: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        emailAction: (state, action) => {
            state.email = action.payload
        },
        passwordAction: (state, action) => {
            state.password = action.payload
        },
        loggedAction: (state, action) => {
            state.isLogged = action.payload
        },
        remeberAction: (state, action) => {
            state.isRemember = action.payload
        }

    }
})

export const { increment, decrement, emailAction, passwordAction, loggedAction, remeberAction } = authSlice.actions

export default authSlice.reducer