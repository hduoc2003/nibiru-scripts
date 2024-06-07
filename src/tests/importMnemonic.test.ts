import { DirectSecp256k1HdWallet, nibiru, NibiruTxClient } from "@nibiruchain/nibijs";
import { sendTokens } from "src/contracts/transferToken";
import { verifyCreateAccount } from "src/contracts/verifyAccountCreation";
import { CHAIN } from "src/global";
import { ENV, getEnv } from "src/utils/readEnv";
import { importMnemonic } from "src/utils/wallet";

jest.setTimeout(10000000)
describe('Test import existed mnemonic to reconstruct wallet', () => {
  it('should reconstruct expected wallet', async () => {
    let sender = await importMnemonic(getEnv(ENV.RELAYER_MNEMONIC));
    let r_add = "nibi1r2l3vck5xgqqaun4km4pzw7hza7f6xk7equpwh";
    let tx_hash = await sendTokens(sender, r_add, "unibi", 5);
    console.log(tx_hash);
  });

  it('should call contract', async () => {
    let relayer = await importMnemonic(getEnv(ENV.RELAYER_MNEMONIC));
    let [{ address: r_add }] = await relayer.getAccounts();
    const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, relayer)
    const contract = getEnv(ENV.VERIFIER_CONTRACT_ADDRESS);
    let tx_hash = await verifyCreateAccount({
      "relayer_hash": "2657775570588162468106059892364959818794579555689188187841520494766536623870",
      "email_addr_pointer": "14173279942334137220153051047875524688435377838755803238289438764289764554548",
      "account_key_commit": "4546439420997729770760366801171660106382993189994083815773060805393185157687",
      "wallet_salt": "11645307337330358394156085775232506543267466701022933613610565396010094018508",
      "psi_point": [
        "16190729713555891796124172902401997083132571090712478508749524955994059819467",
        "513507308524601422666219749690522073791387788801597937031774300495452961060"
      ],
      "proof": {
        "pi_a": [
          "15667991451084203135842214418274044746415228686680607213300256713934274025",
          "16420099176460645797857596314399183692480988375105246233984376591924741730954"
        ],
        "pi_b": [
          [
            "14069042424375688912940786830845726509634682192233570256650096195882523772238",
            "14766492818487001154161560044394021340925314571413688331618486581102192900723"
          ],
          [
            "9326411115847864522892040876914271202958816187586632880905655304019455057350",
            "2763427823873806702840417691613348016233722269840014653985582120557820075587"
          ]
        ],
        "pi_c": [
          "8033360682341316125734842556994411540415710574394389377852915457621158475816",
          "17275843055198325036192322960154758259155032495925001722114260411523773044710"
        ]
      }
    });
    console.log(tx_hash);
  })
})
