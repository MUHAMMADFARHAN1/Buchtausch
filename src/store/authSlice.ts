// https://blog.logrocket.com/use-redux-next-js/
//https://www.reddit.com/r/nextjs/comments/1b4pj5q/will_server_components_ever_be_allowed_inside/#:~:text=If%20you%20import%20a%20component,still%20be%20a%20server%20component.
//https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  authState: boolean;
}

const initialState: IAuthState = {
  authState: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
