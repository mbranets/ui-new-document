import '@servicenow/now-input';
import '@servicenow/now-textarea';
import '@servicenow/now-typeahead';
import '@servicenow/now-select';
import '@servicenow/now-rich-text';
import {t} from '@servicenow/library-translate';


const view = (state, {updateState, updateProperties}) => {
    return (
        
        <li className="meta-field">
            {
                state.properties.showLabel ?
                    <label for={state.properties.element} className="label">
                        {t(state.label)}
                        {
                            state.invalid ?
                            <now-icon icon="asterisk-fill" size="sm" className={"mandatory" + (state.invalid ? " invalid" : "")} /> : ''
                        }
                    </label> : ''
            }
            <div className="value-container" style={{
                "position": state.inlineEdit ? "static" : "unset",
                "box-shadow": state.inlineEdit ? "0 0.125rem 0.25rem 0 RGBA(56,56,56,var(--now-opacity--less,0.25))" : "unset",
                "background-color": state.inlineEdit ? "#f6f8fa" : "unset",
                "width": state.inlineEdit ? "265px" : "auto",
                "padding": state.inlineEdit ? "0 10px 5px 10px" : "unset",
                "top": state.inlineEdit ? "25px" : "unset",
                "left": state.inlineEdit ? "5px" : "unset",
                "min-height": "20px"
            }}>
            {
                state.properties.edit && state.input == 'input'? 
                
                <now-input
                    invalid={state.invalid}
                    id={state.properties.element}
                    append-to-meta={{field: state.properties.element}}
                    type={state.type}
                    style={{"width": '100%'}}
                    value={state.properties.value} 
                    step={state.type == 'number' ? 1 : 'any'}
                    readonly={state.properties.registrationState == '3' ? true : state.readOnly}
                    maxlength={state.properties.lengthLimit}
                    disabled={state.systemField} /> : ''
            }

            {
                state.properties.edit && state.unspecified ? 
                <now-input
                    invalid={state.invalid}
                    id={state.properties.element}
                    append-to-meta={{field: state.properties.element}}
                    type="text" 
                    value={state.properties.value}
                    disabled={true}
                    messages={[{status: 'warning', content: 'Uspesifisert type'}]} /> : ''
            }

            {
                state.properties.edit && state.type == 'long_text' ? 
                <now-textarea
                    invalid={state.invalid}
                    id={state.properties.element}
                    append-to-meta={{field: state.properties.element}}
                    value={state.properties.value} 
                    readonly={state.properties.registrationState == '3' ? true : state.readOnly} 
                    required={state.mandatory}  /> : ''
            }
            {
                state.properties.edit && state.type == 'reference' ? 
                <now-typeahead
                    search="contains"
                    invalid={state.invalid}
                    id={state.properties.element}
                    append-to-payload={{name: state.properties.element}}
                    items={state.choices} 
                    value={state.properties.value} 
                    readonly={state.properties.registrationState == '3' ? true : state.readOnly || state.properties.readonly} 
                    required={state.mandatory}
                    manageInvalid={state.invalid}
                    style={{"width": "100%"}}
                    />: ''
            }

            {
                
                state.properties.edit && state.input == 'select' ? 
                <now-select
                    invalid={state.invalid}
                    id={state.properties.element}
                    append-to-meta={{field: state.properties.element}}
                    items={state.choices} 
                    value={state.properties.value} 
                    readonly={state.properties.registrationState == '3' ? true : state.readOnly}/>: ''
            }

            {
                state.properties.edit && state.type == 'html'  ? 
                <now-rich-text
                    invalid={state.invalid}
                    id={state.properties.element}
                    append-to-meta={{field: state.properties.element}}
                    value={state.properties.value} 
                    html={state.properties.value} 
                    readonly={state.properties.registrationState == '3' ? true : state.readOnly} 
                    required={state.mandatory} >
                </now-rich-text> : ''
            }
            
            {
                state.properties.edit && state.type == 'url' ? 
                <now-input-url
                    invalid={state.invalid}
                    id={state.properties.element}
                    append-to-meta={{field: state.properties.element}}
                    value={state.properties.value} 
                    readonly={state.properties.registrationState == '3' ? true : state.readOnly} 
                    required={state.mandatory}/> : ''
            }
        
            {
                !state.properties.edit ? 
                <span className="value" on-dblclick={() => {
                        updateState({inlineEdit: true, edit: true});
                        updateProperties({edit: true})
                    }
                } style={{
                    'white-space': state.properties.break ? 'inherit' : 'nowrap'
                }}>
                    {state.properties.value}
                    
                    
                </span> : ''
            }

            {
                state.inlineEdit ? (!state.systemField && !state.properties.readonly && !state.invalid && state.properties.registrationState != '3')?
                <div className="inline-buttons">
                    <now-button-iconic bare icon="close-outline" componentName="cancel"></now-button-iconic>
                    <now-button-iconic bare icon="check-outline" componentName="save"></now-button-iconic>
                </div> :  
                <div className="inline-buttons">
                    <now-button-iconic bare icon="close-outline" componentName="cancel"></now-button-iconic>
                </div> : ""
            }
            {
                !state.properties.edit && (!state.inlineEdit || state.inlineEdit == undefined) && !state.systemField && !state.properties.readonly && !state.readOnly && state.properties.registrationState != '3'? 
                <div className="inline-buttons"> 
                <now-button-iconic bare icon="pencil-fill" componentName="edit" on-click={() => {
                        updateState({inlineEdit: true, edit: true});
                        updateProperties({edit: true})
                    }}></now-button-iconic>
                </div> : ""
            }
            </div>
            
        </li>
    )
};

module.exports = {
    view
}