const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

function testWithCallbacks(callback) {
  console.log('\n============================================ testWithCallbacks ============================================');
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(function(err, client) {
    if (err) {
      callback(err);
      return;
    }
    console.log('Connected to MongoDB');

    const db = client.db();
    console.log('remove all the existing entries in db');
    db.collection('customers').remove({});
    const collection = db.collection('customers');

    const customer = {id: 1, name: 'John Wilson', phone: '12345678', time: new Date("Sep 20,2021 9:35:12").toLocaleString()};
    collection.insertOne(customer, function(err, result) {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId})
        .toArray(function(err, docs) {
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of find:\n', docs);
        client.close();
        callback(err);
      });
    });
  });
}

async function testWithAsync() {
  console.log('\n============================================ testWithAsync & CRUD operations ============================================');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('customers');

    console.log('\n*********************** C: testWithCreate ***********************');
    console.log('## target: create a new customer in the db.')
    const customer = { id: 2, name: 'Edward Adam Davis', phone: '32345678', time: new Date("Sep 20,2021 12:44:33").toLocaleString()};
    const result1 = await collection.insertOne(customer);
    console.log('Result of create:\n', result1.insertedId);
    const docs1 = await collection.find({ _id: result1.insertedId }).toArray();
    console.log('Result of find:\n', docs1);

    console.log('\n*********************** R: testWithRead ***********************');
    console.log('## target: read all the existing customers in the db.')
    const docs2 = await collection.find().toArray();
    console.log('Result of Read:\n', docs2);
   

    console.log('\n*********************** U: testWithUpdate ***********************');
    console.log('## target: update the id=2 customer\'s phone to 11111111 ')
    const result3 = await collection.findOne({id:2});
    console.log('id = 2 before update: \n', result3);
    await collection.updateOne({ id: 2 }, { $set: {phone: `11111111` } });
    const docs3 = await collection.find({ id:2}).toArray();
    console.log('id = 2 after update:\n', docs3);

    console.log('\n*********************** D: testWithDelete ***********************');
    console.log('## target: delete the id=1 customer')
    const result4 = await collection.findOne({id:1});
    console.log('Result of find id=1 before deletion: \n', result4);
    await collection.deleteOne({ id: 1 });
    const docs4 = await collection.findOne({id:1 });
    console.log('Result of find id=1 after deletion:\n', docs4);

  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}


testWithCallbacks(function(err) {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
