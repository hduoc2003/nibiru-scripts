import {coins} from "@cosmjs/proto-signing";
import {DirectSecp256k1HdWallet, NibiruTxClient} from "@nibiruchain/nibijs";
import {CHAIN} from "src/global";

type TokenId = string

export async function sendNft(signer: DirectSecp256k1HdWallet, toAddress: string, contract: string, tokenId: string) {
    const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer)
    const [{address: fromAddr}] = await signer.getAccounts()
    try {
        const tx = await txClient.wasmClient.execute(fromAddr, contract, {
                transfer_nft: {
                    recipient: toAddress,
                    token_id: tokenId,
                }
            },
            5
        )
        return tx.transactionHash
    } catch (error) {
        throw error
    }
}
