import axios from "axios";
import * as types from "./actionTypes";
import * as withAuth from '../helpers/axiosWithAuth';

const registerApi = "https://build-week-4.herokuapp.com/api/user/register";
const loginApi = "https://build-week-4.herokuapp.com/api/user/login";

export const userSignUpRequest = userData => dispatch => {
	console.log('in action creator',userData)
      axios.post(registerApi, userData)
      .then(({ data }) => {
        dispatch({ type: types.SIGN_UP });
        localStorage.setItem('token', data.token);
    })
    .catch(err => console.log(err));
};

export const attemptLogin = (login, history) => dispatch => {
	console.log(login)
  axios
    .post(loginApi, login)
    .then(({ data }) => {
      console.log("logged in", data);
      localStorage.setItem("token", data.token);
	  dispatch({ type: types.LOGIN });
	  history.push("/plants");
    })
    .catch(err => console.log(err));
};



export const logout = () => {
	localStorage.removeItem("token");
	return { type: types.LOGOUT };
}

export const addPlantToList = plant => dispatch => {
	console.log("this is the payload", plant)
	withAuth.axiosWithAuth().post("https://build-week-4.herokuapp.com/api/plants", plant)
		.then(({ data }) => {
			console.log('added a plant', plant.id=data);
			// add id to plant -> plant.id = data
			dispatch(setPlantsList(data)); // only 1 plant
			
		})
		.catch(err => console.log(err))
}

export const displayPlantsList = list => {
	return { type: types.GET_PLANT, payload: list };
  };
export const getPlantList = list => dispatch => {
	console.log("this is the payload", list)
	withAuth.axiosWithAuth().get("https://build-week-4.herokuapp.com/api/plants")
		.then(({ data }) => {
			console.log('return an array of plant', data);
			// add id to plant -> plant.id = data
			dispatch(displayPlantsList(data)); // only 1 plant
			
		})
		.catch(err => console.log(err))
}

export const setPlantsList = plant => {
	return { type: types.ADD_PLANT, payload: plant };
  };
  
export const startEditPlant = plant => {
	return { type: types.EDIT_PLANT, payload: plant };
}

export const startDeletePlant = plant => {
	return {type: types.DELETE_PLANT, payload: plant.id}
}

export const editPlant = plant => dispatch => {
	withAuth.axiosWithAuth().put(`https://build-week-4.herokuapp.com/api/plants/${plant.id}`, plant)
		.then(({ data }) => {
			dispatch(startEditPlant(data));
		})
		.catch(err => console.log(err))
}
export const deletePlant = id => dispatch => {
	withAuth.axiosWithAuth().delete(`https://build-week-4.herokuapp.com/api/plants/${id}`)
		.then(({ data }) => {
			dispatch(startDeletePlant(data));
		})
		.catch(err => console.log(err))
}