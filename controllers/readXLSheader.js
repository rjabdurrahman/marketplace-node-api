const ExcelJS = require('exceljs');
const https = require('https');
const fs = require('fs');
const { connection } = require('../utils/db');

async function readXLSheader(req, res) {
    try {
        const file = fs.createWriteStream('sample1_v1.xlsx');
        let fileURL = req.body.ReadXLSHeader.file[0].$.url;
        let rowNo = req.body.ReadXLSHeader.row[0].$.no;
        const wb = new ExcelJS.Workbook();
        https.get('https://' + fileURL, response => {
            let stream = response.pipe(file);
            stream.on("finish", async () => {
                await wb.xlsx.readFile('sample1_v1.xlsx');
                // await wb.xlsx.read(response.buffer());
                let ws = wb.getWorksheet(1);
                let cells = ws.getRow(rowNo).model.cells;
                let valueCells = cells.filter(c => c.value);
                let structedData = {};
                valueCells.forEach(c => {
                    let key = c.address.replace(/\d/g, '');
                    structedData['Column' + key] = c.value;
                });
                // connection.query(`DELETE FROM XLSHeaderLog_100 WHERE 1;`, function (error, results, fields) {
                //     if (error) throw error;
                //     console.log(results);
                // });
                connection.query(`INSERT INTO XLSHeaderLog_100 (User, XLSLink, JsonResult, EventTime) VALUES('Abdur Rahman', '${fileURL}', '${JSON.stringify(structedData)}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}');`, function (error, results, fields) {
                    if (error) throw error;
                    console.log(results);
                });
                res.send(structedData);
            });
        });
    } catch (e) {
        res.send(e.message);
    }
}

module.exports = { readXLSheader };