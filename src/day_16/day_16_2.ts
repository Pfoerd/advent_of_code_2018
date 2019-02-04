import {Cpu, operations, Sample} from './day_16_1';

export function day16_part2(rawFileData: string) {
    const samples: Sample[] = [];
    const program: [number, number, number, number][] = [];
    const cpu: Cpu = new Cpu();

    // parse samples
    const regexSamples = /Before: \[(\d), (\d), (\d), (\d)\]\r?\n(\d\d?) (\d) (\d) (\d)\r?\nAfter:  \[(\d), (\d), (\d), (\d)\]/g;
    let match;
    while (match = regexSamples.exec(rawFileData)) {
        const sampleData = Array.from(match.slice(1), (v: string) => parseInt(v, 10));
        const sample = new Sample(
            [sampleData[0], sampleData[1], sampleData[2], sampleData[3]],
            sampleData[4],
            sampleData[5],
            sampleData[6],
            sampleData[7],
            [sampleData[8], sampleData[9], sampleData[10], sampleData[11]]);
        samples.push(sample);
    }

    // parse program
    const regexProgram = /(\d\d?) (\d) (\d) (\d)(?!\r?\nAfter)/g;
    while (match = regexProgram.exec(rawFileData)) {
        const sampleData = Array.from(match.slice(1), (v: string) => parseInt(v, 10));
        program.push([sampleData[0], sampleData[1], sampleData[2], sampleData[3]]);
    }

    // work out possible indices of operations for each opcode:
    // [opcode1: [index1, index2, ...], opcode2: [index3, index4, ...], ...]
    const possibleIndices: Map<number, Set<number>> = new Map();

    for (const sample of samples) {
        for (let i = 0; i < operations.length; i++) {
            const operation = operations[i];
            cpu.regs = <[number, number, number, number]>[...sample.before];
            operation.call(cpu, sample.a, sample.b, sample.c);
            if (cpu.regs.join() === sample.after.join()) {
                const possibleIndicesForSample: Set<number> = possibleIndices.get(sample.opcode)
                    || possibleIndices.set(sample.opcode, new Set()).get(sample.opcode);
                possibleIndicesForSample.add(i);
            }
        }
    }

    // work out a consistent mapping of opcode -> operation index with backtracking
    const mapping: number[] = Array.from(Array(16), v => undefined);

    function findMapping(opcode: number, solution: number[]): boolean {
        for (const index of possibleIndices.get(opcode)) {
            if (solution.indexOf(index) === -1) {
                solution[opcode] = index;
                if (solution.indexOf(undefined) === -1) {
                    return true;
                }
                if (findMapping(opcode + 1, solution)) {
                    return true;
                }
                solution[opcode] = undefined;
            }
        }
        return false;
    }

    findMapping(0, mapping);

    // execute program
    cpu.regs = [0, 0, 0, 0];

    for (const instruction of program) {
        const operation = operations[mapping[instruction[0]]];
        operation.call(cpu, instruction[1], instruction[2], instruction[3]);
    }

    return cpu.regs[0];
}
