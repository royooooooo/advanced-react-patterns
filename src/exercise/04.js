import * as React from 'react'
import {Switch} from '../switch'
import {useCallback} from 'react'

const useToggle = () => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

  const getToggleProps = useCallback(
    ({onClick, ...otherProps}) => {
      return {
        'aria-pressed': on,
        onClick: () => {
          onClick && onClick()
          toggle()
        },
        ...otherProps,
      }
    },
    [toggle, on],
  )

  return {on, getToggleProps}
}

const App = () => {
  const {on, getToggleProps} = useToggle()
  return (
    <div>
      <Switch {...getToggleProps({on})} />
      <hr />
      <button
        {...getToggleProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
