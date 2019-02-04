export function day16_part1(rawFileData: string) {
    class Cpu {
        constructor(public regs?: [number, number, number, number]) {
        }

        addr(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] + this.regs[b];
        }

        addi(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] + b;
        }

        mulr(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] * this.regs[b];
        }

        muli(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] * b;
        }

        banr(a: number, b: number, c: number) {
            // tslint:disable-next-line:no-bitwise
            this.regs[c] = this.regs[a] & this.regs[b];
        }

        bani(a: number, b: number, c: number) {
            // tslint:disable-next-line:no-bitwise
            this.regs[c] = this.regs[a] & b;
        }

        borr(a: number, b: number, c: number) {
            // tslint:disable-next-line:no-bitwise
            this.regs[c] = this.regs[a] | this.regs[b];
        }

        bori(a: number, b: number, c: number) {
            // tslint:disable-next-line:no-bitwise
            this.regs[c] = this.regs[a] | b;
        }

        setr(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a];
        }

        seti(a: number, b: number, c: number) {
            this.regs[c] = a;
        }

        gtir(a: number, b: number, c: number) {
            this.regs[c] = a > this.regs[b] ? 1 : 0;
        }

        gtri(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] > b ? 1 : 0;
        }

        gtrr(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] > this.regs[b] ? 1 : 0;
        }

        eqir(a: number, b: number, c: number) {
            this.regs[c] = a === this.regs[b] ? 1 : 0;
        }

        eqri(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] === b ? 1 : 0;
        }

        eqrr(a: number, b: number, c: number) {
            this.regs[c] = this.regs[a] === this.regs[b] ? 1 : 0;
        }
    }

    class Sample {
        constructor(
            public before: [number, number, number, number],
            public opcode: number,
            public a: number,
            public b: number,
            public c: number,
            public after: [number, number, number, number]) {
        }

    }

    const samples: Sample[] = [];
    const re = /Before: \[(\d), (\d), (\d), (\d)\]\r?\n(\d\d?) (\d) (\d) (\d)\r?\nAfter:  \[(\d), (\d), (\d), (\d)\]/g;

    let match;
    while (match = re.exec(rawFileData)) {
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

    const cpu: Cpu = new Cpu();
    const operations = [
        Cpu.prototype.addi,
        Cpu.prototype.addr,
        Cpu.prototype.muli,
        Cpu.prototype.mulr,
        Cpu.prototype.bani,
        Cpu.prototype.banr,
        Cpu.prototype.bori,
        Cpu.prototype.borr,
        Cpu.prototype.seti,
        Cpu.prototype.setr,
        Cpu.prototype.gtir,
        Cpu.prototype.gtri,
        Cpu.prototype.gtrr,
        Cpu.prototype.eqir,
        Cpu.prototype.eqri,
        Cpu.prototype.eqrr,
    ];

    let result = 0;
    for (const sample of samples) {
        let count = 0;
        for (const operation of operations) {
            cpu.regs = <[number, number, number, number]>[...sample.before];
            operation.call(cpu, sample.a, sample.b, sample.c);
            count += JSON.stringify(cpu.regs) === JSON.stringify(sample.after) ? 1 : 0;
        }

        if (count >= 3) {
            result++;
        }
    }

    return result;
}
