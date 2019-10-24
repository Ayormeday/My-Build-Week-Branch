import * as types from "./actionTypes";

const initialSignupState = {
  username: "",
  password: "",
  phoneNumber: "",
  plantsList: [],
  editPlantId: 0
};

const signupReducer = (state = initialSignupState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
      return state;
    case types.ON_SIGNUP_INPUT_CHANGE:
      return {
        ...state,
        ...action.payload
      };
    case types.LOGIN:
      return initialSignupState;
    case types.ON_LOGIN_INPUT_CHANGE:
      return {
        ...state,
        ...action.payload
      };
    case types.ADD_PLANT:
      return {
        ...state,
        plantsList: [...state.plantsList, action.payload],
      };
    case types.EDIT_PLANT:
      return {
        ...state,
        plantslist: state.plantsList.map(plant =>
          plant.id === action.payload.id ? action.payload : plant
        )
      };
    case types.DELETE_PLANT:
      return {
        ...state,
        plantsList: state.plantsList.filter(
          plant => plant.id !== action.payload
        )
      };

    case types.GET_PLANT:
      return {
        ...state,
        plantsList: [...state.plantsList, action.payload]
      }
    default:
      return state;
  }
};


export default signupReducer;
