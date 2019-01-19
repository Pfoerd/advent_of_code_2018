import * as os from 'os';

export function day14_part2(rawFileData: string) {
    const recipesCount = parseInt(rawFileData, 10);

    let elve1Position = 0;
    let elve2Position = 1;
    const recipes: number[] = [3, 7];
    const lengthOfRecipesCount = recipesCount.toString().length;

    function testMatch(): number | null {
        if (recipes.slice(-lengthOfRecipesCount).join('') === rawFileData) {
            return recipes.length - lengthOfRecipesCount;
        }
        return null;
    }

    let positionOfMatch: number;
    while (!positionOfMatch) {
        const sum: number = recipes[elve1Position] + recipes[elve2Position];
        if (Math.floor(sum / 10)) {
            recipes.push(Math.floor(sum / 10));
            positionOfMatch = testMatch();
        }
        recipes.push(sum % 10);
        positionOfMatch = positionOfMatch || testMatch();

        elve1Position = (elve1Position + (1 + recipes[elve1Position])) % recipes.length;
        elve2Position = (elve2Position + (1 + recipes[elve2Position])) % recipes.length;
    }

    return positionOfMatch;
}
