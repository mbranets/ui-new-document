const handleTemplatesFetched = ({action, dispatch, state, updateState}) => {
    let availableTemplates = [];
    if (state.selectedDocumentationType == '') {
        availableTemplates = action.payload.result;
    }
    else {
        action.payload.result.forEach((template) => {
            if (template.documentation_type.sys_id == state.selectedDocumentationType) {
                availableTemplates.push(
                    template
                );
            }
        });
    }
    updateState({
        availableTemplates: availableTemplates,
        templates: action.payload.result
    });
}

module.exports = {
    handleTemplatesFetched
}