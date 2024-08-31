import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const aboutSectionSlice = createSlice({
    name: "aboutSection",
    initialState,
    reducers: {
        setAboutLoadingTrue: (state) => { state.loading = true },
        setAboutLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setAboutLoadingFalse, setAboutLoadingTrue } = aboutSectionSlice.actions
export default aboutSectionSlice.reducer