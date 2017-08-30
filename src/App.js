import React from 'react';
import {observer} from 'mobx-react';
import {TimerDisplay} from './TimerDisplay';

const App = observer(({timerStore}) => {
    let firstButton;
    let secondButton;

    if (!timerStore.isRunning) {
        secondButton = (
            <button
                style={{color: '#4bd761'}}
                onClick={() => timerStore.startTimer()}
            >
              start
            </button>
        );

        firstButton = (
            <button
                onClick={() => timerStore.resetTimer()}
            >
              reset
            </button>
        );

        if (!timerStore.hasStarted) {
            firstButton = null;
        }
    } else {
        secondButton = (
            <button
                style={{ color: '#fd3d2a'}}
                onClick={() => timerStore.stopTimer()}
            >
              stop
            </button>
        );

        firstButton = (
            <button
                onClick={() => timerStore.lapTimer()}
            >
              lap
            </button>
        );
    }

    return (
        <div style={{fontSize: 30}}>
          <div>
              {timerStore.mainDisplay}
          </div>
          <div>
            <div>
                {firstButton}
                {secondButton}
            </div>
            <div>
                {timerStore.lapData.map((el) =>
                    <TimerDisplay
                        key={el.lap.id}
                        leftText={el.text}
                        rightText={el.lap.display}
                    />
                )}
            </div>
          </div>
        </div>
    );
});

export default App;

