import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

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
            });
            navigate('/display')
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form
            className="p-2 md:p-0 w-10/12 md:w-10/12 lg:1/5 flex flex-col md:flex-row mx-auto gap-4 md:items-center justify-center mt-48"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-row gap-4 items-center">
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
                    className="w-3/5 md:w-full"
                />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-4">
                    <Label htmlFor="tour">Tour:</Label>
                    <Select value={data.tour} onValueChange={handleSelectChange} required>
                        <SelectTrigger id="tour" className="w-[300px] md:w-[210px]">
                            <SelectValue placeholder="Select a tour" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7 x 3">Tour 1</SelectItem>
                            <SelectItem value="3 x 11">Tour 2</SelectItem>
                            <SelectItem value="11 x 7">Tour 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {error && <p className="text-red-500 text-sm mt-1 text-center">{error}</p>}
            </div>

            <div className="mx-auto md:m-0">
                <Button type="submit" variant="outline">
                    Submit
                </Button>
            </div>
        </form>
    );
}

export default Homeform;