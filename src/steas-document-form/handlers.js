const handleButtonClick = ({ updateState, action }) => {
    updateState({
        edit: action.payload.value
    })
}

const handleInvalidField = ({ updateState, action, state }) => {

    const ix = state.fields.indexOf(action.payload.field);
    updateState({
        operation: 'splice',
        path: 'fields',
        start: ix,
        deleteCount: 1
    })

}

const initialize = ({ updateState, dispatch, state }) => {
    if (state.properties.sysId) {
        dispatch("RECORD_DATA_REQUESTED", {
            sysId: state.properties.sysId,
            table: state.properties.table,
            sysparm_exclude_reference_link: true,
            sysparm_fields: state.properties.fields.toString()
        })
    } else if (state.properties.record) {
        let record = {};
        for(var field in state.properties.record){
            record[field] = state.properties.record[field]
            // } else {
            //     let updatedOn = new Date(state.properties.record[field])
            //     const timezoneOffset = (new Date()).getTimezoneOffset();
            //     console.log('Timing1: ', updatedOn, timezoneOffset, state.properties.record[field])
            //     updatedOn.setTime(updatedOn.getTime() - timezoneOffset*60*1000);
            //     record[field] = updatedOn.toLocaleString('no-NO').toString().replace(",", "");
            //     console.log('Timing2: ' ,updatedOn, record[field])
            // }
        }
        updateState({
            record: record
        })
    }

    updateState({
        fields: state.properties.fields,
        edit: state.properties.editing
    })
    console.log("MB TEST", state)
}

const updateForm = ({ action, state, dispatch, updateState }) => {

    let record = {};
    
    for(var field in state.record){
        record[field] = state.record[field]
    }

    record[action.payload.element] = action.payload.value;
    updateState({
        record: record
    });
    dispatch("FORM_VALUES_UPDATED", { record: record, id: state.properties.record.sys_id });
}

const handleSelectedTypeahead = ({ action, state, dispatch }) => {
    const data = {};
    data[action.payload.name] = action.payload.value;
    const updateRequest = {
        table: state.properties.table,
        sysId: state.properties.recordId,
        data: data
    }
    dispatch('UPDATE_FORM_RECORD', updateRequest)
}

const test = ({ action, state, }) => {
}

module.exports = {
    handleButtonClick,
    initialize,
    handleInvalidField,
    updateForm,
    handleSelectedTypeahead,
    test
}