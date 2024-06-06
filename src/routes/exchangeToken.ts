import express, { Request, Response } from "express";
import { getAccount } from "../contracts/createAccount";
import { openPosition } from "../contracts/exchangeToken";
import { bufferFromByte32 } from "src/utils/converter";
import { bytes32 } from "src/interfaces/alias";

const exchangeToken = express.Router();

interface Req{
    wallet_salt : bytes32,
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
    let signer = await getAccount(bufferFromByte32(wallet_salt));
    let txHash = await openPosition(signer,pair,amount,leverage,goLong);
    res.send({txHash})
})

export default exchangeToken;
