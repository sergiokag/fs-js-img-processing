import request from 'supertest';
import app from '../server';

describe('supertest api', () => {
    describe('index route', () => {
        it('should return a 200 status response', async () => {
            // Arrange && Act
            const response = await request(app).get('/');

            // Assert
            expect(response.status).toBe(200);
        });
    });

    describe('api/images', () => {
        it('should return 400 response, if no query params', async () => {
            // Arrange && Act
            const response = await request(app).get('/api/images');

            // Assert
            expect(response.status).toBe(400);
        });
    });
});
