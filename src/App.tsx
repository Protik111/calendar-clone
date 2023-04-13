import { useState } from 'react'
import Calendar from './components/Calendar'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className='flex flex-col items-center mt-16'>
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}></Calendar>
    </div>
  )
}

export default App
