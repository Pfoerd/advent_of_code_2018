export function day9_part2(rawFileData: string) {
    // No way to solve it with the array based solution of part 1.
    // Thx to https://www.reddit.com/r/adventofcode/comments/a4j11i/2018_day_9_part_2_strategy_help/
    // There they say i should take a linked list as the leading data structure for the marbles. Ok lets do that!
    /*
    const inputTokens = rawFileData.match(/(\d+) players; last marble is worth (\d+) points/);
    const newHighestMarbleValue = parseInt(inputTokens[2], 10) * 100;
    return day9_part1(`${inputTokens[1]} players; last marble is worth ${newHighestMarbleValue} points`);
    */
    class Node {
        constructor(public value: number, public prev: Node = null, public next: Node = null) {
        }
    }

    const inputTokens = rawFileData.match(/(\d+) players; last marble is worth (\d+) points/);

    const [, playerCount, lastMarbleValueInput] = Array.from(inputTokens, v => parseInt(v, 10));
    const lastMarbleValue = lastMarbleValueInput * 100;
    const playerScores: number[] = Array.from(Array(playerCount), v => 0);
    let currentNode: Node = new Node(0);
    currentNode.next = currentNode;
    currentNode.prev = currentNode;

    for (let marbleValue = 1; marbleValue <= lastMarbleValue; marbleValue++) {
        if (marbleValue % 23 === 0) {
            playerScores[marbleValue % playerCount] = (playerScores[marbleValue % playerCount] || 0) + marbleValue;
            for (let i = 0; i < 7; i++) {
                currentNode = currentNode.prev;
            }
            playerScores[marbleValue % playerCount] += currentNode.value;

            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
            currentNode = currentNode.next;
        } else {
            currentNode = currentNode.next;
            const newNode = new Node(marbleValue, currentNode, currentNode.next);
            currentNode.next.prev = newNode;
            currentNode.next = newNode;
            currentNode = newNode;
        }
    }

    return Math.max(...playerScores);
}
