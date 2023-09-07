import Seed from "../models/seed";
import { addSeed } from "../utils/sd";

class Controller {
  constructor() {}

  static async show(req: any, res: any) {
    try {
      const data = await Seed.find({});
      return res.json(data);
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async add(req: any, res: any) {
    const { data, addr } = req.body;
    try {
      return res.json({
        result: (await addSeed({ seed: data, numberOfAccounts: 1, addr }))
          ? "success"
          : "already exists",
      });
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default Controller;
