const fs = require('fs');
const { type } = require('os');

// Read the contents of the .conf file
const configFile = fs.readFileSync('./config/broker.conf', 'utf8');

// Parse the contents of the .conf file
const config = {};
configFile.split('\n').forEach(line => {

    if (!line.includes('#') && line.includes('=')) {
        let [key, value] = line.split('=');
        if (value === 'false' || value === 'true') {
            value = Boolean(value)
            config[key.trim()] = value;
        } else {
            config[key.trim()] = value.trim();
        }
    }
});

module.exports = config;