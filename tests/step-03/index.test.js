const parseQuery = require("../../src/queryParser")


// This is the test to throw an er
test("Query Parser", () => {
    const Query  = "INSERT INTO sample (id, name) values (5, Honey)";
    const parseQueryWrapper = () => {
        parseQuery(Query);
    };
    expect(parseQueryWrapper).toThrow(Error);
    expect(parseQueryWrapper).toThrow("Invalid query format")
});

test("Query Parser", () => {
    const Query  = "SELECT id, name from sample";
    const parsed = parseQuery(Query);
    expect(parsed).toEqual({
        fields : ["id", "name"],
        table : "sample",
        whereClauses : [] 
    });
});