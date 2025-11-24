import React from 'react';

interface ExportSectionProps {
  onExport: (format: 'pdf' | 'excel' | 'csv') => void;
}

const ExportSection: React.FC<ExportSectionProps> = ({ onExport }) => {
  const exportOptions = [
    {
      format: 'pdf' as const,
      title: 'PDF Report',
      description: 'Professional formatted report with charts',
      icon: '📄',
      color: 'bg-red-50 text-red-600'
    },
    {
      format: 'excel' as const,
      title: 'Excel Export',
      description: 'Raw data in spreadsheet format',
      icon: '📊',
      color: 'bg-green-50 text-green-600'
    },
    {
      format: 'csv' as const,
      title: 'CSV Data',
      description: 'Comma-separated values for analysis',
      icon: '📝',
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions.map((option) => (
          <button
            key={option.format}
            onClick={() => onExport(option.format)}
            className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
          >
            <div className={`p-3 rounded-full ${option.color} text-2xl mb-3 group-hover:scale-110 transition-transform`}>
              {option.icon}
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
            <p className="text-sm text-gray-600 text-center">{option.description}</p>
          </button>
        ))}
      </div>

      {/* Additional Export Options */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Exports</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Member List', format: 'excel' as const },
            { label: 'Payment Records', format: 'excel' as const },
            { label: 'Benefits Report', format: 'pdf' as const },
            { label: 'Financial Summary', format: 'pdf' as const }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => onExport(item.format)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportSection;