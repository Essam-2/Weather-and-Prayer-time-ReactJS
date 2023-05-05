import { useEffect, useState } from 'react'
import './App.css'
import {Modal,Ripple,initTE,} from "../node_modules/tw-elements";

initTE({ Modal, Ripple });

function App() {
  const [Location,setLocation] = useState(
    JSON.parse(localStorage.getItem("location")))
  const [weatherInfo,setWeatherInfo] = useState({
    icon:"",
    text: "",
    temp_c:"",
    temp_f:"",
    humidity:"",
    cloud:"",
    feelslike_c:"",
    feelslike_f:"",
    wind_kph:""
  })

  const [prayerInfo,setPrayerInfo] = useState(null)


  const handlChange = (event) =>{
    const {name, value} = event.target
    setLocation(prevFormData =>{
        return{
            ...prevFormData,
            [name]: value 
        }
    })
  } 
  
  function fetchWeatherData() {
    const apiKey = '9c89cd66e9a44f578b501526230704';
      fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${Location.city}&aqi=yes`)
      .then(res => res.json())
      .then(data=> {
        setLocation({
          city: data.location.name,
          country: data.location.country
        }),
        setWeatherInfo({
          icon: data.current.condition.icon,
          text: data.current.condition.text,
          temp_c:data.current.temp_c,
          temp_f:data.current.temp_f,
          humidity:data.current.humidity,
          cloud:data.current.cloud,
          feelslike_c:data.current.feelslike_c,
          feelslike_f:data.current.feelslike_f,
          wind_kph:data.current.wind_kph
        })
        // console.log(data)
      }).catch(err =>console.log(err))
  }

  function fetchPrayerData(){
    fetch(`https://api.aladhan.com/v1/calendarByCity/2023/4?city=${Location.city}&country=${Location.country}&method=4`)
    .then(res => res.json())
    .then(data =>{
      setPrayerInfo(data.data[0].timings)
    }) 
  }

  useEffect(()=>{
    fetchWeatherData()
    fetchPrayerData()
    // const city 
  },[])

  const handlsubmit = (event) =>{
    event.preventDefault()
    localStorage.setItem("location",JSON.stringify({
      city:Location.city,
      country:Location.country}))
    fetchWeatherData()
    fetchPrayerData()
  }

  return (
    <div className="w-full h-full ">
      <div>
            <div
                data-te-modal-init
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModalSm"
                tabIndex="-1"
                aria-labelledby="exampleModalSmLabel"
                aria-modal="true"
                role="dialog">
                    <div
                        data-te-modal-dialog-ref
                        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[300px]">
                        <div
                        className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-main">
                            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                            {/* <!--Modal title--> */}
                                <h5
                                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                                id="exampleModalSmLabel">
                                Change Location
                                </h5>
                                {/* <!--Close button--> */}
                                <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                data-te-modal-dismiss
                                aria-label="Close">
                                </button>
                            </div>
                            {/* <!--Modal body--> */}
                            <div className="relative p-4">
                                <form onSubmit = {handlsubmit}>
                                    <label  className="block p-2 text-white">City</label>
                                    <input 
                                    type="text" 
                                    className="block rounded-sm mb-2 w-full text-main "
                                    name="city"
                                    // value={Location.city}
                                    onChange={handlChange}
                                    />
                                    <label  className="block p-2 text-white">Country</label>
                                    <input 
                                    type="text" 
                                    className="block rounded-sm mb-2 w-full text-main "
                                    name="country"
                                    // value={Location.country}
                                    onChange={handlChange}
                                    />
                                <button className="bg-white p-2 w-full rounded-md mt-2 text-main  hover:bg-light_green hover:text-white">
                                    save changes
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
      {/* {Wether info} */}
        <div>
            {weatherInfo &&
                (
                <div>
                    <div className="flex sm:justify-between flex-wrap justify-center lg:px-52  mt-14 items-center w-full">
                        <div className="flex bg-main p-3 rounded-md w-fit mb-2 mx-6 ">
                            <h1 className="font-extrabold text-white text-lg lg:text-3xl">{Location.city}</h1> 
                            <h1 className="font-extrabold text-white sm:text-3xl"> - </h1> 
                            <h1 className="font-extrabold text-white text-lg lg:text-3xl">{Location.country}</h1>
                        </div>            
                        <button 
                            type="button" 
                            className="py-2 px-4 mx-6 
                                bg-light_green 
                                hover:bg-light_green
                                focus:ring-main 
                                focus:ring-offset-light_green 
                                text-white 
                                w-fit 
                                transition ease-in duration-200 
                                text-center 
                                text-base 
                                font-semibold 
                                shadow-md focus:outline-none 
                                focus:ring-2 
                                focus:ring-offset-2  
                                rounded-lg "
                                data-te-toggle="modal"
                                data-te-target="#exampleModalSm"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Change Location 
                        </button>
                    </div>
                    <div className=" flex md:justify-between flex-wrap justify-center md:px-52  mt-14 items-center w-full">
                        <div className="md:flex block space-x-5  p-3 ">
                            <h1 className="rounded-md p-3 font-extrabold text-main text-3xl w-fit "> Weather </h1> 
                        </div>
                    </div>
                    <img className="m-auto w-20" src={weatherInfo.icon}/>
                    <div className="grid md:grid-cols-6 gap-3 px-5 text-center md:px-52  md:mt-10 w-full">
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-normal">{weatherInfo.text}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-normal">{`${weatherInfo.temp_c}C (${weatherInfo.temp_f}F)`}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-normal">{`Relative Humidity: ${weatherInfo.humidity}%`}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-normal">{`Cloud: ${weatherInfo.cloud}%`}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-normal">{`Feels Like: ${weatherInfo.feelslike_c}C (${weatherInfo.feelslike_f}F)`}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-normal">{`Wind: ${weatherInfo.wind_kph}`}</h4>
                        </div>
                    </div>
                </div>
                )
            }
            
        </div>
      {/* <Prayer Times */}
      <div>
            {prayerInfo &&
            (
                <div>
                    <div className=" flex md:justify-between flex-wrap justify-center md:px-52  mt-14 items-center w-full">
                    <div className ="md:flex block space-x-5  p-3 ">
                        <h1 className ="rounded-md p-3 font-extrabold text-main text-3xl w-fit "> Prayer Times </h1> 
                    </div>
                    </div>
                    <div className="grid md:grid-cols-6 gap-3 px-5 text-center md:px-52 md:mt-10 w-full">
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-bold">Fajr</h4>
                            <h4 id="fajr" className="text-white text-lg font-normal">{prayerInfo.Fajr}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-bold">Sunrise</h4>
                            <h4 id="sunrise" className="text-white text-lg font-normal">{prayerInfo.Sunrise}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-bold">Dhuhr</h4>
                            <h4 id="dhuhr" className="text-white text-lg font-normal">{prayerInfo.Dhuhr}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-bold">Asr</h4>
                            <h4 id="asr" className="text-white text-lg font-normal">{prayerInfo.Asr}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-bold">Maghrib</h4>
                            <h4 id="maghrib" className="text-white text-lg font-normal">{prayerInfo.Maghrib}</h4>
                        </div>
                        <div className="bg-light_green w-full h-full p-4 grid justify-center items-center ">
                            <h4 className="text-white text-lg font-bold">Isha</h4>
                            <h4 id="isha" className="text-white text-lg font-normal">{prayerInfo.Isha}</h4>
                        </div>
                    </div> 
                </div>
            )}
        </div>
    </div>
  )
}

export default App
