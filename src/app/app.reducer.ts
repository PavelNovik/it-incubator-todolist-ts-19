import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  selectors: {
    selectAppStatus: (sliceState)=> sliceState.status,
    selectAppError: (sliceState)=> sliceState.error,
    selectIsInitialized: (sliceState)=> sliceState.isInitialized,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(initializeApp.fulfilled, (state, action) => {
    //   state.isInitialized = action.payload.isInitialized;
    // });
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export const {selectAppStatus, selectIsInitialized, selectAppError}= slice.selectors

// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   authAPI.me().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//     } else {
//     }
//
//     dispatch(appActions.setAppInitialized({ isInitialized: true }));
//   });
// };

// export const appThunks = {initializeApp}