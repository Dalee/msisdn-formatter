import { clean, pretty } from '../src/msisdn';
import should from 'should';

describe('msisdn', () => {

    const numbers = [
        ['+7 920 123-4567', '79201234567', '9201234567', '920 123-4567', '(920) 123-4567', '+7 (920) 123-4567'],
        ['86261 23 45-67', '76261234567', '6261234567', '626 123-4567', '(626) 123-4567', '+7 (626) 123-4567']
    ];

    const errorNumbers = [79060523777, 9060523777];

    describe('clean', () => {
        it('should return clean with leading 7', () => {
            numbers.forEach(number => {
                should(clean(number[0])).be.exactly(number[1]);
            });
        });

        it('should return clean without leading 7 (cleaner)', () => {
            numbers.forEach(number => {
                should(clean(number[0], true)).be.exactly(number[2]);
            });
        });

        it('should return null if msisdn is not a string', () => {
            errorNumbers.forEach(number => {
                should(clean(number[0])).be.exactly(null);
                should(clean(number[0], true)).be.exactly(null);
            });
        });
    });


    describe('pretty', () => {
        it('should return clean with leading 7', () => {
            numbers.forEach(number => {
                should(pretty(number[0], 'clean')).be.exactly(number[1]);
            });
        });

        it('should return clean without leading 7 (cleaner)', () => {
            numbers.forEach(number => {
                should(pretty(number[0], 'cleaner')).be.exactly(number[2]);
            });
        });

        it('should return short', () => {
            numbers.forEach(number => {
                should(pretty(number[0], 'short')).be.exactly(number[3]);
            });
        });

        it('should return usual', () => {
            numbers.forEach(number => {
                should(pretty(number[0], 'usual')).be.exactly(number[4]);
                should(pretty(number[0])).be.exactly(number[4]);
            });
        });

        it('should return fully formatted', () => {
            numbers.forEach(number => {
                should(pretty(number[0], 'full')).be.exactly(number[5]);
            });
        });

        it('should return msisdn as is if it cannot be cleaned', () => {
            errorNumbers.forEach(number => {
                should(pretty(number)).be.exactly(number);
            });
        });
    });

});
