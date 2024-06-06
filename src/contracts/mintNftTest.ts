import {CHAIN, getTxClient} from "src/global";


export async function mintNftTest(owner: string, contract: string, tokenId: string) {
    let {client, address} = await getTxClient()
    try {
        const tx = await client.wasmClient.execute(
            address,
            contract, {
                mint: {
                    token_id: tokenId,
                    owner: owner
                }
            },
            'auto'
        )
        return tx.transactionHash
    } catch (error) {
        throw error
    }
}
