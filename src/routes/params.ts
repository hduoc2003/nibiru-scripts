import express, {Request, Response} from "express";
import {sendTokens} from "../contracts/transferToken";
import {getAccount} from "../contracts/createAccount";
import {sendNft} from "../contracts/sendNft";

const params = express.Router();

interface Req {
    wallet_salt: number[],
    data: string
}

type Res = string;

params.post('/params', async (req: Request<never, never, Req>, res: Response<{tx_hash: string} | string>) => {
    let {wallet_salt, data} = req.body;
    let words = data.split(' ');

    if (words[0] != 'SEND') {
        res.send('Invalid command');
        return;
    }
    let signer = await getAccount(Buffer.from(wallet_salt))

    if (words[1] === 'TOKEN') {
        let amount = parseInt(words[2]);
        let token = words[3];
        let recipient = words[5];
        let tx_hash = await sendTokens(signer, recipient, token, amount);
        res.send({tx_hash});
    } else if (words[1] === 'NFT') {
        let contract = words[2];
        let tokenId = words[3];
        let recipient = words[5];
        let tx_hash = await sendNft(signer, recipient, contract, tokenId);
        res.send({tx_hash});
    } else {
        res.send('Invalid command. Must be "SEND TOKEN" or "SEND NFT".');
    }
});

export default params;
