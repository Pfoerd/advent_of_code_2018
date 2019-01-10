export function day9_part1(rawFileData: string) {
    const inputTokens = rawFileData.match(/(\d+) players; last marble is worth (\d+) points/);

    const [, playerCount, lastMarbleValue] = Array.from(inputTokens, v => parseInt(v, 10));
    const marbles: number[] = [0];
    const playerScores: number[] = [];
    let currentMarbleIndex = 0;

    for (let marbleValue = 1; marbleValue <= lastMarbleValue; marbleValue++) {
        if (marbleValue % 23 === 0) {
            playerScores[marbleValue % 10] += marbleValue;
            const newMarbleIndex = marbles.length + currentMarbleIndex - 7 % marbles.length;
            marbles.splice(newMarbleIndex, 1);
            currentMarbleIndex = newMarbleIndex;
        } else {
            const newMarbleIndex = ((currentMarbleIndex + 2) % marbles.length) + 1;
            marbles.splice(newMarbleIndex, 0, marbleValue);
            currentMarbleIndex = newMarbleIndex;
        }
    }

    return Math.max(...playerScores);
}
