import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import actions from './actions.js';
import handlers from './handlers.js';
import successHandlers from './successHandlers.js';
import errorHandlers from './errorHandlers.js';
import '@servicenow/now-button';
import '@servicenow/now-input';
import '@servicenow/now-select';
import './steas-uh-template-card/index.js';
import {t} from '@servicenow/library-translate';


const {COMPONENT_BOOTSTRAPPED} = actionTypes;

const view = (state, {updateState}) => {
    return (
        <div className="templates">
            <div className="title">
                <h3>{t('Choose templates')}</h3>
                {/* <now-input placeholder="Søk etter nøkkelord">
					<now-button-iconic slot="end" icon="magnifying-glass-outline" variant="tertiary" bare />
				</now-input> */}
            </div>
            <div className="template-selection">
                
            <now-button-bare 
                    disabled={!state.selectedTemplates.length}
                    icon-start="arrow-left-outline" 
                    label={state.selectedTemplates.length > 1 ? t("Add selected templates") : t("Add selected template")}>
                </now-button-bare>
                {state.templates.length > 1 ? <div>{t('Submitter\'s language') +': ' + (state.templates[0].submitterLanguage != ''? state.templates[0].submitterLanguage.toUpperCase(): 'EN')}</div> : null}
                </div>
            <div className="documentation-type-selection">
                <now-select
                    label={t('Documentation type')}
                    placeholder={t('Select documentation type')}
                    items={state.documentationTypes}
                    selectedItem={state.selectedDocumentationType}
                    style={{"min-width": "15rem"}}
                    ></now-select>
            </div>
            <div className="card-collection">
            {
                state.availableTemplates.map((temp) => {
                    return (
                        <steas-uh-template-card template={temp} selected={temp.selected}></steas-uh-template-card>
                    )
                })
            }
            </div>

                
        </div>
    )
};

createCustomElement('steas-uh-templates', {
	renderer: {type: snabbdom},
	view,
	styles,
	actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]: handlers.initialize,
        "FETCH_TEMPLATES": actions.getTemplates,
        "FETCH_TEMPLATES_SUCCEEDED": successHandlers.handleTemplatesFetched,
        "FETCH_TEMPLATES_ERROR": errorHandlers.handleTemplatesFetchError,
        "TEMPLATE_CARD#VALUE_SET": handlers.handleTemplateCardToggle,
        "NOW_BUTTON_BARE#CLICKED": handlers.handleButtonClick,
        "NOW_SELECT#SELECTED_ITEM_SET": handlers.handleSelectedItemSet,
	},
	initialState: {
        selectedTemplates: [],
        templates: [],
        availableTemplates: [],
        selectedDocumentationType: '',
        documentationTypes: [],
    },
    properties: {
        servicesTable: {
            default: ''
        },
        caseUID: {
            default: '0b035660070501101985f6fd7c1ed079'
        },
        documentationTypes: {default:[]}
    }
    
});
