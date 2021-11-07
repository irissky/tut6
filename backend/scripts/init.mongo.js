/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

db.issues.remove({});

const issuesDB = [
  {
    id: 1, name: 'John Wilson', phone: '12345678', time: new Date("Sep 20,2021 9:35:12").toISOString()
  },
  {
    id: 2, name: 'Edward Adam Davis', phone: '32345678', time: new Date("Sep 20,2021 12:44:33").toISOString()
  },
  {
    id: 3, name: 'Clarie Bono', phone: '65234256', time: new Date("Sep 20,2021 17:56:04").toISOString()
  },
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ name: 1 });
db.issues.createIndex({ phone: 1 });
db.issues.createIndex({ time: 1 });
