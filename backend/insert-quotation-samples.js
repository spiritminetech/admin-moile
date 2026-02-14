import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Simple quotation schema for direct insertion
const quotationSchema = new mongoose.Schema({
  quotationCode: { type: String, unique: true, index: true },
  companyId: { type: Number, index: true, required: true },
  clientId: { type: Number, index: true, required: true },
  projectName: { type: String, required: true },
  description: String,
  version: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Approved', 'Rejected', 'Converted'],
    default: 'Draft',
    index: true
  },
  totalManpowerCost: { type: Number, default: 0 },
  totalMaterialCost: { type: Number, default: 0 },
  totalToolCost: { type: Number, default: 0 },
  totalTransportCost: { type: Number, default: 0 },
  totalWarrantyCost: { type: Number, default: 0 },
  totalCertificationCost: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },
  validUntil: Date,
  createdBy: { type: Number, index: true },
  approvedBy: Number,
  approvedAt: Date,
  remarks: String
}, { timestamps: true });

const Quotation = mongoose.model('Quotation', quotationSchema);

// Connect and insert
async function insertSamples() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/erp_db');
    console.log('Connected to MongoDB');

    // Sample data
    const samples = [
      {
        quotationCode: 'QT-001',
        companyId: 1,
        clientId: 1,
        projectName: 'Facade Renovation Work',
        description: 'Complete facade renovation including cleaning, painting, and minor repairs',
        version: 1,
        status: 'Approved',
        totalManpowerCost: 45000,
        totalMaterialCost: 35000,
        totalToolCost: 8000,
        totalTransportCost: 5000,
        totalWarrantyCost: 2000,
        totalCertificationCost: 1000,
        grandTotal: 96000,
        validUntil: new Date('2026-04-30'),
        createdBy: 1,
        approvedBy: 1,
        approvedAt: new Date('2026-01-15'),
        remarks: 'Approved with standard terms'
      },
      {
        quotationCode: 'QT-002',
        companyId: 1,
        clientId: 2,
        projectName: 'External Painting Works',
        description: 'External painting for Tower A and Tower B',
        version: 2,
        status: 'Submitted',
        totalManpowerCost: 25000,
        totalMaterialCost: 18000,
        totalToolCost: 4000,
        totalTransportCost: 3000,
        totalWarrantyCost: 1500,
        totalCertificationCost: 500,
        grandTotal: 52000,
        validUntil: new Date('2026-03-31'),
        createdBy: 2
      },
      {
        quotationCode: 'QT-003',
        companyId: 1,
        clientId: 3,
        projectName: 'Plumbing System Upgrade',
        description: 'Complete plumbing system upgrade for residential complex',
        version: 1,
        status: 'Draft',
        totalManpowerCost: 35000,
        totalMaterialCost: 28000,
        totalToolCost: 6000,
        totalTransportCost: 4000,
        totalWarrantyCost: 2500,
        totalCertificationCost: 1500,
        grandTotal: 77000,
        validUntil: new Date('2026-05-15'),
        createdBy: 1
      }
    ];

    // Insert samples
    for (const sample of samples) {
      try {
        const quotation = new Quotation(sample);
        await quotation.save();
        console.log(`✅ Inserted: ${sample.quotationCode} - ${sample.projectName}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  Skipped: ${sample.quotationCode} (already exists)`);
        } else {
          console.error(`❌ Error inserting ${sample.quotationCode}:`, error.message);
        }
      }
    }

    console.log('\n🎉 Sample insertion completed!');
    
    // Show current count
    const count = await Quotation.countDocuments();
    console.log(`📊 Total quotations in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

insertSamples();