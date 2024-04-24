const executeSELECTQuery = require('../../src/index');

test('Command Other than SELECT', async () => {
    const query = 'INSERT id, name FROM sample';
  
    const parseQueryWrapper = async () => {
      try {
        await executeSELECTQuery(query);
      } catch (error) {
        throw new Error('Method Not Allowed');
      }
    };
  
    // Use expect().rejects.toThrow() to handle async rejections
    await expect(parseQueryWrapper()).rejects.toThrow(Error);
    await expect(parseQueryWrapper()).rejects.toThrow('Method Not Allowed');
  });



  test('Wrong Field Names', async () => {
    const query = 'SELECT second_name, name FROM sample';
  
    // Use try...catch to handle the expected error
    const parseQueryWrapper = async () => {
      try {
        await executeSELECTQuery(query);
      } catch (error) {
        throw new Error('Fld Not Present');
      }
    };
  
    // Use expect().rejects.toThrow() to handle async rejections
    await expect(parseQueryWrapper()).rejects.toThrow(Error);
    await expect(parseQueryWrapper()).rejects.toThrow('Fld Not Present');
  });
  

test('Execute SQL Query', async () => {
    const query = 'SELECT id, name FROM sample';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).not.toHaveProperty('age');
    expect(result[0]).toEqual({ id: '1', name: 'john' });
});