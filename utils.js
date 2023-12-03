const getFilePath = (fileName) => {
    const path = require('path');
    const filePath = path.join(__dirname, fileName);
    return filePath;
};

const getInputData = async (fileName) => {
    const fs = require('fs').promises;

    const input = await fs.readFile(getFilePath(fileName), 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }
        const lines = data.split('\n');
        return lines;
    });
    return input;
};

module.exports = { getInputData, getFilePath };
