const { required } = require('joi');
const { MongoClient } = require('mongodb');
const config = require('../config/global.json');
const { createUUID } = require('../../src/helper/common-function')
describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(config.__MONGO_URI__, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        db = await connection.db(config.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('should insert a doc into collection successfully', async () => {
        const users = db.collection('test');
        let uniqueName = createUUID();
        const mockUser = { display_name: uniqueName, country: 'Tr' };
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({ display_name: uniqueName });
        expect(insertedUser).toEqual(mockUser);
    });


});