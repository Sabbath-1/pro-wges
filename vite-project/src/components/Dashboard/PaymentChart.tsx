
const PaymentChart = () => {
  const paymentData = [
    { month: 'Jan', paid: 75, pending: 25 },
    { month: 'Feb', paid: 78, pending: 22 },
    { month: 'Mar', paid: 82, pending: 18 },
    { month: 'Apr', paid: 80, pending: 20 },
    { month: 'May', paid: 85, pending: 15 },
    { month: 'Jun', paid: 78, pending: 22 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment Compliance Trend</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {paymentData.map((data, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 w-16">{data.month}</span>
            <div className="flex-1 mx-4">
              <div className="flex h-6 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${data.paid}%` }}
                ></div>
                <div 
                  className="bg-orange-500 transition-all duration-500"
                  style={{ width: `${data.pending}%` }}
                ></div>
              </div>
            </div>
            <div className="flex space-x-4 text-xs">
              <span className="text-green-600 font-medium">{data.paid}% paid</span>
              <span className="text-orange-600">{data.pending}% pending</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Paid Dues</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentChart;