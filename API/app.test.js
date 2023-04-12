const app = require('./app');
const request = require('supertest');

describe('POST /encode', () => {
    it('should return 401 if no authorisation header present', async () => {
        const res = await request(app)
            .post('/encode')
            .send({ dataToEncode: 'XY' });
        expect(res.statusCode).toEqual(401);
    });

    it('should return 401 if authorization token is invalid', async () => {
        const res = await request(app)
            .post('/encode')
            .set('Authorization', 'xyz0987654123')
            .send({ dataToEncode: 'XY' });
        expect(res.statusCode).toEqual(401);
    });

    it('should return 400 and an error message if request body is empty', async () => {
        const res = await request(app)
            .post('/encode')
            .set('Authorization', 'xyz0987654321')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message :'Request body cannot be empty'});
    });

    it('should return 400 and an error message if string is empty', async () => {
        const res = await request(app)
            .post('/encode')
            .set('Authorization', 'xyz0987654321')
            .send({ dataToEncode: ''});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message :'String cannot be empty'});
    });

    it('should return 200 and correctly encode a single-character string', async () => {
        const res = await request(app)
            .post('/encode')
            .set('Authorization', 'xyz0987654321')
            .send({ dataToEncode: 'X' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ encodedData: 'X1' });
    });

    it('should return 200 and correctly encode a two-character string', async () => {
        const res = await request(app)
            .post('/encode')
            .set('Authorization', 'xyz0987654321')
            .send({ dataToEncode: 'XY' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ encodedData: 'X1Y1' });
    });

    it('should return 200 and correctly encode a multiple-character string', async () => {
        const res = await request(app)
            .post('/encode')
            .set('Authorization', 'xyz0987654321')
            .send({ dataToEncode: 'XXYYXXXZ' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ encodedData: 'X2Y2X3Z1' });
    });
});