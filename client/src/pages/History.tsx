import axios from "axios";
import { useEffect, useState } from "react";

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

    return (
        <div className="flex flex-col w-full md:w-3/5 p-4 bg-gray-100 rounded-lg shadow-md mx-auto">
            {/* Filter Input and Button */}
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

            {/* History Items */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 overflow-y-auto">
                {filteredHistory.length > 0 ? (
                    filteredHistory.map((item, id) => (
                        <ul
                            key={id}
                            className="flex flex-col md:flex-row md:flex-1 justify-between items-center p-4 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all"
                        >
                            <li className="flex-1 text-center">
                                <strong className="block text-sm text-gray-600">Plate</strong>
                                <span className="text-lg font-semibold">{item.plate}</span>
                            </li>
                            <li className="flex-1 text-center">
                                <strong className="block text-sm text-gray-600">Reason</strong>
                                <span className="text-lg font-semibold">{item.reason}</span>
                            </li>
                            <li className="flex-1 text-center">
                                <strong className="block text-sm text-gray-600">Address</strong>
                                <span className="text-lg font-semibold">{item.address}</span>
                            </li>
                        </ul>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No matching history found.</p>
                )}
            </div>
        </div>
    );
}

export default HistoryPage;