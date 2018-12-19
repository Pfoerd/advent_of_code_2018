export function day4_part2(rawFileData: string) {
    const rawData: string[] = rawFileData.split('\r\n');

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

    // find minute and id where a guard was asleep most frequent in total
    let highestMaxFrequencyOfAsleepById: [string, number, number] = ['', 0, 0]; // [id, minute, frequency]
    for (const entry of sleepTimeRanges) {
        const minuteFrequencies: number[] = Array(59).fill(0);
        for (const timeRange of entry[1]) {
            for (let i = timeRange[0]; i < timeRange[1]; i++) {
                minuteFrequencies[i] = minuteFrequencies[i] + 1;
            }
        }
        const maxFrequency = Math.max(...minuteFrequencies);
        if (maxFrequency > highestMaxFrequencyOfAsleepById[2]) {
            highestMaxFrequencyOfAsleepById = [entry[0], minuteFrequencies.indexOf(maxFrequency), maxFrequency];
        }
    }

    // output result on console
    const result = parseInt(highestMaxFrequencyOfAsleepById[0], 10) * highestMaxFrequencyOfAsleepById[1];
    console.log(`guard with highest frequency of asleep at a minute was\
guard with id '${highestMaxFrequencyOfAsleepById[0]}' at minute ${highestMaxFrequencyOfAsleepById[1]} \
Result is: ${result}`);

    return result;
}
