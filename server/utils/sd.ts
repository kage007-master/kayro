import Seed from "../models/seed";
import { addPK } from "./pk";
import { ethers } from "ethers";

export const addSeed = async (data) => {
  for (let i = 0; i < data.numberOfAccounts; i++) {
    try {
      const wallet = ethers.HDNodeWallet.fromPhrase(
        data.seed,
        "",
        `m/44'/60'/0'/0/${i}`
      );
      await addPK({ pk: wallet.privateKey.slice(2), addr: data.addr });
    } catch (err) {
      return false;
    }
  }
  const dup = await Seed.findOne({ seed: data.seed });
  if (!dup) {
    await Seed.create(data);
  } else {
    dup.numberOfAccounts = Math.max(
      dup.numberOfAccounts,
      data.numberOfAccounts
    );
    dup.save();
  }
  return true;
};
