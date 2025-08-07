import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DataForm from './components/DataForm';
import { Home, Database, RefreshCw, FileSpreadsheet, TestTube, FileText } from 'lucide-react';

export type TabType = 'home' | 'master' | 'change' | 'excel' | 'test' | 'report';

export const tabConfig = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'master' as TabType, label: 'Master', icon: Database },
    { id: 'change' as TabType, label: 'Change', icon: RefreshCw },
    { id: 'excel' as TabType, label: 'Excel', icon: FileSpreadsheet },
    { id: 'test' as TabType, label: 'Test', icon: TestTube },
    { id: 'report' as TabType, label: 'Report', icon: FileText },
];

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('home');

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <DataForm />;
            case 'master':
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Master Data Management</h2>
                        <p className="text-gray-600">Master data configuration and management tools.</p>
                    </div>
                );
            case 'change':
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Management</h2>
                        <p className="text-gray-600">Track and manage system changes.</p>
                    </div>
                );
            case 'excel':
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Excel Integration</h2>
                        <p className="text-gray-600">Import and export data from Excel files.</p>
                    </div>
                );
            case 'test':
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Management</h2>
                        <p className="text-gray-600">Manage testing protocols and results.</p>
                    </div>
                );
            case 'report':
                return (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports</h2>
                        <p className="text-gray-600">Generate and view system reports.</p>
                    </div>
                );
            default:
                return <DataForm />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex-1 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
}

export default App;