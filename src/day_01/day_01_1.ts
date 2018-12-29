import * as os from 'os';

export function day1_part1(rawFileData: string) {
    const frequencies: string[] = rawFileData.split(os.EOL);

    const resultingFrequency = frequencies.reduce((a, b) => a + parseInt(b, 10), 0);

    return resultingFrequency;
}
