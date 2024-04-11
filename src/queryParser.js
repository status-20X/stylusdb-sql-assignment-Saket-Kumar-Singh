function parseQuery(query){
    const selectRegex = "/SELECT (.+) FROM (.+)/i";
    const match = query.match(selectRegex);
    if(match){
        const [, fields, table] = match;
        return {
            fields : fields.split(",").map(field => trim()),
            table : table.trim()
        };
    } else{
        throw new error("Invalid query format");
    }
}

module.exports = parseQuery;