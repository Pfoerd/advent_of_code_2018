import * as os from 'os';
import {expect} from 'chai';
import * as fs from 'fs';
import {day15_part1} from './day_15_1';
import {day15_part2} from './day_15_2';

const rawFileData = fs.readFileSync('./res/day_15.txt', 'utf8');

describe('day 15, part 1', () => {
    it('example 1 should return 27730', () => {
        const result = day15_part1('#######' + os.EOL +
            '#.G...#' + os.EOL +
            '#...EG#' + os.EOL +
            '#.#.#G#' + os.EOL +
            '#..G#E#' + os.EOL +
            '#.....#' + os.EOL +
            '#######');
        expect(result).to.equal(27730);
    });

    it('example 2 should return 36334', () => {
        const result = day15_part1('#######' + os.EOL +
            '#G..#E#' + os.EOL +
            '#E#E.E#' + os.EOL +
            '#G.##.#' + os.EOL +
            '#...#E#' + os.EOL +
            '#...E.#' + os.EOL +
            '#######');
        expect(result).to.equal(36334);
    });

    it('example 3 should return 39514', () => {
        const result = day15_part1('#######' + os.EOL +
            '#E..EG#' + os.EOL +
            '#.#G.E#' + os.EOL +
            '#E.##E#' + os.EOL +
            '#G..#.#' + os.EOL +
            '#..E#.#' + os.EOL +
            '#######');
        expect(result).to.equal(39514);
    });

    it('example 4 should return 27755', () => {
        const result = day15_part1('#######' + os.EOL +
            '#E.G#.#' + os.EOL +
            '#.#G..#' + os.EOL +
            '#G.#.G#' + os.EOL +
            '#G..#.#' + os.EOL +
            '#...E.#' + os.EOL +
            '#######');
        expect(result).to.equal(27755);
    });

    it('example 5 should return 28944', () => {
        const result = day15_part1('#######' + os.EOL +
            '#.E...#' + os.EOL +
            '#.#..G#' + os.EOL +
            '#.###.#' + os.EOL +
            '#E#G#G#' + os.EOL +
            '#...#G#' + os.EOL +
            '#######');
        expect(result).to.equal(28944);
    });

    it('example 6 should return 18740', () => {
        const result = day15_part1('#########' + os.EOL +
            '#G......#' + os.EOL +
            '#.E.#...#' + os.EOL +
            '#..##..G#' + os.EOL +
            '#...##..#' + os.EOL +
            '#...#...#' + os.EOL +
            '#.G...G.#' + os.EOL +
            '#.....G.#' + os.EOL +
            '#########');
        expect(result).to.equal(18740);
    });

    it('should return 181952', () => {
        const result = day15_part1(rawFileData);
        expect(result).to.equal(181952); // 64 rounds
    }).timeout(35000);
});

describe('day 15, part 2', () => {
    it('should return 47296', () => {
        const result = day15_part2(rawFileData);
        expect(result).to.equal(47296);
    }).timeout(720000);
});
