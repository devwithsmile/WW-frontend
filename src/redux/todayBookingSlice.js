import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: true,
}

export const todayBookingSlice = createSlice({
    name: "todayBooking",
    initialState,
    reducers: {
        setTodayBookingLoadingTrue: (state) => { state.loading = true },
        setTodayBookingLoadingFalse: (state) => { state.loading = false }
    }
})

export const { setTodayBookingLoadingFalse, setTodayBookingLoadingTrue } = todayBookingSlice.actions
export default todayBookingSlice.reducer