import { useState } from 'react'
import Calendar from './components/Calendar'
import { format } from 'date-fns';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleToday = () => {
    setCurrentDate(new Date());
  }

  return (
    <div className='flex flex-col items-center mt-16 gap-3'>
      <p>Selected Date: {format(currentDate, ("dd LLLL yyyy"))}</p>
      <button onClick={handleToday} className='bg-blue-500 hover:bg-blue-700 active:bg-blue-800 px-4 py-1 text-sm text-white rounded'>Today</button>
      <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}></Calendar>
    </div>
  )
}

export default App
