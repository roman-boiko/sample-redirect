import request, { Response } from 'supertest';
import { expect, describe, it, beforeAll } from '@jest/globals';

describe('Integration tests for redirect app', function () {
    let baseUrl: string;
    beforeAll(() => {
        baseUrl = process.env.BASE_URL || 'https://www.arkt.eu';
    });

    it('verifies correct redirect for root path with get method', async () => {
        const result = await request(baseUrl).get('/');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/');
    });
    it('verifies correct redirect for root path with post method', async () => {
        const result = await request(baseUrl).post('/');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/');
    });

    it('verifies correct redirect for worng path and get method', async () => {
        const result = await request(baseUrl).get('/qwerty');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/');
    });
    it('verifies correct redirect for /portfolio path and get method', async () => {
        const result = await request(baseUrl).get('/portfolio');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/styling-and-photo');
    });
    it('verifies correct redirect for /shop path and get method', async () => {
        const result = await request(baseUrl).get('/shop');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/edits/my-home-edit');
    });
    it('verifies correct redirect for /feedback path and get method', async () => {
        const result = await request(baseUrl).get('/feedback');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/styling-and-photo');
    });
    it('verifies correct redirect for /about path and get method', async () => {
        const result = await request(baseUrl).get('/about');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/about');
    });
    it('verifies correct redirect for /contact path and get method', async () => {
        const result = await request(baseUrl).get('/contact');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/about');
    });
    it('verifies correct redirect for /listsandthoughts/layered-soft-warm-livable-habitable-minimalism-habitable-minimalism-so-what-is-it-exactly path and get method', async () => {
        const result = await request(baseUrl).get(
            '/listsandthoughts/layered-soft-warm-livable-habitable-minimalism-habitable-minimalism-so-what-is-it-exactly',
        );
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual('https://www.newsite.com/journal/habitable-minimalism');
    });
    it('verifies correct redirect for /listsandthoughts/3-interior-design-interior-styling-books-i-can-recommend path and get method', async () => {
        const result = await request(baseUrl).get(
            '/listsandthoughts/3-interior-design-interior-styling-books-i-can-recommend',
        );
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual(
            'https://www.newsite.com/journal/3-interior-design-interior-styling-books',
        );
    });
    it('verifies correct redirect for /listsandthoughts/5-interior-design-amp-styling-blogs-check-every-week path and get method', async () => {
        const result = await request(baseUrl).get(
            '/listsandthoughts/5-interior-design-amp-styling-blogs-check-every-week',
        );
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual(
            'https://www.newsite.com/journal/5-interior-design-amp-lifestyle-blogs-i-check-regularly',
        );
    });
    it('verifies correct redirect for /listsandthoughts/5-big-ikea-products-i-have path and get method', async () => {
        const result = await request(baseUrl).get('/listsandthoughts/5-big-ikea-products-i-have');
        expect(result.status).toEqual(301);
        expect(result.headers.location).toEqual(
            'https://www.newsite.com/journal/4-ikea-products-i-have-at-home-and-really-love',
        );
    });
});
