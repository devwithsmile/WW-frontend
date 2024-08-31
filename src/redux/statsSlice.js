import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setStatsLoadingTrue: (state) => { state.loading = true },
        setStatsLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setStatsLoadingFalse, setStatsLoadingTrue } = statsSlice.actions
export default statsSlice.reducer