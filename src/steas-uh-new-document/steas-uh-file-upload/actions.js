import {createHttpEffect} from '@servicenow/ui-effect-http';

const createDocument = createHttpEffect('/api/now/table/x_steas_nsm_kp_document_description', {
    pathParams: [],
    method: 'POST',
    dataParam: 'data',
	successActionType: "DOCUMENT_CREATE_SUCCEEDED",
	errorActionType: "DOCUMENT_CREATE_ERROR"
});

const createAttachment = createHttpEffect('api/now/attachment/file?table_name=:table&table_sys_id=:id&file_name=:file_name', {
    pathParams: ['table', 'id', 'file_name'],
    method: 'POST',
    dataParam: 'data',
	successActionType: "DOCUMENT_CREATE_SUCCEEDED",
	errorActionType: "DOCUMENT_CREATE_ERROR"
});

const getChoices = createHttpEffect('/api/now/table/sys_choice?sysparm_query=name%3Dx_steas_nsm_kp_document_description%5Eelement%3Ddocument_type', {
    method: 'GET',
	successActionType: "CHOICE_FETCH_SUCCESS",
	errorActionType: "CHOICE_FETCH_ERROR"
});

module.exports = {
    createDocument,
    createAttachment,
    getChoices
}