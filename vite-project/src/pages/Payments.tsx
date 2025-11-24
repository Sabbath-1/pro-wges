import React, { useState } from 'react';
import PaymentsHeader from '../components/Payments/PaymentsHeader';
import PaymentsOverview from '../components/Payments/PaymentsOverview';
import PaymentRecordsTable from '../components/Payments/PaymentRecordsTable';
import PaymentModal from '../components/Payments/PaymentModal';

// Define the specific status type
type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'all';

export interface Payment {
  id: number;
  member_id: number;
  member_name: string;
  member_circuit: string;
  amount: number;
  payment_date: string;
  due_date: string;
  period: string; // e.g., "January 2024"
  payment_method: 'cash' | 'transfer' | 'mobile_money';
  status: 'paid' | 'pending' | 'overdue';
  recorded_by: string;
  notes?: string;
}

export interface PaymentStats {
  total_collected: number;
  pending_payments: number;
  overdue_payments: number;
  collection_rate: number;
}

const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus>('all');
  const [selectedCircuit, setSelectedCircuit] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Mock data - replace with API calls
  const mockPayments: Payment[] = [
    {
      id: 1,
      member_id: 1,
      member_name: 'John Doe',
      member_circuit: 'Circuit A',
      amount: 25.00,
      payment_date: '2024-01-05',
      due_date: '2024-01-31',
      period: 'January 2024',
      payment_method: 'cash',
      status: 'paid',
      recorded_by: 'Sarah Johnson'
    },
    {
      id: 2,
      member_id: 2,
      member_name: 'Jane Smith',
      member_circuit: 'Circuit A',
      amount: 25.00,
      payment_date: '2024-01-07',
      due_date: '2024-01-31',
      period: 'January 2024',
      payment_method: 'transfer',
      status: 'paid',
      recorded_by: 'Mike Chen'
    },
    {
      id: 3,
      member_id: 3,
      member_name: 'Mike Johnson',
      member_circuit: 'Circuit B',
      amount: 25.00,
      payment_date: '',
      due_date: '2024-01-31',
      period: 'January 2024',
      payment_method: 'cash',
      status: 'pending',
      recorded_by: ''
    },
    {
      id: 4,
      member_id: 4,
      member_name: 'Sarah Williams',
      member_circuit: 'Circuit C',
      amount: 25.00,
      payment_date: '',
      due_date: '2023-12-31',
      period: 'December 2023',
      payment_method: 'cash',
      status: 'overdue',
      recorded_by: ''
    }
  ];

  const circuits = ['Circuit A', 'Circuit B', 'Circuit C'];
  const periods = ['January 2024', 'December 2023', 'November 2023'];

  // Calculate payment statistics
  const paymentStats: PaymentStats = {
    total_collected: mockPayments
      .filter(p => p.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0),
    pending_payments: mockPayments.filter(p => p.status === 'pending').length,
    overdue_payments: mockPayments.filter(p => p.status === 'overdue').length,
    collection_rate: Math.round(
      (mockPayments.filter(p => p.status === 'paid').length / mockPayments.length) * 100
    ) || 0
  };

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.member_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.period.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesCircuit = selectedCircuit === 'all' || payment.member_circuit === selectedCircuit;
    const matchesPeriod = selectedPeriod === 'all' || payment.period === selectedPeriod;
    
    return matchesSearch && matchesStatus && matchesCircuit && matchesPeriod;
  });

  const handleRecordPayment = () => {
    setSelectedPayment(null);
    setIsPaymentModalOpen(true);
  };

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPayment(null);
  };

  return (
    <div className="space-y-6">
      <PaymentsHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCircuit={selectedCircuit}
        onCircuitChange={setSelectedCircuit}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        circuits={circuits}
        periods={periods}
        onRecordPayment={handleRecordPayment}
        paymentCount={filteredPayments.length}
      />

      <PaymentsOverview stats={paymentStats} />

      <PaymentRecordsTable
        payments={filteredPayments}
        onEditPayment={handleEditPayment}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleCloseModal}
        payment={selectedPayment}
        circuits={circuits}
        periods={periods}
      />
    </div>
  );
};

export default Payments;