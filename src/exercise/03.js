import * as React from 'react'
import {Switch} from '../switch'
import {createContext, useContext} from 'react'

const ToggleContext = createContext(null)

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

const useToggleContext = () => {
  const {on, toggle} = useContext(ToggleContext)
  return [on, toggle]
}

const ToggleOn = ({children}) => {
  const [on] = useToggleContext()
  return on ? children : null
}

const ToggleOff = ({children}) => {
  const [on] = useToggleContext()
  return on ? null : children
}

const ToggleButton = props => {
  const [on, toggle] = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}

const App = () => (
  <div>
    <Toggle>
      <ToggleOn>The button is on</ToggleOn>
      <ToggleOff>The button is off</ToggleOff>
      <div>
        <ToggleButton />
      </div>
    </Toggle>
  </div>
)

export default App
