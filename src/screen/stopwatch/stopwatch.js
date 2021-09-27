import React from "react";
import Button from "../../components/button/button";
import "./stopwatch.scss";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minute: 0,
      second: 0,
      isButtonActive: false,
      isdisplayResetButton: false,
      isStartButton: false,
      isStopButton: false,
      intervalId: "",
      elapsedTime: [],
    };
  }

  onStopClick = () => {
    if (this.state.elapsedTime.length == 1) {
      return;
    }
    clearInterval(this.state.intervalId);

    this.setState({
      // isButtonActive: true,
      isStopButton: true,
      isStartButton: true,
      isdisplayResetButton: false,
      elapsedTime: [
        ...this.state.elapsedTime,
        `${this.state.hours.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${this.state.minute.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${this.state.second.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`,
      ],
    });
  };

  onResetClick = () => {
    this.setState({
      hours: 0,
      minute: 0,
      second: 0,
      isdisplayResetButton: true,
      isStartButton: false,
      isStopButton: true,
      isButtonActive: false,
      elapsedTime: [],
    });
  };

  onStartClick = () => {
    let intervalId = setInterval(() => {
      this.setState({
        hours:
          this.state.minute == 59 ? this.state.hours + 1 : this.state.hours,
        minute:
          this.state.second == 59 ? this.state.minute + 1 : this.state.minute,

        second: this.state.second == 59 ? 0 : this.state.second + 1,
      });
    }, 1000);
    this.setState({
      intervalId: intervalId,
      isButtonActive: true,
      isStartButton: true,
      isStopButton: false,
      isdisplayResetButton: true,
    });
  };

  render() {
    return (
      <div className="Stopwatch">
        <h1 className="stopwatchHeading">Stopwatch</h1>

        <div className="stopwatch-container">
          <section className="time-container">
            <p className="timer-text">
              {this.state.hours < 10
                ? "0" + this.state.hours
                : this.state.hours}
            </p>
            <span>:</span>
            <p className="timer-text">
              {this.state.minute < 10
                ? "0" + this.state.minute
                : this.state.minute}
            </p>
            <span>:</span>
            <p className="timer-text">
              {this.state.second < 10
                ? "0" + this.state.second
                : this.state.second}
            </p>
          </section>

          <section className="controls-container">
            {!this.state.isButtonActive && !this.state.isStartButton && (
              <Button handleOnClick={this.onStartClick} text="Start" />
            )}

            {this.state.isButtonActive && !this.state.isStopButton && (
              <Button handleOnClick={this.onStopClick} text="Stop" />
            )}

            {this.state.isButtonActive && !this.state.isdisplayResetButton && (
              <Button handleOnClick={this.onResetClick} text="Reset" />
            )}
          </section>
        </div>
        {this.state.elapsedTime.map(function (item, index) {
          return (
            <p key={index} className="StopWatchElapsed">
              Time elapsed:{item}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Stopwatch;