import React, { useState } from 'react';
import { Save, Calendar, Edit3, Trash2, X, Plus } from 'lucide-react';

// --- INTERFACES ---
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
  sampleAnalyses?: SampleAnalysis[];
}

interface WithdrawalEntry {
  dueDate: string;
  interval: string;
  chemicalAnalysis: string;
  microAnalysis: string;
  specification: string;
}

interface SampleAnalysis {
  chamber: string;
  location: string;
  dateWithdrawn: string;
  quantityWithdrawn: string;
  arNo: string;
  doneBy: string;
  checkedBy: string;
}


// --- ANALYSIS POPUP COMPONENT ---
interface AnalysisDataPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  analysisData: SampleAnalysis[];
  onUpdate: (index: number, field: keyof SampleAnalysis, value: string) => void;
}

const AnalysisDataPopup: React.FC<AnalysisDataPopupProps> = ({ isOpen, onClose, onSave, analysisData, onUpdate }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-green-100 rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] flex flex-col">
          <div className="bg-green-200 px-6 py-4 border-b border-green-300 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Sample Analysis Data Entry</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-grow">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead className="sticky top-0 bg-green-300">
                <tr>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Chamber</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Location</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Date Withdrawn</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Qty Withdrawn</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">AR NO</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Done by</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-bold text-gray-800">Checked by</th>
                </tr>
                </thead>
                <tbody className="bg-green-50">
                {analysisData.map((item, index) => (
                    <tr key={index}>
                      {Object.keys(item).map((key) => (
                          <td key={key} className="border border-gray-400 px-2 py-2">
                            <input
                                type="text"
                                value={item[key as keyof SampleAnalysis]}
                                onChange={(e) => onUpdate(index, key as keyof SampleAnalysis, e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 bg-white text-sm"
                            />
                          </td>
                      ))}
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
  const initialRecordState: BatchRecord = {
    planNo: '', product: '', protocolNo: '', batchNo: '', mfgDate: '',
    market: '', retestExpDate: '', typeOfBatch: '', packDetails: '',
    purposeOfStudy: '', condition: '', dateOfIncubation: '',
    distributedQuantity: '', remainingQty: '', withdrawalSchedule: [],
    sampleAnalyses: []
  };

  // --- FIX START: Define initial popup state as a constant ---
  const initialAnalysisData: SampleAnalysis[] = [
    { chamber: 'QC/SC/014', location: 'T24', dateWithdrawn: '', quantityWithdrawn: '4', arNo: '', doneBy: '', checkedBy: '' },
    { chamber: 'QC/SC/014', location: 'T25', dateWithdrawn: '', quantityWithdrawn: '4', arNo: '', doneBy: '', checkedBy: '' },
    { chamber: 'QC/SC/014', location: 'T26', dateWithdrawn: '', quantityWithdrawn: '4', arNo: '', doneBy: '', checkedBy: '' },
    { chamber: 'QC/SC/014', location: 'T27', dateWithdrawn: '', quantityWithdrawn: '', arNo: '', doneBy: '', checkedBy: '' },
    { chamber: 'QC/SC/014', location: 'T27', dateWithdrawn: '', quantityWithdrawn: '2', arNo: '', doneBy: '', checkedBy: '' }
  ];
  // --- FIX END ---

  const [batchRecords, setBatchRecords] = useState<BatchRecord[]>([
    {
      planNo: '2500001', product: 'CAH - Metolazone 2.5 mg Tablets',
      protocolNo: 'SSP/EB/CAH-CAK-CAM/001-00', batchNo: 'CAH00222',
      mfgDate: 'Dec-2022', market: 'EU/UK', retestExpDate: 'Nov-2025',
      typeOfBatch: 'Commercial Validation Batch',
      packDetails: '3X14\'s Duplex 250/90 White Opaque-Alu Blister',
      purposeOfStudy: 'Exhibit Batch', condition: '30°C/75%RH',
      dateOfIncubation: '2025-06-29', distributedQuantity: '29 Cartons',
      remainingQty: '15 Cartons',
      withdrawalSchedule: [
        { dueDate: '2025-07-29', interval: '1 M', chemicalAnalysis: '04 Cartons', microAnalysis: '0 NA', specification: '' },
      ],
      sampleAnalyses: [
        { chamber: 'QC/SC/014', location: 'T24', dateWithdrawn: '2025-07-28', quantityWithdrawn: '4', arNo: 'AR-123', doneBy: 'UserA', checkedBy: 'UserB' },
      ]
    }
  ]);

  const [currentRecord, setCurrentRecord] = useState<BatchRecord>(initialRecordState);
  const [isAnalysisPopupOpen, setAnalysisPopupOpen] = useState(false);

  // State for popup data now uses the constant for initialization
  const [analysisData, setAnalysisData] = useState<SampleAnalysis[]>(initialAnalysisData);

  const updateAnalysisData = (index: number, field: keyof SampleAnalysis, value: string) => {
    setAnalysisData(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleRecordChange = (field: keyof BatchRecord, value: string) => {
    setCurrentRecord(prev => ({ ...prev, [field]: value }));
  };

  const addWithdrawalRow = () => {
    const newEntry: WithdrawalEntry = { dueDate: '', interval: '', chemicalAnalysis: '', microAnalysis: '', specification: '' };
    setCurrentRecord(prev => ({ ...prev, withdrawalSchedule: [...prev.withdrawalSchedule, newEntry] }));
  };

  const updateWithdrawalEntry = (index: number, field: keyof WithdrawalEntry, value: string) => {
    setCurrentRecord(prev => {
      const updatedSchedule = prev.withdrawalSchedule.map((entry, i) => i === index ? { ...entry, [field]: value } : entry);
      return { ...prev, withdrawalSchedule: updatedSchedule };
    });
  };

  const removeWithdrawalEntry = (index: number) => {
    setCurrentRecord(prev => ({ ...prev, withdrawalSchedule: prev.withdrawalSchedule.filter((_, i) => i !== index) }));
  };

  const handleOpenAnalysisPopup = () => {
    setAnalysisPopupOpen(true);
  };

  const finalizeRecord = () => {
    if (currentRecord.planNo && currentRecord.product && currentRecord.batchNo) {
      const completeRecord: BatchRecord = {
        ...currentRecord,
        sampleAnalyses: analysisData
      };
      setBatchRecords(prev => [completeRecord, ...prev]);
      setCurrentRecord(initialRecordState);

      // --- FIX START: Reset popup data to its initial default state ---
      setAnalysisData(initialAnalysisData);
      // --- FIX END ---

    }
    setAnalysisPopupOpen(false);
    alert('Batch record saved successfully!');
  };

  const viewRecord = (record: BatchRecord) => {
    setCurrentRecord(record);
    setAnalysisData(record.sampleAnalyses || initialAnalysisData); // Use default if no data exists
  };

  const removeRecord = (index: number) => {
    setBatchRecords(prev => prev.filter((_, i) => i !== index));
  };

  return (
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
        <AnalysisDataPopup
            isOpen={isAnalysisPopupOpen}
            onClose={() => setAnalysisPopupOpen(false)}
            onSave={finalizeRecord}
            analysisData={analysisData}
            onUpdate={updateAnalysisData}
        />

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
              <h1 className="text-2xl font-bold text-gray-800">Batch Record Management</h1>
              <p className="text-sm text-gray-600 mt-1">Create, view, and manage batch stability study records.</p>
            </div>

            <div className="p-6">
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.keys(initialRecordState).filter(key => !['withdrawalSchedule', 'sampleAnalyses'].includes(key)).map((key) => {
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    return (
                        <div key={key} className={['packDetails', 'purposeOfStudy'].includes(key) ? 'lg:col-span-2' : ''}>
                          <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                          <input
                              id={key}
                              type={key.toLowerCase().includes('date') ? 'date' : 'text'}
                              value={currentRecord[key as keyof Omit<BatchRecord, 'withdrawalSchedule' | 'sampleAnalyses'>] as string}
                              onChange={(e) => handleRecordChange(key as keyof BatchRecord, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Withdrawal Schedule
                </h4>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Due Date</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Interval</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Chemical Analysis</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Micro Analysis</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Specification</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRecord.withdrawalSchedule.map((entry, index) => (
                        <tr key={index} className="hover:bg-blue-50">
                          {Object.keys(entry).map(key => (
                              <td key={key} className="border border-gray-300 px-2 py-2">
                                <input
                                    type={key === 'dueDate' ? 'date' : 'text'}
                                    value={entry[key as keyof WithdrawalEntry]}
                                    onChange={(e) => updateWithdrawalEntry(index, key as keyof WithdrawalEntry, e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </td>
                          ))}
                          <td className="border border-gray-300 px-2 py-2 text-center">
                            <button onClick={() => removeWithdrawalEntry(index)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Remove Row">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={addWithdrawalRow} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow hover:shadow-md">
                  <Plus className="w-4 h-4" /> Add Row
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="flex justify-end">
                  <button
                      onClick={handleOpenAnalysisPopup}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
                      disabled={!currentRecord.planNo || !currentRecord.product || !currentRecord.batchNo}
                  >
                    <Save className="w-5 h-5" />
                    Enter Analysis Data & Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
              <h1 className="text-2xl font-bold text-gray-800">Saved Batch Records</h1>
              <p className="text-sm text-gray-600 mt-1">View and manage all existing batch records.</p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Plan No.</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Batch No.</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Market</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {batchRecords.map((record, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-medium">{record.planNo}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">{record.product}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800 font-medium">{record.batchNo}</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-800">{record.market}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => viewRecord(record)} className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="View/Edit Details">
                              <Edit3 className="w-5 h-5" />
                            </button>
                            <button onClick={() => removeRecord(index)} className="text-red-600 hover:text-red-800 transition-colors p-1" title="Remove Entry">
                              <Trash2 className="w-5 h-5" />
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

export default DataForm;

