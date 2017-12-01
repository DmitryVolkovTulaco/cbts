import constants from './home.constants';
import { get } from '../common/services/apiService';

export default {
    fetchQuestions: () => ({
        types: constants.GET_TEST,
        url: () => get('/api.php?amount=10')
    })
};
