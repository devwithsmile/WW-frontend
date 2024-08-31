import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const gymCardSlice = createSlice({
    name: "gymCards",
    initialState,
    reducers: {
        setGymCardsLoadingTrue: (state) => { state.loading = true },
        setGymCardsLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setGymCardsLoadingFalse, setGymCardsLoadingTrue } = gymCardSlice.actions
export default gymCardSlice.reducer