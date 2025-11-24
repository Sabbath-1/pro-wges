import React, { useState } from 'react';
import BenefitsHeader from '../components/Benefits/BenefitsHeader';
import BenefitsOverview from '../components/Benefits/BenefitsOverview';
import BenefitsTable from '../components/Benefits/BenefitsTable';
import BenefitModal from '../components/Benefits/BenefitModal';

// Define the specific status type
type BenefitStatus = 'delivered' | 'pending' | 'cancelled' | 'all';

export interface Benefit {
  id: number;
  member_id: number;
  member_name: string;
  member_circuit: string;
  benefit_type: string;
  benefit_type_id: number;
  amount: number;
  date_disbursed: string;
  scheduled_date: string;
  status: 'delivered' | 'pending' | 'cancelled';
  disbursed_by: string;
  notes?: string;
}

export interface BenefitType {
  id: number;
  name: string;
  description: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'one_time';
  eligibility_criteria: string;
  is_active: boolean;
}

export interface BenefitStats {
  total_disbursed: number;
  pending_benefits: number;
  cancelled_benefits: number;
  delivery_rate: number;
}

const Benefits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BenefitStatus>('all');
  const [selectedCircuit, setSelectedCircuit] = useState('all');
  const [selectedBenefitType, setSelectedBenefitType] = useState('all');
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  // Mock data - replace with API calls
  const mockBenefits: Benefit[] = [
    {
      id: 1,
      member_id: 1,
      member_name: 'John Doe',
      member_circuit: 'Circuit A',
      benefit_type: 'Food Basket',
      benefit_type_id: 1,
      amount: 150.00,
      date_disbursed: '2024-01-15',
      scheduled_date: '2024-01-15',
      status: 'delivered',
      disbursed_by: 'Sarah Johnson',
      notes: 'Monthly food supplies delivered'
    },
    {
      id: 2,
      member_id: 2,
      member_name: 'Jane Smith',
      member_circuit: 'Circuit A',
      benefit_type: 'Medical Aid',
      benefit_type_id: 2,
      amount: 200.00,
      date_disbursed: '2024-01-16',
      scheduled_date: '2024-01-16',
      status: 'delivered',
      disbursed_by: 'Mike Chen'
    },
    {
      id: 3,
      member_id: 3,
      member_name: 'Mike Johnson',
      member_circuit: 'Circuit B',
      benefit_type: 'Education Grant',
      benefit_type_id: 3,
      amount: 300.00,
      date_disbursed: '',
      scheduled_date: '2024-01-20',
      status: 'pending',
      disbursed_by: ''
    },
    {
      id: 4,
      member_id: 4,
      member_name: 'Sarah Williams',
      member_circuit: 'Circuit C',
      benefit_type: 'Food Basket',
      benefit_type_id: 1,
      amount: 150.00,
      date_disbursed: '',
      scheduled_date: '2024-01-18',
      status: 'pending',
      disbursed_by: ''
    },
    {
      id: 5,
      member_id: 5,
      member_name: 'David Brown',
      member_circuit: 'Circuit B',
      benefit_type: 'Medical Aid',
      benefit_type_id: 2,
      amount: 200.00,
      date_disbursed: '',
      scheduled_date: '2023-12-15',
      status: 'cancelled',
      disbursed_by: '',
      notes: 'Member not eligible'
    }
  ];

  const benefitTypes: BenefitType[] = [
    {
      id: 1,
      name: 'Food Basket',
      description: 'Monthly food supplies and essential items',
      amount: 150.00,
      frequency: 'monthly',
      eligibility_criteria: 'Active members with 3+ months membership',
      is_active: true
    },
    {
      id: 2,
      name: 'Medical Aid',
      description: 'Healthcare assistance and medical support',
      amount: 200.00,
      frequency: 'quarterly',
      eligibility_criteria: 'All active members',
      is_active: true
    },
    {
      id: 3,
      name: 'Education Grant',
      description: 'School fee support for members children',
      amount: 300.00,
      frequency: 'yearly',
      eligibility_criteria: 'Members with children in school',
      is_active: true
    },
    {
      id: 4,
      name: 'Housing Support',
      description: 'Rental and housing assistance',
      amount: 500.00,
      frequency: 'one_time',
      eligibility_criteria: 'Special cases only',
      is_active: false
    }
  ];

  const circuits = ['Circuit A', 'Circuit B', 'Circuit C'];

  // Calculate benefit statistics
  const benefitStats: BenefitStats = {
    total_disbursed: mockBenefits
      .filter(b => b.status === 'delivered')
      .reduce((sum, benefit) => sum + benefit.amount, 0),
    pending_benefits: mockBenefits.filter(b => b.status === 'pending').length,
    cancelled_benefits: mockBenefits.filter(b => b.status === 'cancelled').length,
    delivery_rate: Math.round(
      (mockBenefits.filter(b => b.status === 'delivered').length / mockBenefits.length) * 100
    ) || 0
  };

  const filteredBenefits = mockBenefits.filter(benefit => {
    const matchesSearch = 
      benefit.member_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.benefit_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || benefit.status === selectedStatus;
    const matchesCircuit = selectedCircuit === 'all' || benefit.member_circuit === selectedCircuit;
    const matchesBenefitType = selectedBenefitType === 'all' || benefit.benefit_type === selectedBenefitType;
    
    return matchesSearch && matchesStatus && matchesCircuit && matchesBenefitType;
  });

  const handleDisburseBenefit = () => {
    setSelectedBenefit(null);
    setIsBenefitModalOpen(true);
  };

  const handleEditBenefit = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
    setIsBenefitModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBenefitModalOpen(false);
    setSelectedBenefit(null);
  };

  return (
    <div className="space-y-6">
      <BenefitsHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCircuit={selectedCircuit}
        onCircuitChange={setSelectedCircuit}
        selectedBenefitType={selectedBenefitType}
        onBenefitTypeChange={setSelectedBenefitType}
        circuits={circuits}
        benefitTypes={benefitTypes.filter(bt => bt.is_active)}
        onDisburseBenefit={handleDisburseBenefit}
        benefitCount={filteredBenefits.length}
      />

      <BenefitsOverview stats={benefitStats} />

      <BenefitsTable
        benefits={filteredBenefits}
        onEditBenefit={handleEditBenefit}
      />

      <BenefitModal
        isOpen={isBenefitModalOpen}
        onClose={handleCloseModal}
        benefit={selectedBenefit}
        circuits={circuits}
        benefitTypes={benefitTypes.filter(bt => bt.is_active)}
      />
    </div>
  );
};

export default Benefits;