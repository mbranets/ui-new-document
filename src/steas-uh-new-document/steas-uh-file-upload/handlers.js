const handleInvalidNameSet = ({state, updateState, dispatch, action}) => {
    
    updateState({
        path: 'validName',
        operation: 'set',
        value: false
    })
}

const handleValidNameSet = ({updateState}) => {
    
    updateState({
        path: 'validName',
        operation: 'set',
        value: true
    })
}

const handleInvalidTypeSet = ({updateState}) => {
    
    updateState({
        path: 'validType',
        operation: 'set',
        value: false
    })
}

const handleValidTypeSet = ({action, updateState}) => {
    
    updateState({
        path: 'validType',
        operation: 'set',
        value: true
    })

    updateState({
        path: 'document_type',
        operation: 'set',
        value: action.payload.item.label
    })
}

module.exports = {
    handleInvalidNameSet,
    handleValidNameSet,
    handleInvalidTypeSet,
    handleValidTypeSet
}