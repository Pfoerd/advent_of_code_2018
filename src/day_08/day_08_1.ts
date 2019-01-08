export function day8_part1(rawFileData: string) {
    const codeNumbers: number[] = rawFileData.split(' ').map(s => parseInt(s, 10));

    let metaDataSum = 0;

    function processNode(startIndex: number) {
        const childNodeCount: number = codeNumbers[startIndex];
        const metaDataCount: number = codeNumbers[startIndex + 1];

        for (let i = 0; i < childNodeCount; i++) {
            // cool, recursion!
            processNode(startIndex + 2);
        }

        metaDataSum += codeNumbers.slice(startIndex + 2, startIndex + 2 + metaDataCount).reduce((a, b) => a + b);
        codeNumbers.splice(startIndex, 2 + metaDataCount);
    }

    processNode(0);

    return metaDataSum;
}
