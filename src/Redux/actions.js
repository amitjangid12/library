import { DELETE_DATA, FETCH_DATA, FETCH_DATA_REQUEST, POST_DATA, UPDATE_DATA } from "./constant"

export const fetchRequest = () => {

    return {
        type: FETCH_DATA,
    }
}

export const fetchRequestData = (data) => {

    return {
        type: FETCH_DATA_REQUEST,
        data
    }
}

export const postRequest = (data) => {

    return {
        type: POST_DATA,
        data
    }
}
export const updateRequest = (data) => {

    return {
        type: UPDATE_DATA,
        data
    }
}

export const deleteRequest = (data) => {

    return {
        type: DELETE_DATA,
        data
    }
}