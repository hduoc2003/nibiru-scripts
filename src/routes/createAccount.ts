import express, { Request, Response } from "express";
import { AccountCreationProof } from "src/interfaces/proof";
import { getAccount } from "../contracts/createAccount";
import { verifyCreateAccount } from "../contracts/verifyAccountCreation";
import { bytes32 } from "src/interfaces/alias";
import { bufferFromByte32 } from "src/utils/converter";

const router = express.Router();

export type AccountCreationRequest = {
  wallet_salt_byte32: bytes32,
  proof: AccountCreationProof
}

export type AccountCreationResponse = {
  user_addr: string,
  account_verify_tx_hash: string
}

router.post("/create-account", async (req: Request<never, never, AccountCreationRequest>, res: Response<AccountCreationResponse>) => {
  let {wallet_salt_byte32, proof} = req.body;
  let newAccountAddress = await getAccount(bufferFromByte32(wallet_salt_byte32));
  let account_verify_tx_hash = await verifyCreateAccount(proof);
  let [{ address: user_addr }] = await newAccountAddress.getAccounts();
  res.send({
    user_addr,
    account_verify_tx_hash
  })
})

export default router;
