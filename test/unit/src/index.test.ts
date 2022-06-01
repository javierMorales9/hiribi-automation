import { add } from "../../../src";

describe('index', () => {

    test("basic testing", () => {

        const result = add(1,2);
        expect(result).toBe(3);        
    });

});