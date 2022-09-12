import { createSlice } from "@reduxjs/toolkit";
export interface UserState {
	user: any;
}

export const initialState = {
	user: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		initializeAuth: (state, action) => {
			// initialize user object by fetching user from server
			state.user = action.payload.user;
		},
		login: (state, action) => {
			// fetch user
			state.user = action.payload.user;
		},
		logout: (state) => {
			// erase user
			state.user = null;
		},
	},
});

export const { initializeAuth, login, logout } = userSlice.actions;
export default userSlice.reducer;
