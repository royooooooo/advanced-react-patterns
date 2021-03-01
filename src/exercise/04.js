import * as React from 'react'
import {Switch} from '../switch'

const useToggle = () => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const togglerProps = {
    'aria-pressed': on,
    onClick: toggle,
  }

  return {on, togglerProps}
}

const App = () => {
  const {on, togglerProps} = useToggle()
  const {onClick} = togglerProps
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button
        aria-label="custom-button"
        {...togglerProps}
        onClick={() => {
          console.log('onButtonClick')
          onClick()
        }}
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
