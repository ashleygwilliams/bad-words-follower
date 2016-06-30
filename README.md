# bad-words-follower
> making a list (of readmes) and checking it just once, for "bad-words"

this repository is the home of an npm registry follower that reads in package READMEs
and checks them against a list of [`badwords`].

[`badwords`]: https://www.npmjs.com/package/badwords

the main goal of this repository is to flag potentially problematic READMEs. things
like this often prone to the [Scunthorpe problem], so this will never be used to
programmatically block or censor anything. to ease the number of false positives,
this repo also only checks for the words in isolate (" word "), not as a word part.

[Scunthorpe problem]: https://en.wikipedia.org/wiki/Scunthorpe_problem

## up and running

1. Fork and clone this repository
2. `cd bad-words-follower`
3. `npm start`
