import { useState } from "react";
import { Button } from "@/components/ui/button"


function Homeform(){
    const [formData,setData] = useState({
        name: '',
        tour: ''
    });

    const handleInputChange = (e: { target: { name: string; value: string; }; }) =>{
        const {name, value} = e.target;
        setData({
            ...formData,
            [name]: value
        });
    }

    return( 
        <form className="border-4 border-amber-800 w-full md:w-9/12 xl:w-5/12 mx-auto">
            <h1>form goes here, finish later</h1>
        </form>
    )
}

export default Homeform;