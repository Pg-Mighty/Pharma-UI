import React from 'react';
import { TabType, tabConfig } from '../App';

interface SidebarProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-64 bg-slate-800 text-white shadow-lg">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-xl font-bold">Lab Management</h1>
                <p className="text-sm text-slate-400 mt-1">System Dashboard</p>
            </div>

            <nav className="mt-6">
                {tabConfig.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                                isActive
                                    ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 w-64 p-6 border-t border-slate-700">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">U</span>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">User Name</p>
                        <p className="text-xs text-slate-400">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;