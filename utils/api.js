import { SYD_VAR, SYD_VAR_constructor } from "../sydneyDom_v3.js";

SYD_VAR.fetchTrendingToken = new SYD_VAR_constructor({value:"https://api.coingecko.com/api/v3/search/trending"});
SYD_VAR.fetch_mc_vl_pr = new SYD_VAR_constructor({value:{
    mc:"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1",
    volume:"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=15&page=1",
    price:"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_desc&per_page=250&page=1&price_change_percentage=1h,24h,7d,30d"
}});
SYD_VAR.fetchCGecko_platform = new SYD_VAR_constructor({value:"https://api.coingecko.com/api/v3/asset_platforms"});

// SYD_VAR.domain = new SYD_VAR_constructor({value:"http://localhost:3000"}).get() //development
SYD_VAR.domain = new SYD_VAR_constructor({value:"https://servercode-wild-star-7498.fly.dev"}).get() //production

SYD_VAR.accessTokenUrl = new SYD_VAR_constructor({value:`${SYD_VAR.domain}/accessToken`});
SYD_VAR.walletInfoUrl = new SYD_VAR_constructor({value:`${SYD_VAR.domain}/walletAssets`});
SYD_VAR.walletTxnHistory = new SYD_VAR_constructor({value:`${SYD_VAR.domain}/walletHistory`});
SYD_VAR.scanContract_basicInfo = new SYD_VAR_constructor({value:`${SYD_VAR.domain}/scanContract/info`});
SYD_VAR.scanContract_sourceCode = new SYD_VAR_constructor({value:`${SYD_VAR.domain}/scanContract/sourceCode`});
SYD_VAR.scanContract_bal = new SYD_VAR_constructor({value:`${SYD_VAR.domain}/scanContract/balance`});


// SYD_VAR.accessTokenUrl = new SYD_VAR_constructor({value:"/accessToken"});
// SYD_VAR.walletInfoUrl = new SYD_VAR_constructor({value:"https://servercode-wild-star-7498.fly.dev/walletAssets"});

// SYD_VAR.walletTxnHistory = new SYD_VAR_constructor({value:"https://servercode-wild-star-7498.fly.dev/walletHistory"});
