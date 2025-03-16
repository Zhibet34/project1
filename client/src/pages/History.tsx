import axios from "axios";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function HistoryPage() {
    const [history, setHistory] = useState([]); // All history data
    const [filteredHistory, setFilteredHistory] = useState([]); // Filtered history data
    const [filter, setFilter] = useState(""); // Filter input value

    // Fetch history data
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:3000/history');
                setHistory(response.data);
                setFilteredHistory(response.data); // Initialize filtered history with all data
            } catch (error) {
                console.error('Failed to fetch history:', error);
            }
        };
        fetchHistory();
    }, []);

    // Handle filter input change
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);

        // Filter history based on plate, reason, or address
        const filtered = history.filter(
            (item) =>
                item.plate.toLowerCase().includes(value.toLowerCase()) ||
                item.reason.toLowerCase().includes(value.toLowerCase()) ||
                item.address.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredHistory(filtered);
    };

    // Clear filter
    const clearFilter = () => {
        setFilter("");
        setFilteredHistory(history); // Reset to show all history
    };

    console.log(filteredHistory)

    return (
        <div className="w-full md:w-10/12 xl:w-5/12 md:mx-auto p-4 md:rounded-lg md:shadow-md md:bg-gray-200 mt-24">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Filter by plate, reason, or address"
                    value={filter}
                    onChange={handleFilterChange}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={clearFilter}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    Clear Filter
                </button>
            </div>
            <Accordion type="single" collapsible>
                {filteredHistory.map((item) => (
                    <AccordionItem key={item._id} value={item._id}>
                        <AccordionTrigger className="flex justify-between items-center p-4 hover:bg-gray-100 rounded-lg">
                            <div className="flex flex-col items-start">
                                <p className="font-semibold text-lg">{item.user}</p>
                                <span className="text-sm text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <span className="text-blue-700 font-medium">View Details</span>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-gray-50 rounded-b-lg">
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="bg-white p-3 rounded-lg shadow-sm">
                                    <strong>Plate:</strong> {item.plate}
                                </li>
                                <li className="bg-white p-3 rounded-lg shadow-sm">
                                    <strong>Reason:</strong> {item.reason}
                                </li>
                                <li className="bg-white p-3 rounded-lg shadow-sm">
                                    <strong>Address:</strong> {item.address}
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default HistoryPage;