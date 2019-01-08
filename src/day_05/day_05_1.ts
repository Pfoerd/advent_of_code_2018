export function day5_part1(rawFileData: string) {
    const polymer: string[] = [...rawFileData];

    function tryReactPolymerAt(index: number): number {
        if (index < 0 || index >= polymer.length - 1) {
            return index;
        }

        const current = polymer[index].charCodeAt(0);
        const successors = polymer[index + 1].charCodeAt(0);

        if (Math.abs(current - successors) === 32) {
            // reaction! remove current and successor unit from polymer
            polymer.splice(index, 2);
            // cool, recursion!
            index = tryReactPolymerAt(index - 1);
        }
        return index;
    }

    for (let i = 0; i < polymer.length; i++) {
        i = tryReactPolymerAt(i);
    }

    console.log(`number of units remaining: ${polymer.length}`);

    return polymer.length;
}
