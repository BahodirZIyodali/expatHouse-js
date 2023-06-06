import { getCalc } from "../models/models.js";

const get_calc = async (req, res) => {
    try {
      const { room_id, year ,bank_id } = req.body;
      const result=await getCalc(room_id, year,bank_id)
      res.json(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };

  export default get_calc