import { coins } from "@cosmjs/proto-signing";
import { DirectSecp256k1HdWallet, NibiruTxClient } from "@nibiruchain/nibijs";
import { CHAIN } from "src/global";


export async function sendTokens(signer: DirectSecp256k1HdWallet, toAddress: string, name: string, amount: number) {
    const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer)
    const [{address: fromAddr}] = await signer.getAccounts()
    const tokens = coins(amount, name)
    const txRes = await txClient.sendTokens(
        fromAddr,
        toAddress,
        tokens,
        5
    )
    return txRes.transactionHash
}
