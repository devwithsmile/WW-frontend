import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const contactGymSlice = createSlice({
    name: "contactGym",
    initialState,
    reducers: {
        setContactGymLoadingTrue: (state) => { state.loading = true },
        setContactGymLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setContactGymLoadingFalse, setContactGymLoadingTrue } = contactGymSlice.actions
export default contactGymSlice.reducer