export function day2_part2(rawFileData: string) {
    const ids: string[] = rawFileData.split('\r\n');

    for (let idIndex = 0; idIndex < ids.length; idIndex++) {
        for (let idToCompareIndex = idIndex + 1; idToCompareIndex < ids.length; idToCompareIndex++) {
            // compare the strings char-wise
            let commonCharacters = '';
            const id = ids[idIndex];

            for (let characterIndex = 0; characterIndex < id.length; characterIndex++) {
                if (id[characterIndex] === ids[idToCompareIndex][characterIndex]) {
                    commonCharacters += id[characterIndex];
                }
                if (commonCharacters.length <= characterIndex - 1) {
                    break;
                }
            }
            if (commonCharacters.length === id.length - 1) {
                console.log(`result at lines ${idIndex},${idToCompareIndex}: ${commonCharacters}`);
                return commonCharacters;
            }
        }
    }
}
