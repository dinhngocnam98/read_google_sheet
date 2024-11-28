const readGGSheetService = require("../services/readGGSheetService");

exports.readDataGGSheet = async (req, res, next) => {
    const reqBody = req.body;
    if (!reqBody.spreadSheetId || !reqBody.sheetName) {
        return res.status(400).send({"message": "Please enter a valid spread sheet id and sheet name."});
    }
    const result = await readGGSheetService.readSheet(reqBody.spreadSheetId, reqBody.sheetName);
    if (result.statusCode !== 200) {
        return res.status(400).send({
            success: false,
            message: result.message,
            statusCode: result.statusCode,
        });
    }
    return res.status(200).send({
        success: true,
        data: result,
        statusCode: 200,
    })
}