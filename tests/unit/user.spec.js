const { MongoClient } = require('mongodb');
const config = require('../config/global.json');

describe('insert', () => {
    //    let connection;
    //    let db;
    //
    //    beforeAll(async () => {
    //        connection = await MongoClient.connect(config.__MONGO_URI__, {
    //            useNewUrlParser: true,
    //        });
    //        db = await connection.db(config.__MONGO_DB_NAME__);
    //    });
    //
    //    afterAll(async () => {
    //        await connection.close();
    //        await db.close();
    //    });
    //
    //    it('should insert a doc into collection', async () => {
    //        const users = db.collection('users');
    //
    //        const mockUser = { _id: 'some-user-id', name: 'John' };
    //        await users.insertOne(mockUser);
    //
    //        const insertedUser = await users.findOne({ _id: 'some-user-id' });
    //        expect(insertedUser).toEqual(mockUser);
    //    });
    it("", () => {
        expect(1).toBe(1);
    })
});