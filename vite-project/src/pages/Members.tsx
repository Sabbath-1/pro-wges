import React, { useState } from 'react';
import MembersTable from '../components/Members/MembersTable';
import MembersHeader from '../components/Members/MembersHeader';
import MemberModal from '../components/Members/MemberModal';

export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  circuit: string;
  date_joined: string;
  status: 'active' | 'inactive';
  last_payment_date?: string;
  benefits_received: number;
}

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCircuit, setSelectedCircuit] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Mock data - replace with API calls
  const mockMembers: Member[] = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@email.com',
      phone: '555-0101',
      circuit: 'Circuit A',
      date_joined: '2023-01-15',
      status: 'active',
      last_payment_date: '2024-01-05',
      benefits_received: 3
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@email.com',
      phone: '555-0102',
      circuit: 'Circuit A',
      date_joined: '2023-02-20',
      status: 'active',
      last_payment_date: '2024-01-07',
      benefits_received: 2
    }
  ];

  const circuits = ['Circuit A', 'Circuit B', 'Circuit C'];

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = 
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCircuit = selectedCircuit === 'all' || member.circuit === selectedCircuit;
    
    return matchesSearch && matchesCircuit;
  });

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      <MembersHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCircuit={selectedCircuit}
        onCircuitChange={setSelectedCircuit}
        circuits={circuits}
        onAddMember={handleAddMember}
        memberCount={filteredMembers.length}
      />

      {/* FIXED: members prop goes to MembersTable, not MemberModal */}
      <MembersTable
        members={filteredMembers}
        onEditMember={handleEditMember}
      />

      {/* MemberModal only needs isOpen, onClose, member, and circuits */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
        circuits={circuits}
      />
    </div>
  );
};

export default Members;