import PK from "../models/private";
import { addPK } from "../utils/pk";
import puppeteer from "puppeteer";

let page: any;

const runBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  return page;
};

(async () => {
  page = await runBrowser();
})();

class Controller {
  constructor() {}
  static async calc(req: any, res: any) {
    try {
      const query = req.body.all ? {} : { zero: false };
      const data = await PK.find(query)
        .skip((req.body.page - 1) * 10)
        .limit(10);
      for (let item of data) {
        const pk = item.Pub;
        await page.goto("https://debank.com/profile/" + pk);
        let result: any = undefined;
        while (1) {
          await new Promise((r) => setTimeout(r, 1000));
          result = await page.evaluate(() => {
            return document.querySelector(
              "div.HeaderInfo_totalAssetInner__1mOQs"
            )?.textContent;
          });
          if (result && result.slice(-1) === "%") break;
        }
        item.TOTAL = result;
        item.save();
      }
      const totalCnt = await PK.countDocuments(query);
      return res.json({ result: data, totalCnt });
    } catch (err) {
      console.log(err);
      return res.json({ error: err });
    }
  }

  static async show(req: any, res: any) {
    try {
      const query = req.body.all ? {} : { zero: false };
      const data = await PK.find(query)
        .skip((req.body.page - 1) * 10)
        .limit(10);
      const totalCnt = await PK.countDocuments(query);
      return res.json({ result: data, totalCnt });
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async add(req: any, res: any) {
    const { data } = req.body;
    try {
      return res.json({
        result: (await addPK({ pk: data.slice(-64) }))
          ? "success"
          : "already exists",
      });
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async visible(req: any, res: any) {
    try {
      const dup = await PK.findById(req.body.id);
      if (dup) {
        dup.zero = !dup.zero;
        dup.save();
        return res.json({ result: "success" });
      }
      return res.json({ result: "failed" });
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default Controller;
