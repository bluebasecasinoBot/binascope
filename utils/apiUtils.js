import { __p, __SYD, __v, SYD_VAR } from "../sydneyDom_v3.js";
import { trimVal, updateState, updateState__, updateState__bulk } from "./stateAssets.js";

export const daysMapping = {"1H":"1","1D":"1","1W":"7","1M":"30","3M":"90","ALL":"max"};
export const intervalMapping = {"1H":"hourly","1D":"","1W":"","1M":"","3M":"","ALL":""};

const valueMap = {"1":"K","2":"M","3":"B","4":"T"}

export const numberToken = (price) =>{
    let aux = `${price}`.split(".")[1]?`${price}`.split(".")[1]:""
    let stringVal = `${price}`.split(".")[0].split("").reverse().join("");
    const fixedInterval = 3;
    let count = 0;
    const token = new Array();
    for(let i = 0; i < stringVal.length; i++)
    {
        count ++;
        token.push(stringVal[i])
        if(count === fixedInterval)
        {
            count = 0;
            if(i !== stringVal.length-1)token.push(",")
        }
    }
    return token.reverse().join("")+`.${aux}`
}

export const numberToken_minify = (price) =>{
    let stringVal = `${price}`.split(".")[0].split("").reverse().join("");
    const fixedInterval = 3;
    let count = 0;
    let valueCheck = 0;
    const token = new Array();
    for(let i = 0; i < stringVal.length; i++)
    {
        count ++;
        token.push(stringVal[i])
        if(count === fixedInterval)
        {
            count = 0;
            if(i !== stringVal.length-1)
            {
                token.push(",");
                valueCheck++;
            }
        }
    }
    const lastValue = token.reverse().join("").split(",")[0];

    return `${lastValue}${valueMap[`${valueCheck}`]}`
}

export const fetchToken_api__get = async ({url}) =>{
    let data = null;
    try{
        const response = await fetch(url);

        if(response.status === 200)
        {
            data = await response.json();
        }else {
            throw new Error(`fetch Failed, server responded with status: ${response.status}` )
        }
        

    }catch(err)
    {
        console.error("Error fetching data", err);
        //alert("an error occured while fetching token")
    }
    return data;
}

export const fetchTokenPlatform = async() =>{
    const data = await fetchToken_api__get({url:SYD_VAR.fetchCGecko_platform.get()});

    if(data !== null)
    {
        const shortTermList = SYD_VAR.cGecko_shortTerms.get();
        let refined = data.filter(platform =>{
            for(let i = 0; i < shortTermList.length; i++)
            {
                if(platform.id.toLowerCase().includes(shortTermList[i].toLowerCase()))
                {
                    return platform.id;
                }
            }
        }).map(val =>val.id);

        SYD_VAR.cGeckoPlatforms.update({branch:"inspectToken_I" , value:refined});
    }else
    {
        setTimeout(() => {
            fetchTokenPlatform();
        }, 5000);
    }
}

export const fetchTokenID = async(platform , ca)=>{
    console.log(platform , ca)
    const data = await fetchToken_api__get({url:`https://api.coingecko.com/api/v3/coins/${platform}/contract/${ca}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`});
    if(data!==null && Object.keys(data).length>0)
    {
        return data.id
    }
}

export const fetchToken_api__post = async({url,body}) =>{
    let data = null;
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        
        if(response.status === 200)
        {
            data = await response.json();
        }else {
            throw new Error(`fetch Failed, server responded with status: ${response.status}` )
        }
    }catch(err)
    {
        console.error("Error fetching data", err);
    }
    return data;
}

export const fetchTokens_trending = async () =>{
    const data = await fetchToken_api__get({url:`https://serverproxy6.fly.dev/tokens?type=trend`});
    console.log(data)

    if(data !== null)
    {
        const trendingTokens = data.data.coins.map(c => {
            return {
                name:`${c.item.name}`,
                logoUrl:`${c.item.thumb}`,
                ca:"",
                chainId:"",
                mc:c.item.data.market_cap,
                price:{usdVal:trimVal(c.item.data.price.toFixed(8),false,8) , increment:c.item.data.price_change_percentage_24h.usd},
                tokenId:`${c.item.id}`,
                symbol:`${c.item.symbol}`
            }
        });
        updateState__({name:"trend" , prop:["tokenDisplay" , "tokens"] , value:trendingTokens});

        updateState__({name:"trend" , prop:["tokenDisplay" , "show"] , value:true});
    }else{
        __p(["notification","show"])({title:"Rate exceeded (Trending)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
    }
}

export const fetchTokens_page_mc_volume_price = async({type = "mc"} = {}) =>{
    const data = await fetchToken_api__get({url:`https://serverproxy6.fly.dev/tokens?type=${type}`});

    if(data !== null)
    {
        if(type === "price")
        {
            data.data.sort((a,b) =>b.current_price - a.current_price);
        }

        const marketCapTokens = data.data.map(c =>{
            return {
                name:`${c.name}`,
                logoUrl:`${c.image}`,
                ca:``,
                chainId:``,
                mc:`${numberToken(c.market_cap)}`,//apply value tokenization here,
                price:{usdVal:trimVal(c.current_price.toFixed(8),false,8) , increment:c.price_change_percentage_24h},
                tokenId:c.id
            }
        })
        
        updateState__({name:"trend" , prop:["tokenDisplay" , "tokens"] , value:marketCapTokens});

        updateState__({name:"trend" , prop:["tokenDisplay" , "show"] , value:true});
    }else
    {
        __p(["notification","show"])({title:"Rate exceeded (Trending)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
    }
}

export const fetchPerTokenGraph = async ({tokenId , day , interval}) =>{
    const reqUrl = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${day}${interval.length>0?`&interval=${interval}`:""}`;
    const data = await fetchToken_api__get({url:reqUrl});

    if(data)
    {
        if(Object.keys(data).length > 0)
        {
            Object.keys(data).forEach(key =>{
                const newparse = new Array();
                data[key].forEach((g_data,x) =>{
                    newparse.push(data[key][x][1]);
                })
                data[key] = newparse;
            })
            updateState({name:"insight",prop:"graphData",value:data});

            __v["token"].parentElement.scrollLeft = __v["token"].offsetLeft;
            updateState__bulk({name:"topNav",task:s=>{
                s.hLeft = `${__v["token"].offsetLeft}px`;
                s.hWidth = `${__v["token"].offsetWidth}px`;
                s.hTop = `${__v["token"].offsetTop}px`;
                s.hHeight = `${__v["token"].offsetHeight}px`;
                s.navOption = "token";
                return s;
            }});

            const DOMS = __p(["topNav","swtch"]);
            if(Object.keys(DOMS).includes("token"))
            {
                for(let i = 0; i < Object.keys(DOMS).length; i++)
                {
                    if(Object.keys(DOMS)[i] === "token")
                    {
                        updateState({name:DOMS[Object.keys(DOMS)[i]],prop:"display",value:true})
                    }else
                    {
                        updateState({name:DOMS[Object.keys(DOMS)[i]],prop:"display",value:false})
                    }
                }
            }
            updateState({name:"graph_I",prop:"data",value:data[__p(["insight","graphType"])]});
            __p(["graph_I","draw"])()
        }
    }else
    {
        // updateState({name:"selectToken_swap_confirm_page" , prop:"retryOnce",value:true});
        // const timer = setTimeout(() => {
        //     if(__p(["selectToken_swap_confirm_page" , "verifying"]))
        //     {
        //         clearTimeout(timer);
        //         fetchPerTokenInfo({tokenId});
        //     }
        // }, 5000);
        __p(["notification","show"])({title:"Data fetch Error (Token graph)",msg:"Failed to fetch graph analysis, ensure correct token network or try again in a few seconds",mode:"err"});
    }
}

export const fetchPerTokenInfo = async ({tokenId}) =>{
    updateState({name:"inspectToken_I",prop:"mainDisplay",value:false});

    const reqUrl = `https://api.coingecko.com/api/v3/coins/${tokenId}`;
    const data = await fetchToken_api__get({url:reqUrl});

    if(data)
    {
        if(Object.keys(data).length > 0)
        {
            const tokenData = {
                name:data.name,
                symbol:data.symbol,
                usdPrice:data.market_data.current_price.usd,
                priceChange:{usd:data.market_data.price_change_24h_in_currency.usd,percentage:data.market_data.price_change_percentage_24h_in_currency.usd},
                network:Object.keys(data.platforms),
                mint:data.contract_address,
                market_cap:numberToken(data.market_data.market_cap.usd.toFixed(2)),
                total_supply:numberToken(data.market_data.total_supply.toFixed(2)),
                volume:numberToken(data.market_data.total_volume.usd.toFixed(2)),
                links:data.links.homepage
            }
            updateState({name:"graph_I",prop:"graphClr",value:tokenData.priceChange.usd<0?SYD_VAR.err.get():SYD_VAR.success.get()})

            updateState({name:"insight",prop:"infoData",value:tokenData});

            __p(["graph_I","draw"])();
        }
    }else
    {
        // updateState({name:"selectToken_swap_confirm_page" , prop:"retryOnce",value:true});
        // const timer = setTimeout(() => {
        //     if(__p(["selectToken_swap_confirm_page" , "verifying"]))
        //     {
        //         clearTimeout(timer);
        //         fetchPerTokenInfo({tokenId});
        //     }
        // }, 5000);
        __p(["notification","show"])({title:"Rate exceeded (Token info)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
        console.log("failed to fetch token , retrying")
    }
}

export const fetchPerToken_ca_chain = async (platform , ca) =>{
    const reqUrl = `https://api.coingecko.com/api/v3/coins/${platform}/contract/${ca}`;
    const data = await fetchToken_api__get({url:reqUrl});

    if(data)
    {
        if(Object.keys(data).length > 0)
        {
            const tokenData = {
                name:data.name,
                symbol:data.symbol,
                usdPrice:data.market_data.current_price.usd,
                priceChange:{usd:data.market_data.price_change_24h_in_currency.usd,percentage:data.market_data.price_change_percentage_24h_in_currency.usd},
                network:Object.keys(data.platforms),
                mint:data.contract_address,
                market_cap:numberToken(data.market_data.market_cap.usd.toFixed(2)),
                total_supply:numberToken(data.market_data.total_supply.toFixed(2)),
                volume:numberToken(data.market_data.total_volume.usd.toFixed(2)),
                links:data.links.homepage
            }
            updateState({name:"graph_I",prop:"graphClr",value:tokenData.priceChange.usd<0?SYD_VAR.err.get():SYD_VAR.success.get()})

            updateState({name:"insight",prop:"infoData",value:tokenData});

            __p(["graph_I","draw"])();
            return data.id
        }else return null;
    }else {
        __p(["notification","show"])({title:"Rate exceeded (Token info)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"});
        return null
    };
}

export const fetchAccessToken = async function()
{
    const authToken = await fetchToken_api__get({url:SYD_VAR.accessTokenUrl.get()});

    if(authToken !== null)
    {
        if(authToken.type === "jwtToken")updateState({name:"subContainer",prop:"accessToken",value:authToken.JWT});
    }else{
        setTimeout(() => {
            console.log("retrying auth token fetch");
            __p(["notification","show"])({title:"Access token error❗",msg:"retrying auth token fetch",mode:"err"})
            fetchAccessToken();
        }, 2000);
    }
}

export const fetchWalletDetails = async function(initiator)
{
    const accessToken = __p(["subContainer","accessToken"],"");
    if(accessToken.length > 0)
    {
        const body = {
            token:accessToken,
            adx:__p(["walletDashboard","adx"]),
            chain:__p([initiator,"chain"],""),
            type:__p([initiator,"tokenType"],"")
        }
        const walletDetails = await fetchToken_api__post({url:SYD_VAR.walletInfoUrl.get() , body});

        if(walletDetails !== null && Object.keys(walletDetails.data).length>0)
        {
            updateState__bulk({name:"walletDashboard",task:s=>{
                s.nativeBal = Number(walletDetails.data.native.balance)/10**18;
                s.ticker = (()=>{
                    const data = SYD_VAR.moralise_gecko_match.get();
                    let value;
                    for(let i = 0; i < data.length; i++)
                    {
                        if(data[i].moralis.toLowerCase() === body.chain.toLowerCase())
                        {
                            value = data[i].ticker;
                            break;
                        }   
                    }
                    return value;
                })();
                s.assets = [];
                walletDetails.data.tokens.forEach(asset=>{
                    s.assets.push(
                        {
                            name:asset.name,
                            symbol:asset.symbol,
                            chain:asset.chain,
                            holdings_native:`${asset.balance}`,
                            ca:asset.token_address,
                            chain:asset.chain
                        }
                    )
                })
                return s;
            }})
            updateState__bulk({name:"walletAnalytics",task:s=>{
                s.nativeBal = Number(walletDetails.data.native.balance)/10**18;
                s.ticker = (()=>{
                    const data = SYD_VAR.moralise_gecko_match.get();
                    let value;
                    for(let i = 0; i < data.length; i++)
                    {
                        if(data[i].moralis.toLowerCase() === body.chain.toLowerCase())
                        {
                            value = data[i].ticker;
                            break;
                        }   
                    }
                    return value;
                })();
                s.assets = [];
                walletDetails.data.tokens.forEach(asset=>{
                    s.assets.push(
                        {
                            name:asset.name,
                            symbol:asset.symbol,
                            chain:asset.chain,
                            holdings_native:`${asset.balance} ${asset.symbol}`,
                            ca:asset.token_address,
                            chain:asset.chain
                        }
                    )
                })
                return s;
            }})
        }else {
            //Rate limit issue
            __p(["notification","show"])({title:"Rate exceeded (Wallet details)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
        }
    }else {
        console.log("no access token found, please reload page");
        __p(["notification","show"])({title:"Access token error",msg:"access token not found, please re-load",mode:"err"})
    }
}

export const fetchWalletTxn = async function(initiator = "addWalletPage")
{
    const accessToken = __p(["subContainer","accessToken"],"");
    if(accessToken.length > 0)
    {
        const body = {
            token:accessToken,
            adx:__p(["walletAnalytics","adx"]),
            chain:__p([initiator,"chain"],""),
            type:__p([initiator,"tokenType"],"")
        }
        const walletHistory = await fetchToken_api__post({url:SYD_VAR.walletTxnHistory.get() , body});

        if(walletHistory !== null && Object.keys(walletHistory.data).length>0)
        {
            const graphData = [];
            updateState({name:"walletAnalytics",prop:"tx_history",value:[]});
            updateState__bulk({name:"walletAnalytics",task:s=>{
                walletHistory.data.forEach(txn=>{
                    s.tx_history.push(
                        {
                            txHash:txn.block_hash,
                            amount:`${txn.value}`,
                            to:txn.to_address,
                            from:body.adx,
                            blockNo:txn.block_number,
                            gasPrice:txn.gas_price,
                            status:(()=>{
                                if(txn.receipt_status)
                                {
                                    return txn.receipt_status === "1"?"success":"failed"
                                }else return "pending"
                            })()
                        }
                    )
                    
                    //update graph based on current grpah mode
                    switch(__p(["more_A","mode"]).toLowerCase().split(" ").join(""))
                    {
                        case "transactionfee":
                            graphData.push(Number(txn.gas_price)/10**18);
                        break;
                        case "credits(inflow)":
                            if(txn.to_address.toLowerCase() === __p(["walletAnalytics","adx"]).toLowerCase()) graphData.push(Number(txn.value));
                        break;
                        case "debits(outflow)":
                            if(txn.to_address.toLowerCase() !== __p(["walletAnalytics","adx"]).toLowerCase()) graphData.push(Number(txn.value));
                    }
                })
                return s;
            }});

            updateState__bulk({name:"wallet_A_G",task:s=>{
                s.data = graphData;
                return s;
            }});
            __p(["wallet_A_G","draw"])()
        }else {
            //Rate limit issue
            __p(["notification","show"])({title:"Rate exceeded (Wallet txn)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
        }
    }else {
        console.log("no access token found, please reload page");
        __p(["notification","show"])({title:"Access token error",msg:"access token not found, please re-load",mode:"err"})
    }
}

export const fetchContractDetails_info = async(adx , network)=>{
    const accessToken = __p(["subContainer","accessToken"],"");
    if(accessToken.length>0)
    {
        const data = await fetchToken_api__post({url:SYD_VAR.scanContract_basicInfo.get() , body:{adx,network,token:accessToken,request:"sourceCode"}});

        if(data !== null)
        {
            const refineddata = data.data.data[0].data[0];
            const info = [];
            //basic info data
            info.push(__SYD.display_I_EL({title:"contract name" , value:refineddata.ContractName}));
            info.push(__SYD.display_I_EL({title:"contract Adx" , value:adx , isCopy:true}));
            info.push(__SYD.display_I_EL({title:"Verification" , value:refineddata.ABI.toLowerCase()==="contract source code not verified"?"unverfied❌":"verified✅",clr:SYD_VAR.success.get()}))
            info.push(__SYD.display_I_EL({title:"compiler version" , value:refineddata.CompilerVersion}));
            info.push(__SYD.display_I_EL({title:"compiler type" , value:refineddata.CompilerType}));
            info.push(__SYD.display_I_EL({title:"EVM version" , value:refineddata.EVMVersion}));
            info.push(__SYD.display_I_EL({title:"Implementation" , value:refineddata.Implementation , isCopy:true}));
            info.push(__SYD.display_I_EL({title:"Constructor Arguments" , value:refineddata.ConstructorArguments , isCopy:true}));
            info.push(__SYD.display_I_EL({title:"runs" , value:refineddata.Runs}));
            //basic info data

            //sourceCode
            let srcCode = "";
            srcCode = [__SYD.viewer_C(refineddata.SourceCode)]
            //sourceCode

            //ABI
            let abi = "";
            abi = [__SYD.viewer_C(refineddata.ABI)]

            //ABI

            //contract Functions
            //decode abi and extract functions here
            let fncs = [];
            JSON.parse(refineddata.ABI).forEach(pack =>{
                fncs.push(__SYD.display_I_EL({title:pack.name , value:pack.type}))
            })
            //contract Functions

            updateState__bulk({name:"contract",task:(s)=>{
                s.data = {evm:{info:[],code:"",creator:[],abi:[],ctrctFunc:[],bal:[]}};//clear previous data
                s.data.evm.info = info;
                s.data.evm.code = srcCode;
                s.data.evm.abi = abi;
                s.data.evm.ctrctFunc = fncs
                return s;
            }});

            updateState({name:"displayPage_C",prop:"displayTags",value:()=>{return info}});

            __p(["notification","show"])({title:"Contract scan",msg:"contract scanned successfully",mode:"success"})
        }else {
            console.log("Error occured in contract fetch");
            __p(["notification","show"])({title:"Rate exceeded (Contract info)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
        }
    }else {
        console.log("no access token found, please reload page");
        __p(["notification","show"])({title:"Access token error",msg:"access token not found, please re-load",mode:"err"})
    }
}

export const fetchContractDetails_creator = async(adx , network)=>{
    const accessToken = __p(["subContainer","accessToken"],"");
    if(accessToken.length>0)
    {
        const data = await fetchToken_api__post({url:SYD_VAR.scanContract_basicInfo.get() , body:{adx,network,token:accessToken,request:"contractCreation"}});

        if(data.data.data !== null)
        {
            console.log(data)
            const refineddata = data.data.data[0].data[0];
            const creator = [];

            //creator info
            creator.push(__SYD.display_I_EL({title:"contract creator" , value:refineddata.contractCreator , isCopy:true}));
            creator.push(__SYD.display_I_EL({title:"contract address" , value:refineddata.contractAddress , isCopy:true}));
            creator.push(__SYD.display_I_EL({title:"contract factory" , value:refineddata.contractFactory}));
            creator.push(__SYD.display_I_EL({title:"creation bytecode" , value:refineddata.creationBytecode , isCopy:true}));
            creator.push(__SYD.display_I_EL({title:"txn hash" , value:refineddata.txHash , isCopy:true}));
            //creator info

            updateState__bulk({name:"contract",task:(s)=>{
                s.data.evm.creator = creator
                return s;
            }});

            updateState__bulk({name:"displayPage_C",task:s=>{
                s.displayTags = ()=>{return creator};
                s.translate = true;
                return s;
            }})
        }else {
            console.log("Error occured in contract fetch");
            __p(["notification","show"])({title:"Rate exceeded (Contract creator)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
        }
    }else {
        console.log("no access token found, please reload page");
        __p(["notification","show"])({title:"Access token error",msg:"access token not found, please re-load",mode:"err"})
    }
}

export const fetchContractDetails_balance = async(adx , network)=>{
    const accessToken = __p(["subContainer","accessToken"],"");
    if(accessToken.length>0)
    {
        const data = await fetchToken_api__post({url:SYD_VAR.scanContract_basicInfo.get() , body:{adx,network,token:accessToken,request:"nativeBal"}});

        if(data !== null)
        {
            const refineddata = data.data.data[0].data;
            const balance = [];

            balance.push(__SYD.display_I_EL({title:"contract balance" , value:`${Number(BigInt(refineddata))/1e18}` , isCopy:false}));
            

            updateState__bulk({name:"contract",task:(s)=>{
                s.data.evm.bal = balance
                return s;
            }});

            updateState__bulk({name:"displayPage_C",task:s=>{
                s.displayTags = ()=>{return balance};
                s.translate = true;
                return s;
            }})
        }else {
            console.log("Error occured in contract fetch");
            __p(["notification","show"])({title:"Rate exceeded (Contract balance)",msg:"Rate limit exceeded, try again in a few seconds",mode:"err"})
        }
    }else {
        console.log("no access token found, please reload page");
        __p(["notification","show"])({title:"Access token error",msg:"access token not found, please re-load",mode:"err"})
    }
}


//cgecko live dashboard
export const liveTrends = async function ()
{
    // const data = await fetchToken_api__get({url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${__p(["live","currentPage"],1)}&sparkline=false`});

    // console.log(data)

    // if(data!==null){
    //     return data;
    // }else
    // {
    //     console.log("error occured while fetching live trends");
    //     __p(["notification","show"])({title:"Live trends error",msg:"error occured while fetching live trends",mode:"err"})

    //     return null;
    // }

    const mapping = {
        "https://serverproxy1-misty-mountain-6921.fly.dev/":[1 , 2],
        "https://serverproxy2.fly.dev/":[3 , 4],
        "https://serverproxy3.fly.dev/":[5 , 6],
        "https://serverproxy4.fly.dev/":[7 , 8],
        "https://serverproxy5.fly.dev/":[9 , 10]
    }

    let server = "";

    for(let i = 0; i < Object.keys(mapping).length; i++)
    {
        if(mapping[Object.keys(mapping)[i]].includes(Number(__p(["live","currentPage"],1))))
        {
            server = Object.keys(mapping)[i];
            break;
        }
    }

    const data = await fetchToken_api__get({url:`${server}tokens?page=${__p(["live","currentPage"],1)}`});

    if(data!==null){
        console.log("returning data")
        return data.data;
    }else
    {
        console.log("error occured while fetching live trends");
        __p(["notification","show"])({title:"Live trends error",msg:"error occured while fetching live trends",mode:"err"})

        return null;
    }

}