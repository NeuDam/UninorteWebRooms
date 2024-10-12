/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './Loader'


function HandlerInformation({data})  {
  const blocks = ['Bloque B', 'Bloque K', 'Bloque J', 'Bloque G', 'Bloque H', 'Bloque I', 'Bloque F', 'Bloque E', 'Bloque D', 'Bloque C', 'Bloque M']

  return <>
    {blocks.map((block, index) => (
      <section key={index} className='block'>
        <h2 className='subtitle'>{block}</h2>
        <div className='rooms'>
          {data[block].map((room, index) => (
            <div key={index} className='room'>
              <p>{room.room}</p>
              <p className={room.duration.includes('1') ? 'red-indicator-hour' : 'green-indicator-hour'}>{room.duration}</p>
            </div>
          ))}
          </div>
      </section>
    ))}
  </>
}

function App() {


  const [mainData, setMainData] = useState(false)

  const getRoomsRequest = async () => { 

    // GET THE WEEKDAY TEXT
    const date = new Date()
    const dayName = date.toLocaleDateString('en-US', {weekday: 'long'})
    const hours = String(date.getHours()).padStart(2,'0')
    const minutes = String(date.getMinutes()).padStart(2,'0')
    const timeString = `${hours}${minutes}`

    const response = await fetch('https://uninorte-room-backend.vercel.app/get_rooms', {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({day: dayName, current_time: timeString})})
    const data = await response.json()
    setMainData(data)
  }

  useEffect(() => {
    getRoomsRequest()
  }, [])

  return (
    <>
      <header className='header'>
        <h1>Free Rooms Uninorte</h1>
      </header>
      {
       new Date().toLocaleDateString('en-US', { weekday: 'long' }) === 'Sunday' ||  new Date().toLocaleDateString('en-US', { weekday: 'long' }) === 'Saturday') ? 
        <div className="sign">
        <span>No Working</span>
        <span>Today</span>
        </div> :  
        <>
          {
            !mainData ? <Loader/> : <>
              <span className='amount-av'>Disponibles: <b>{mainData?.amount}</b></span>
              <main>
                {mainData && <HandlerInformation data={mainData.data}/>}
              </main>
            </>
          }
        </>
      }
      
    </>
  )
}

export default App
