import * as os from 'os';

export function day14_part1(rawFileData: string) {
    const recipesCount = parseInt(rawFileData, 10);

    let elve1Position = 0;
    let elve2Position = 1;
    const recipes: number[] = [3, 7];

    while (recipes.length < recipesCount + 10) {
        const sum: number = recipes[elve1Position] + recipes[elve2Position];
        if (Math.floor(sum / 10)) {
            recipes.push(Math.floor(sum / 10));
        }
        recipes.push(sum % 10);

        elve1Position = (elve1Position + (1 + recipes[elve1Position])) % recipes.length;
        elve2Position = (elve2Position + (1 + recipes[elve2Position])) % recipes.length;
    }

    return parseInt(recipes.slice(recipesCount).join(''), 10);
}
