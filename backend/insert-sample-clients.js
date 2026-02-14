// Insert sample clients for quotations
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'erp_db';

const sampleClients = [
  {
    clientId: 1,
    clientName: 'ABC Pte Ltd',
    contactPerson: 'John Smith',
    email: 'john@abc.com.sg',
    phone: '+65 6123 4567',
    address: '123 Business Park, Singapore 123456',
    companyId: 1,
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    clientId: 2,
    clientName: 'XYZ Construction',
    contactPerson: 'Mary Johnson',
    email: 'mary@xyz.com.sg',
    phone: '+65 6234 5678',
    address: '456 Industrial Road, Singapore 234567',
    companyId: 1,
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    clientId: 3,
    clientName: 'DEF Properties',
    contactPerson: 'Robert Lee',
    email: 'robert@def.com.sg',
    phone: '+65 6345 6789',
    address: '789 Orchard Road, Singapore 345678',
    companyId: 1,
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    clientId: 4,
    clientName: 'GHI Development',
    contactPerson: 'Sarah Tan',
    email: 'sarah@ghi.com.sg',
    phone: '+65 6456 7890',
    address: '321 Marina Bay, Singapore 456789',
    companyId: 1,
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function insertClients() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('clients');
    
    // Insert the documents
    const result = await collection.insertMany(sampleClients);
    console.log(`✅ Inserted ${result.insertedCount} clients`);
    
    // Show what was inserted
    sampleClients.forEach(c => {
      console.log(`   - ${c.clientName} (ID: ${c.clientId})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

insertClients();