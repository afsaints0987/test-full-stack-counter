import {useState, useEffect} from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const getCount = async () => {
      let data = await fetch('http://localhost:5500')
      const count = await data.json()
      setCounter(count)
    }

    getCount()
  },[])

  const updateCount = async () => {
    const response = await fetch('http://localhost:5500/count', {
      method: 'POST',
    })
    const count = await response.json()
    setCounter(count)
  }

  return (
    <div className="app">
      <h1>{counter}</h1>
      <button onClick={updateCount}>Press Me</button>
    </div>
  );
}

export default App;
