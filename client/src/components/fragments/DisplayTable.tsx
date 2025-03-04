import { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import '../fragments/css/App.css';

function DisplayTable() {
    const [tableData, setTableData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/display');
            console.log(response.data);
            setTableData(response.data); 
            setError(null); 
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        setInterval(fetchData,3000)
    }, []);

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const hours = String(date.getHours()).padStart(2, '0'); 
        const minutes = String(date.getMinutes()).padStart(2, '0'); 
        return `${hours}:${minutes}`; 
    };

    if (loading) {
        return (
            <div className="loader mt-16">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="loading-text">Loading...</div>
            </div>
        )
    }

    if (error) {
        return <div className="text-center mt-16 text-red-500">{error}</div>; 
    }

    return (
        <Table className="w-full px-8 mx-auto p-6 md:bg-white md:rounded-lg md:shadow-lg md:border md:border-gray-200 md:mt-32 md:flex-row md:items-end md:justify-between md:gap-4 md:w-10/12 xl:w-6/12">
            <TableHeader className="bg-gray-500">
                <TableRow>
                    <TableHead className="w-[120px] text-center font-semibold text-neutral-900 py-3">Time</TableHead>
                    <TableHead className="w-[120px] text-center font-semibold text-neutral-900 py-3">Plate</TableHead>
                    <TableHead className="w-[120px] text-center font-semibold text-neutral-900 py-3">Reason</TableHead>
                    <TableHead className="w-[120px] text-center font-semibold text-neutral-900 py-3">Address</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.length > 0 ? (
                    tableData.map((cell) => (
                        <TableRow key={cell._id} className="hover:bg-gray-200 transition-colors duration-200">
                            <TableCell className="text-center text-gray-600 py-3 border-t border-gray-100">{formatTime(cell.createdAt)}</TableCell>
                            <TableCell className="text-center text-gray-600 py-3 border-t border-gray-100">{cell.plate}</TableCell>
                            <TableCell className="text-center text-gray-600 py-3 border-t border-gray-100">{cell.reason}</TableCell>
                            <TableCell className="text-center text-gray-600 py-3 border-t border-gray-100">{cell.address}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                            No data available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default DisplayTable;