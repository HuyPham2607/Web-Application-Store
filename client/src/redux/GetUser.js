import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
    },
    reducers: {
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = true;
            state.user = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        UpdateUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        UpdateUsersSuccess: (state, action) => {
            state.isFetching = true;
            state.user = action.payload;
        },
        UpdateUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        DeleteUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        DeleteUsersSuccess: (state, action) => {
            state.isFetching = true;
            state.user.splice(
                state.user.findIndex((user) => user._id === action.payload),
                1,
            );
        },
        DeleteUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    DeleteUsersStart,
    DeleteUsersSuccess,
    DeleteUsersFailure,
} = UserSlice.actions;
export default UserSlice.reducer;
