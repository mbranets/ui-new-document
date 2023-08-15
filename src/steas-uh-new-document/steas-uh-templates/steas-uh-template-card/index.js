import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import handlers from './handlers.js';
import '@servicenow/now-card';
import '@servicenow/now-icon';

const { COMPONENT_CONNECTED } = actionTypes;

const view = (state, { updateState, dispatch }) => {
    const template = state.properties.template
    return (
        <div
            className={'card' + (state.selected ? ' selected' : '')}
            on-click={() => dispatch("TEMPLATE_CARD#VALUE_SET", {
                sysId: state.properties.template.template,
                name: state.properties.template.name,
                documentation_type: state.properties.template.documentation_type,
                selected: !state.selected
            })}>
            <now-card size="md" interaction="select">
                <now-card-header
                    tagline={{ "label": template.number, "icon": "document-template-outline" }}
                    heading={{ "label": "(" + template.language.toUpperCase() + ") " + template.name, "size": "sm", "lines": 1 }}>
                </now-card-header>
            </now-card>
        </div>
    )
};

createCustomElement('steas-uh-template-card', {
    renderer: { type: snabbdom },
    view,
    styles,
    actionHandlers: {
        "TEMPLATE_CARD#VALUE_SET": handlers.handleCardClick
    },
    initialState: {
    },
    properties: {
        templateId: {
            default: ''
        },
        template: {
            default: {
                sys_id: {
                    default: '-'
                }
            }
        },
        selected: {
            default: false
        }
    }
});
