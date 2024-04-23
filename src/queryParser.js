// function parseQuery(query){
//     const selectRegex = "/SELECT (.+) FROM (.+)/i";
//     const match = query.match(selectRegex);

//     if(match){
//         const [, fields, table] = match;
//         return {
//             fields : fields.split(",").map(fields => fields.trim()),
//             table : table.trim()
//         };
//     } else {
//         throw Error("Invalid query format");
//     }
// }

// module.exports = parseQuery;

// function parseQuery(query) {
//     const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
//     const match = query.match(selectRegex);

//     if (match) {
//         const [, fields, table, whereClause] = match;
//         return {
//             fields: fields.split(',').map(field => field.trim()).map(field => field.toLowerCase()),
//             table: table.trim().toLowerCase(),
//             whereClause :  whereClause ? whereClause.trim().toLowerCase() : null
//         };
//     } else {
//         throw new Error("Invalid query format");
//     }
// }

function parseQuery(query) {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
    const match = query.match(selectRegex);

    if (match) {
        const [, fields, table, whereString] = match;
        const whereClauses = whereString ? parseWhereClause(whereString) : [];
        return  {
            fields: fields.split(',').map(field => field.trim()),
            table: table.trim(),
            whereClauses : whereClauses
        };
        // console.log(v);
    } else {
        throw new Error('Invalid query format');
    }
}

function parseWhereClause(whereString) {
    const conditions = whereString.split(/ AND | OR /i);
    // console.log(conditions);
    return conditions.map(condition => {
        const [field, operator, value] = condition.split(/\s+/);
        return { field, operator, value };
    });
}

module.exports = parseQuery;