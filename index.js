const fs = require('fs');

const changes = require('concurrent-couch-follower');
const Request = require('request');

const db = 'https://replicate.npmjs.com';

Request.get(db, function(err, req, body) {
  var end_sequence = JSON.parse(body).update_seq;
  var results = [];
  var bad_words = fs.readFileSync('./bad-words.txt', 'utf-8').split('\n').slice(1, -1).map(function(word) {
    return " " + word + " ";
  });
  changes(function(change, done) {
    if (change.seq >= end_sequence) {
      fs.writeFileSync("results.txt", JSON.stringify(results, null, 2))
      process.exit(0);
    }
    if (change.doc.name) {
      console.log("checking:" + change.doc.name);
      for(var i = 0; i < bad_words.length; i++) {
        if ((change.doc.name).match(bad_words[i])) {
          console.log("found " + bad_words[i]);
          var hit = {
            "name":  change.doc.name,
            "word": bad_words[i]
          };
          results.push(hit);
        }
      }
    }
    done();
  }, {
    db: db,
    include_docs: true
  })
});
