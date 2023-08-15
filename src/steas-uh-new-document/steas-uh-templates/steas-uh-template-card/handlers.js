const handleCardClick = ({updateState, state}) => {
    updateState({
        selected: !state.selected
    })
}

module.exports = {
    handleCardClick
}