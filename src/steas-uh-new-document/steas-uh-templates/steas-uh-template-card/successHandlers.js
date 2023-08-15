const handleTemplateDataFetched = ({action, dispatch, state, updateState}) => {
    
    
    
    updateState({
        path: 'data',
        value: action.payload.result,
        operation: 'set'
    });
}

module.exports = {
    handleTemplateDataFetched
}