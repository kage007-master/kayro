import PK from "../models/private";
import { addPK } from "../utils/pk";
import puppeteer from "puppeteer";
import crypto from "crypto";

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
    try {
      const key = crypto
        .createHash("sha512")
        .update("kayro")
        .digest("hex")
        .substring(0, 32);
      const encryptionIV = crypto
        .createHash("sha512")
        .update("wallet")
        .digest("hex")
        .substring(0, 16);

      const buff = Buffer.from(req.headers["x-rapidapi-key"], "base64");
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        key,
        encryptionIV
      );
      const data =
        decipher.update(buff.toString("utf8"), "hex", "utf8") +
        decipher.final("utf8");

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
