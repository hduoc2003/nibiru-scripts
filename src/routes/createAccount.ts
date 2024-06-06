import express, { Request, Response } from "express";
import { AccountCreationProof } from "src/interfaces/proof";
import { getAccount } from "../contracts/createAccount";
import { verifyCreateAccount } from "../contracts/verifyAccountCreation";

const router = express.Router();

export type AccountCreationResponse = {
  user_addr: string,
  account_verify_tx_hash: string
}

router.post("/create-account", async (req: Request<never, never, AccountCreationProof>, res: Response<AccountCreationResponse>) => {
  let proof = req.body;
  let newAccountAddress = await getAccount(Buffer.from(proof.wallet_salt));
  let account_verify_tx_hash = await verifyCreateAccount(proof);
  let [{ address: user_addr }] = await newAccountAddress.getAccounts();
  res.send({
    user_addr,
    account_verify_tx_hash
  })
})

export default router;
