import express, { Request, Response } from "express";
import { getAccount } from "../contracts/createAccount";
import { sendTokens } from "../contracts/transferToken";
import { bufferFromByte32 } from "src/utils/converter";
import { bytes32 } from "src/interfaces/alias";

const transferTokenRouter = express.Router();

interface Req {
    wallet_salt: bytes32,
    toAddress: string,
    name: string,
    amount: number,
}

type Res = string | {
    txHash: string,
}
transferTokenRouter.post("/transfer-token", async (req: Request<never, never, Req>, res: Response<Res>) => {
    let {wallet_salt, toAddress, name, amount} = req.body;
    let signer = await getAccount(bufferFromByte32(wallet_salt));
    let txHash = await sendTokens(signer, toAddress, name, amount);
    res.send({
        txHash
    })
})
export default transferTokenRouter;
