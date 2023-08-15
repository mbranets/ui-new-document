const CREATE_DOCUMENT_REQUESTED = "NEW_DOCUMENT#CREATE_DOCUMENT_REQUESTED"
const UPLOAD_FILE_REQUESTED = "NEW_DOCUMENT#UPLOAD_FILE_REQUESTED";

const handleEntryCreated = ({ action, state, dispatch, updateState }) => {
    const entryUID = action.payload.result.sys_id;
    updateState({
        creatingEntryId: entryUID
    });
    state.newDocuments.slice(0).reverse().map((doc, ix) => {
        if (state.newDocuments.length == 1) {
            const data = {
                "registration": entryUID,
                "template": doc.template,
                "title": doc.title,
                "type": "main"
            }
            dispatch(CREATE_DOCUMENT_REQUESTED, {
                data: data
            })
        } else {
            if (ix != state.newDocuments.length - 1) {
                const data = {
                    "registration": entryUID,
                    "template": doc.template,
                    "title": doc.title,
                    "type": "attachment"
                }
                dispatch(CREATE_DOCUMENT_REQUESTED, {
                    data: data
                })
            }
        }
    })
}

const handleDocumentCreated = ({ state, action, dispatch, updateState }) => {
    const title = action.payload.result.title;
    const documentId = action.payload.result.sys_id;
    state.newDocuments.slice(0).reverse().map((newDoc, ix) => {
        if (newDoc) {
            if (newDoc.file) {
                if (newDoc.title == title && newDoc.file) {
                    updateState({
                        operation: 'set',
                        path: 'newDocuments.'+ ix + '.id',
                        value: documentId
                    })
                    const request = {
                        documentId: documentId,
                        file_type: newDoc.file.type,
                        file_name: newDoc.file.name,
                        file: newDoc.file
                    }
                    dispatch(UPLOAD_FILE_REQUESTED, request)
                }
            } else if (newDoc.template) {
                if (newDoc.title == title) {
                    const request = {
                        documentId: documentId,
                    }
                    dispatch("TRIGGER_TEMPLATE", request)
                }
            } else {
                updateState({
                    finished: parseInt(state.finished) + 1
                })
                if (state.finished >= state.totalDocuments - 1) {
                    updateState({
                        loading: false,
                        totalDocuments: 0,
                        newDocuments: [],
                        finished: 0
                    });
                    dispatch('ENABLE_MODAL_CLOSE')
                    dispatch("FINISHED_CREATING_DOCUMENTS", {});
                }
            }
        }
    })
}

const handleFileUploaded = ({ action, state, updateState, dispatch }) => {
    const result = action.payload.result;
    updateState({
        finished: parseInt(state.finished) + 1
    })
    
    if (result.hasOwnProperty('success') && !result.success) {
        updateState({
            loadingError: true,
            uploadErrorMessage: result.errorMessage,
            loading: false
        })
        dispatch('ENABLE_MODAL_CLOSE')
    } else {
        if ((state.finished == state.totalDocuments - 2)) {
            const data = {
                "registration": state.creatingEntryId,
                "template": state.newDocuments[0].template,
                "title": state.newDocuments[0].title,
                "type": 'main'
            }
            dispatch(CREATE_DOCUMENT_REQUESTED, {
                data: data
            })
        }
        if (state.finished >= state.totalDocuments - 1) {
            updateState({
                loading: false,
                totalDocuments: 0,
                newDocuments: [],
                finished: 0
            });
            dispatch('ENABLE_MODAL_CLOSE')
            dispatch("FINISHED_CREATING_DOCUMENTS", {});
        }
    }
}

const handleDocumentationTypes = ({ action, updateState, state }) => {
    let documentationTypes = []
    for (let res of action.payload.result) {
        documentationTypes.push({
            id: res.sys_id,
            label: res.name}
            );
    }
    updateState({
        operation: "set",
        path: `documentationTypes`,
        value: documentationTypes
    });
}


module.exports = {
    handleEntryCreated,
    handleDocumentCreated,
    handleFileUploaded,
    handleDocumentationTypes
}