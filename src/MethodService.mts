import express, {
    application,
    type Application
} from 'express';

import {
    getMockData
} from './mockData.mjs';

import config from './config.json';
                        


export class MethodService {


    data: ProductData[] = getMockData();
    express: Application;
    routes: Record<string, unknown> = {};


    protected constructor() {
        this.express = express();
        this.setRoutes();
    }

    public start() {
        this.express.listen(config.port);
    }


    private setRoutes() {
        Object.assign(this.routes, {
            products: {
                get: this.express.get('/products', ( _, res ) => {
                    res.send(JSON.stringify(this.data, null, 2));
                }),
                getOne: this.express.get('/products/:id', ( req, res ) => {
                    throw new Error("not implemented");
                }),
                deleteOne: this.express.delete('/products/:id', (req, res ) => {
                    throw new Error("not implemented");
                })
            }
        });

    }

    public static async init( start: boolean = false ):Promise<MethodService> {
        const service = new MethodService();
        if(start)
            service.express.listen(config.port);
        return service;
    }

}





if(import.meta.vitest) {

    const {
        beforeAll,
        describe,
        test,
        expect,
    } = import.meta.vitest;

    describe("@method/MethodService", () => {

        let instance:MethodService;

        beforeAll( async () => {
            instance = await MethodService.init(true);
        });

        test("initializes", async () => {
            expect(instance.express).toBeTypeOf('function');
            expect(instance.express.name).toBe('app');
        });

        describe(`product retrieval`, () => {

            let response: Response;
            let result: ProductData[];
            let rndTestIdx = parseInt((Math.random() * 1000).toString(), 10);
            let testElement: ProductData;

            test(`gets a valid response`, async () => {
                response = await fetch(`http://localhost:${config.port}/products`);
                expect(response.status).toBe(200);
            });
    
            test(`gets a valid response`, async () => {
                result = await response.json();
                expect(result).toBeInstanceOf(Array);
                testElement = result[rndTestIdx];
            });

            test(`got 1000 items`, () => expect(result.length).toBe(1000));
            test(`id is a number`, () => expect(testElement.id).toBeTypeOf('number'));
            test(`description is a string`, () => expect(testElement.description).toBeTypeOf('string'));
            test(`description is formatted`, () => expect(testElement.description).toBe(`product${rndTestIdx}`));
            test(`price is a number`, () => expect(testElement.price).toBeTypeOf('number'));

        });

    });

}
