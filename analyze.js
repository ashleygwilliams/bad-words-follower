const fs = require('fs');

const matches = JSON.parse(fs.readFileSync('results.txt', 'utf-8'));

var count = function(ary, classifier) {
  return ary.reduce(function(counter, item) {
    var p = (classifier || String)(item);
    counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
    return counter;
  }, {})
};

var countByWord = count(matches, function(match) { return match.word });
fs.writeFileSync("analysis.txt", JSON.stringify(countByWord, null, 2));
