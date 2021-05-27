const ExcelJS = require('exceljs');
const https = require('https');
const fs = require('fs');

async function AnalyzeXLS(req, res) {
    try {
        const file = fs.createWriteStream('sample1_v1.xlsx');
        let fileURL = req.body.ReadXLSHeader.file[0].$.url;
        let rowNo = req.body.ReadXLSHeader.row[0].$.no;
        const wb = new ExcelJS.Workbook();
        https.get('https://' + fileURL, response => {
            let stream = response.pipe(file);
            stream.on("finish", async () => {
                await wb.xlsx.readFile('sample1_v1.xlsx');
                let ws = wb.getWorksheet(1);
                let cells = ws.getRow(rowNo + 1).model.cells;
                let valueCells = cells.filter(c => c.value);
                let structedData = {};
                valueCells.forEach(c => {
                    let key = c.address.replace(/\d/g, '');
                    console.log(c.address)
                    structedData['Column' + key] = typeof(c.value);
                });
                res.send(structedData);
            });
        });
    } catch (e) {
        res.send(e.message);
    }
}

module.exports = { AnalyzeXLS };