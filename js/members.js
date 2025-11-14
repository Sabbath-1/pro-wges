const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number']
  },
  
  // Organizational Information
  circuit: {
    type: String,
    required: [true, 'Circuit is required'],
    trim: true,
    enum: {
      values: ['Circuit A', 'Circuit B', 'Circuit C', 'Circuit D', 'National'],
      message: 'Please select a valid circuit'
    }
  },
  
  staffId: {
    type: String,
    required: [true, 'Staff ID is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  
  // Authentication (if needed for member login)
  password: {
    type: String,
    required: false, // Make optional if only admin manages members
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  
  // Dues Management
  dues: {
    status: {
      type: String,
      enum: ['paid', 'pending', 'overdue', 'exempt'],
      default: 'pending'
    },
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Amount cannot be negative']
    },
    lastPaymentDate: Date,
    paymentHistory: [{
      amount: Number,
      paymentDate: {
        type: Date,
        default: Date.now
      },
      method: {
        type: String,
        enum: ['cash', 'bank transfer', 'mobile money', 'card']
      },
      recordedBy: String // Admin who recorded the payment
    }]
  },
  
  // Benefits Management
  benefits: {
    status: {
      type: String,
      enum: ['received', 'pending', 'not eligible', 'processed'],
      default: 'pending'
    },
    type: {
      type: String,
      enum: ['medical', 'educational', 'housing', 'retirement', 'other'],
      default: 'other'
    },
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Amount cannot be negative']
    },
    lastReceivedDate: Date,
    distributionHistory: [{
      benefitType: String,
      amount: Number,
      distributionDate: {
        type: Date,
        default: Date.now
      },
      distributedBy: String // Admin who distributed the benefit
    }]
  },
  
  // Admin tracking
  createdBy: {
    type: String,
    required: true
  },
  
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'retired'],
    default: 'active'
  }
  
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Indexes for better query performance
memberSchema.index({ email: 1 });
memberSchema.index({ staffId: 1 });
memberSchema.index({ circuit: 1 });
memberSchema.index({ 'dues.status': 1 });
memberSchema.index({ 'benefits.status': 1 });

// Virtual for full member info (optional)
memberSchema.virtual('memberInfo').get(function() {
  return `${this.name} (${this.staffId}) - ${this.circuit}`;
});

// Instance method to check if dues are paid
memberSchema.methods.isDuesPaid = function() {
  return this.dues.status === 'paid';
};

// Instance method to check if benefits are received
memberSchema.methods.hasReceivedBenefits = function() {
  return this.benefits.status === 'received';
};

// Static method to find members by circuit
memberSchema.statics.findByCircuit = function(circuit) {
  return this.find({ circuit });
};

// Static method to get members with pending dues
memberSchema.statics.findWithPendingDues = function() {
  return this.find({ 'dues.status': 'pending' });
};

// Middleware to update updatedAt when dues/benefits change
memberSchema.pre('save', function(next) {
  if (this.isModified('dues') || this.isModified('benefits')) {
    this.updatedAt = Date.now();
  }
  next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;