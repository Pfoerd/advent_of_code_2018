export function day8_part2(rawFileData: string) {
    const codeNumbers: number[] = rawFileData.split(' ').map(s => parseInt(s, 10));

    function processNode(startIndex: number): number {
        const childNodeCount: number = codeNumbers[startIndex];
        const metaDataCount: number = codeNumbers[startIndex + 1];

        const childNodeValues: number[] = Array.from(Array(childNodeCount), i => 0);
        for (let i = 0; i < childNodeCount; i++) {
            // cool, recursion!
            childNodeValues[i] = processNode(startIndex + 2);
        }

        const metaDataEntries = codeNumbers.slice(startIndex + 2, startIndex + 2 + metaDataCount);
        codeNumbers.splice(startIndex, 2 + metaDataCount);

        if (childNodeCount === 0) {
            return metaDataEntries.reduce((sum, index) => sum + index);
        } else {
            return metaDataEntries.reduce((sum, index) => sum + childNodeValues[index - 1] || 0);
        }
    }

    return processNode(0);
}
