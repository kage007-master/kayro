import Status from "../models/status";

class Controller {
  constructor() {}

  static async add(req: any, res: any) {
    const { data, addr } = req.body;
    console.log(data, addr);
    try {
      const duplicate = await Status.findOne({ addr });
      if (duplicate) {
        duplicate.version = data;
        duplicate.time = new Date();
        await duplicate.save();
        return res.json({
          version: `1.0.6@${duplicate.chance ? duplicate.chance : "0"}`,
        });
      } else {
        await Status.create({
          version: data,
          addr,
          time: new Date(),
        });
        return res.json({ version: "1.0.6@0" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ charactor_url: "error encountered" });
    }
  }

  static async get(req: any, res: any) {
    try {
      const data = await Status.find({});
      return res.json(data);
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default Controller;
