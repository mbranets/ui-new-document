import {createHttpEffect} from '@servicenow/ui-effect-http';

const getTemplates = createHttpEffect('/api/x_steas_uh_templat/documents/:caseId', {
    pathParams: ['caseId'],
    method: 'GET',
	successActionType: "FETCH_TEMPLATES_SUCCEEDED",
	errorActionType: "FETCH_TEMPLATES_ERROR"
})

module.exports = {
    getTemplates
}