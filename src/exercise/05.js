import * as React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

const ActionTypes = Object.freeze({toggle: 'toggle', reset: 'reset'})

const toggleReducer = (state, {type, initialState}) => {
  switch (type) {
    case ActionTypes.toggle: {
      return {on: !state.on}
    }
    case ActionTypes.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

const useToggle = ({initialOn = false, reducer = toggleReducer} = {}) => {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {on} = state

  const toggle = () => dispatch({type: ActionTypes.toggle})
  const reset = () => dispatch({type: ActionTypes.reset, initialState})

  const getTogglerProps = ({onClick, ...props} = {}) => ({
    'aria-pressed': on,
    onClick: callAll(onClick, toggle),
    ...props,
  })

  const getResetterProps = ({onClick, ...props} = {}) => ({
    onClick: callAll(onClick, reset),
    ...props,
  })

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}

const App = () => {
  const [timesClicked, setTimesClicked] = React.useState(0)
  const clickedTooMuch = timesClicked >= 4

  const toggleStateReducer = (state, action) => {
    if (action.type === ActionTypes.toggle && timesClicked >= 4) {
      return {on: state.on}
    }
    return toggleReducer(state, action)
  }

  const {on, getTogglerProps, getResetterProps} = useToggle({
    reducer: toggleStateReducer,
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked(count => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({onClick: () => setTimesClicked(0)})}>
        Reset
      </button>
    </div>
  )
}

export default App
