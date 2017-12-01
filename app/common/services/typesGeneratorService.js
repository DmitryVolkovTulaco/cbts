export const generateTypes = (type) => {
    const results = ['REQUEST', 'SUCCESS', 'FAILURE'];
    const types = {};

    results.forEach(item => { types[item] = `${type}_${item}` });
    return types;
};
