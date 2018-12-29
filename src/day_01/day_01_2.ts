import * as os from 'os';

export function day1_part2(rawFileData: string) {
    const frequencies: string[] = rawFileData.split(os.EOL);

    let resultingFrequency = 0;
    const reachedFrequencies = new Set<number>();
    reachedFrequencies.add(0);

    frequencyReiteration: while (true) {
        for (const frequency of frequencies) {
            resultingFrequency += Number.parseInt(frequency, 10);
            if (reachedFrequencies.has(resultingFrequency)) {
                break frequencyReiteration;
            }
            reachedFrequencies.add(resultingFrequency);
        }
    }

    return resultingFrequency;
}
