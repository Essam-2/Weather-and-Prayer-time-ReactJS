import React, { useState } from "react";

const ModalC = () => {
    const [formData,setFormData] = useState({
        city: "",
        country: ""
    })

    const handlChange = (event) =>{
        const {name, value} = event.target
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [name]: value 
            }
        })
    } 

    const handlsubmit = (event) =>{
        console.log(formData) 
        event.preventDefault()
    }
    
    return(
        <div>
            <div
                data-te-modal-init
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModalSm"
                tabindex="-1"
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
                                    onChange={handlChange}/>
                                    <label  className="block p-2 text-white">Country</label>
                                    <input 
                                    type="text" 
                                    className="block rounded-sm mb-2 w-full text-main "
                                    name="country"
                                    onChange={handlChange}/>
                                <button className="bg-white p-2 w-full rounded-md mt-2 text-main  hover:bg-light_green hover:text-white">
                                    save changes
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
    
}


export default ModalC