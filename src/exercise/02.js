import * as React from 'react'
import {Switch} from '../switch'
import {cloneElement} from 'react'

const Toggle = ({children}) => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child =>
    typeof child.type === 'string'
      ? child
      : cloneElement(child, {
          on,
          toggle,
        }),
  )
}

const ToggleOn = ({on, children}) => (on ? children : null)

const ToggleOff = ({on, children}) => (on ? null : children)

const ToggleButton = ({on, toggle, ...props}) => (
  <Switch on={on} onClick={toggle} {...props} />
)

const App = () => (
  <div>
    <Toggle>
      <ToggleOn>The button is on</ToggleOn>
      <ToggleOff>The button is off</ToggleOff>
      <br/>
      <span>Hello</span>
      <ToggleButton />
    </Toggle>
  </div>
)

export default App
