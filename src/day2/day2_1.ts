export function day2_part1(rawFileData: string) {
    const ids: string[] = rawFileData.split('\r\n');

    let doubles = 0;
    let triples = 0;

    for (const id of ids) {
        const frequencies = new Map<string, number>();
        for (const c of id) {
            if (!frequencies.has(c)) {
                frequencies.set(c, 0);
            }
            frequencies.set(c, (frequencies.get(c) + 1));
        }

        for (const frequency of frequencies.values()) {
            if (frequency === 2) {
                doubles++;
                break;
            }
        }
        for (const frequency of frequencies.values()) {
            if (frequency === 3) {
                triples++;
                break;
            }
        }
    }
    return doubles * triples;
}
