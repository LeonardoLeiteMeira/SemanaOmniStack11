const connection = require("../database/connection");

module.exports = {
  async create(request, respose) {
    const { id } = request.body;

    const ong = await connection("ongs").where("id", id).select("name").first();

    if (!ong) {
      return respose.status(400).json({
        error: "No ONG found with this ID"
      });
    }

    return respose.json({ Ong: ong });
  }
};
