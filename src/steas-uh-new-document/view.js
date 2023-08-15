import './steas-uh-templates/index.js';
import '../steas-document-form/index.js';
import './steas-uh-file-upload/index.js';
import '@servicenow/now-loader';
import '@servicenow/now-progress-bar';
import '@servicenow/now-heading';
import '@servicenow/now-button';
import { t } from '@servicenow/library-translate';


const view = (state, { updateState }) => {
    const entryUID = state.properties.entryUID;
    return (
        <div>
            <div className="metadata">
                <div className="preview">
                    <div className="preview-header">
                        <now-icon className={'caret' + (state.step == 0 ? 'active' : '')} icon="caret-right-fill"></now-icon>
                        <h4>{t('1. Choose documents')}</h4>
                    </div>

                    <div className="preview-header">
                        <now-icon className={'caret' + (state.step == 1 ? 'active' : '')} icon="caret-right-fill"></now-icon>
                        <h4>{t('2. Edit documents')}</h4>
                    </div>

                    {
                        state.newDocuments.map((doc, ix) => {
                            return (
                                <div className={'document-preview-item' + (ix != 0 && entryUID == null ? ' appendix' : '')}>

                                    <now-icon className={'caret' + (ix == state.ix && state.step == 1 ? 'active' : '')} icon="caret-right-fill"></now-icon>
                                    <now-icon icon={doc.file ? 'document-plus-outline' : doc.template ? 'document-template-outline' : ''}></now-icon>
                                    <now-button-bare
                                        className="preview-item-label"
                                        //doc.title.length > Element.length ? doc.title.substr(0, Element.length) + '...' + doc.title.substr(doc.title.length -5) :  doc.title
                                        label={
                                            doc.title
                                        }
                                        tooltip={doc.title}
                                        append-to-meta={{
                                            action: 'navigate_preview',
                                            ix: ix
                                        }}>
                                    </now-button-bare>
                                    {
                                        ix < (state.newDocuments.length - 1) && entryUID == null ?
                                            <now-button-bare className="move-btn" icon-start="caret-down-fill" size="sm" append-to-meta={{
                                                action: 'move_down',
                                                ix: ix
                                            }}></now-button-bare> : ''

                                    }

                                    {
                                        ix > 0 && entryUID == null ?
                                            <now-button-bare className="move-btn" icon-start="caret-up-fill" size="sm" append-to-meta={{
                                                action: 'move_up',
                                                ix: ix
                                            }}></now-button-bare> : ''
                                    }
                                    {
                                        !state.creating ?
                                            <now-button-bare className="remove-btn" icon-start="circle-close-outline" size="sm" append-to-meta={{
                                                action: 'remove',
                                                ix: ix
                                            }}></now-button-bare>
                                            : ''
                                    }
                                </div>
                            )

                        })
                    }
                    <div className="preview-header">
                        <now-icon className={'caret' + (state.step == 3 ? 'active' : '')} icon="caret-right-fill"></now-icon>
                        <h4>{t('3. Create')}</h4>
                    </div>
                </div>

                <div className="source-navigation">

                    {state.step < 1 && entryUID == null ?
                        <now-tabs items={state.items} hide-label fixed-width />
                        : ''}
                    {
                        (state.selectedTab == 'file' && !state.step) || (entryUID != null && !state.step) ?
                            <div id="filePickerRoot">
                                <h3>{t('Choose files')}</h3>
                                <now-button-bare
                                    icon-start="circle-plus-outline"
                                    variant="primary"
                                    label={t("Upload documents")}
                                    slot="button"
                                    on-click={(event) => {
                                        // Find rootElement
                                        let path = event.composedPath();
                                        var rootElement;
                                        for (var element of path) {
                                            if (element.id != "filePickerRoot") continue;
                                            rootElement = element;
                                            break;
                                        }
                                        // Find custom steas-uh-file-upload element
                                        let fileUploadElement = rootElement.querySelector("steas-uh-file-upload");
                                        // Click on input-element to trigger file upload
                                        fileUploadElement.shadowRoot.querySelector("#fileToUpload").click();
                                    }}>
                                </now-button-bare>
                                <steas-uh-file-upload
                                    entryUID={entryUID}>
                                </steas-uh-file-upload>
                            </div> : ''
                    }

                    {
                        state.selectedTab == 'template' && !state.step ?
                            <div>
                                <steas-uh-templates
                                    caseUID={state.properties.caseUID}
                                    documentationTypes={state.documentationTypes}>
                                </steas-uh-templates>
                            </div> : ''
                    }


                    {

                        state.step == 1 ?
                            <div className="add-metadata">
                                <steas-document-form
                                    label={t("Edit document")}
                                    record={state.newDocuments[state.ix]}
                                    recordId={state.ix}
                                    table={state.documentTable}
                                    fields={['title']}
                                    toggleEdit={false}
                                    editing={true}
                                    lengthLimit={state.newDocuments[state.ix].template != undefined ? 94 : 99}>
                                </steas-document-form>
                                {state.ix == 0 && entryUID == null ?
                                    <div>
                                        <now-typeahead
                                            style={{ 'width': '100%' }}
                                            search="contains"
                                            required={true}
                                            label={t("Documentation type")}
                                            append-to-payload={{ type: 'Document type' }}
                                            autofocus={true}
                                            items={state.documentationTypes}
                                            value={state.newDocuments[0].documentation_type.name}
                                        />
                                    </div> : ''}
                            </div> : ''
                    }
                    {
                        state.step >= 3 && !state.creating ?
                            <div className="final-summary" style={{
                                "display": "flex",
                                "height": "100%",
                                "justify-content": "center",
                                "align-items": "center"
                            }}>
                                <now-heading label={t("Create") + " " + state.newDocuments.length + " " + (state.newDocuments.length > 1 ? t("Documents").toLowerCase() : t("Document").toLowerCase()) + "?"} level="1" variant="header-secondary"></now-heading>
                            </div> : ''
                    }
                    {
                        state.creating ?

                            <div className="creating">
                                {
                                    state.loading ? <div style={{
                                        "display": "flex",
                                        "flex-direction": "column",
                                        "justify-content": "center",
                                        "align-items": "center"
                                    }}>
                                        <now-heading label={t("Creating your documents")} has-no-margin={true} level="1" variant="header-secondary"></now-heading>
                                        <img src="x_steas_uh_core.waiting.png" width="70%" />
                                        <now-loader label={t("One moment, soon finished")} size="md" action=""></now-loader>
                                        <div style={{ width: "200px" }}>
                                            <now-progress-bar path-type="initial" max={state.totalDocuments} value={state.finished} size="sm" config-aria={{ "progressbar": { "aria-label": "Survey progress" } }}></now-progress-bar>
                                        </div>
                                        <span>{state.finished} / {state.totalDocuments}</span>
                                    </div> : ''
                                }


                                {
                                    state.loading ? '' : !state.loadingError ?
                                        <div className="create-result">
                                            <span></span>
                                            <now-heading label={t("Your documents have been successfully created!")} level="1" variant="header-secondary"></now-heading>
                                            <now-button label={t("Upload more")} append-to-payload={{ action: 'reset_new_document' }}></now-button>
                                        </div> :
                                        <div className="create-result">
                                            <span></span>
                                            <now-heading label={t("Upload of documents failed") + ': ' + t(state.uploadErrorMessage)} level="1" variant="header-secondary"></now-heading>
                                            <   now-button label={t("Try again")} append-to-payload={{ action: 'try_again_new_document' }}></now-button>
                                        </div>
                                }
                            </div> : ''
                    }
                </div>
            </div>

            {
                <div className="footer">
                    {
                        state.step != 0 && !state.creating ?
                            <now-button
                                label={t("Previous")}
                                variant="secondary"
                                append-to-meta={{ action: 'previous' }}>

                            </now-button> : ''
                    }
                    {
                        state.newDocuments && !state.creating ?

                            <now-button
                                disabled={!state.newDocuments.length}
                                label={state.step > 2 ? t("Create") : t("Next") + (state.step == 1 ? " (" + (parseInt(state.ix) + 1) + "/" + state.newDocuments.length + ")" : "")}
                                variant="primary"
                                append-to-meta={{ action: 'next' }}>
                            </now-button> : ''

                    }
                </div>
            }
        </div>
    );
};
module.exports = {
    view
}