import notification from './../services/notificationService';

export default ({ dispatch, getState }) => {
    return next => action => {
        const {
            types,
            url,
            shouldCallApi = () => true,
            payload = {},
            onSuccess,
            onFailure,
            onPreCall,
        } = action;

        if (!types) {
            return next(action);
        }

        if (!types.hasOwnProperty('REQUEST') || !types.hasOwnProperty('SUCCESS') || !types.hasOwnProperty('FAILURE')) {
            throw new Error('Expected an object of three properties (REQUEST, SUCCESS, FAILURE)');
        }

        if (typeof url !== 'function') {
            throw new Error('Expected url to be a function.');
        }

        if (!shouldCallApi(getState())) {
            return;
        }

        const { REQUEST, SUCCESS, FAILURE } = types;

        dispatch({ ...payload, type: REQUEST});

        onPreCall && onPreCall();

        return url().then(
            response => {
                if(response.ok) {
                    dispatch({ payload: response.body, type: SUCCESS });
                    onSuccess && onSuccess(response.body);
                } else {
                    dispatch({ response, type: FAILURE });

                    onFailure && onFailure(response.body);

                    response.statusCode !== 401 && response.statusCode !== 404 && notification({
                        message: response.body.errorMessage,
                        kind: 'danger'
                    });
                }

                return response;
            }
        );
    }
}
