import React, { useState } from 'react';
import { Save, User, UserCheck, CheckCircle, Plus, Calendar, FlaskRound as Flask, Microscope, Edit3, Trash2, Eye, X } from 'lucide-react';

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

const DataForm: React.FC = () => {
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

  const [currentRecord, setCurrentRecord] = useState<BatchRecord>({
    planNo: '',
    product: '',
    protocolNo: '',
    batchNo: '',
    mfgDate: '',
    market: '',
    retestExpDate: '',
    typeOfBatch: '',
    packDetails: '',
    purposeOfStudy: '',
    condition: '',
    dateOfIncubation: '',
    distributedQuantity: '',
    remainingQty: '',
    withdrawalSchedule: []
  });

  const [withdrawalSchedule, setWithdrawalSchedule] = useState<WithdrawalEntry[]>([]);

  const [formData, setFormData] = useState({
    doneBy: '',
    checkBy: '',
    approvedBy: ''
  });

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BatchRecord | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRecordChange = (field: keyof BatchRecord, value: string) => {
    setCurrentRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addWithdrawalRow = () => {
    const newEntry: WithdrawalEntry = {
      dueDate: '',
      interval: '',
      chemicalAnalysis: '',
      microAnalysis: '',
      specification: ''
    };
    setWithdrawalSchedule(prev => [...prev, newEntry]);
  };

  const updateWithdrawalEntry = (index: number, field: keyof WithdrawalEntry, value: string) => {
    setWithdrawalSchedule(prev =>
        prev.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        )
    );
  };

  const removeWithdrawalEntry = (index: number) => {
    setWithdrawalSchedule(prev => prev.filter((_, i) => i !== index));
  };

  const removeRecord = (index: number) => {
    setBatchRecords(prev => prev.filter((_, i) => i !== index));
  };

  const viewRecord = (record: BatchRecord) => {
    setSelectedRecord(record);
    setViewModalOpen(true);
  };

  const handleSaveAll = () => {
    // Create a complete record with current form data and withdrawal schedule
    if (currentRecord.planNo && currentRecord.product && currentRecord.batchNo) {
      const completeRecord: BatchRecord = {
        ...currentRecord,
        withdrawalSchedule: withdrawalSchedule
      };

      setBatchRecords(prev => [completeRecord, ...prev]);

      // Clear the form
      setCurrentRecord({
        planNo: '',
        product: '',
        protocolNo: '',
        batchNo: '',
        mfgDate: '',
        market: '',
        retestExpDate: '',
        typeOfBatch: '',
        packDetails: '',
        purposeOfStudy: '',
        condition: '',
        dateOfIncubation: '',
        distributedQuantity: '',
        remainingQty: '',
        withdrawalSchedule: []
      });
      setWithdrawalSchedule([]);
    }

    console.log('Saving all data...', { batchRecords, formData });
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
              <h1 className="text-2xl font-bold text-gray-800">Batch Record Management</h1>
              <p className="text-sm text-gray-600 mt-1">Add New Batch Record Entry</p>
            </div>

            {/* Editable Data Entry Form */}
            <div className="p-6 bg-green-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-green-600" />
                New Batch Record Entry
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Plan No. *</label>
                      <input
                          type="text"
                          value={currentRecord.planNo}
                          onChange={(e) => handleRecordChange('planNo', e.target.value)}
                          placeholder="e.g., 2500001"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Product *</label>
                      <input
                          type="text"
                          value={currentRecord.product}
                          onChange={(e) => handleRecordChange('product', e.target.value)}
                          placeholder="e.g., CAH - Metolazone 2.5 mg Tablets"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Protocol No.</label>
                    <input
                        type="text"
                        value={currentRecord.protocolNo}
                        onChange={(e) => handleRecordChange('protocolNo', e.target.value)}
                        placeholder="e.g., SSP/EB/CAH-CAK-CAM/001-00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Batch No. *</label>
                      <input
                          type="text"
                          value={currentRecord.batchNo}
                          onChange={(e) => handleRecordChange('batchNo', e.target.value)}
                          placeholder="e.g., CAH00222"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Mfg Date</label>
                      <input
                          type="text"
                          value={currentRecord.mfgDate}
                          onChange={(e) => handleRecordChange('mfgDate', e.target.value)}
                          placeholder="e.g., Dec-2022"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Market</label>
                      <input
                          type="text"
                          value={currentRecord.market}
                          onChange={(e) => handleRecordChange('market', e.target.value)}
                          placeholder="e.g., EU/UK"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Retest/Exp Date</label>
                      <input
                          type="text"
                          value={currentRecord.retestExpDate}
                          onChange={(e) => handleRecordChange('retestExpDate', e.target.value)}
                          placeholder="e.g., Nov-2025"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Type of Batch</label>
                    <select
                        value={currentRecord.typeOfBatch}
                        onChange={(e) => handleRecordChange('typeOfBatch', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      <option value="Commercial Validation Batch">Commercial Validation Batch</option>
                      <option value="Pilot Batch">Pilot Batch</option>
                      <option value="Production Batch">Production Batch</option>
                      <option value="Development Batch">Development Batch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pack Details</label>
                    <input
                        type="text"
                        value={currentRecord.packDetails}
                        onChange={(e) => handleRecordChange('packDetails', e.target.value)}
                        placeholder="e.g., 3X14's Duplex 250/90 White Opaque-Alu Blister"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Purpose of Study</label>
                    <select
                        value={currentRecord.purposeOfStudy}
                        onChange={(e) => handleRecordChange('purposeOfStudy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Purpose</option>
                      <option value="Exhibit Batch">Exhibit Batch</option>
                      <option value="Stability Study">Stability Study</option>
                      <option value="Registration">Registration</option>
                      <option value="Quality Control">Quality Control</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Additional Information</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Condition</label>
                      <input
                          type="text"
                          value={currentRecord.condition}
                          onChange={(e) => handleRecordChange('condition', e.target.value)}
                          placeholder="e.g., 30°C/75%RH"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Incubation</label>
                      <input
                          type="date"
                          value={currentRecord.dateOfIncubation}
                          onChange={(e) => handleRecordChange('dateOfIncubation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Distributed Quantity</label>
                      <input
                          type="text"
                          value={currentRecord.distributedQuantity}
                          onChange={(e) => handleRecordChange('distributedQuantity', e.target.value)}
                          placeholder="e.g., 29 Cartons"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Remaining Qty</label>
                      <input
                          type="text"
                          value={currentRecord.remainingQty}
                          onChange={(e) => handleRecordChange('remainingQty', e.target.value)}
                          placeholder="e.g., 15 Cartons"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Withdrawal Schedule Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Withdrawal Schedule
                </h4>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Due Date of Withdrawal</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Interval</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Chemical Analysis</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Micro Analysis</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Specification</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {withdrawalSchedule.map((entry, index) => (
                        <tr key={index} className="hover:bg-blue-50">
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                                type="date"
                                value={entry.dueDate}
                                onChange={(e) => updateWithdrawalEntry(index, 'dueDate', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <select
                                value={entry.interval}
                                onChange={(e) => updateWithdrawalEntry(index, 'interval', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="">Select</option>
                              <option value="1 M">1 M</option>
                              <option value="2 M">2 M</option>
                              <option value="3 M">3 M</option>
                              <option value="6 M">6 M</option>
                              <option value="12 M">12 M</option>
                              <option value="Extra Samples">Extra Samples</option>
                            </select>
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                                type="text"
                                value={entry.chemicalAnalysis}
                                onChange={(e) => updateWithdrawalEntry(index, 'chemicalAnalysis', e.target.value)}
                                placeholder="e.g., 04 Cartons"
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                                type="text"
                                value={entry.microAnalysis}
                                onChange={(e) => updateWithdrawalEntry(index, 'microAnalysis', e.target.value)}
                                placeholder="e.g., 0 NA"
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                                type="text"
                                value={entry.specification}
                                onChange={(e) => updateWithdrawalEntry(index, 'specification', e.target.value)}
                                placeholder="Optional"
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center">
                            <button
                                onClick={() => removeWithdrawalEntry(index)}
                                className="text-red-600 hover:text-red-800 transition-colors p-1"
                                title="Remove Row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                <button
                    onClick={addWithdrawalRow}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Row
                </button>
              </div>
            </div>

            {/* Batch Records Table */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Batch Records</h3>
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

              {/* Action Section */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <button
                        onClick={handleSaveAll}
                        className="w-full lg:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save All Records
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Done By</label>
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={formData.doneBy}
                            onChange={(e) => handleInputChange('doneBy', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Check By</label>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={formData.checkBy}
                            onChange={(e) => handleInputChange('checkBy', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Approved by</label>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={formData.approvedBy}
                            onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DataForm;