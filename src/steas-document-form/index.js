import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import {view} from './view.js';
import handlers from './handlers.js';
import actions from './actions.js';
import successHandlers from './successHandlers.js';

const {COMPONENT_BOOTSTRAPPED} = actionTypes;
const {COMPONENT_PROPERTY_CHANGED} = actionTypes;

createCustomElement('steas-document-form', {
	renderer: {type: snabbdom},
	view: view,
	styles,
	actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]:               handlers.initialize,
        [COMPONENT_PROPERTY_CHANGED]:           handlers.initialize,

        "NOW_BUTTON_STATEFUL#SELECTED_SET":     handlers.handleButtonClick,
        "FIELD_VALUE_SET":                      handlers.updateForm,
        "NOW_TYPEAHEAD#SELECTED_ITEM_SET":      handlers.handleSelectedTypeahead,
        
        "UPDATE_FORM_RECORD":                   actions.updateFormRecord,
        "RECORD_DATA_REQUESTED":                actions.getRecordData,

        "FETCH_RECORD_DATA_SUCCEEDED":          successHandlers.handleRecordDataFetched,
    },
    initialState: {
        fields: [],
        record: {}
    },
	properties: {
        label: {default: null},
        subtitle: {default: null},
        break: {default: true},
        editing: {default: false},
        toggleEdit: {default: false},
        sysId: {default: null},
        table: {default: 'sys_user'},
        minimal: {default: false},
        record: {default: {}},
        showLabels: {default: true},
        readonly:{default: false},
        fields: {
            default: ['title']
        },
        recordId: {default: ''},
        lengthLimit: {default: 99},
    }
});