import React, { useState } from 'react';
import ReportsHeader from '../components/Reports/ReportsHeader';
import StatsOverview from '../components/Reports/StatsOverview';
import ChartsSection from '../components/Reports/ChartsSection';
import ExportSection from '../components/Reports/ExportSection';

export interface ReportData {
  period: string;
  total_members: number;
  active_members: number;
  new_members: number;
  total_revenue: number;
  collection_rate: number;
  benefits_distributed: number;
  delivery_rate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-12-31'
  });

  // Mock data for reports
  const reportData: ReportData[] = [
    {
      period: 'Jan 2024',
      total_members: 1247,
      active_members: 1103,
      new_members: 45,
      total_revenue: 27575,
      collection_rate: 78,
      benefits_distributed: 48500,
      delivery_rate: 85
    },
    {
      period: 'Feb 2024',
      total_members: 1289,
      active_members: 1145,
      new_members: 52,
      total_revenue: 28625,
      collection_rate: 82,
      benefits_distributed: 51200,
      delivery_rate: 88
    },
    {
      period: 'Mar 2024',
      total_members: 1320,
      active_members: 1180,
      new_members: 48,
      total_revenue: 29500,
      collection_rate: 85,
      benefits_distributed: 53800,
      delivery_rate: 90
    },
    {
      period: 'Apr 2024',
      total_members: 1355,
      active_members: 1210,
      new_members: 55,
      total_revenue: 30250,
      collection_rate: 83,
      benefits_distributed: 56500,
      delivery_rate: 87
    }
  ];

  // Chart data for membership trends
  const membershipChartData: ChartData = {
    labels: reportData.map(r => r.period),
    datasets: [
      {
        label: 'Total Members',
        data: reportData.map(r => r.total_members),
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Active Members',
        data: reportData.map(r => r.active_members),
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgb(16, 185, 129)',
      }
    ]
  };

  // Chart data for financial performance
  const financialChartData: ChartData = {
    labels: reportData.map(r => r.period),
    datasets: [
      {
        label: 'Revenue (GHS)',
        data: reportData.map(r => r.total_revenue),
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderColor: 'rgb(139, 92, 246)',
      },
      {
        label: 'Benefits Distributed (GHS)',
        data: reportData.map(r => r.benefits_distributed),
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderColor: 'rgb(236, 72, 153)',
      }
    ]
  };

  // Chart data for performance metrics
  const performanceChartData: ChartData = {
    labels: reportData.map(r => r.period),
    datasets: [
      {
        label: 'Collection Rate (%)',
        data: reportData.map(r => r.collection_rate),
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderColor: 'rgb(245, 158, 11)',
      },
      {
        label: 'Delivery Rate (%)',
        data: reportData.map(r => r.delivery_rate),
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        borderColor: 'rgb(14, 165, 233)',
      }
    ]
  };

  // Circuit distribution data
  const circuitDistribution = [
    { circuit: 'Circuit A', members: 450, percentage: 36 },
    { circuit: 'Circuit B', members: 320, percentage: 26 },
    { circuit: 'Circuit C', members: 280, percentage: 22 },
    { circuit: 'Circuit D', members: 197, percentage: 16 }
  ];

  // Benefit type distribution
  const benefitDistribution = [
    { type: 'Food Basket', count: 324, amount: 48600 },
    { type: 'Medical Aid', count: 156, amount: 31200 },
    { type: 'Education Grant', count: 89, amount: 26700 },
    { type: 'Housing Support', count: 23, amount: 11500 }
  ];

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting report as ${format}`);
    // Here you would implement actual export functionality
    alert(`Exporting report as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <ReportsHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <StatsOverview data={reportData[reportData.length - 1]} />

      <ChartsSection
        membershipChartData={membershipChartData}
        financialChartData={financialChartData}
        performanceChartData={performanceChartData}
        circuitDistribution={circuitDistribution}
        benefitDistribution={benefitDistribution}
      />

      <ExportSection onExport={handleExport} />
    </div>
  );
};

export default Reports;