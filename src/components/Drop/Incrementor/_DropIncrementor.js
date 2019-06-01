import React from "react";
import {Howl} from "howler";

const Click = new Howl({src: "./sounds/click.mp3"});

class _DropIncrementor extends React.Component {

    constructor(props, incrementorSettings) {
        super(props);

        const defaultSettings = {
            delay: 250,
            iteratorSkip: 2,
            max: undefined,
            min: 0,
            step: 1,
            windowLeash: 10
        };

        this.incrementorSettings = {
            ...defaultSettings,
            ...incrementorSettings
        };

        this.state = {
            interval: null,
            iterator: 0,
            running: false,
            windowPosition: null,
            windowListener: null
        };
    }

    componentWillUnmount() {
        this.stopInterval();
    }

    onMouseDown(e) {
        if (this.state.running)
            return;

        this.startInterval();
    }

    onMouseMove(e) {
        //
    }

    onMouseOut(e) {
        if (!this.state.running)
            return;

        this.stopInterval();
    }

    onMouseUp(e) {
        if (!this.state.running)
            return;

        if (this.state.iterator <= this.incrementorSettings.iteratorSkip)
            this.stepCount();

        this.stopInterval();
    }

    onWindowScroll(e) {
        if (!this.state.running)
            return;

        let diff = Math.abs(window.scrollY - this.state.windowPosition);
        if (diff > this.incrementorSettings.windowLeash)
            this.stopInterval();
    }

    stepCount() {
        let count = this.props.submissionDrop.count + this.incrementorSettings.step;
        if (count < this.incrementorSettings.min)
            count = this.incrementorSettings.min;
        else if (this.incrementorSettings.max !== undefined && count > this.incrementorSettings.max)
            count = this.incrementorSettings.max;

        this.props.update(count, false);

        this.props.parent.animate();

        if (this.props.settings.click)
            Click.play();

        if (this.props.settings.vibrate && window.navigator.vibrate)
            window.navigator.vibrate(100);
    }

    startInterval() {
        let interval = setInterval(() => this.tick(), this.incrementorSettings.delay),
            windowPosition = window.scrollY,
            windowListener = (e) => this.onWindowScroll(e);

        window.addEventListener("scroll", windowListener);
        this.setState({
            iterator: 0,
            running: true,
            interval,
            windowListener,
            windowPosition
        });
    }

    stopInterval() {
        if (!this.state.running)
            return;

        clearInterval(this.state.interval);
        window.removeEventListener("scroll", this.state.windowListener);

        this.setState({
            running: false,
            interval: null,
            windowListener: null,
            windowPosition: null
        });
    }

    tick() {
        if (this.state.iterator > this.incrementorSettings.iteratorSkip) {
            this.stepCount();
        }

        this.setState({iterator: this.state.iterator + 1});
    }
}

export default _DropIncrementor;
