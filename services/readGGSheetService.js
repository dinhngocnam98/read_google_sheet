require('dotenv').config();
const {google} = require('googleapis');

const convertToObjects = (headers, values) => {
    return values.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });
};


exports.readSheet = async (spreadSheetId, sheetName, keyword) => {
    try {
        const auth = new google.auth.GoogleAuth({
            key: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        })

        const sheets = google.sheets({version: 'v4', auth});

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadSheetId,
            range: sheetName,
        });

        const rows = response.data.values;
        let result = [];
        let resultKeyword = [];
        if (rows.length) {
            const rowHeader = rows[0];
            const rowValues = rows.splice(1);
            result = convertToObjects(rowHeader, rowValues);
            resultKeyword =  !keyword || keyword === '' ? result : result.filter(re => re['AdsSource'] === keyword);
        } else {
            console.log('Không tìm thấy dữ liệu.');
        }
        return {
            statusCode: 200,
            data: resultKeyword,
        }
    } catch (error) {
        console.error('Error:', error.errors[0].message);
        return {
            statusCode: 400,
            message: error.errors[0].message,
        }
    }
}