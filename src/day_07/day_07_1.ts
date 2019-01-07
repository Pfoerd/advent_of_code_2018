import * as os from 'os';

export function day7_part1(rawFileData: string) {
    const rawData: string[] = rawFileData.split(os.EOL);

    const successors = new Map<string, string[]>();
    const predecessors = new Map<string, string[]>();

    for (const line of rawData) {
        const precedingStep: string = line.charAt(5);
        const followingStep: string = line.charAt(36);

        const followingSteps: string[] = successors.get(precedingStep) || [];
        followingSteps.push(followingStep);
        successors.set(precedingStep, followingSteps);

        const precedingSteps: string[] = predecessors.get(followingStep) || [];
        precedingSteps.push(precedingStep);
        predecessors.set(followingStep, precedingSteps);
    }

    // find first steps
    const firstSteps: string[] = [...successors.keys()].filter(successor => !predecessors.has(successor));

    let finished = '';

    // walk the steps beginning with first steps
    const nextAvailables: string[] = firstSteps.sort();

    while (nextAvailables.length) {
        const nextAvailable = nextAvailables[0];
        finished += nextAvailable;

        nextAvailables.splice(0, 1);

        if (!successors.has(nextAvailable)) {
            break;
        }
        const successorsOfNextAvailable = successors.get(nextAvailable);

        for (const successorOfNextAvailable of successorsOfNextAvailable) {
            let prerequisitesCompleted = true;
            for (const predecessor of predecessors.get(successorOfNextAvailable)) {
                if (!finished.includes(predecessor)) {
                    prerequisitesCompleted = false;
                    break;
                }
            }
            if (prerequisitesCompleted) {
                nextAvailables.push(successorOfNextAvailable);
            }
        }
        nextAvailables.sort();
    }

    return finished;
}
