import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

const initialState = {
    loading: false,
    data: null,
    error: null
}

function StudentsData (state = initialState, action) {
    switch (action.type) {
        case "FETCH_START" :
            return {
                ...state,
                loading: true
            }
            break;
        case "FETCH_SUCCESS" :
            return {
                ...state,
                loading: false,
                data: action.payload
            }
            break;
        case "INSERT_SUCCESS" :
            return {
                ...state,
                loading: false
            }
            break;
        case "DELETE_SUCCESS" :
            return {
                ...state,
                loading: false
            }
            break;
        case "DATA_SUCCESS" :
            return {
                ...state,
                loading: false,
                // data: action.payload
            }
            break;
        case "EDIT_SUCCESS" :
            return {
                ...state,
                loading: false
            }
            break; 
        case "FETCH_FAILED" :
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            break;
        default :
            return { state }
    }
}

const FetchData = () => {
    return async (dispatch) => {
        dispatch ({
            type: "FETCH_START"
        })
        try {
            var response = await axios.get("http://localhost:4000/get");
            dispatch ({
                type: "FETCH_SUCCESS",
                payload: response.data.data
            })
        } catch (error) {
            dispatch ({
                type: "FETCH_FAILED",
                payload: response
            })
        }
    }
}

const InsertData = (obj) => {
    return async (dispatch) => {
        dispatch ({
            type: "FETCH_START"
        })
        try {
            var response = await axios.post("http://localhost:4000/add", obj);
            dispatch ({
                type: "INSERT_SUCCESS",
                payload: response.data
            })
        } catch (error) {
            dispatch ({
                type: "FETCH_FAILED",
                payload: response
            })
        }
    }
}

const DeleteData = (params) => {
    return async (dispatch) => {
        dispatch ({
            type: "FETCH_START"
        })
        try {
            var response = await axios.post("http://localhost/students_API/student_delete.php", params);
            dispatch ({
                type: "DELETE_SUCCESS",
                payload: response.data
            })
        } catch (error) {
            dispatch ({
                type: "FETCH_FAILED",
                payload: response
            })
        }
    }
}

const DataEdit = (params) => {
    return async (dispatch) => {
        dispatch ({
            type: "FETCH_START"
        })
        try {
            var response = await axios.post("http://localhost/students_API/student_edit.php", params);
            dispatch ({
                type: "EDIT_SUCCESS",
                payload: response.data
            })
            alert("Data Edited Successfully");
        } catch (error) {
            dispatch ({
                type: "FETCH_FAILED",
                payload: response
            })
        }
    }
}

const Store = createStore(StudentsData, applyMiddleware(thunk));

export { Store, FetchData, InsertData, DeleteData, DataEdit }