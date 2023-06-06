import { deleteBank, getBank, getBanks, postBank, putBank} from "../models/models.js";

const get_bank = async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await getBank(id));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};





const get_banks = async (_, res) => {
    try {
      const result =await getBanks()
      res.json(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };



const delete_bank = async (req, res) => {
  try {
    const { id } = req.params;
    const result =await deleteBank(id)
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};


const update_bank = async (req, res) => {
  try {
    const { id } = req.params;
    const {  bank_name,  started_paymant, limit_cost, year } = req.body;
    const result =await putBank(bank_name,started_paymant,limit_cost, year,id)
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const create_bank = async (req, res) => {
  try {
    const {  bank_name,  started_paymant, limit_cost, year} = req.body;
    const result = await postBank( bank_name,  started_paymant, limit_cost, year);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export{get_bank,get_banks,delete_bank,update_bank,create_bank}




