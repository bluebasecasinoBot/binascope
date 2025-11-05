import { SYD_VAR, SYD_VAR_constructor } from "../sydneyDom_v3.js";

SYD_VAR.platforms = new SYD_VAR_constructor({
    value:[
        { platform: "Metamask", icon: "metamask.png", type: "metamask", flag: "isMetaMask",available:false },
        { platform: "Phantom", icon: "phanthom.png", type: "phantom", flag: "isPhantom",available:false },
        { platform: "Rabby", icon: "rabby.png", type: "rabby", flag: "isRabby",available:false },
        { platform: "Trust Wallet", icon: "trust.png", type: "trust_wallet", flag: "isTrust",available:false },
        { platform: "Coinbase", icon: "coinbase.png", type: "coinbase", flag: "isCoinbaseWallet",available:false },
        { platform: "XDEFI", icon: "xdefi.png", type: "xdefi", flag: "isXDEFI",available:false },
        { platform: "OKX", icon: "okx.png", type: "okx", flag: "isOkxWallet",available:false }
    ]
})
