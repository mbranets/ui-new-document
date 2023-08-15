import '@servicenow/now-button';
import './steas-document-metadata/index.js';
import { t } from '@servicenow/library-translate';

const view = (state) => {

    return (
        <div className="record-form">
            {
                state.properties.toggleEdit || state.properties.label || state.properties.subtitle ?
                    <div
                        className="header"
                        style={{
                            'margin-bottom': state.properties.toggleEdit ? '0' : '20px'
                        }}>
                        <div className="titles">
                            {state.properties.label ? <h3>{t(state.properties.label)}</h3> : ''
                            }
                            {state.properties.subtitle ? <h4 className="subtitle">{t(state.properties.subtitle)}</h4> : ''
                            }
                        </div>
                        {
                            state.properties.toggleEdit ?
                                <now-button-stateful icon="pencil-page-outline" selected={state.edit}></now-button-stateful> : ''
                        }

                    </div> : ''
            }

            <form
                style={{
                    'flex-wrap': state.properties.break ? 'wrap' : 'nowrap'
                }}>
                {
                    state.fields.map((field) => {
                        return (
                            <div style={{ "width": "100%" }}>
                                <steas-document-metadata
                                    showLabel={state.properties.showLabels}
                                    break={state.properties.break}
                                    table={state.properties.table}
                                    element={field}
                                    value={state.record[field]}
                                    edit={state.edit}
                                    readonly={state.properties.readonly}
                                    registrationState={state.properties.record.state}
                                    lengthLimit={state.properties.lengthLimit}
                                    sysId={state.properties.record.hasOwnProperty('sys_id') ? state.properties.record.sys_id : null}>
                                </steas-document-metadata>
                            </div>
                        )
                    })
                }
            </form>
        </div>
    )
}

module.exports = {
    view
}