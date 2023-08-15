import {t} from '@servicenow/library-translate';

const handleTemplateCardToggle = ({action, updateState, state}) => {
    
    
    const selectedTemplate = action.payload;
    const shouldAdd = action.payload.selected;
    
    if (shouldAdd) {
        const operation = {
            operation: 'push',
            path: 'selectedTemplates',
            value: selectedTemplate
        }
        
        updateState(operation)
    } else {
        const selectedTemplates = state.selectedTemplates;
        const ix = selectedTemplates.indexOf(selectedTemplate);
        const operation = {
            operation: 'splice',
            path: 'selectedTemplates',
            start: ix,
            deleteCount: 1
        }
        
        updateState(operation)
    }

    
    
}

const initialize = ({dispatch, action, updateState, state}) => {
    dispatch("FETCH_TEMPLATES", {
        caseId: state.properties.caseUID
    })
    const documentationTypes = [{id: '', label: t('All')}];
    documentationTypes.push(...state.properties.documentationTypes)
    updateState({documentationTypes: documentationTypes})
}

const handleButtonClick = ({dispatch, state, action}) => {
    action.stopPropagation();
    
    dispatch("TEMPLATES#TEMPLATES_SELECTED", {
        templates: state.selectedTemplates
    })
}

const handleSelectedItemSet = ({action, updateState, state}) => {
    
    let availableTemplates = [];
    if (action.payload.value == '') {
        availableTemplates = state.templates;
    } else {
        state.templates.forEach(template => {
            if (template.documentation_type.sys_id == action.payload.value) {
                availableTemplates.push(template)
            }
        })
    }
    updateState({
        selectedDocumentationType: action.payload.value,
        availableTemplates: availableTemplates
    })
}
module.exports = {
    handleTemplateCardToggle,
    handleButtonClick,
    handleSelectedItemSet,
    initialize
}