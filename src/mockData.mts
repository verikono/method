import { assert } from "vitest";

const ROWS = 1000;

type ProductData = {
    id: number;
    description: string;
    price: number;
}

export function getMockData() {
    return Array.from(Array(ROWS)).map((_, i) => {
            return {
                id: i,
                description: `product${i}`,
                price: parseFloat((Math.random() * 100).toString())
            }
        });
}




if(import.meta.vitest) {

    const {
        describe,
        test,
        expect,
    } = import.meta.vitest;

    describe("mockData", () => {

        test("produces 1000 valid rows", async () => {
            const result = getMockData();
            expect(result.length).toBe(1000);
            const rndItemNum = parseInt((Math.random() * 1000).toString(), 10);
            expect(result[rndItemNum].id).toBeTypeOf('number');
            expect(result[rndItemNum].description).toBeTypeOf('string');
            expect(result[rndItemNum].price).toBeTypeOf('number');
        });

    });

}
