import express, { Request, Response } from "express";
import { getAccount } from "../contracts/createAccount";
import {sendNft} from "../contracts/sendNft";

const sendNftRouter = express.Router();

interface Req {
    wallet_salt: number[],
    toAddress: string,
    contract: string,
    tokenId: string,
}

type Res = string | {
    txHash: string,
}
sendNftRouter.post("/send-nft", async (req: Request<never, never, Req>, res: Response<Res>) => {
    let {wallet_salt, toAddress, contract, tokenId} = req.body;
    if (wallet_salt.length !== 32) {
        res.send(`Invalid wallet salt`);
        return;
    }
    let signer = await getAccount(Buffer.from(wallet_salt));
    let txHash = await sendNft(signer, toAddress, contract, tokenId);
    res.send({
        txHash
    })
})
export default sendNftRouter;
