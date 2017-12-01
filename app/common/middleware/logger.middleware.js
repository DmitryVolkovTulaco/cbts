export default store => next => action => {
    if(typeof action !== "function" && BUILD !== 'build-prod') {
        console.group(action.type);
        console.info('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return result;
    }
    return next(action);
};
