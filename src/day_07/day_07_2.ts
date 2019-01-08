import * as os from 'os';

export function day7_part2(rawFileData: string) {
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

    let workingTimeTotal = 0;
    const finishedSteps = new Set<string>();

    function calcWorkingTimeForStep(step: string): [string, number] {
        return [step, step.charCodeAt(0) - 64 + 60];
    }

    // walk the steps beginning with first steps
    const workingTimesByNextAvailableSteps: Map<string, number> = new Map<string, number>(firstSteps.map(calcWorkingTimeForStep));

    while (workingTimesByNextAvailableSteps.size) {
        const nextAvailableStepsSorted: string[] = [...workingTimesByNextAvailableSteps.keys()].sort();

        for (let i = 0; i < 5 && i < nextAvailableStepsSorted.length; i++) {
            const firstNextAvailableStep = nextAvailableStepsSorted[i];
            workingTimesByNextAvailableSteps.set(firstNextAvailableStep, workingTimesByNextAvailableSteps.get(firstNextAvailableStep) - 1);

            if (workingTimesByNextAvailableSteps.get(firstNextAvailableStep) <= 0) {
                finishedSteps.add(firstNextAvailableStep);

                workingTimesByNextAvailableSteps.delete(firstNextAvailableStep);

                const successorsOfNextAvailable: string[] = successors.get(firstNextAvailableStep) || [];

                successorsOfNextAvailable.forEach(successorOfNextAvailable => {
                    const predecessorsOfSuccessor: string[] = predecessors.get(successorOfNextAvailable);
                    const prerequisitesCompleted = predecessorsOfSuccessor.every(predecessor => finishedSteps.has(predecessor));
                    if (prerequisitesCompleted) {
                        workingTimesByNextAvailableSteps.set(successorOfNextAvailable, calcWorkingTimeForStep(successorOfNextAvailable)[1]);
                    }
                });
            }
        }
        workingTimeTotal++;
    }

    return workingTimeTotal;
}
