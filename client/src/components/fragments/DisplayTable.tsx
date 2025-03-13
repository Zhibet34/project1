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
    const [user, setUser] = useState(null); // Initialize as null

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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/');
                setUser(response.data[0]);
                setError('');
            } catch (error) {
                setError('Failed to fetch user data');
                console.error(error);
            }
        };
        fetchUser();
    }, []);

   

    return (
        <div>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <Table className="w-full mx-auto bg-white rounded-lg shadow-lg border border-gray-200 mt-8 md:w-10/12 xl:w-6/12 overflow-hidden">
                <TableHeader className="bg-gray-300">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[100px] px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center">Plate</TableHead>
                        <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[400px] text-center">Address</TableHead>
                        <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[400px] text-center">Method</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    
                </TableBody>
            </Table>
        </div>
    );
}

export default DisplayTable;