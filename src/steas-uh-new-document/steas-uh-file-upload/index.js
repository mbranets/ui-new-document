import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import {uploadBehavior} from './behaviors.js';
import handlers from './handlers.js';
import actions from './actions.js';

const {COMPONENT_BOOTSTRAPPED} = actionTypes;

const view = () => {
	return (
		<div className="file-upload">
			<label for="fileToUpload" className="upload-file-btn" id="uploadBtn">
				<input type="file" id="fileToUpload" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.zip,.tar,.dmg,.rar,.img" multiple/>
				<slot name="button" />
			</label>
		</div>
	);
};

createCustomElement('steas-uh-file-upload', {
	renderer: {type: snabbdom},
	view,
	styles,
	behaviors: [uploadBehavior],
	initialState: {
		files: [],
		types: [],
		validName: true,
		validType: false
	},
	actionHandlers: {

	},
	properties:  {
		recordId: {default: ''},
		table: {default: ''}
	}

});
