const { getCountryName } = require('../../src/helper/country-code');

describe("Country Code ", () => {
    it("TR should be Turkey", () => {
        let countryName = getCountryName("TR");
        expect(countryName).toBe("Turkey");
    })
    it("Default case return Global", () => {
        let countryName = getCountryName("dlskfals");
        expect(countryName).toBe("Global");
    })
});