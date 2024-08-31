import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const facilitiesSlice = createSlice({
    name: "facilities",
    initialState,
    reducers: {
        setFacilitiesLoadingTrue: (state) => { state.loading = true },
        setFacilitiesLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setFacilitiesLoadingFalse, setFacilitiesLoadingTrue } = facilitiesSlice.actions
export default facilitiesSlice.reducer