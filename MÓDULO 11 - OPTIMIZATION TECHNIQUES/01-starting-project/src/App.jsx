import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleCount(numberCount) {
    setChosenCount(numberCount);
    setChosenCount(prevCount => prevCount + 1);
    console.log(chosenCount);
    
  }  

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleCount}/>        
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
