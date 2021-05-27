const ExcelJS = require('exceljs');

async function readXLSheader(req, res) {
    let fileURL = req.body.ReadXLSHeader.file[0].$.url;
    let rowNo = req.body.ReadXLSHeader.row[0].$.no;
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile('sample1_v1.xlsx');
    let ws = wb.getWorksheet(1);
    let cells = ws.getRow(4).model.cells;
    let valueCells = cells.filter(c => c.value);
    let structedData = {};
    valueCells.forEach(c => {
        let key = c.address.replace(/\d/, '');
        structedData['Column' + key] = c.value;
    });
    res.send(structedData);
}

module.exports = { readXLSheader };