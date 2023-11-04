import { CLEAR_MESSAGES } from "../constants";

export const clearMessages = () => dispatch => {
    dispatch({
        type: CLEAR_MESSAGES,
    });
}

