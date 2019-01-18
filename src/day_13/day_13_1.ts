import * as os from 'os';

export function day13_part1(rawFileData: string) {
    const tracks: string[][] = rawFileData.split(os.EOL).map(row => [...row]);
    const cars: [number, number, Direction, Turn][] = [];

    enum Turn {
        LEFT,
        STRAIGHT,
        RIGHT
    }

    class Direction {
        static UP = new Direction('^', -1, 0);
        static DOWN = new Direction('v', 1, 0);
        static LEFT = new Direction('<', 0, -1);
        static RIGHT = new Direction('>', 0, 1);
        private static orderClockwise = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];

        private constructor(public key: string, public yDirection: number, public xDirection: number) {
        }

        static get(key: string): Direction {
            return this.orderClockwise.find(dir => dir.key === key);
        }

        transformLeft(): Direction {
            return Direction.orderClockwise[(Direction.orderClockwise.length + Direction.orderClockwise.indexOf(this) - 1) % 4];
        }

        transformRight(): Direction {
            return Direction.orderClockwise[(Direction.orderClockwise.indexOf(this) + 1) % 4];
        }
    }

    // get the cars' positions
    for (let y = 0; y < tracks.length; y++) {
        for (let x = 0; x < Math.max(...tracks.map(v => v.length)); x++) {
            if (tracks[y][x] && tracks[y][x].search(/^([<>^v])$/) !== -1) {
                const direction = Direction.get(tracks[y][x]);
                cars.push([y, x, direction, Turn.LEFT]);
                tracks[y][x].replace(/^([<>])$/, '-');
                tracks[y][x].replace(/^([v^])$/, '|');
            }
        }
    }

    let crashedCar;

    loop: while (true) {
        cars.sort((car1, car2) => (car1[0] - car2[0]) || (car1[1] - car2[1]));

        // move the cars
        for (const car of cars) {
            car[0] += car[2].yDirection;
            car[1] += car[2].xDirection;
            const trackElement = tracks[car[0]][car[1]];
            if (trackElement === '\\' || trackElement === '/') {
                switch (car[2]) {
                    case Direction.UP:
                        car[2] = trackElement === '/' ? Direction.RIGHT : Direction.LEFT;
                        break;
                    case Direction.RIGHT:
                        car[2] = trackElement === '/' ? Direction.UP : Direction.DOWN;
                        break;
                    case Direction.DOWN:
                        car[2] = trackElement === '/' ? Direction.LEFT : Direction.RIGHT;
                        break;
                    case Direction.LEFT:
                        car[2] = trackElement === '/' ? Direction.DOWN : Direction.UP;
                        break;
                }
            } else if (trackElement === '+') {
                switch (car[3]) {
                    case Turn.LEFT:
                        car[2] = car[2].transformLeft();
                        car[3] = Turn.STRAIGHT;
                        break;
                    case Turn.RIGHT:
                        car[2] = car[2].transformRight();
                        car[3] = Turn.LEFT;
                        break;
                    default:
                        car[3] = Turn.RIGHT;
                        break;
                }
            }
            crashedCar = cars.find(car2 => car2 !== car && car2[0] === car[0] && car2[1] === car[1]);
            if (crashedCar) {
                break loop;
            }
        }
    }

    return `${crashedCar[1]},${crashedCar[0]}`;
}
