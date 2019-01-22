import * as os from 'os';
import * as ndarray from 'ndarray';
import * as createPlanner from 'l1-path-finder';

export function day15_part1(rawFileData: string) {
    const inputGrid: string[][] = rawFileData.split(os.EOL).map(row => [...row]);
    const map: number[][] = inputGrid.map(() => []);
    const units: Unit[] = [];
    let roundCounter = 0;

    // helpers
    const neighbours: [number, number][] = [[-1, 0], [0, -1], [0, 1], [1, 0]];

    class Type {
        static E: Type = new Type('E');
        static G: Type = new Type('G');

        private constructor(public typeString: string) {
        }

        static parseType(type: string): Type {
            return type === 'E' ? Type.E : Type.G;
        }

        enemy(): Type {
            return this === Type.E ? Type.G : Type.E;
        }
    }

    class Unit {
        public hitPoints = 200;

        constructor(public y: number, public x: number, public type: Type) {
        }
    }

    // get the units' positions
    for (let y = 0; y < inputGrid.length; y++) {
        for (let x = 0; x < inputGrid[0].length; x++) {
            map[y][x] = 0;
            if (inputGrid[y][x] === 'E' || inputGrid[y][x] === 'G') {
                units.push(new Unit(y, x, Type.parseType(inputGrid[y][x])));
            } else if (inputGrid[y][x] === '#') {
                map[y][x] = 1;
            }
        }
    }

    /**
     * @param y1 might be y position of a unit.
     * @param x1 might be x position of a unit.
     */
    function calcPath(y1, x1, y2, x2): number {
        const flatMap = map.reduce((agg, row) => [...agg, ...row]);
        aliveUnits().filter(u => !(u.y === y1 && u.x === x1)).forEach(u => flatMap[u.y * map[0].length + u.x] = 1);

        const ndarrayMap = ndarray(flatMap, [map.length, map[0].length]);
        const planner = createPlanner(ndarrayMap);
        const dist = planner.search(y1, x1, y2, x2);
        return isFinite(dist) ? dist : null;
    }

    function isFreeField(y, x): boolean {
        return map[y][x] === 0 && aliveUnits().every(u => !(u.y === y && u.x === x));
    }

    function aliveUnits(): Unit[] {
        return units.filter(u => u.hitPoints > 0);
    }

    mainLoop : while (true) {
        units.sort((u1, u2) => (u1.y - u2.y) || (u1.x - u2.x));

        for (const unit of aliveUnits()) {
            if (unit.hitPoints <= 0) {
                // dead units can't do anything
                continue;
            }
            const enemiesAlive = aliveUnits()
                .filter(u => u.type === unit.type.enemy());

            if (enemiesAlive.length === 0) {
                break mainLoop;
            }

            // is no enemy in fighting distance?
            if (!enemiesAlive.find(u => neighbours.find(n => (u.y === unit.y + n[0] && u.x === unit.x + n[1])) && true)) {
                // >>>> move it!
                // find possible target fields
                const possibleTargets: [number, number][] = enemiesAlive // just alive enemies
                    .map(e => neighbours
                        .map(n => <[number, number]>[e.y + n[0], e.x + n[1]])
                        .filter(n => isFreeField(n[0], n[1]))) // is a free field
                    .reduce((p, v) => [...p, ...v], []);

                // calculate target position with fewest steps
                const targetData: [number, number, number] = possibleTargets
                    .map(t => <[number, number, number]>[...t, calcPath(unit.y, unit.x, t[0], t[1])])
                    .filter(data => data[2])
                    .sort((data1, data2) => (data1[2] - data2[2]) || data1[0] - data2[0] || data1[1] - data2[1])[0];

                if (!targetData) {
                    // cannot move anywhere, ends turn
                    continue;
                }

                const dist: number = targetData[2];
                const move: [number, number] =
                    neighbours
                        .filter(n => isFreeField(unit.y + n[0], unit.x + n[1])) // is a free field
                        .find(n => {
                            const distToNeighbour = calcPath(unit.y + n[0], unit.x + n[1], targetData[0], targetData[1]);
                            return distToNeighbour !== null && distToNeighbour - (dist - 1) === 0;
                        });

                unit.y += move[0];
                unit.x += move[1];
            }

            // >>>> attack!
            const enemyToAttack: Unit = enemiesAlive // just alive enemies
            // only enemies next to the attacking unit
                .filter(u => neighbours.find(n => (u.y === unit.y + n[0] && u.x === unit.x + n[1])) && true)
                .sort((e1, e2) => e1.hitPoints - e2.hitPoints)[0];

            if (enemyToAttack) {
                enemyToAttack.hitPoints -= 3;
            }
        }

        roundCounter++;
    }

    return roundCounter * aliveUnits().map(u => u.hitPoints).reduce((p, c) => p + c, 0);
}
