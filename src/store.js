import { combineReducers, configureStore } from '@reduxjs/toolkit'
import carouselReducer from './redux/CarouselSlice'
import aboutSectionReducer from './redux/aboutSectionSlice'
import bookNowReducer from './redux/bookNowSlice'
import contactGymsReducer from './redux/contactGymSlice'
import currentLocationReducer from './redux/currentLocationSlice'
import facilitiesReducer from './redux/facilitiesSlice'
import gymCardReducer from './redux/gymCardSlice'
import profileReducer from './redux/profileSkeleton'
import statsReducer from './redux/statsSlice'
import tableCompReducer from './redux/tableCompSlice'
import todayBookingReducer from './redux/todayBookingSlice'


const gymDetailsReducers = combineReducers({
    aboutSection: aboutSectionReducer,
    bookNow: bookNowReducer,
    carousel: carouselReducer,
    contactGym: contactGymsReducer,
    currentLocation: currentLocationReducer,
    facilities: facilitiesReducer,

});

const searchPageReducers = combineReducers({
    isGymCardLoading: gymCardReducer,
});

const profilePageReducers = combineReducers({
    profile: profileReducer,
})

const ownerDashboardReducers = combineReducers({
    tableComp : tableCompReducer,
    stats: statsReducer,
})

const bookingsPageReducers = combineReducers({
    tableCompLoading: tableCompReducer,
    todayBookingLoading: todayBookingReducer
})


export const store = configureStore({
    reducer: {
        isGymDetailsLoading: gymDetailsReducers,
        isSearchLoading: searchPageReducers,
        isProfileLoading: profilePageReducers,
        isOwnerDashboardLoading: ownerDashboardReducers,
        isBookingsLoading: bookingsPageReducers,
    },
})