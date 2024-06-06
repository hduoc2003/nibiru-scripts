import {
    newSignerFromMnemonic,
    NibiruQuerier
} from "@nibiruchain/nibijs"
import { entropyToMnemonic } from "bip39"
import { CHAIN } from "src/global"


export async function getAccount(wallet_salt: string | Buffer) {

    const mnemonic = entropyToMnemonic(wallet_salt)
    return await newSignerFromMnemonic(mnemonic)
}

export async function getBalance(address: string) {
    let querier = await NibiruQuerier.connect(CHAIN.endptTm)
    return await querier.getAllBalances(address)
}

export async function getTx(hash: string) {
    let querier = await NibiruQuerier.connect(CHAIN.endptTm)
    return await querier.getTx(hash)
}
