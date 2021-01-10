const { createUUID } = require('../../src/helper/common-function');

describe("Create GUID ", () => {
    it("guid length should be 36", () => {
        let guid = createUUID();
        expect(guid.length).toBe(36);
    })
});