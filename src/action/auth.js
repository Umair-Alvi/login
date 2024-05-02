import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    RESET_REGISTER_SUCCESS,
  } from "./type";
  
  export const resetRegister = () => (dispatch) => {
    dispatch({
      type: RESET_REGISTER_SUCCESS,
    });
  };
  
  export const login = (userName, password) => async (dispatch) => {
    const body = JSON.stringify({
      userName,
      password,
    });
  
    dispatch({
      type: SET_AUTH_LOADING,
    });
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }, 
        body: body,
      });
    
  
      if (res.status === 200) 
      {
        const data = await res.json(); // Parse the response body as JSON
        console.log(data.userdata); 
        dispatch({ 
          type: LOGIN_SUCCESS,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };
  