const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// For file handling
const upload = multer();

// Example user info (you can use dynamic data here)
const userInfo = {
    "user_id": "priyansh_singh_chaudhary_20012003",
    "email": "pc2569@srmist.edu.in",
    "roll_number": "RA2111026030174"
};

// POST method for /bfhl
app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = "";

    if (data && Array.isArray(data)) {
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string') {
                alphabets.push(item);
                if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        });
    }

    let fileDetails = {
        file_valid: false,
        file_mime_type: null,
        file_size_kb: null
    };

    if (file_b64) {
        // Assuming a valid base64 file input
        fileDetails.file_valid = true;
        // Dummy MIME type and file size (in KB) calculation
        fileDetails.file_mime_type = "application/pdf"; // Replace with actual logic
        fileDetails.file_size_kb = Buffer.byteLength(file_b64, 'base64') / 1024;
    }

    res.json({
        is_success: true,
        ...userInfo,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        ...fileDetails
    });
});

// GET method for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Deploy to Heroku or similar
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
