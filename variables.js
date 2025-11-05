import { SYD_VAR, SYD_VAR_constructor } from "./sydneyDom_v3.js";

SYD_VAR.container_bg_drk = new SYD_VAR_constructor({value:"#0b0b0b"});          // deep black
SYD_VAR.container_bg = new SYD_VAR_constructor({value:"#121212"});             // main dark bg
SYD_VAR.tab_bg = new SYD_VAR_constructor({value:"#1a1a1a"});                   // tab background
SYD_VAR.headerClr = new SYD_VAR_constructor({value:"#ffffff"});                // white headers
SYD_VAR.themeClr = new SYD_VAR_constructor({value:"#F3BA2F"});                 // BNB gold/yellow
SYD_VAR.tableBg = new SYD_VAR_constructor({value:"rgba(26, 26, 26, 0.9)"});    // slightly lifted table bg
SYD_VAR.bgWhite_t_5 = new SYD_VAR_constructor({value:"rgba(255,255,255,.05)"});// faint highlights
SYD_VAR.err = new SYD_VAR_constructor({value:"#E84142"});                      // softer red for error
SYD_VAR.success = new SYD_VAR_constructor({value:"#0ECB81"});                  // Binance green success
SYD_VAR.pending = new SYD_VAR_constructor({value:"#F3BA2F"});                  // same BNB yellow
SYD_VAR.pending_ = new SYD_VAR_constructor({value:"#f3ba2fc0"});  

SYD_VAR.greyText = new SYD_VAR_constructor({value:"rgba(255,255,255,.5)"})

//contract actions
SYD_VAR.contractOptions = new SYD_VAR_constructor({value:{
    evm:[{text:"basic info",type:"info",icon:"info.svg"},{text:"Creator Address",type:"creator",icon:"creator.svg"},{text:"view ABI",type:"abi",icon:"abi.svg"},{text:"contract Functions",type:"function",icon:"function.svg"},{text:"source code",type:"code",icon:"code.svg"},{text:"Native balance",type:"balance",icon:"balance.svg"}],
    svm:[{text:"basic info",type:"info",icon:"info.svg"},{text:"executable status",type:"isExecutable",icon:"execute.svg"},{text:"creator address",type:"creator",icon:"creator.svg"},{text:"native balance",type:"balance",icon:"balance.svg"}]
}})
//contract actions

//Native tokens 
SYD_VAR.nativeTokens = new SYD_VAR_constructor({value:{
  bitcoin: {
    symbol: "BTC",
    name: "Bitcoin",
    platform: "bitcoin",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // pseudo for native BTC
    native: true
  },
  ethereum: {
    symbol: "ETH",
    name: "Ethereum",
    platform: "ethereum",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    native: true
  },
  binancecoin: {
    symbol: "BNB",
    name: "BNB",
    platform: "binance-smart-chain",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    native: true
  },
  polygon: {
    symbol: "MATIC",
    name: "Polygon",
    platform: "polygon-pos",
    contract_address: "0x0000000000000000000000000000000000001010",
    native: true
  },
  avalanche: {
    symbol: "AVAX",
    name: "Avalanche",
    platform: "avalanche",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    native: true
  },
  fantom: {
    symbol: "FTM",
    name: "Fantom",
    platform: "fantom",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    native: true
  },
  arbitrum: {
    symbol: "ETH",
    name: "Ethereum (Arbitrum)",
    platform: "arbitrum-one",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    native: true
  },
  optimism: {
    symbol: "ETH",
    name: "Ethereum (Optimism)",
    platform: "optimistic-ethereum",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    native: true
  },
  base: {
    symbol: "ETH",
    name: "Ethereum (Base)",
    platform: "base",
    contract_address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    native: true
  },
  solana: {
    symbol: "SOL",
    name: "Solana",
    platform: "solana",
    contract_address: "So11111111111111111111111111111111111111112",
    native: true
  }
}});


SYD_VAR.moralise_gecko_match = new SYD_VAR_constructor({value:[
  { moralis: "eth", coingecko: "ethereum", ticker: "ETH" },
  { moralis: "bsc", coingecko: "binance-smart-chain", ticker: "BNB" },
  { moralis: "polygon", coingecko: "polygon-pos", ticker: "MATIC" },
  { moralis: "arbitrum", coingecko: "arbitrum-one", ticker: "ETH" },
  { moralis: "optimism", coingecko: "optimistic-ethereum", ticker: "ETH" },
  { moralis: "base", coingecko: "base", ticker: "ETH" },
  { moralis: "linea", coingecko: "linea", ticker: "ETH" },
  { moralis: "avalanche", coingecko: "avalanche", ticker: "AVAX" },
  { moralis: "fantom", coingecko: "fantom", ticker: "FTM" },
  { moralis: "cronos", coingecko: "cronos", ticker: "CRO" },
  { moralis: "palm", coingecko: "palm", ticker: "PALM" },
  { moralis: "gnosis", coingecko: "xdai", ticker: "xDAI" },
  { moralis: "chiliz", coingecko: "chiliz", ticker: "CHZ" },
  { moralis: "moonbeam", coingecko: "moonbeam", ticker: "GLMR" },
  { moralis: "moonriver", coingecko: "moonriver", ticker: "MOVR" }
]
})

SYD_VAR.cGecko_shortTerms = new SYD_VAR_constructor({value:["ethereum", "solana", "bsc", "avax", "base", "polygon", "arbi", "opti", "sui", "aptos", "near", "cosmos", "ton", "sei", "stark", "linea", "mantle", "kcc", "fantom", "cronos", "manta", "celo", "moon", "kava", "scroll", "zora", "blast", "zksync", "mode", "aurora", "harmony", "metis", "moonbeam", "gnosis", "astar", "oktc", "poly", "telos", "core", "rsk", "wemix", "oasys", "flux", "vechain", "eos", "algorand", "neo", "ontology", "icon", "theta"]})

SYD_VAR.cGeckoPlatforms = new SYD_VAR_constructor({value:[]});