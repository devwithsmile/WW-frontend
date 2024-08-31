import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const tableComponentSlice = createSlice({
    name: "tableComponent",
    initialState,
    reducers: {
        setTableCompLoadingTrue: (state) => { state.loading = true },
        setTableCompLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setTableCompLoadingFalse, setTableCompLoadingTrue } = tableComponentSlice.actions
export default tableComponentSlice.reducer