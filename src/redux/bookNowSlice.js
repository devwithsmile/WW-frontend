import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const bookNowSlice = createSlice({
    name: "bookNow",
    initialState,
    reducers: {
        setBookNowLoadingTrue: (state) => { state.loading = true },
        setBookNowLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setBookNowLoadingFalse, setBookNowLoadingTrue } = bookNowSlice.actions
export default bookNowSlice.reducer