import {createHttpEffect} from '@servicenow/ui-effect-http';

const getRecordData = createHttpEffect('/api/now/table/:table/:sysId', {
    pathParams: ['sysId', 'table'],
    queryParams: ['sysparm_exclude_reference_link', 'sysparm_fields'],
    method: 'GET',
	successActionType: "FETCH_RECORD_DATA_SUCCEEDED",
	errorActionType: "FETCH_RECORD_DATA_ERROR"
});

const updateFormRecord = createHttpEffect('/api/now/table/:table/:sysId', {
    pathParams: ['table', 'sysId'],
    method: 'PATCH',
    dataParam: 'data',
	successActionType: "UPDATE_FORM_RECORD_SUCCEEDED",
	errorActionType: "UPDATE_FORM_RECORD_FAILED"
})

module.exports = {
    getRecordData,
    updateFormRecord
}