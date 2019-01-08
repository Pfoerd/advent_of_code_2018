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

    let finishedSteps = '';

    // walk the steps beginning with first steps
    const nextAvailableSteps: string[] = firstSteps.sort();

    while (nextAvailableSteps.length) {
        const nextAvailableStep = nextAvailableSteps[0];
        finishedSteps += nextAvailableStep;

        nextAvailableSteps.splice(0, 1);

        const successorsOfNextAvailable: string[] = successors.get(nextAvailableStep) || [];

        successorsOfNextAvailable.forEach(successorOfNextAvailable => {
            const predecessorsOfSuccessor: string[] = predecessors.get(successorOfNextAvailable);
            const prerequisitesCompleted = predecessorsOfSuccessor.every(predecessor => finishedSteps.includes(predecessor));
            if (prerequisitesCompleted) {
                nextAvailableSteps.push(successorOfNextAvailable);
            }
        });
        nextAvailableSteps.sort();
    }

    return finishedSteps;
}
