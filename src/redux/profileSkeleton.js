import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileLoadingTrue: (state) => { state.loading = true },
        setProfileLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setProfileLoadingFalse, setProfileLoadingTrue } = profileSlice.actions
export default profileSlice.reducer