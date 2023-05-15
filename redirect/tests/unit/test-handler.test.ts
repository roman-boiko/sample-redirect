import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';

const event: APIGatewayProxyEventV2 = {
    version: '',
    routeKey: '',
    rawPath: '',
    rawQueryString: '',
    cookies: [],
    headers: {},
    queryStringParameters: {},
    requestContext: {
        accountId: '',
        apiId: '',
        domainName: '',
        domainPrefix: '',
        http: {
            method: '',
            path: '',
            protocol: '',
            sourceIp: '',
            userAgent: '',
        },
        requestId: '',
        routeKey: '',
        stage: '',
        time: '',
        timeEpoch: 0,
    },
    body: '',
    pathParameters: {},
    isBase64Encoded: false,
    stageVariables: {},
};

const urlPathMap: { [key: string]: string } = {
    '/portfolio': 'https://www.newsite.com/styling-and-photo',
    '/shop': 'https://www.newsite.com/edits/my-home-edit',
    '/feedback': 'https://www.newsite.com/styling-and-photo',
    '/about': 'https://www.newsite.com/about',
    '/contact': 'https://www.newsite.com/about',
    '/listsandthoughts/layered-soft-warm-livable-habitable-minimalism-habitable-minimalism-so-what-is-it-exactly':
        'https://www.newsite.com/journal/habitable-minimalism',
    '/listsandthoughts/3-interior-design-interior-styling-books-i-can-recommend':
        'https://www.newsite.com/journal/3-interior-design-interior-styling-books',
    '/listsandthoughts/5-interior-design-amp-styling-blogs-check-every-week':
        'https://www.newsite.com/journal/5-interior-design-amp-lifestyle-blogs-i-check-regularly',
    '/listsandthoughts/5-big-ikea-products-i-have':
        'https://www.newsite.com/journal/4-ikea-products-i-have-at-home-and-really-love',
};

describe('Unit test for app handler', function () {
    it('verifies correct redirect for root path with get method', async () => {
        event.rawPath = '/';
        event.requestContext.http.method = 'GET';
        const result: APIGatewayProxyResultV2 = (await lambdaHandler(event)) as APIGatewayProxyStructuredResultV2;
        expect(result.statusCode).toEqual(301);
        expect(result.headers?.Location).toEqual('https://www.newsite.com/');
    });

    it('verifies correct for post method', async () => {
        event.rawPath = '/';
        event.requestContext.http.method = 'POST';
        const result: APIGatewayProxyResultV2 = (await lambdaHandler(event)) as APIGatewayProxyStructuredResultV2;
        expect(result.statusCode).toEqual(301);
        expect(result.headers?.Location).toEqual('https://www.newsite.com/');
    });
    it('verifies correct redirect for worng path and get method', async () => {
        event.rawPath = '/qwerty';
        event.requestContext.http.method = 'GET';
        const result: APIGatewayProxyResultV2 = (await lambdaHandler(event)) as APIGatewayProxyStructuredResultV2;
        expect(result.statusCode).toEqual(301);
        expect(result.headers?.Location).toEqual('https://www.newsite.com/');
    });
    it('verifies correct redirect for /portfolio path', async () => {
        event.rawPath = '/portfolio';
        event.requestContext.http.method = 'GET';
        const result: APIGatewayProxyResultV2 = (await lambdaHandler(event)) as APIGatewayProxyStructuredResultV2;
        expect(result.statusCode).toEqual(301);
        expect(result.headers?.Location).toEqual('https://www.newsite.com/styling-and-photo');
    });
    it('verifies all redirecds from urlPathMap', async () => {
        for (const [key, value] of Object.entries(urlPathMap)) {
            event.rawPath = key;
            event.requestContext.http.method = 'GET';
            const result: APIGatewayProxyResultV2 = (await lambdaHandler(event)) as APIGatewayProxyStructuredResultV2;
            expect(result.statusCode).toEqual(301);
            expect(result.headers?.Location).toEqual(value);
        }
    });
});
