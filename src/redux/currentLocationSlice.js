import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const currentLocationSlice = createSlice({
    name: "currentLocation",
    initialState,
    reducers: {
        setCurrentLocationLoadingTrue: (state) => { state.loading = true },
        setCurrentLocationLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setCurrentLocationLoadingFalse, setCurrentLocationLoadingTrue } = currentLocationSlice.actions
export default currentLocationSlice.reducer