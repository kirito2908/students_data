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
            var response = await axios.get("http://localhost/students_data/student_api.php");
            dispatch ({
                type: "FETCH_SUCCESS",
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

const InsertData = (params) => {
    return async (dispatch) => {
        dispatch ({
            type: "FETCH_START"
        })
        try {
            var response = await axios.post("http://localhost/students_data/student_insert.php", params);
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

const Store = createStore(StudentsData, applyMiddleware(thunk));

export { Store, FetchData, InsertData }