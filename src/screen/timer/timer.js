import React from "react";
import Button from "../../components/button/button";
import "./timer.scss";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minute: 0,
      second: 0,
      isButtonActive: false,
      intervalId: "",
      elapsedTime: [],
      resetButtonActive: false,
    };
  }

  onLapClick = () => {
    if (this.state.elapsedTime.length > 10) {
      return;
    }

    this.setState({
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
    this.setState({ intervalId: intervalId, isButtonActive: true });
  };

  onStopClick = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      isButtonActive: false,
      elapsedTime: [],
      hours: 0,
      minute: 0,
      second: 0,
    });
  };

  render() {
    return (
      <div className="Timer">
        <h1 className="timerHeading">Timer</h1>
        <div className="timer-container1">
          <section className="timer-container">
            <p className="timer-content">
              {this.state.hours.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}

              {/*this.state.hours < 10
                ? "0" + this.state.hours
              : this.state.hours */}
            </p>
            <span>:</span>
            <p className="timer-content">
              {this.state.minute.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}

              {/*this.state.minute < 10
                ? "0" + this.state.minute
              : this.state.minute */}
            </p>
            <span>:</span>
            <p className="timer-content">
              {this.state.second.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}

              {/*this.state.second < 10
                ? "0" + this.state.second
              : this.state.second */}
            </p>
          </section>

          <section className="controls-container">
            {!this.state.isButtonActive && (
              <Button handleOnClick={this.onStartClick} text="Start" />
            )}

            {this.state.isButtonActive && (
              <Button handleOnClick={this.onLapClick} text="Lap" />
            )}

            {this.state.isButtonActive && (
              <Button handleOnClick={this.onStopClick} text="Stop" />
            )}
          </section>
        </div>
        {this.state.elapsedTime.map(function (item, index) {
          return (
            <p key={index} className="TimeElapsed">
              Lap:{item}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Timer;