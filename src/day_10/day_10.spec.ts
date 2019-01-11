import {expect} from 'chai';
import * as fs from 'fs';
import {day10_part1} from './day_10_1';
import {day10_part2} from './day_10_2';

const rawFileData = fs.readFileSync('./res/day_10.txt', 'utf8');

describe('day 10, part 1', () => {
    it('should return "ZZCBGGCJ" as ASCII art picture', () => {
        const result = day10_part1(rawFileData);
        expect(result).to.equal('\
######  ######   ####   #####    ####    ####    ####      ###\n\
     #       #  #    #  #    #  #    #  #    #  #    #      # \n\
     #       #  #       #    #  #       #       #           # \n\
    #       #   #       #    #  #       #       #           # \n\
   #       #    #       #####   #       #       #           # \n\
  #       #     #       #    #  #  ###  #  ###  #           # \n\
 #       #      #       #    #  #    #  #    #  #           # \n\
#       #       #       #    #  #    #  #    #  #       #   # \n\
#       #       #    #  #    #  #   ##  #   ##  #    #  #   # \n\
######  ######   ####   #####    ### #   ### #   ####    ###  \n');
    });
});

describe('day 10, part 2', () => {
    it('should return 10886', () => {
        const result = day10_part2(rawFileData);
        expect(result.seconds).to.equal(10886);
    });
});
