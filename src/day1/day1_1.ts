export function day1_part1(rawFileData: string) {
    const frequencies: string[] = rawFileData.split('\r\n');

    let resultingFrequency = 0;

    for (const frequency of frequencies) {
        resultingFrequency += Number.parseInt(frequency, 10);
    }

    return resultingFrequency;
}
