import { t } from '@servicenow/library-translate';

const initialise = ({ state, updateState, dispatch }) => {
    updateState({
        ix: 0,
        newDocuments: [],
        totalDocuments: 0,
        step: 0
    })
    dispatch("FETCH_DOCUMENTATION_TYPES");
}

const handleTabSelect = ({ state, updateState, dispatch, action }) => {

    action.stopPropagation();
    updateState({
        operation: 'set',
        path: 'selectedTab',
        value: action.payload.value
    })
}

const handleTemplatesSelected = ({ action, updateState, state }) => {


    updateState({
        totalDocuments: parseInt(state.totalDocuments) + parseInt(action.payload.templates.length)
    })
    action.payload.templates.map((template) => {
        updateState({
            operation: 'push',
            path: 'newDocuments',
            value: {
                template: template.sysId,
                title: template.name,
                documentation_type: template.documentation_type
            }
        })
    })
}

const handleFilesUploaded = ({ action, state, updateState }) => {

    const files = action.payload.files;

    updateState({
        totalDocuments: parseInt(state.totalDocuments) + parseInt(files.length)
    })

    files.map((file) => {
        updateState({
            operation: 'push',
            path: 'newDocuments',
            value: {
                file: file,
                title: file.name.substr(0, file.name.lastIndexOf(".")),
                documentation_type: ''
            }
        })

    })

}

const handleButtonClicked = ({ updateState, action, state, dispatch }) => {
    try {
        var type = action.meta.appended ? action.meta.appended.action : action.payload.action;
        if (type == 'next') {
            action.stopPropagation();
            if (state.step == 3) {
                let titleEmpty = false;
                state.newDocuments.map((document) => {
                    if (document.title == "") {
                        titleEmpty = true;
                    }
                })
                if (titleEmpty) {
                    alert(t("One or more documents are missing a title. Add document title to proceed."))
                    return;
                }
                let duplicateTitle = false;
                state.newDocuments.map((document) => {
                    if (state.newDocuments.filter((doc) => doc.title == document.title).length > 1) {
                        duplicateTitle = true;
                    }
                })
                if (duplicateTitle) {
                    alert(t("One or more documents have the same title. Change document title to proceed."))
                    return;
                }
                let documenttypeEmpty = false;
                if (!(state.newDocuments[0].documentation_type.sys_id)) {
                    documenttypeEmpty = true;
                }
                if (documenttypeEmpty && state.properties.entryUID == null) {
                    alert(t("Missing documentation type. Please go to first document and choose documentation type."))
                    return;
                }
                if (state.properties.entryUID == null) {
                    dispatch('DISABLE_MODAL_CLOSE')
                    const entry = {
                        uh_case: state.properties.caseUID,
                        documentation_type: state.newDocuments[0].documentation_type.sys_id,
                        short_description: state.newDocuments[0].title
                    }
                    dispatch("NEW_DOCUMENT#CREATE_ENTRY_REQUESTED", {
                        data: entry
                    });
                } else {
                    dispatch('DISABLE_MODAL_CLOSE')
                    state.newDocuments.slice(0).reverse().map((doc) => {
                        const data = {
                            "registration": state.properties.entryUID,
                            "template": doc.template,
                            "title": doc.title,
                            "type": "attachment"
                        }
                        dispatch("NEW_DOCUMENT#CREATE_DOCUMENT_REQUESTED", {
                            data: data
                        });
                    })
                }
                updateState({
                    loading: true,
                    creating: true,
                })
            }

            if (state.step == 1 && state.newDocuments[state.ix].title == "") {
                return
            }
            if (state.step == 1 && state.ix == 0 && !(state.newDocuments[0].documentation_type.sys_id) && state.properties.entryUID == null) {
                return
            }
            if (state.step == 1 && state.ix == 0) {
                for (let i = 1; i < state.newDocuments.length; i++) {
                    updateState({
                        path: 'newDocuments[' + i + '].documentation_type',
                        operation: 'set',
                        value: state.newDocuments[0].documentation_type
                    })
                }
            }
            updateState({
                step: state.step == 0 ? 1 : state.ix == (state.newDocuments.length - 1) ? 3 : state.step,
                ix: state.step == 1 && state.step == 1 ? state.ix + 1 : 0
            })
        } else if (type == 'previous') {
            if (state.step == 3) {
                updateState({
                    ix: state.newDocuments.length - 1,
                    step: 1
                })
            }
            else if (state.step == 1 && state.newDocuments[state.ix].originalTitle != undefined) {
                const documents = state.newDocuments
                if (state.ix == 0) {
                    documents.map((doc, index) => {
                        if (doc.originalTitle != undefined) {
                            documents[index].title = doc.originalTitle
                        }
                    })
                } else if (state.newDocuments[state.ix].title == "") {
                    documents[state.ix].title = state.newDocuments[state.ix].originalTitle
                }
                updateState({
                    newDocuments: documents,
                    ix: state.step == 1 && state.ix > 0 ? state.ix - 1 : 0,
                    step: state.ix < 1 ? 0 : state.step
                })
            } else {
                updateState({
                    ix: state.step == 1 && state.ix > 0 ? state.ix - 1 : 0,
                    step: state.ix < 1 ? 0 : state.step
                })
            }
        } else if (type == 'remove') {

            updateState({
                title: "",
                ix: state.newDocuments.length == 2 ? 0 : state.ix > 0 ? state.ix - 1 : 0,
                step: state.newDocuments.length <= 1 ? 0 : state.step,
                totalDocuments: state.totalDocuments - 1
            });
            updateState({
                operation: 'splice',
                path: 'newDocuments',
                start: action.meta.appended.ix,
                deleteCount: 1
            })
        } else if (type == 'navigate_preview') {
            if (state.newDocuments[state.ix].title == "") {
                alert(t("Document is missing a title. Add document title to navigate to another document."))
                return;
            }
            updateState({
                ix: action.meta.appended.ix
            })
        } else if (type == 'move_up') {
            const ix = action.meta.appended.ix
            if (state.newDocuments[ix - 1].title == "" || state.newDocuments[ix].title == "") {
                alert(t("Document is missing a title. Add document title to change order."))
                return;
            }
            if (ix > 0) {
                const newDocuments = [];
                for (var i = 0; i < state.newDocuments.length; i++) {
                    if (i + 1 == ix) {
                        newDocuments.push(state.newDocuments[ix])
                    } else if (i == ix) {
                        newDocuments.push(state.newDocuments[ix - 1])
                    } else {
                        newDocuments.push(state.newDocuments[i])
                    }
                }
                updateState({
                    newDocuments: newDocuments
                })

                if (state.ix == ix) {
                    updateState({
                        ix: ix - 1
                    })
                }
            }
        } else if (type == 'move_down') {
            const ix = action.meta.appended.ix
            if (state.newDocuments[ix + 1].title == "" || state.newDocuments[ix].title == "") {
                alert(t("Document is missing a title. Add document title to change order."))
                return;
            }
            if (ix < (state.newDocuments.length - 1)) {
                const newDocuments = [];
                for (var i = 0; i < state.newDocuments.length; i++) {
                    if (i - 1 == ix) {
                        newDocuments.push(state.newDocuments[ix])
                    } else if (i == ix) {
                        newDocuments.push(state.newDocuments[ix + 1])
                    } else {
                        newDocuments.push(state.newDocuments[i])
                    }
                }
                updateState({
                    newDocuments: newDocuments
                })

                if (state.ix == ix) {
                    updateState({
                        ix: ix + 1
                    })
                }
            }
        } else if (type == 'reset_new_document') {
            updateState({
                loading: false,
                creating: false,
                step: 0,
                newDocuments: [],
                totalDocuments: 0,
                ix: 0
            })
        } else if (type == 'try_again_new_document') {
            updateState({
                loading: false,
                creating: false,
                step: 0,
                newDocuments: [],
                totalDocuments: 0,
                loadingError: false,
                uploadErrorMessage: '',
                ix: 0
            })
        } else if (type == 'close_new_document') {
            updateState({
                loading: false,
                creating: false,
                step: 0
            })
        }
    } catch (err) {
    }
}

const handleFormUpdate = ({ state, action, updateState }) => {
    const originalTitle = state.newDocuments[state.ix].originalTitle == undefined ? state.newDocuments[state.ix].title : state.newDocuments[state.ix].originalTitle;

    updateState({
        path: 'newDocuments[' + state.ix + '].title',
        operation: 'set',
        value: action.payload.value,
    })
    updateState({
        path: 'newDocuments[' + state.ix + '].originalTitle',
        operation: 'set',
        value: originalTitle,
    })
}

const handleDocumentTypeSeleted = ({ state, action, updateState }) => {
    action.stopPropagation();
    for (let i = 0; i < state.newDocuments.length; i++) {
        updateState({
            path: 'newDocuments[' + i + '].documentation_type',
            operation: 'set',
            value: {
                name: action.payload.item.label,
                sys_id: action.payload.item.id
            }
        })
    }
}

module.exports = {
    handleTabSelect,
    handleButtonClicked,
    handleFilesUploaded,
    handleTemplatesSelected,
    handleFormUpdate,
    initialise,
    handleDocumentTypeSeleted
}