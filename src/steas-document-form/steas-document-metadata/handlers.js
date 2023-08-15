const initialize = ({ dispatch, state, updateState, updateProperties }) => {
    dispatch("FETCH_DICTIONARY_DATA", {
        element: state.properties.element,
        table: state.properties.table
    })
    updateState({
        invalid: false,
        value: state.properties.value
    })
}

const handleValid = ({ updateState, action, state, dispatch }) => {
    action.stopPropagation();
    updateState({
        invalid: !action.payload.value.length,
        value: action.payload.value
    })
    
    if(state.properties.sysId == null){
        dispatch("FORM_VALUES_UPDATED", action.payload)
    }

}

const handleInvalid = ({ updateState, action }) => {
    action.stopPropagation();
    updateState({
        invalid: !action.payload.fieldValue.length
    })
}

const handleTypeaheadListOpened = ({ dispatch, state }) => {
    const request = {
        table: state.reference,
        sysparm_query: 'ORDERBY' + state.display.element,
        sysparm_fields: 'sys_id,sys_updated_on' + state.display.element,
        sysparm_exclude_reference_link: true,
        sysparm_limit: 300
    }
    dispatch("FETCH_REFERENCES_REQUESTED", request);
}

const handleValidation = ({ action, updateState }) => {
    updateState({
        invalid: !action.payload.fieldValue.length,
        value: action.payload.fieldValue
    })
}

const handleFieldEdit = ({ state, action, updateState, updateProperties, dispatch }) => {
    action.stopPropagation();
    let actionName = action.meta.componentName;
    if (state.value == "" && actionName == "save" && state.properties.element != 'screening') {
        return
    }
    if (actionName == "save") {
        const data = {};
        data[state.properties.element] = state.properties.element != "screening" ? state.value : state.screening.value == null ? "" : state.screening.value;
        
        const updateRequest = {
            table: state.properties.table,
            sysId: state.properties.sysId,
            data: data,
        }
        dispatch('UPDATE_FORM_RECORD', updateRequest)
        dispatch("DOCUMENT_NAME_UPDATED", {
            element: state.properties.element,
            value: state.properties.element != "screening" ? state.value : state.screening,
        })
    }
    let stateValue, propertyValue;
    if(state.properties.element == "screening"){
        stateValue = actionName == "save" ? state.screening : state.properties.screening;
        propertyValue = actionName == "save" ? state.screening.display_value : state.properties.screening.display_value;
    } else {
        stateValue = actionName == "save" ? state.value : state.properties.value;
        propertyValue = stateValue;
    }

    dispatch("FIELD_VALUE_SET", {
        element: state.properties.element,
        value: stateValue
    });
    
    updateState({ inlineEdit: false, edit: false, invalid: false });
    updateProperties({ edit: false });
}

const handleItemSelected = ({ action, state, updateState}) => {
    action.stopPropagation();  
    let screening = {};
    screening.display_value = action.payload.item.label;
    screening.value = action.payload.item.id;
    if(state.properties.screening.hasOwnProperty('link')){
        let linkObj = state.properties.screening.link.split('/');
        linkObj[linkObj.lenght-1] = action.payload.item.id;
        screening.link = linkObj.join('/');
    }
    
    updateState({
        value: action.payload.item.label,
        screening: screening,
    })
}

const handleValueItemSet = ({ action, state, updateState}) => {
    let invalid = true;
    state.choices.map((choice) =>{
        if(choice.label.indexOf(action.payload.value) != -1 || action.payload.value == ""){
            invalid = false;    
        }
    })
    updateState({
        invalid: invalid
    })
}

module.exports = {
    initialize,
    handleValid,
    handleInvalid,
    handleTypeaheadListOpened,
    handleValidation,
    handleFieldEdit,
    handleItemSelected,
    handleValueItemSet
}