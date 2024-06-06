import {
    Msg,
    NibiruQuerier,
    NibiruTxClient
} from "@nibiruchain/nibijs"
import { CHAIN } from "src/global"

export async function openPosition(signer : any, pair : string, amount : number, leverage : number, goLong : boolean) {
    const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer)
    const querier = await NibiruQuerier.connect(CHAIN.endptTm)
    const [{address : fromAddr}] = await signer.getAccounts()
    const msg = [Msg.perp.openPosition({
        sender : fromAddr,
        pair : pair,
        quoteAssetAmount : amount,
        leverage : leverage,
        goLong : goLong,
        baseAssetAmountLimit:0,
    })]
    const txResp = await txClient.signAndBroadcast(fromAddr,msg,"auto")
    console.log(txResp)
    const perpPosition = await querier.nibiruExtensions.perp.positions({
        trader : fromAddr,
    })
    console.log(perpPosition)
    return txResp.transactionHash
}

