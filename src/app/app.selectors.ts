import { AppRootStateType } from "app/store";

export const _selectAppStatus = (state: AppRootStateType) => state.app.status;
export const _selectAppError = (state: AppRootStateType) => state.app.error;
export const _selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
