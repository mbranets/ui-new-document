import {createHttpEffect} from '@servicenow/ui-effect-http';

const initialize = ({dispatch, action, updateState, state}) => {
    dispatch("FETCH_TEMPLATES", {
        caseId: state.properties.templateId
    })
}

const getTemplateData = createHttpEffect('/api/now/table/:table', {
    pathParams: ['table'],
    queryParams: ['query'],
    method: 'GET',
	successActionType: "FETCH_TEMPLATE_DATA_SUCCEEDED",
	errorActionType: "FETCH_TEMPLATE_DATA_ERROR"
})

module.exports = {
    initialize,
    getTemplateData
}