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

function DisplayTable(){
    const [user, setUser] = useState({
        user:'',
        setUser: ''
    })

    const [tableData, setTableData] = useState({
        tableData: '',
        setTableData: ''
    })

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const response = await axios.get('http://localhost:3000/display');
                setTableData(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchTable(); // Call the async function
    }, []);

    return(
        <Table className="w-full mx-auto bg-white rounded-lg shadow-lg border border-gray-200 mt-24 md:w-10/12 xl:w-6/12 overflow-hidden">
            <TableHeader className="bg-gray-300">
                <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px] px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider text-center">Plate</TableHead>
                    <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[400px] text-center">address</TableHead>
                    <TableHead className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[400px] text-center">Method</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
                
            </TableBody>
        </Table>
    )
}

export default DisplayTable