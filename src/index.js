import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import * as serviceWorker from './serviceWorker';

const INCREMENT_BREAK = 'INCREMENT_BREAK';
const DECREMENT_BREAK = 'DECREMENT_BREAK';
const INCREMENT_SESSION = 'INCREMENT_SESSION';
const DECREMENT_SESSION = 'DECREMENT_SESSION';
const RESET = 'RESET';
const PAUSE_TIMER = 'PAUSE_TIMER';
const START_TIMER = 'START_TIMER';
const TICK = 'TICK';

const defaultState = {
	breakLength: 5,
	sessionLength: 25,
	isPaused: true,
	isInSession: true,
	timeLeft: 1500 // 25 * 60
}

let timer = null;

const tick = () => { return { type: TICK }};

const incrementBreak = (state) => {
	if (state.breakLength < 60) {
		if (state.isInSession) {
			return {
				breakLength: state.breakLength + 1
			}
		} else {
			return {
				breakLength: state.breakLength + 1,
				timeLeft: state.timeLeft + 60
			}
		}
	} else {
		return {
			breakLength: state.breakLength
		}
	}
}

const decrementBreak = (state) => {
	if (state.breakLength > 1) {
		if (state.isInSession) {
			return {
				breakLength: state.breakLength - 1
			}
		} else {
			return {
				breakLength: state.breakLength - 1,
				timeLeft: state.timeLeft - 60
			}
		}
	} else {
		return {
			breakLength: state.breakLength
		}
	}
}

const incrementSession = (state) => {
	if (state.sessionLength < 60) {
		if (state.isInSession) {
			return {
				sessionLength: state.sessionLength + 1,
				timeLeft: state.timeLeft + 60
			}
		} else {
			return {
				sessionLength: state.sessionLength + 1
			}
		}
	} else {
		return {
			sessionLength: state.sessionLength
		}
	}
}

const decrementSession = (state) => {
	if (state.sessionLength > 1) {
		if (state.isInSession) {
			return {
				sessionLength: state.sessionLength - 1,
				timeLeft: state.timeLeft - 60
			}
		} else {
			return {
				sessionLength: state.sessionLength - 1
			}
		}
	} else {
		return {
			sessionLength: state.sessionLength
		}
	}
}

/* https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8 */
const startTimer = () => (dispatch) => {
	clearInterval(timer);
	timer = setInterval(() => dispatch(tick()), 1000);
	dispatch({ type: START_TIMER });
}

const pauseTimer = () => {
	clearInterval(timer);
	return { type: PAUSE_TIMER };
}

const incrementTimer = (state) => {
	if (state.timeLeft === 0) {
		if (state.isInSession) {
			return {
				isInSession: false,
				timeLeft: state.breakLength * 60
			}
		} else {
			return {
				isInSession: true,
				timeLeft: state.sessionLength * 60
			}
		}
	} else {
		return { timeLeft: state.timeLeft - 1 };
	}
}

const reducer = (state = defaultState, action) => {
	switch(action.type) {
		case INCREMENT_BREAK:
			return Object.assign({}, state, incrementBreak(state));
		case DECREMENT_BREAK:
			return Object.assign({}, state, decrementBreak(state));
		case INCREMENT_SESSION:
			return Object.assign({}, state, incrementSession(state));
		case DECREMENT_SESSION:
			return Object.assign({}, state, decrementSession(state));
		case RESET:
			clearInterval(timer);
			return Object.assign({}, defaultState, { isReset: !state.isReset });
		case PAUSE_TIMER:
			return Object.assign({}, state, { isPaused: true });
		case START_TIMER:
			return Object.assign({}, state, { isPaused: false, isReset: false });
		case TICK:
			return Object.assign({}, state, incrementTimer(state));
		default:
			return state;
	}
}

const store = createStore(reducer, applyMiddleware(thunk));

function Break(props) {
	return (
		<div className="break">
			<div id="break-label">Break Length</div>
			<button id="break-decrement" onClick={props.decrementBreak}>-</button>
			<span id="break-length">{props.breakLength}</span>
			<button id="break-increment" onClick={props.incrementBreak}>+</button>
		</div>
	);
}
const ConnectedBreak = connect(
	function(state) {
		return { breakLength: state.breakLength }
	}, 
	function(dispatch) {
		return {
			incrementBreak: function() {
				dispatch({ type: INCREMENT_BREAK });
			},
			decrementBreak: function() {
				dispatch({ type: DECREMENT_BREAK });
			}
		}
	}
)(Break);

function Session(props) {
	return (
		<div className="session">
			<div id="session-label">Session Length</div>
			<button id="session-decrement" onClick={props.decrementSession}>-</button>
			<span id="session-length">{props.sessionLength}</span>
			<button id="session-increment" onClick={props.incrementSession}>+</button>
		</div>
	);
}
const ConnectedSession = connect(
	function(state) {
		return { sessionLength: state.sessionLength }
	},
	function(dispatch) {
		return {
			incrementSession: function() {
				dispatch({ type: INCREMENT_SESSION });
			},
			decrementSession: function() {
				dispatch({ type: DECREMENT_SESSION });
			}
		}
	}
)(Session);

/* Beep audio file from the freeCodeCamp example for this project. */
function Beep(props) {
	const beep = useRef(null);
	if (beep.current != null) {
		if (props.timeLeft === 0 && !props.isReset) {
			beep.current.play();
		} else if (props.isReset && !beep.current.paused) {
			beep.current.pause();
			beep.current.currentTime = 0;
		}
	}
	
	return (
		<audio id="beep" src="https://goo.gl/65cBl1" ref={beep} />
	)
}
const ConnectedBeep = connect(
	function(state) {
		return {
			timeLeft: state.timeLeft,
			isReset: state.isReset
		}
	},
	null
)(Beep);

function Timer(props) {
	/* https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds */
	const minutes = Math.floor(props.timeLeft / 60);
	const seconds = props.timeLeft % 60;
	const prettyMinutes = minutes < 10 ? '0' + minutes : minutes;
	const prettySeconds = seconds < 10 ? '0' + seconds : seconds;
	return (
		<div className="timer">
			<div id="timer-label">{props.isInSession ? 'Session' : 'Break'}</div>
			<div id="time-left">{prettyMinutes}:{prettySeconds}</div>
			<button id="start_stop" onClick={props.isPaused ? props.startTimer : props.pauseTimer}>{props.isPaused ? 'Start' : 'Stop'}</button>
			<ConnectedBeep />
		</div>
	);
}
const ConnectedTimer = connect(
	function(state) {
		return {
			timeLeft: state.timeLeft,
			isPaused: state.isPaused,
			isInSession: state.isInSession
		}
	},
	function(dispatch) {
		return {
			pauseTimer: function() {
				dispatch(pauseTimer());
			},
			startTimer: function() {
				dispatch(startTimer());
			}
		}
	}
)(Timer);

function ResetButton(props) {
	return (
		<button id="reset" onClick={props.reset}>Reset</button>
	);
}
const ConnectedResetButton = connect(
	null, 
	function(dispatch) {
		return {
			reset: function() {
				dispatch({ type: RESET });
			}
		}
	}
)(ResetButton);

function PomodoroClock() {
	return (
		<div className="pomodoro-clock">
			<ConnectedBreak />
			<ConnectedSession />
			<ConnectedTimer />
			<ConnectedResetButton />
		</div>
	);
}

ReactDOM.render(
	<Provider store={store}>
		<PomodoroClock />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
