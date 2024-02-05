import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

/**
 * This function show error when it occurred in local
 * @param data - The response data from the server.
 * @param dispatch - The Redux dispatch function.
 * @param showError - Whether to display an error message (default: true).
 * @returns - nothing
 */
export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }
  }

  dispatch(appActions.setAppStatus({ status: "failed" }));
};
