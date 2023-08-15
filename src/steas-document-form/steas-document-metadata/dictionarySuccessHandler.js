import {typeDefs} from './typeChecker.js';

const handleDictionaryFetched = ({action, state, updateState, dispatch}) => {
    
    const validElement = (action.payload.result) && action.payload.result.length;
    if (validElement) {
        try {
            const internalType = action.payload.result[0].internal_type;
            const typeDef = typeDefs[internalType];
            const type = typeDef ? typeDef.type : null;
            const unspecified = !typeDef;
            const systemField = state.properties.element.startsWith('sys');
            const long = action.payload.result[0].max_length > 40;
            const choiceTable = action.payload.result[0].choice_table;
            const choiceField = action.payload.result[0].choice_field;
            const input = choiceTable && choiceField ? 'select' : typeDef ? typeDef.input : null;
            const mandatory = action.payload.result[0].mandatory == "true";
            const readOnly = action.payload.result[0].read_only == "true";
            const value = state.properties.value;
            const updates = {
                value: value,
                label: action.payload.result[0].column_label,
                type: type == 'text' && long ? 'long_text' : type,
                input: input,
                invalid: !!value.toString().length && mandatory && !readOnly && !unspecified && !systemField,
                reference: action.payload.result[0].reference,
                unspecified: unspecified,
                systemField: systemField,
                mandatory: mandatory,
                readOnly: readOnly
            }
            
            updateState(updates);

            if (internalType == 'reference') {
                dispatch('FETCH_REFERENCE', {});
            }
            

            updateState({
                choices: action.payload.result[0].choices
            })

        } catch (err) {
            
            
        }
        
    } else {
        alert(state.properties.element + " is invalid");
    }
    
}

const handleReferenceFetch = ({action, state, dispatch, updateState}) => {
    if (action.type == "FETCH_REFERENCE"){
        var strQuery = '';
        strQuery +='field='+state.properties.element + (state.properties.element == "screening" ? '^instance.default=true^ORDERBYcode' : "");
        const referenceRequest = {
            sysparm_query: strQuery,
            sysparm_display_value: true,
            sysparm_exclude_reference_link: true,
            sysparm_fields: state.fields,
            table: state.reference,
            sysparm_limit: 300
        }
        dispatch("FETCH_REFERENCES_REQUESTED", referenceRequest)
    }
    else if (action.payload.name) {
        var strQuery = '';
        state.fields.map((field, ix)=> {
            strQuery += ix == state.fields.length-1 ? field + 'LIKE' + action.payload.value : field + 'LIKE' + action.payload.value +'^OR';
        })
        strQuery +='^field='+state.properties.element;
        const referenceRequest = {

            sysparm_query: strQuery,
            sysparm_display_value: true,
            sysparm_exclude_reference_link: true,
            sysparm_fields: state.fields,
            table: state.reference,
            sysparm_limit: 300
        }
        dispatch("FETCH_REFERENCES_REQUESTED", referenceRequest)
    }
}


module.exports = {
    handleDictionaryFetched,
    handleReferenceFetch
}