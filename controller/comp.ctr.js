import { deleteCompany, getComp, getCompAll, postCompany, putCompany } from "../models/models.js";

const get_componies = async (_, res) => {
    try {
      res.json(await getCompAll());
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };
  
  const get_company = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      res.json(await getComp(id));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };

  const create_company = async (req, res) => {
    try {
      const {   company_name, img } = req.body;
      res.json(await postCompany(  company_name, img));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };
  const delete_company = async (req, res) => {
      try {
        const { id } = req.params;
        res.json(await deleteCompany(id));
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    };
  
    const update_company = async (req, res) => {
        try {
          const { id } = req.params;
          const { company_name,company_img } = req.body;
          res.json(await putCompany( company_name,company_img,id));
        } catch (err) {
          console.log(err);
          res.sendStatus(500);
        }
      };
      


export {get_company,get_componies,create_company,delete_company,update_company}