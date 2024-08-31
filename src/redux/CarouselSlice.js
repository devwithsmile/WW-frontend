import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const carouselSlice = createSlice({
    name: "carousel",
    initialState,
    reducers: {
        setCarouselLoadingTrue: (state) => { state.loading = true },
        setCarouselLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setCarouselLoadingFalse, setCarouselLoadingTrue } = carouselSlice.actions
export default carouselSlice.reducer