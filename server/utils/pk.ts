import PK from "../models/private";
import { ethers } from "ethers";

export const addPK = async (data) => {
  const dup = await PK.findOne({ pk: data.pk });
  if (!dup) {
    try {
      await PK.create({ ...data, Pub: new ethers.Wallet(data.pk).address });
    } catch (err) {
      return false;
    }
    return true;
  }
  return false;
};
