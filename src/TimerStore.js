import {observable, computed, action} from 'mobx'
import Timer from './Timer'
import moment from 'moment';

export class TimerStore {

    @observable isRunning;
    @observable timer;
    @observable startTime;

    @observable laps;

    constructor() {
        this.isRunning = false;
        this.timer = new Timer();
        this.laps = [];
    }

    @computed get mainDisplay() {
        return this.timer.display;
    }

    @computed get hasStarted() {
        return this.timer.totalMilliSeconds !== 0;
    }

    @action measure() {
        if (!this.isRunning) return;

        this.timer.milliseconds = moment().diff(this.startTime);

        setTimeout(() => this.measure(), 10);
    }

    @action startTimer() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startTime = moment();
        this.measure();
    }

    @computed get length() {
        return this.laps.length;
    }

    @computed get lapTime() {
        return this.laps.map((el) => el.totalMilliSeconds)
            .reduce((x, y) => x + y, 0);
    }

    @action lapTimer() {
        this.laps.push(new Timer(this.timer.totalMilliSeconds - this.lapTime));
    }

    @computed get lapData() {
        const data = [];
        for (let i = 0; i < this.laps.length; i++) {
            data.push({
                lap: this.laps[i],
                text: `Lap ${i + 1}`,
            });
        }
        return data.reverse();
    }

    @action stopTimer() {
        this.timer.saveTime();
        this.isRunning = false;
    }

    @action resetTimer() {
        this.timer.reset();
        this.laps = [];
        this.isRunning = false;
    }

}

