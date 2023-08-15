import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import {view} from './view.js';
import handlers from './handlers.js';
import actions from './actions.js';
import successHandlers from './successHandlers.js';
import errorHandlers from './errorHandlers.js';
import dictionarySuccessHandler, {handleDictionaryFetched} from './dictionarySuccessHandler.js'

const {COMPONENT_BOOTSTRAPPED} = actionTypes;
const {COMPONENT_RENDERED} = actionTypes;

createCustomElement('steas-document-meta', {
	renderer: {type: snabbdom},
	view: view,
	styles,
	actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]:               handlers.initialize,
        "NOW_INPUT#INPUT":                      handlers.handleValidation,
        "NOW_BUTTON_ICONIC#CLICKED":            handlers.handleFieldEdit,
        "NOW_INPUT#VALUE_SET":                  handlers.handleValid,
        "NOW_SELECT#SELECTED_ITEM_SET":         handlers.handleValid,
        "NOW_INPUT#INVALID_SET":                handlers.handleInvalid,
        "NOW_TYPEAHEAD#LIST_VISIBLE":           handlers.handleTypeaheadListOpened,
        "NOW_TYPEAHEAD#SELECTED_ITEM_SET":      handlers.handleItemSelected,
        "NOW_TYPEAHEAD#VALUE_SET":              handlers.handleValueItemSet,
        
        "FETCH_REFERENCES_REQUESTED":           actions.getReferences,
        "FETCH_DICTIONARY_DATA":                actions.getDictionaryData,
        "FETCH_CHOICES_REQUESTED":              actions.getChoices,
        "FETCH_DISPLAY_FIELD_REQUESTED":        actions.getDisplayField,

        "FETCH_DICTIONARY_SUCCEEDED":           handleDictionaryFetched,
        "FETCH_REFERENCE":                      dictionarySuccessHandler.handleReferenceFetch,
        
        "FETCH_CHOICES_SUCCEEDED":              successHandlers.handleChoicesFetched,
        "FETCH_DISPLAY_FIELD_SUCCEEDED":        successHandlers.handleDisplayFieldFetched,
        "FETCH_REFERENCES_SUCCEEDED":           successHandlers.handleReferencesFetched,
       
        "FETCH_REFERENCES_ERROR":               errorHandlers.handleReferencesFetchedError,
        "FETCH_DICTIONARY_ERROR":               errorHandlers.handleDictionaryError,
        

    },
    initialState: {
        label: 'Label',
        value: '-',
        choices: [],
        fields: ['name','number','sys_id','short_description']
    },
	properties: {
        showLabel: {default: true},
        break: {default: true},
        table: {default: 'x_steas_uh_doc_document'},
        sysId: {default: null},
        readonly:{default: false},
        registrationState: {default: ''},
        element: {
            default: ''
        },
        value: {
            default: ''
        },
        edit: {
            default: false
        },
        lengthLimit: {default: 99},
        screening: {}
    }
    
});

