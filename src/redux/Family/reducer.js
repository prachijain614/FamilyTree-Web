import ActionTypes from "../actionTypes";

let initialState = {
    data: [],
    loading: true,
    type: '',
};

const familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_FAMILY:
            return {
                ...state,
                loading: action.payload.loading,
                data: action.payload.data
            }
        case ActionTypes.GET_MEMBER:
            return {
                ...state,
                loading: action.payload.loading,
                data: action.payload.data
            }
        default:
            return state

    }
};

export default familyReducer;
