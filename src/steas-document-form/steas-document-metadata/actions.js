import {createHttpEffect} from '@servicenow/ui-effect-http';

const getDictionaryData = createHttpEffect('/api/x_steas_uh_templat/documents/element/:element', {
    pathParams: [
        'element',
    ],
    queryParams: [
        'table'
    ],
    method: 'GET',
	successActionType: "FETCH_DICTIONARY_SUCCEEDED",
	errorActionType: "FETCH_DICTIONARY_ERROR"
});

const getChoices = createHttpEffect('/api/x_steas_uh_templat/documents/element/:element', {
    pathParams: [
        'element'
    ],
    method: 'GET',
	successActionType: "FETCH_CHOICES_SUCCEEDED",
	errorActionType: "FETCH_CHOICES_ERROR"
});

const getDisplayField = createHttpEffect('/api/now/table/sys_dictionary', {
    queryParams: [
        'sysparm_exclude_reference_link', 
        'sysparm_fields', 
        'sysparm_query',
        'sysparm_limit'
    ],
    method: 'GET',
	successActionType: "FETCH_DISPLAY_FIELD_SUCCEEDED",
	errorActionType: "FETCH_DISPLAY_FIELD_ERROR"
});

const getReferences = createHttpEffect('/api/now/table/:table', {
    pathParams: ['table'],
    queryParams: [
        'sysparm_exclude_reference_link', 
        'sysparm_fields', 
        'sysparm_query',
        'sysparm_limit'
    ],
    method: 'GET',
	successActionType: "FETCH_REFERENCES_SUCCEEDED",
	errorActionType: "FETCH_REFERENCES_ERROR"
});

module.exports = {
    getDictionaryData,
    getChoices,
    getDisplayField,
    getReferences
}