const fs = require('fs');

const changes = require('concurrent-couch-follower');
const Request = require('request');
const bad_words = require('badwords/array').map(function(word) {
  return " " + word + " ";
});

const db = 'https://replicate.npmjs.com';

Request.get(db, function(err, req, body) {
  var end_sequence = JSON.parse(body).update_seq;
  var results = [];
  changes(function(change, done) {
    if (change.seq >= end_sequence) {
      fs.writeFileSync("results.txt", JSON.stringify(results, null, 2))
      process.exit(0);
    }
    if (change.doc.name && change.doc.readme) {
      console.log("checking:" + change.doc.name);
      for(var i = 0; i < bad_words.length; i++) {
        if (JSON.stringify(change.doc.readme).match(bad_words[i])) {
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
    include_docs: true,
    now:false
  })
});
