var nano = require('nano');

// Specify the CouchDb URL

module.exports = nano(process.env.COUCHDB_URL || 'http://admin:admin@127.0.0.1:5984');