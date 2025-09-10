import { useState } from 'react'

const Button = ({text, onclick}) => <button onClick={onclick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td> <td>{value}</td></tr>

const Statistics = (props) => {

  const {good, neutral, bad, total} = props.stats

  if(total > 0){
    return(
    <>
      <h1>statistics</h1>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral}/>
      <StatisticLine text={"bad"} value={bad}/>
      <StatisticLine text={"all"} value={total}/>
      <StatisticLine text={"average"} value={(good-bad)/total}/>
      <StatisticLine text={"positive"} value={good/total*100 + "%"}/>
    </>
  )
  }
  return(
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad

  return (
    <>
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} onclick={() => setGood(good+1)} />
      <Button text={"neutral"} onclick={() => setNeutral(neutral+1)} />
      <Button text={"bad"} onclick={() => setBad(bad+1)} />
    </div>
    
    <div>
      <Statistics stats={{good, neutral, bad, total}}></Statistics>
    </div>
    </>
  )
}

export default App