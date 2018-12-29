import * as os from 'os';

export function day4_part1(rawFileData: string) {
    const rawData: string[] = rawFileData.split(os.EOL);

    function LogEntry(dateTime: Date, isFallsAsleep: boolean = false, isWakesUp: boolean = false, beginShiftId?: string) {
        this.dateTime = dateTime;
        this.isFallsAsleep = isFallsAsleep;
        this.isWakesUp = isWakesUp;
        this.beginShiftId = beginShiftId;
    }

    let logEntries = [];

    // parse raw data
    for (const rawDate of rawData) {
        const dateTimeToken = rawDate.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\]/);
        const beginShiftToken = rawDate.match(/Guard #(\d+) begins shift/);
        const isFallsAsleep: boolean = rawDate.search('falls asleep') !== -1;
        const isWakesUp: boolean = rawDate.search('wakes up') !== -1;

        const [, year, month, date, hours, minutes] = Array.from(dateTimeToken, v => parseInt(v, 10));
        const beginShiftId = beginShiftToken != null ? beginShiftToken[1] : null;
        logEntries.push(new LogEntry(new Date(year, month - 1, date, hours, minutes), isFallsAsleep, isWakesUp, beginShiftId));
    }

    // sort log entries by date time ascending
    logEntries = logEntries.sort((a, b) => a.dateTime.valueOf() - b.dateTime.valueOf());

    // calculate sleepTimeRanges
    let lastIdState: string;
    let lastDateTimeState: Date;
    const sleepTimeRanges = new Map<string, [number, number][]>();
    for (const logEntry of logEntries) {
        if (logEntry.beginShiftId) {
            lastIdState = logEntry.beginShiftId;
        } else if (logEntry.isWakesUp) {
            const sleepTimesOfId = sleepTimeRanges.get(lastIdState) || [];
            sleepTimesOfId.push([lastDateTimeState.getMinutes(), logEntry.dateTime.getMinutes()]);
            sleepTimeRanges.set(lastIdState, sleepTimesOfId);
        }
        lastDateTimeState = logEntry.dateTime;
    }

    // get most asleep guard's id
    let mostAsleep: [string, number] = ['init', 0];
    for (const sleepTimeRangesById of sleepTimeRanges) {
        const sum: number =
            sleepTimeRangesById[1]
                .map(entry => entry[1] - entry[0])
                .reduce((a, b) => a + b, 0);

        if (sum > mostAsleep[1]) {
            mostAsleep = [sleepTimeRangesById[0], sum];
        }
    }

    // find minute where most asleep guard slept most frequent
    const minuteFrequencies: number[] = Array(59).fill(0);

    for (const mostAsleepTimeRange of sleepTimeRanges.get(mostAsleep[0])) {
        for (let i = mostAsleepTimeRange[0]; i < mostAsleepTimeRange[1]; i++) {
            minuteFrequencies[i] = minuteFrequencies[i] + 1;
        }
    }

    const minuteWithMaxFrequencyOfAsleep = minuteFrequencies.indexOf(Math.max(...minuteFrequencies));

    // output result on console
    const result = parseInt(mostAsleep[0], 10) * minuteWithMaxFrequencyOfAsleep;
    console.log(`guard most asleep with id '${mostAsleep[0]}' sleeped \
most at minute ${minuteWithMaxFrequencyOfAsleep}. \
Result is: ${result}`);

    return result;
}
