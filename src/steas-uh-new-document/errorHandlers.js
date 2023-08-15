const handleUploadError = ({action, state, updateState}) => {
    updateState({
        loading: false,
        loadingError: true
    })
    dispatch('ENABLE_MODAL_CLOSE')
    dispatch("FINISHED_CREATING_DOCUMENTS", {});
}

const Errorlogging = ({action}) => {
    //console.log('Errorlogging', action);

}

module.exports = {
    handleUploadError,
    Errorlogging
}