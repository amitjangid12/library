import { FETCH_DATA, FETCH_DATA_REQUEST, UPDATE_DATA, DELETE_DATA } from './constant';

export function reducer(state = [], action) {

    switch (action.type) {

        case FETCH_DATA:
            return state

        case FETCH_DATA_REQUEST:
            return action.data

        default:
            return state
    }
}
