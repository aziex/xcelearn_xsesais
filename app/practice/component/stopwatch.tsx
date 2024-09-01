import React, { Component } from 'react';
// import './StopWatch.css';

interface StopWatchProps {
  autoStart: boolean; // Add prop to determine if the stopwatch should start automatically
}

interface StopWatchState {
  isRunning: boolean;
  mm: number;
  ss: number;
  ms: number;
}

export default class StopWatch extends Component<
  StopWatchProps,
  StopWatchState
> {
  state: StopWatchState = {
    isRunning: false,
    mm: 0,
    ss: 0,
    ms: 0,
  };

  timerID: number | undefined;

  componentDidMount() {
    if (this.props.autoStart) {
      this.startTimer();
    }
  }

  startTimer = () => {
    let { mm, ss, ms } = this.state;
    this.timerID = window.setInterval(() => {
      ms++;
      if (ms >= 100) {
        ss++;
        ms = 0;
      }
      if (ss >= 60) {
        mm++;
        ss = 0;
      }
      this.setState({ mm, ss, ms });
    }, 10);
    this.setState({ isRunning: true });
  };

  stopTimer = () => {
    clearInterval(this.timerID);
    this.setState({ isRunning: false });
  };

  resetTimer = () => {
    clearInterval(this.timerID);
    this.setState({ mm: 0, ss: 0, ms: 0, isRunning: false });
  };

  clickHandler = () => {
    this.state.isRunning ? this.stopTimer() : this.startTimer();
  };

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  render() {
    return (
      <div className="stop-watch">
        <div>
          <span>{this.format(this.state.mm)}</span>:
          <span>{this.format(this.state.ss)}</span>
        </div>
        {/* <button className="control" onClick={this.clickHandler}>
          {this.state.isRunning ? 'Stop' : 'Start'}
        </button> */}
      </div>
    );
  }
}
