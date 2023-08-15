import {createHttpEffect} from '@servicenow/ui-effect-http';

const createEntry = createHttpEffect('/api/now/table/x_steas_uh_doc_reg', {
    method: 'POST',
    dataParam: 'data',
    successActionType: "NEW_DOCUMENTATION#CREATE_ENTRY_SUCCEEDED",
	errorActionType: "NEW_DOCUMENTATION#CREATE_ENTRY_ERROR"
});

const createDocument = createHttpEffect('/api/now/table/x_steas_uh_doc_document', {
    method: 'POST',
    dataParam: 'data',
    successActionType: "NEW_DOCUMENTATION#CREATE_DOCUMENT_SUCCEEDED",
	errorActionType: "NEW_DOCUMENTATION#CREATE_DOCUMENT_ERROR"
});

const createAttachment = createHttpEffect('/api/x_steas_uh_templat/documents/upload_attachment/:documentId',  {
    pathParams: ['documentId'],
    queryParams: ['file_name', 'file_type'],
    method: 'POST',
    headers: {
        'Content-Type': '',
        'Accept': 'null, application/json, text/plain, */*'
    },
    dataParam: 'file',
    successActionType: "NEW_DOCUMENT#FILE_UPLOAD_SUCCEEDED",
    errorActionType: "NEW_DOCUMENT#FILE_UPLOAD_ERROR"
});

const runTemplate = createHttpEffect('/api/x_steas_uh_templat/documents/run_template/:documentId', {
    pathParams: ['documentId'],
    method: 'POST',
    successActionType: "NEW_DOCUMENT#FILE_UPLOAD_SUCCEEDED",
    errorActionType: "NEW_DOCUMENT#FILE_UPLOAD_ERROR"
});

const getDocumentationTypes = createHttpEffect('/api/now/table/x_steas_uh_func_documentation_type', {
    method: 'GET',
    successActionType: "FETCH_DOCUMENTATION_TYPES_SUCCEEDED",
	errorActionType: "FETCH_DOCUMENTATION_TYPES_ERROR"
});

module.exports = {
    createEntry,
    createDocument,
    createAttachment,
    runTemplate,
    getDocumentationTypes
}