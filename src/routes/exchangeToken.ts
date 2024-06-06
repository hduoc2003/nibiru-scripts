import express, { Request, Response } from "express";
import { getAccount } from "../contracts/createAccount";
import { openPosition } from "../contracts/exchangeToken";

const exchangeToken = express.Router();

interface Req{
    wallet_salt : number[],
    pair : string,
    amount : number,
    leverage : number,
    goLong : boolean,
}

type Res = string | {
    txHash : string
}

exchangeToken.post("/exchangeToken", async (req: Request<never, never, Req>, res: Response<Res>) => {
    let {wallet_salt,pair,amount,leverage,goLong} = req.body;
    if (wallet_salt.length !== 32) {
        res.send(`Invalid wallet salt`);
        return;
    }
    let signer = await getAccount(Buffer.from(wallet_salt));
    let txHash = await openPosition(signer,pair,amount,leverage,goLong);
    res.send({txHash})
})

export default exchangeToken;
