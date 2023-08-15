const handleChoicesFetched = ({action, dispatch, state, updateState}) => {
    
    updateState({
        path: 'documentTypes',
        operation: 'set',
        value: action.payload.result
    });

}

module.exports = {
    handleChoicesFetched
}