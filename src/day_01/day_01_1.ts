export function day1_part1(rawFileData: string) {
    const frequencies: string[] = rawFileData.split('\r\n');

    const resultingFrequency = frequencies.reduce((a, b) => a + parseInt(b, 10), 0);

    return resultingFrequency;
}
