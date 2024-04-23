const executeSELECTQuery = require('../../src/index');
const parseQuery = require("../../src/queryParser");

test("Testing WHERE Clause", async() => {
    const query = "SELECT id, name, age from sample WHERE age >= -25 AND id > -2";
    const data = await executeSELECTQuery(query);
    console.log(data);
    expect(data.length).toBe(3);
    expect(parseInt(data[0].age)).toBeGreaterThan(24);
});

test('Parse SQL Query with Multiple WHERE Clauses', () => {
    const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'sample',
        whereClauses: [{
            "field": "age",
            "operator": "=",
            "value": "30",
        }, {
            "field": "name",
            "operator": "=",
            "value": "John",
        }]
    });
});

test('Execute SQL Query with Multiple WHERE Clause', async () => {
    const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ id: '1', name: 'john' });
});