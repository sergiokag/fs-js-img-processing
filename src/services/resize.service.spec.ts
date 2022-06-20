import { resizeImage } from './resize.service';

describe('resizeImage service', () => {
    it('should resize image', (done: DoneFn) => {
        // Arrange & Act
        resizeImage('fjord', 100, 100).then((result) => {
            // Asssert
            expect(result.height).toBe(100);
            expect(result.width).toBe(100);
            done();
        });
    });
});
