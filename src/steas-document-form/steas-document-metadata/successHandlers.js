const handleChoicesFetched = ({action, updateState, state}) => {
    updateState({
        choices: action.payload.result[0].choices
    })
}

const handleDisplayFieldFetched = ({state, action, updateState}) => {
    updateState({
        display: action.payload.result[0]
    })
}

const handleReferencesFetched = ({updateState, action, state}) => {
    const update = []
    action.payload.result.map((reference) => {
        update.push({
            id: reference.sys_id,
            label: reference.short_description || reference.name ,
            sublabel: "Updated on " + reference.sys_updated_on,
            icon: "document-blank-outline"
        })
        updateState({
            choices: update
        })
    })
}

module.exports = {
    handleChoicesFetched,
    handleDisplayFieldFetched,
    handleReferencesFetched
}