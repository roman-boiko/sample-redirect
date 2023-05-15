import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

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

export const lambdaHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    console.log(event);
    if (event.requestContext.http.method === 'GET' && event.rawPath in urlPathMap) {
        return {
            statusCode: 301,
            isBase64Encoded: false,
            headers: {
                Location: urlPathMap[event.rawPath],
            },
        };
    }
    return {
        statusCode: 301,
        isBase64Encoded: false,
        headers: {
            Location: 'https://www.newsite.com/',
        },
    };
};
