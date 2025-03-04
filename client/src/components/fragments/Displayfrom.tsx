import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';


function Displayform(){
    const [formData, setFormData] = useState({
        plate: '',
        reason: '',
        address: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; })=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };

    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault()

        if (!formData.plate || !formData.reason || !formData.address) {
          alert("Please fill in all fields.");
          return;
        }
    
        try {
            const response = await axios.post('http://localhost:3000/display', formData);
            console.log('Response:', response.data);
            setFormData({
                plate: '',
                reason: '',
                address: '',
            });
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <form
        className="w-full mx-auto p-6 md:bg-white md:rounded-lg md:shadow-lg md:border md:border-gray-200 mt-32 md:mt-32 md:mt-0 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-4 md:w-10/12 xl:w-6/12"
        onSubmit={handleSubmit}
      >
        {/* Plate Input */}
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="plate" className="text-sm font-medium text-gray-700">
            Plate:
          </Label>
          <Input
            id="plate"
            type="text"
            name="plate"
            maxLength={10}
            minLength={2}
            value={formData.plate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      
        {/* Reason Input */}
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
            Reason:
          </Label>
          <Input
            id="reason"
            type="text"
            name="reason"
            maxLength={10}
            minLength={2}
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      
        {/* Address Input */}
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="address" className="text-sm font-medium text-gray-700">
            Address:
          </Label>
          <Input
            id="address"
            type="text"
            name="address"
            maxLength={5}
            minLength={2}
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      
        {/* Submit Button */}
        <div className="flex justify-center mt-4 md:mt-0 md:flex-none">
          <Button
            type="submit"
            className="w-2/5 md:w-auto px-6 py-2 bg-neutral-800 text-white font-semibold rounded-md hover:bg-stone-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Submit
          </Button>
        </div>
      </form>
    )
}

export default Displayform;