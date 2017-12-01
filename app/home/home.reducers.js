import constants from './home.constants';

export default (state = { questions: [], answers: [] }, action) => {
    switch(action.type) {
        case constants.GET_TEST.SUCCESS:
            return { ...state, questions: action.payload.results };
        default:
            return state;
    }
};
