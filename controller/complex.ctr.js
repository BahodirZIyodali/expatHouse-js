import {
  deleteComplex,
  getComplex,
  getComplexs,
  postComplex,
  putComplex,
} from "../models/models.js";

const get_complex = async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await getComplex(id));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const get_complexes = async (_, res) => {
  try {
    res.json(await getComplexs());
  } catch (err) {
    console.log(err);
    res.sendStatus(5000);
  }
};

const create_complex = async (req, res) => {
  try {
    const { complex_name, address, company_id } = req.body;
    const result = await postComplex(complex_name, address, company_id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const delete_complex = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await deleteComplex(id));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const update_complex = async (req, res) => {
  try {
    const { id } = req.params;
    const { complex_name, address } = req.body;
    res.json(await putComplex(complex_name, address, id));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export { get_complex, get_complexes, delete_complex, create_complex, update_complex };
