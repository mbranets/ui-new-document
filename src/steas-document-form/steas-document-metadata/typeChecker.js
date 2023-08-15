
const typeDefs = {
    integer:            {type: 'number',        input: "input"},
    string:             {type: 'text',          input: "input"},
    email:              {type: 'email',         input: "input"},
    glide_date_time:    {type: 'text',          input: "input"},
    glide_date:         {type: 'text',          input: "input"},
    choice:             {type: 'choice',        input: "select"},
    reference:          {type: 'reference',     input: "typeahead"},
    html:               {type: 'html',          input: "html"}
}

module.exports = {
    typeDefs
}