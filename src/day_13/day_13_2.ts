import * as os from 'os';

export function day13_part2(rawFileData: string) {
    const tracks: string[][] = rawFileData.split(os.EOL).map(row => [...row]);
    const cars: Car[] = [];

    class Car {
        constructor(public y: number, public x: number, public direction: Direction, public turn: Turn) {
        }
    }

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
                cars.push(new Car(y, x, direction, Turn.LEFT));
                tracks[y][x].replace(/^([<>])$/, '-');
                tracks[y][x].replace(/^([v^])$/, '|');
            }
        }
    }

    loop: while (cars.length > 1) {
        cars.sort((car1, car2) => (car1[0] - car2[0]) || (car1[1] - car2[1]));

        // move the cars
        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];

            car.y += car.direction.yDirection;
            car.x += car.direction.xDirection;
            const trackElement = tracks[car.y][car.x];
            if (trackElement === '\\' || trackElement === '/') {
                switch (car.direction) {
                    case Direction.UP:
                        car.direction = trackElement === '/' ? Direction.RIGHT : Direction.LEFT;
                        break;
                    case Direction.RIGHT:
                        car.direction = trackElement === '/' ? Direction.UP : Direction.DOWN;
                        break;
                    case Direction.DOWN:
                        car.direction = trackElement === '/' ? Direction.LEFT : Direction.RIGHT;
                        break;
                    case Direction.LEFT:
                        car.direction = trackElement === '/' ? Direction.DOWN : Direction.UP;
                        break;
                }
            } else if (trackElement === '+') {
                switch (car.turn) {
                    case Turn.LEFT:
                        car.direction = car.direction.transformLeft();
                        car.turn = Turn.STRAIGHT;
                        break;
                    case Turn.RIGHT:
                        car.direction = car.direction.transformRight();
                        car.turn = Turn.LEFT;
                        break;
                    default:
                        car.turn = Turn.RIGHT;
                        break;
                }
            }
            const crashedCarIndex: number = cars.findIndex(car2 => car2 !== car && car2.x === car.x && car2.y === car.y);
            if (crashedCarIndex !== -1) {
                cars.splice(crashedCarIndex, 1);
                cars.splice(cars.indexOf(car), 1);
                i -= (1 + (crashedCarIndex <= i ? 1 : 0));
            }
        }
    }

    return `${cars[0].x},${cars[0].y}`;
}
