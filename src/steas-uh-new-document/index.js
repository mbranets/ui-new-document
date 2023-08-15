import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import handlers from './handlers.js';
import successHandlers from './successHandlers.js';
import errorHandlers from './errorHandlers.js';
import './steas-uh-templates/index.js';
import '../steas-document-form/index.js';
import './steas-uh-file-upload';
import actions from './actions.js';
import {view} from './view.js';



const {COMPONENT_CONNECTED} = actionTypes;
const {COMPONENT_BOOTSTRAPPED, COMPONENT_ERROR_THROWN, COMPONENT_PROPERTY_CHANGED} = actionTypes;

createCustomElement('steas-uh-new-document', {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]:                       handlers.initialise,
        [COMPONENT_PROPERTY_CHANGED]:                   handlers.initialise,
        "NOW_TABS#SELECTED_ITEM_SET":                   handlers.handleTabSelect,
        "NOW_BUTTON#CLICKED":                           handlers.handleButtonClicked,
        "NOW_BUTTON_BARE#CLICKED":                      handlers.handleButtonClicked,
        "FILE_UPLOAD#FILES_SELECTED":                   handlers.handleFilesUploaded,
        "TEMPLATES#TEMPLATES_SELECTED":                 handlers.handleTemplatesSelected,
        "FORM_VALUES_UPDATED":                          handlers.handleFormUpdate,
        "NOW_TYPEAHEAD#SELECTED_ITEM_SET":              handlers.handleDocumentTypeSeleted,
        
        "NEW_DOCUMENT#CREATE_ENTRY_REQUESTED":          actions.createEntry,
        "NEW_DOCUMENT#CREATE_DOCUMENT_REQUESTED":       actions.createDocument,
        "NEW_DOCUMENT#UPLOAD_FILE_REQUESTED":           actions.createAttachment,
        "TRIGGER_TEMPLATE":                             actions.runTemplate,
        "FETCH_DOCUMENTATION_TYPES":				    actions.getDocumentationTypes,

        "FETCH_DOCUMENTATION_TYPES_SUCCEEDED":		    successHandlers.handleDocumentationTypes,
        "NEW_DOCUMENTATION#CREATE_ENTRY_SUCCEEDED":     successHandlers.handleEntryCreated,
        "NEW_DOCUMENTATION#CREATE_DOCUMENT_SUCCEEDED":  successHandlers.handleDocumentCreated,
        "NEW_DOCUMENT#FILE_UPLOAD_SUCCEEDED":           successHandlers.handleFileUploaded,

		"FETCH_DOCUMENTATION_TYPES_ERROR":			    errorHandlers.Errorlogging,
        "NEW_DOCUMENT#FILE_UPLOAD_ERROR":               errorHandlers.handleUploadError,

    },
	initialState: {
        finished: 0,
        ix: 0,
        newDocuments: [],
        totalDocuments: 0,
        step: 0,
        items: [
            {id: 'template', label: 'Mal', icon: 'document-template-outline'},
            {id: 'file', label: 'Fil', icon: 'document-plus-outline'}
        ],
        fields: [
            'dokumenttype',
            'tittel'
        ],
        loadingError: false,
        uploadErrorMessage: '',
        documentationTypes: {default:[]},
        servicesTable: 'x_264729_m_re_og_r_sakstype',
        documentTable: 'x_steas_uh_doc_document',
        entryTable: 'x_steas_uh_doc_reg',
    },
    properties: {
        entryUID:{
            default: null
        },
        caseUID: {
            default: '0b035660070501101985f6fd7c1ed079'
        },
        refresh: { default: false }
    }
});
