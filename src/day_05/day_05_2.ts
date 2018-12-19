export function day5_part2(rawFileData: string) {
    let shortestPolymerLength;

    for (let charCode = 'A'.charCodeAt(0); charCode <= 'Z'.charCodeAt(0); charCode++) {
        // let's walk through the alphabet and test every variant of its length after fully reacting the polymer
        const upperChar = String.fromCharCode(charCode);
        const lowerChar = String.fromCharCode(charCode + 32);
        const polymer: string[] = [...rawFileData.split(upperChar).join('').split(lowerChar).join('')];

        function foo(index: number): number {
            if (index < 0 || index >= polymer.length - 1) {
                return index;
            }

            const current = polymer[index].charCodeAt(0);
            const successors = polymer[index + 1].charCodeAt(0);

            if (Math.abs(current - successors) === 32) {
                // reaction! remove current and successor unit from polymer
                polymer.splice(index, 2);
                // cool, recursion!
                index = foo(index - 1);
            }
            return index;
        }

        for (let i = 0; i < polymer.length; i++) {
            i = foo(i);
        }

        if (!shortestPolymerLength || polymer.length < shortestPolymerLength) {
            shortestPolymerLength = polymer.length;
        }
    }

    console.log(`shortest polymer length: ${shortestPolymerLength}`);

    return shortestPolymerLength;
}
