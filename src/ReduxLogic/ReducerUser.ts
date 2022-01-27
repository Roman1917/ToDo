import { ADD_USER } from "../constantsTodo";

const initialState = { user: [] };

export const User = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_USER: {
      return { ...state, user: action.payload };
    }

    default:
      return state;
  }
};

export default User;
