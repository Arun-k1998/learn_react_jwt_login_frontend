import {configureStore } from '@reduxjs/toolkit'
import userAuth from './userAuthentification'

export const store = configureStore({
    reducer:{
        user:userAuth
    }
})