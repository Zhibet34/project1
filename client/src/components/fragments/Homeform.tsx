import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from 'axios';

function Homeform() {
    const [data, setData] = useState({
        username: '',
        tour: ''
    });
    const [error, setError] = useState('')

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (value: any) => {
        setData(prevState => ({
            ...prevState,
            tour: value
        }));
        setError('')
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(!data.tour){
            const message = 'please sellect a tour';
            setError(message.toUpperCase());
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/', data);
            console.log("Response:", response.data);
            setData({
                username: '',
                tour: ''
            })
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form
            className="w-full md:w-9/12 lg:w-5/12 mx-auto flex flex-col md:flex-row md:items-center gap-4 mt-24 px-8 md:p-0"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center gap-8">
                <Label htmlFor="username">
                    Username:
                </Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    value={data.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="w-full gap-8 flex  items-center">
                <Label htmlFor="tour" className="md:w-24">
                    Tour:
                </Label>
                <Select value={data.tour} onValueChange={handleSelectChange} required>
                    <SelectTrigger id="tour" className="w-[370px] md:w-[200px]">
                        <SelectValue placeholder="Select a tour" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7 x 3">Tour 1</SelectItem>
                        <SelectItem value="3 x 11">Tour 2</SelectItem>
                        <SelectItem value="11 x 7">Tour 3</SelectItem>
                    </SelectContent>
                </Select>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="flex justify-center">
                <Button type="submit" variant="outline">
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default Homeform;