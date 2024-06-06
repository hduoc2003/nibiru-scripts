import express, { Request, Response } from "express";
import { AccountCreationProof } from "src/interfaces/proof";
import { getAccount } from "../contracts/createAccount";
import { verifyCreateAccount } from "../contracts/verifyAccountCreation";
import { bytes32 } from "src/interfaces/alias";
import { bufferFromByte32 } from "src/utils/converter";
import { getAddressFromWallet } from "src/utils/wallet";

const router = express.Router();

router.post("/get-wallet-address", async (req: Request<never, never, {wallet_salt: bytes32}>, res: Response<string>) => {
  let {wallet_salt} = req.body;
  let wallet = await getAccount(bufferFromByte32(wallet_salt));
  res.send(await getAddressFromWallet(wallet));
})

export default router;
