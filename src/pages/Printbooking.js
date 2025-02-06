import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PrintReceipt = () => {
    const { id } = useParams(); // Get receipt ID from URL
    const [receiptData, setReceiptData] = useState(null);

    useEffect(() => {
        // Fetch receipt data from API
        const fetchReceiptData = async () => {
            try {
                const response = await fetch(`/api/receipt/${id}`);
                const data = await response.json();
                setReceiptData(data);
            } catch (error) {
                console.error('Failed to fetch receipt data:', error);
            }
        };
        fetchReceiptData();
    }, [id]);

    useEffect(() => {
        if (receiptData) {
            window.print(); // Automatically trigger print dialog
        }
    }, [receiptData]);

    if (!receiptData) {
        return <p>Loading receipt...</p>;
    }

    return (
        <div>
            <h1>Receipt</h1>
            <h1>Receipt</h1>
            <h1>Receipt</h1>
            <h1>Receipt</h1>
            <h1>Receipt</h1>
        </div>
    );
};

export default PrintReceipt;
