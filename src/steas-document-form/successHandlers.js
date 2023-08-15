const handleRecordDataFetched = ({action, updateState}) => {
    
    updateState({
        record: action.payload.result
    })
}

module.exports = {
    handleRecordDataFetched
}