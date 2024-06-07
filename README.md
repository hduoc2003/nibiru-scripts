# Nibiru scripts

This project is used to listen requests from [email-wallet](https://github.com/hduoc2003/email-wallet) and uses `nibijs` to call the contracts from the [nibiru-contracts](https://github.com/hduoc2003/nibiru-contracts).

## Installation

First, create a `.evn` file at the root of the project and update it with the following:

```ini
FEE=                            # Fees payable per transaction
RELAYER_MNEMONIC=               # The relayer's mnemonic
VERIFIER_CONTRACT_ADDRESS=      # The address of the contract for verification purposes on Nibiru
```

Then run the following commands:

```bash
npm i -g tsx

npm start
```
