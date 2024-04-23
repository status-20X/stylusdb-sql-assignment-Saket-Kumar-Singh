const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
    try{
       const out = parseQuery(query);
    } catch (error){
        throw new Error('Method Not Allowed')
    }
    const v = parseQuery(query);
    const {fields, table, whereClauses} = v;
    // console.log(whereClauses);

    const data = await readCSV(`${table}.csv`);
    
    // console.log(whereClause);
    // You can expand this to handle different operators
    const filteredData = whereClauses.length > 0
    ? data.filter(row => whereClauses.every(clause => {
            clause.field = clause.field.toLowerCase();
            // clause.value = clause.value.toLowerCase();
            const p = parseInt(clause.value);
            if(!isNaN(p)) {
                clause.value = p;
            }
            else{
                clause.value = clause.value.toLowerCase();
            }
            row[clause.field] = row[clause.field].toLowerCase();
            if(!isNaN(p)){
                row[clause.field] = parseInt(row[clause.field]);
                if(isNaN(row[clause.field])){
                    throw new Error("Cannot Compare Int and String");
                }
            }
            else{
                row[clause.field] = row[clause.field].toLowerCase();
            }
            if(clause.operator == '='){
                if(row[clause.field] === clause.value){
                    return true;
                }
                return false;
            }
            else if(clause.operator == '>'){
                if(row[clause.field] > clause.value){
                    return true;
                }
                return false;
            }
            else if(clause.operator == '<'){
                if(row[clause.field] < clause.value){
                    return true;
                }
                return false;
            }
            else if(clause.operator == '<='){
                if(row[clause.field] <= clause.value){
                    return true;
                }
                return false;
            }
            else if(clause.operator == '>='){
                if(row[clause.field] >= clause.value){
                    return true;
                }
                return false;
            }
            else{
                throw new Error('Invalid Operator');
            }
        }))
    : data;

    // Filter the fields based on the query
    return filteredData.map(row => {
        const filteredRow = {};
        fields.forEach(field => {
            const val = row[field.toLowerCase()];
            if(val == undefined){
                throw new Error('Field not Present');
            } else {
                try{
                    filteredRow[field.toLowerCase()] = val.toLowerCase();
                } catch(error){
                    filteredRow[field.toLowerCase()] = val;
                }
            }
        });
        // console.log(filteredRow);
        return filteredRow;
    });
}

module.exports = executeSELECTQuery;