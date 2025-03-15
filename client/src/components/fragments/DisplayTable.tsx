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
    const [tableData, setTableData] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(''); // State to handle errors

    // Fetch table data
    useEffect(() => {
        const fetchTable = async () => {
            try {
                const response = await axios.get('http://localhost:3000/display');
                setTableData(response.data);
                setError('');
            } catch (error) {
                setError('Failed to fetch table data');
                console.error(error);
            }
        };
        fetchTable();
    }, []);

    return (
        <div className="w-full rounded mx-auto p-6 md:p-0 md:bg-white md:shadow-lg md:border md:border-gray-200 mt-8 md:mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-4 md:w-10/12 xl:w-6/12 mb-8">
            <Table>
                <TableHeader className="bg-gray-300">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[400px] px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center">Plate</TableHead>
                        <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[400px] text-center">reason</TableHead>
                        <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[400px] text-center">Address</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {tableData.map((item, id) => (
                        <TableRow key={id} className="hover:bg-gray-100">
                            <TableCell className="px-6 py-4 text-center">{item.plate}</TableCell>
                            <TableCell className="px-6 py-4 text-center">{item.reason}</TableCell>
                            <TableCell className="px-6 py-4 text-center">{item.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DisplayTable;