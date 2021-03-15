const { Spectral, Document, Parsers, isOpenApiv2, isOpenApiv3 } = require("@stoplight/spectral");
const fs = require('fs');
const { join } = require('path');

const sampleOAS = [
  './examples/apple.yaml',
  './examples/cloudhome.v1.yaml'
];

// lints with default OAS ruleset
const apple = () => {
  // Return the contents of sampleOAS as a string in the variable 'oas'
  // "utf8" encodes the raw buffer data in human-readable format
  fs.readFile(sampleOAS[0], 'utf8', (err, oas) => {
    if (err) {
      console.error(err);
    }
    else {
      // Initialize spectral object from Spectral API
      const spectral = new Spectral();
      // Register supported OpenAPUI formats
      spectral.registerFormat("oas2", isOpenApiv2);
      spectral.registerFormat("oas3", isOpenApiv3);

      // Load default OpenAPI ruleset
      spectral.loadRuleset("spectral:oas")
        // Lint the provided 'oas' object
        .then(() => spectral.run(oas))
        .then(results => {
          // Writes the lint results to a file
          fs.writeFile('./output/apple-results.json', JSON.stringify(results, null, 2), (err) => {
            if (err) {
              return console.error(err);
            }
            else {
              console.log('OpenAPI description linted successfully at output/apple-results.json!');
            }
          });
        });
    }
  });
};

// lints with default OAS ruleset
const cloudhome = () => {
  // Return the contents of sampleOAS as a string in the variable 'oas'
  // "utf8" encodes the raw buffer data in human-readable format
  fs.readFile(sampleOAS[1], 'utf8', (err, oas) => {
    if (err) {
      console.error(err);
    }
    else {
      // Initialize spectral object from Spectral API
      const spectral = new Spectral();
      // Register supported OpenAPUI formats
      spectral.registerFormat("oas2", isOpenApiv2);
      spectral.registerFormat("oas3", isOpenApiv3);

      // Load default OpenAPI ruleset
      spectral.loadRuleset(join(__dirname, './rulesets/.spectral.yaml'))
        // Lint the provided 'oas' object
        .then(() => spectral.run(oas))
        .then(results => {
          // Writes the lint results to a file
          fs.writeFile('./output/cloudhome-results.json', JSON.stringify(results, null, 2), (err) => {
            if (err) {
              return console.error(err);
            }
            else {
              console.log('OpenAPI description linted successfully at output/cloudhome-results.json!');
            }
          });
        });
    }
  });
};

cloudhome();
apple();