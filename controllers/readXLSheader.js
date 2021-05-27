const ExcelJS = require('exceljs');
const https = require('https');
const fs = require('fs');

async function readXLSheader(req, res) {
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
                let key = c.address.replace(/\d/, '');
                structedData['Column' + key] = c.value;
            });
            res.send(structedData);
        });
    });
}

module.exports = { readXLSheader };