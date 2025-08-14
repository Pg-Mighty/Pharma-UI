import React, { useState } from 'react';
import { Eye, Trash2, X } from 'lucide-react';

interface BatchRecord {
    planNo: string;
    product: string;
    protocolNo: string;
    batchNo: string;
    mfgDate: string;
    market: string;
    retestExpDate: string;
    typeOfBatch: string;
    packDetails: string;
    purposeOfStudy: string;
    condition: string;
    dateOfIncubation: string;
    distributedQuantity: string;
    remainingQty: string;
    withdrawalSchedule: WithdrawalEntry[];
}

interface WithdrawalEntry {
    dueDate: string;
    interval: string;
    chemicalAnalysis: string;
    microAnalysis: string;
    specification: string;
}

interface ViewModalProps {
    record: BatchRecord | null;
    isOpen: boolean;
    onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ record, isOpen, onClose }) => {
    if (!isOpen || !record) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Batch Record Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-3">Basic Information</h3>
                                <div className="space-y-2">
                                    <div><span className="font-medium">Plan No.:</span> {record.planNo}</div>
                                    <div><span className="font-medium">Product:</span> {record.product}</div>
                                    <div><span className="font-medium">Protocol No.:</span> {record.protocolNo}</div>
                                    <div><span className="font-medium">Batch No.:</span> {record.batchNo}</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-3">Dates & Market</h3>
                                <div className="space-y-2">
                                    <div><span className="font-medium">Mfg Date:</span> {record.mfgDate}</div>
                                    <div><span className="font-medium">Market:</span> {record.market}</div>
                                    <div><span className="font-medium">Retest/Exp Date:</span> {record.retestExpDate}</div>
                                    <div><span className="font-medium">Date of Incubation:</span> {record.dateOfIncubation}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-3">Batch Details</h3>
                                <div className="space-y-2">
                                    <div><span className="font-medium">Type of Batch:</span> {record.typeOfBatch}</div>
                                    <div><span className="font-medium">Purpose of Study:</span> {record.purposeOfStudy}</div>
                                    <div><span className="font-medium">Condition:</span> {record.condition}</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-3">Packaging & Quantities</h3>
                                <div className="space-y-2">
                                    <div><span className="font-medium">Pack Details:</span> {record.packDetails}</div>
                                    <div><span className="font-medium">Distributed Quantity:</span> {record.distributedQuantity}</div>
                                    <div><span className="font-medium">Remaining Qty:</span> {record.remainingQty}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Withdrawal Schedule in Modal */}
                    {record.withdrawalSchedule && record.withdrawalSchedule.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-3">Withdrawal Schedule</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                    <tr className="bg-blue-100">
                                        <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Due Date</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Interval</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Chemical Analysis</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Micro Analysis</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Specification</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {record.withdrawalSchedule.map((entry, index) => (
                                        <tr key={index} className="hover:bg-blue-50">
                                            <td className="border border-gray-300 px-3 py-2">{entry.dueDate}</td>
                                            <td className="border border-gray-300 px-3 py-2">{entry.interval}</td>
                                            <td className="border border-gray-300 px-3 py-2">{entry.chemicalAnalysis}</td>
                                            <td className="border border-gray-300 px-3 py-2">{entry.microAnalysis}</td>
                                            <td className="border border-gray-300 px-3 py-2">{entry.specification}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const BatchRecords: React.FC = () => {
    const [batchRecords, setBatchRecords] = useState<BatchRecord[]>([
        {
            planNo: '2500001',
            product: 'CAH - Metolazone 2.5 mg Tablets',
            protocolNo: 'SSP/EB/CAH-CAK-CAM/001-00',
            batchNo: 'CAH00222',
            mfgDate: 'Dec-2022',
            market: 'EU/UK',
            retestExpDate: 'Nov-2025',
            typeOfBatch: 'Commercial Validation Batch',
            packDetails: '3X14\'s Duplex 250/90 White Opaque-Alu Blister',
            purposeOfStudy: 'Exhibit Batch',
            condition: '30°C/75%RH',
            dateOfIncubation: '29-Jun-25',
            distributedQuantity: '29 Cartons',
            remainingQty: '15 Cartons',
            withdrawalSchedule: [
                { dueDate: '29-Jul-2025', interval: '1 M', chemicalAnalysis: '04 Cartons', microAnalysis: '0 NA', specification: '' },
                { dueDate: '29-Aug-2025', interval: '2 M', chemicalAnalysis: '04 Cartons', microAnalysis: '0 NA', specification: '' },
                { dueDate: '29-Sep-2025', interval: '3 M', chemicalAnalysis: '04 Cartons', microAnalysis: '0 NA', specification: '' },
                { dueDate: '29-Dec-2025', interval: '6 M', chemicalAnalysis: '13 Cartons', microAnalysis: '04 Cartons', specification: '' },
                { dueDate: '29-Dec-2025', interval: 'Extra Samples', chemicalAnalysis: '06 Cartons', microAnalysis: '00 Cartons', specification: '' }
            ]
        }
    ]);

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<BatchRecord | null>(null);

    const removeRecord = (index: number) => {
        setBatchRecords(prev => prev.filter((_, i) => i !== index));
    };

    const viewRecord = (record: BatchRecord) => {
        setSelectedRecord(record);
        setViewModalOpen(true);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-full">
            <ViewModal
                record={selectedRecord}
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
            />

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Header Section */}
                    <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-800">Batch Records</h1>
                        <p className="text-sm text-gray-600 mt-1">View and manage all batch records</p>
                    </div>

                    {/* Batch Records Table */}
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-blue-100">
                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Plan No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Batch No.</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Mfg Date</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Market</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type of Batch</th>
                                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Remaining Qty</th>
                                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {batchRecords.map((record, index) => (
                                    <tr key={index} className="hover:bg-blue-50 transition-colors cursor-pointer">
                                        <td
                                            className="border border-gray-300 px-4 py-3 text-gray-800 font-medium"
                                            onClick={() => viewRecord(record)}
                                        >
                                            {record.planNo}
                                        </td>
                                        <td
                                            className="border border-gray-300 px-4 py-3 text-gray-800"
                                            onClick={() => viewRecord(record)}
                                        >
                                            {record.product}
                                        </td>
                                        <td
                                            className="border border-gray-300 px-4 py-3 text-gray-800 font-medium"
                                            onClick={() => viewRecord(record)}
                                        >
                                            {record.batchNo}
                                        </td>
                                        <td
                                            className="border border-gray-300 px-4 py-3 text-gray-800"
                                            onClick={() => viewRecord(record)}
                                        >
                                            {record.mfgDate}
                                        </td>
                                        <td
                                            className="border border-gray-300 px-4 py-3 text-gray-800"
                                            onClick={() => viewRecord(record)}
                                        >
                                            {record.market}
                                        </td>
                                        <td
                                            className="border border-gray-300 px-4 py-3 text-gray-800"
                                            onClick={() => viewRecord(record)}
                                        >
                                            {record.typeOfBatch}
                                        </td>
                                        <td
                                            className="border border-gray-300 px-4 py-3 text-gray-800 font-medium"
                                            onClick={() => viewRecord(record)}
                                        >
                                            {record.remainingQty}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        viewRecord(record);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeRecord(index);
                                                    }}
                                                    className="text-red-600 hover:text-red-800 transition-colors p-1"
                                                    title="Remove Entry"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BatchRecords;