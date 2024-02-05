import { AppRootStateType } from "app/store";
export const _selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
