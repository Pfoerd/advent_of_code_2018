import {expect} from 'chai';
import * as fs from 'fs';
import {day11_part1} from './day_11_1';
import {day11_part2} from './day_11_2';

const rawFileData = fs.readFileSync('./res/day_11.txt', 'utf8');

describe('day 11, part 1', () => {
    it('should return "235,60"', () => {
        const result = day11_part1(rawFileData, 3);
        expect(result.x).to.equal(235);
        expect(result.y).to.equal(60);
    });
});

describe('day 11, part 2', () => {
    it('should return "233,282,11"', () => {
        const result = day11_part2(rawFileData);
        expect(result.x).to.equal(233);
        expect(result.y).to.equal(282);
        expect(result.squareSize).to.equal(11);
    }).timeout(5000);
});
