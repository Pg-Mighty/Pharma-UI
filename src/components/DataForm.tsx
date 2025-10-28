import React, { useState } from 'react';
import { Save, Calendar, Edit3, Trash2, X, Plus } from 'lucide-react';

// --- INTERFACES ---
// This new interface combines withdrawal and analysis data for a 1:1 relationship
interface ScheduleAndAnalysisEntry {
    // Fields from former WithdrawalEntry
    dueDate: string;
    interval: string;
    chemicalAnalysis: string;
    microAnalysis: string;
    specification: string;
    // Fields from former SampleAnalysis
    chamber: string;
    location: string;
    dateWithdrawn: string;
    quantityWithdrawn: string;
    arNo: string;
    doneBy: string;
    checkedBy: string;
}

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
    schedule: ScheduleAndAnalysisEntry[]; // Replaces withdrawalSchedule and sampleAnalyses
}


// --- SCHEDULE & ANALYSIS POPUP COMPONENT ---
interface ScheduleDataPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    schedule: ScheduleAndAnalysisEntry[];
    onUpdate: (index: number, field: keyof ScheduleAndAnalysisEntry, value: string) => void;
    onRemoveRow: (index: number) => void;
    batchRecords: BatchRecord[];
}

const ScheduleDataPopup: React.FC<ScheduleDataPopupProps> = ({ isOpen, onClose, onSave, schedule, onUpdate, onRemoveRow, batchRecords }) => {
    if (!isOpen) return null;

    const uniqueChambers = React.useMemo(() => {
        const allChambers = batchRecords
            .flatMap(record => record.schedule || [])
            .map(analysis => analysis.chamber)
            .filter(Boolean);
        return [...new Set(allChambers)];
    }, [batchRecords]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <datalist id="chamber-options">
                {uniqueChambers.map(chamber => <option key={chamber} value={chamber} />)}
            </datalist>

            <div className="bg-green-100 rounded-lg shadow-2xl max-w-full w-full mx-4 max-h-[95vh] flex flex-col">
                <div className="bg-green-200 px-6 py-4 border-b border-green-300 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Withdrawal Schedule & Analysis Data</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-auto flex-grow">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-400">
                            <thead className="sticky top-0 bg-green-300 z-10">
                            <tr>
                                {/* Combined Headers */}
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">Due Date</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Interval</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">Chem. Analysis</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">Micro. Analysis</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Specification</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Chamber</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Location</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">Date Withdrawn</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">Qty Withdrawn</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">AR NO</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">Done by</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800 whitespace-nowrap">Checked by</th>
                                <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-green-50">
                            {schedule.map((item, index) => (
                                <tr key={index}>
                                    {Object.keys(item).map((key) => {
                                        const fieldKey = key as keyof ScheduleAndAnalysisEntry;
                                        return (
                                            <td key={fieldKey} className="border border-gray-400 px-2 py-1">
                                                <input
                                                    type={(fieldKey === 'dueDate' || fieldKey === 'dateWithdrawn') ? 'date' : 'text'}
                                                    list={fieldKey === 'chamber' ? 'chamber-options' : undefined}
                                                    value={item[fieldKey]}
                                                    onChange={(e) => onUpdate(index, fieldKey, e.target.value)}
                                                    className="w-full min-w-[120px] px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-sm"
                                                />
                                            </td>
                                        );
                                    })}
                                    <td className="border border-gray-400 px-2 py-1 text-center">
                                        <button onClick={() => onRemoveRow(index)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Remove Row">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end items-center mt-4 bg-green-200 p-4 rounded-b-lg">
                    <button onClick={onSave} className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-semibold flex items-center gap-2 transition-transform transform hover:scale-105">
                        <Save className="w-5 h-5" /> Save and Finalize
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN FORM COMPONENT ---
const DataForm: React.FC = () => {

    const newScheduleEntry = (): ScheduleAndAnalysisEntry => ({
        dueDate: '', interval: '', chemicalAnalysis: '', microAnalysis: '', specification: '',
        chamber: '', location: '', dateWithdrawn: '', quantityWithdrawn: '', arNo: '', doneBy: '', checkedBy: ''
    });

    const initialRecordState: BatchRecord = {
        planNo: '', product: '', protocolNo: '', batchNo: '', mfgDate: '',
        market: '', retestExpDate: '', typeOfBatch: '', packDetails: '',
        purposeOfStudy: '', condition: '', dateOfIncubation: '',
        distributedQuantity: '', remainingQty: '',
        schedule: [newScheduleEntry()] // Start with one empty schedule row
    };

    const [batchRecords, setBatchRecords] = useState<BatchRecord[]>([]); // Start with no saved records for a cleaner UI
    const [currentRecord, setCurrentRecord] = useState<BatchRecord>(initialRecordState);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleRecordChange = (field: keyof BatchRecord, value: string) => {
        setCurrentRecord(prev => ({ ...prev, [field]: value }));
    };

    const addScheduleRow = () => {
        setCurrentRecord(prev => ({ ...prev, schedule: [...prev.schedule, newScheduleEntry()] }));
    };

    const updateScheduleRow = (index: number, field: keyof ScheduleAndAnalysisEntry, value: string) => {
        setCurrentRecord(prev => {
            const updatedSchedule = prev.schedule.map((item, i) => i === index ? { ...item, [field]: value } : item);
            return { ...prev, schedule: updatedSchedule };
        });
    };

    const removeScheduleRow = (index: number) => {
        // Prevent removing the last row
        if (currentRecord.schedule.length <= 1) {
            alert("You must have at least one schedule row."); // Using alert as a placeholder
            return;
        }
        setCurrentRecord(prev => ({ ...prev, schedule: prev.schedule.filter((_, i) => i !== index) }));
    };

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const finalizeRecord = () => {
        if (currentRecord.planNo && currentRecord.product && currentRecord.batchNo) {
            setBatchRecords(prev => [currentRecord, ...prev]);
            setCurrentRecord(initialRecordState); // Reset form for next entry
        }
        setPopupOpen(false);
        // Replaced alert with console.log for a cleaner experience
        console.log('Batch record saved successfully!');
    };

    const viewRecord = (record: BatchRecord) => {
        setCurrentRecord(record);
    };

    const clearForm = () => {
        setCurrentRecord(initialRecordState);
    }

    // Helper const for keys to show in the main form's editable table
    const mainFormScheduleKeys: (keyof ScheduleAndAnalysisEntry)[] = [
        'dueDate', 'interval', 'chemicalAnalysis', 'microAnalysis', 'specification', 'chamber', 'location'
    ];

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
            {/* The datalist for chambers needs to be available for the main form too */}
            <datalist id="chamber-options-main">
                {React.useMemo(() => {
                    const allChambers = batchRecords
                        .flatMap(record => record.schedule || [])
                        .map(analysis => analysis.chamber)
                        .filter(Boolean);
                    return [...new Set(allChambers)];
                }, [batchRecords]).map(chamber => <option key={chamber} value={chamber} />)}
            </datalist>

            <ScheduleDataPopup
                isOpen={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                onSave={finalizeRecord}
                schedule={currentRecord.schedule}
                onUpdate={updateScheduleRow}
                onRemoveRow={removeScheduleRow}
                batchRecords={batchRecords}
            />

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Batch Record Management</h1>
                            <p className="text-sm text-gray-600 mt-1">Create, view, and manage batch stability study records.</p>
                        </div>
                        <button onClick={clearForm} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                            <X className="w-5 h-5" /> Clear
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {Object.keys(initialRecordState).filter(key => key !== 'schedule').map((key) => {
                                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                    return (
                                        <div key={key} className={['packDetails', 'purposeOfStudy'].includes(key) ? 'lg:col-span-2' : ''}>
                                            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                            <input
                                                id={key}
                                                type={key.toLowerCase().includes('date') ? 'date' : 'text'}
                                                value={currentRecord[key as keyof Omit<BatchRecord, 'schedule'>] as string}
                                                onChange={(e) => handleRecordChange(key as keyof BatchRecord, e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6 mt-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700">Manage Schedule</h2>
                                    <p className="text-gray-500">
                                        Current schedule has {currentRecord.schedule.length} row(s).
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={addScheduleRow} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow hover:shadow-md">
                                        <Plus className="w-4 h-4" /> Add Row
                                    </button>
                                    <button
                                        onClick={handleOpenPopup}
                                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
                                        disabled={!currentRecord.planNo || !currentRecord.product || !currentRecord.batchNo}
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Edit Full Analysis Data
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* --- EDITABLE SCHEDULE TABLE (Replaces Summary Table) --- */}
                        {currentRecord.schedule.length > 0 && (
                            <div className="mt-6 overflow-x-auto">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Editable Schedule</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Edit primary fields here, or click "Edit Full Analysis Data" for all columns.
                                </p>
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead className="bg-blue-100">
                                    <tr>
                                        {mainFormScheduleKeys.map(key => (
                                            <th key={key} className="border border-gray-300 px-3 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </th>
                                        ))}
                                        <th className="border border-gray-300 px-3 py-3 text-left font-semibold text-gray-700">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {currentRecord.schedule.map((entry, index) => (
                                        <tr key={index} className="hover:bg-blue-50">
                                            {mainFormScheduleKeys.map(fieldKey => (
                                                <td key={fieldKey} className="border border-gray-300 px-2 py-1">
                                                    <input
                                                        type={(fieldKey === 'dueDate') ? 'date' : 'text'}
                                                        list={fieldKey === 'chamber' ? 'chamber-options-main' : undefined}
                                                        value={entry[fieldKey]}
                                                        onChange={(e) => updateScheduleRow(index, fieldKey, e.target.value)}
                                                        className="w-full min-w-[120px] px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                                                    />
                                                </td>
                                            ))}
                                            <td className="border border-gray-300 px-2 py-1 text-center">
                                                <button
                                                    onClick={() => removeScheduleRow(index)}
                                                    className="text-red-600 hover:text-red-800 transition-colors p-1 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                    title="Remove Row"
                                                    disabled={currentRecord.schedule.length <= 1} // Disable removing the last row
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {/* --- END OF EDITABLE TABLE --- */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataForm;

