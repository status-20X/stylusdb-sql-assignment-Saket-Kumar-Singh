const executeSELECTQuery = require('../../src/index');

test("Checking WHERE Clause", async () =>{
    const query = "SELECT id, name FROM sample WHERE age = 25";
    const data = await executeSELECTQuery(query);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("jane");
});

// This proves that the code I have written is case Insensetive
test("Checking Case Senstivity", async () =>{
    const query = "SELECT id, name FROM sample WHERE name = JOHN";
    const data = await executeSELECTQuery(query);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("john");
});


test("Query other than SELECT", async()=>{
    const query = "INSERT INTO (name, id), values (Honey, 5)";
    const packaeQuery = async () =>{    
        try{
            await executeSELECTQuery(query);
        }catch(error){
            throw new Error("Method not allowed");
        }
    }
    await expect(packaeQuery()).rejects.toThrow(Error);
    await expect(packaeQuery()).rejects.toThrow("Method not allowed");
});