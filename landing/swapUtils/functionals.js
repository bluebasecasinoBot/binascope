import { updateState, updateState__, updateState__bulk } from "./state_check.js";
import { __g, __p, __u, __v, SYD_VAR } from "../sydneyDom_v3.js";

export const partWalletAdx = (text) =>{
    if(text.length > 6) return `${text.slice(0 , 6)}.......${text.slice(text.length - 6 , text.length)}`;
    else return text
}

export const __bal = (bal , max = 7) =>{
    let getLength = `${bal}`.length < 2 ? 2 : `${bal}`.length;
    getLength = getLength > max ? max : getLength

    return Number(bal).toFixed(getLength)
}

export const username__check = (text) =>{
    return text.length > 5 ? true : false
}

export const email__check = (email) =>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const password__check = (password) =>{
    return /^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
}

export const swapToken = async() =>{
    try
    {
        const accessToken = __p(["container" , "user" , "accessToken"]);
        const password = __p(["container" , "user" , "profile" , "password"]);
        const extractData = __p(["swapToken_main_swap_el_main_el2"]);
        const txnData = {
            fromCa:extractData.swap1.utils.ca,
            fromChain:extractData.swap1.utils.chainName,
            toCa:extractData.swap2.utils.ca,
            toChain:extractData.swap2.utils.chainName,
            nativeAmount:Number(__p(["swapToken_main"]).swap1.inputValue),
            type:Object.keys(__p(["container" , "user" , "tokenBal_info"])).filter(type=>__p(["container" , "user" , "tokenBal_info"])[type].ca === extractData.swap1.utils.ca)[0]
        };

        const swapRes = await fetch(SYD_VAR.initiateSwap.get(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken,
                password,
                txnData
            })
        });

        const swapData = await swapRes.json();

        console.log(swapData , " main message")

        updateState({name:"swapToken_main" , prop:"swapNetworkTransit" , value:false});
        updateState({name:"messagePopUp__main",prop:"isError",value:!(swapData.msg.processing && swapData.msg.txnSuccess)})
        

        if(swapRes.status === 200)
        {
            let msg = `${swapData.msg.txnMsg}`
            if(swapData.msg.processing && swapData.msg.txnSuccess)
            {
                msg = `${msg}\nTransaction Hash: ${swapData.msg.txHash}`
            }
            updateState({name:"messagePopUp__main",prop:"msg",value:msg})
            
        }else 
        {
            const msgContent = `server responded with code ${swapRes.status}\n${swapData.msg.txnMsg}`;
            updateState({name:"messagePopUp__main",prop:"msg",value:msgContent})
        }
        updateState({name:"container" , prop:"renderpopUpPage" , value:true})

    }catch(err)
    {
        const msgContent = err.message;

        updateState({name:"messagePopUp__main",prop:"msg",value:msgContent});
        updateState({name:"container" , prop:"renderpopUpPage" , value:true});
    }
}

export const fetchWalletBal = async () =>{
    const password = __p(["container" , "user" , "profile" , "password"]);
    const accessToken = __p(["container" , "user" , "accessToken"]);

    console.log("checking balance with balance api")

    try
    {
        const balRes = await fetch(SYD_VAR.getWalletBal_api.get(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken,
                password
            })
        });

        const balData = await balRes.json();

        if(balRes.status === 200)
        {
            console.log(balData.msg.tokenBal_info);

            updateState__({name:"container" , prop:["user" , "tokenBal_info"] , value:balData.msg.tokenBal_info})

            updateState({name:"container" , prop:"renderInitBal" , value:true});

            const timer = setTimeout(async() => {
                await fetchWalletBal();
                clearTimeout(timer)
            }, 1000 * (60*3));
        }
        else
        {
            const timer = setTimeout(async() => {
                await fetchWalletBal();
                clearTimeout(timer)
            }, 1000 * (60*3));
        }
    }catch(err)
    {
        console.log("initiating bal fetch retry");
        const timer = setTimeout(async() => {
                await fetchWalletBal();
                clearTimeout(timer)
            }, 1000 * (60*3));
    }
}


export const sendTokenReq = async() =>{
    try{
        //accessToken , password , walletType , recipientAdx , tokenAmount , tokenAmountMode
        const accessToken = __p(["container" , "user" , "accessToken"]);
        const password = __p(["container" , "user" , "profile" , "password"]);
        const walletType = __p(["container" , "currentToken"],"eth");
        const tokenAmount = `${__v["sendTokenPage__inputSec__tokenAmount__el"].value}`;
        const recipientAdx = `${__v["sendTokenPage__inputSec__walletAdx"].value.split(" ").join("")}`;
        const tokenAmountMode = __p(["sendTokenPage" , "tokenMode"],true) ? walletType : "usd";

        updateState({name:"sendTokenPage" , prop:"networkTransit" , value:true});
        const sendTokenRes = await fetch(SYD_VAR.sendToken_api.get(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken,
                password,
                walletType,
                tokenAmount,
                tokenAmountMode,
                recipientAdx
            })
        });

        const sendTokenData = await sendTokenRes.json();
        updateState({name:"sendTokenPage" , prop:"networkTransit" , value:false});

        console.log(sendTokenData , " main message")

        const boolvalue = !(sendTokenData.msg.processing && sendTokenData.msg.txnSuccess);
        let msg = "";
        // updateState({name:"messagePopUp__main",prop:"isError",value:})

        if(sendTokenRes.status === 200)
        {
            msg = `${sendTokenData.msg.txnMsg}`
            if(sendTokenData.msg.processing && sendTokenData.msg.txnSuccess)
            {
                msg = `${msg}\nTransaction Hash: ${sendTokenData.msg.txHash}`
            }
            // updateState({name:"messagePopUp__main",prop:"msg",value:msg})
            
        }else 
        {
            msg = `server responded with code ${sendTokenRes.status}\n${sendTokenData.msg.txnMsg}`;
            // updateState({name:"messagePopUp__main",prop:"msg",value:msgContent})
        }
        updateState({name:"container" , prop:"renderpopUpPage" , value:true})

        updateState__bulk({name:"messagePopUp__main",task:s=>{
            s.isError = boolvalue;
            s.msg = msg;
            return s;
        }});
    }catch(err)
    {
        console.log(err)
        const msgContent = `Transaction Failed \n ${err.message}`;

        updateState__bulk({name:"messagePopUp__main",task:s=>{
            s.msg = msgContent;
            s.isError = true;
            return s;
        }});
        updateState({name:"container" , prop:"renderpopUpPage" , value:true});
    }

}

export const gasFeeRequest = async() =>{
    const feeReq = await fetch(`${SYD_VAR.getGasFee_api.get()}?tokenType=${__p(["container" , "currentToken"],"eth")}`);

    const feeReqData = await feeReq.json();

    if(feeReq.status === 200)
    {
        console.log(feeReqData)
        updateState__({name:"container" , prop:["currentGas" , "gasFee"] , value:feeReqData.msg})
    }else {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            gasFeeRequest()
        }, 2000);
        console.log("requerying gas estimate");

    }
}

export const numberToken = (price) =>{
    let stringVal = `${price}`.split("").reverse().join("");
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
    return token.reverse().join("")
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
        // console.error("Error fetching data", err);
        //alert("an error occured while fetching token")
    }
    return data;
}

export const fetchTokens_trending = async () =>{
    const data = await fetchToken_api__get({url:SYD_VAR.fetch_token_rank_trending.get()});
    const platforms = SYD_VAR.list_popular_network.get();

    if(data !== null)
    {
            const trendingTokens = data.coins.map(c => {
            let platform = "";
            for(const keys of Object.keys(platforms))
            {
                const bool = platforms[keys].data.some(token => token.generic === c.item.id);
                if(bool){
                    platform = keys;
                    // console.log(platforms[keys].data.filter(token =>token.generic === val.item.id))
                    break;
                }
            }

            return {
                name:`${c.item.name}`,
                logoUrl:`${c.item.thumb}`,
                ca:"",
                chainId:"",
                mc:c.item.data.market_cap,
                price:{usdVal:c.item.data.price , increment:c.item.data.price_change_percentage_24h.usd},
                tokenId:`${c.item.id}`,
                platform,
                platformLogo:`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${platform}/info/logo.png`
            }
        });

        updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "tokens"] , value:trendingTokens});

        updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "show"] , value:true});
    }
}

export const fetchTokens_page_mc_volume_price = async({type = "mc"} = {}) =>{
    const data = await fetchToken_api__get({url:SYD_VAR.fetch_token_rank_byPage.get()[`${type}`]});
    const platforms = SYD_VAR.list_popular_network.get();

    if(data !== null)
    {
        if(type === "price")
        {
            data.sort((a,b) =>b.current_price - a.current_price);
        }

        const marketCapTokens = data.map(c =>{
            let platform = "";
            for(const keys of Object.keys(platforms))
            {
                const bool = platforms[keys].data.some(token => token.generic === c.id);
                if(bool){
                    platform = keys;
                    // console.log(platforms[keys].data.filter(token =>token.generic === val.item.id))
                    break;
                }
            }

            return {
                name:`${c.name}`,
                logoUrl:`${c.image}`,
                ca:``,
                chainId:``,
                mc:`${numberToken(c.market_cap)}`,//apply value tokenization here,
                price:{usdVal:c.current_price , increment:c.price_change_percentage_24h},
                tokenId:c.id,
                platform,
                platformLogo:`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${platform}/info/logo.png`
            }
        })
        
        updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "tokens"] , value:marketCapTokens});

        updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "show"] , value:true});
    }
}

export const fetchAllTokensList = async () =>{
    const data = await fetchToken_api__get({url:SYD_VAR.fetch_token_main_list.get()});

    if(data !== null)
    {
        SYD_VAR.list_popular_network.change(data);
    }
}

export const fetchPopularPlatformTokens = async() =>{
    const data = await fetchToken_api__get({url:SYD_VAR.fetch_token_main_list_popular.get()});

    SYD_VAR.list_popular_network.change(data);
}

export const fetchTokenBasics = async() =>{
    const data = await fetchToken_api__get({url:SYD_VAR.fetch_token_basics_batch.get()});

    console.log(data);
}

export const fetchSquidSwappable = async() =>{
    const data = await fetchToken_api__get({url:SYD_VAR.fetch_squid_swappable.get()});

    if(data)
    {
        console.log(data)
        //update swap object list
        const swappable = Object.keys(data).filter(val =>{return !SYD_VAR.defaultChains.get().includes(val.toLowerCase())});

        SYD_VAR.squidSwappables.change(data);
        updateState({name:"selectToken_swap_display_panel_section_mode_popup" , prop:"chains" , value:swappable})
        updateState({name:"selectToken_swap" , prop:"isReady" , value:true})
        //update swap object list

        // fetch_selective_token_logo();
    }else
    {
        const timer = setTimeout(() => {
            console.log("retrying query")
            clearTimeout(timer);
            fetchSquidSwappable();
        }, 5000);
    }
}

export const fetch_selective_token_logo = async() =>{
    const fetchIdList = new Array();
    const fetchIndexList = new Object();

    const currentTab = __p(["selectToken_swap" , "currentDisplayTab"]);
    const startIndex = __p(["selectToken_swap" , `tab${currentTab}`]);
    const currentChain = __p(["selectToken_swap" , "currentChainName"]);
    const scrollSize = __p(["selectToken_swap" , "scrollY"])

    const tokenList = __p(["selectToken_swap__searchTab" , "search_active"],false) ? __p(["selectToken_swap" , "searchData"],[]) :SYD_VAR.squidSwappables.get()[`${currentChain}`];

    for(let i = startIndex*scrollSize; i < (startIndex+1)*scrollSize; i++)
    {
        if(tokenList[i])
        {
            if(tokenList[i].logo.length === 0)
            {
                if(tokenList[i].tokenId)
                {
                    fetchIdList.push(tokenList[i].tokenId);
                    fetchIndexList[`${tokenList[i].tokenId}`] = i;
                }
            }
        }
    }

    if(fetchIdList.length > 0)
    {
        if(__p(["selectToken_swap__searchTab" , "search_active"],false))
        {
            fetchIdList.forEach(val =>{
                tokenList[fetchIndexList[val]].logo = "";
            });
            updateState({name:"selectToken_swap" , prop:"searchData" , value:tokenList});
        }else{
            const reqUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${fetchIdList.join(",")}`;

            const data = await fetchToken_api__get({url:reqUrl});
            if(data)
            {
                const updatedData = SYD_VAR.squidSwappables.get();

                data.forEach(info =>{
                    updatedData[`${currentChain}`][fetchIndexList[info.id]].logo = info.image;
                })

                SYD_VAR.squidSwappables.update({value:updatedData});

                updateState({name:"selectToken_swap" , prop:"isReady" , value:false})

                updateState({name:"selectToken_swap" , prop:"isReady" , value:true})
            }
        }
    }

}

export const fetchPerTokenInfo = async ({tokenId}) =>{
    const reqUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenId}`;
    const data = await fetchToken_api__get({url:reqUrl});

    if(data)
    {
        if(data.length > 0)
        {
            const token = data[0];
            if(__p(["selectToken_swap_confirm_page" , "verifying"]))
            {
                updateState__bulk({name:"selectToken_swap_confirm_page" , task:s =>{
                    s.token.logo = token.image;
                    s.token.usdPrice = token.current_price;
                    s.token.priceChange = `${token.price_change_24h.toFixed(6)}`;
                    s.token.priceChange_percent = `${token.price_change_percentage_24h.toFixed(6)}`,
                    s.verifying = false;
                    return s;
                }})
            }
        }
    }else
    {
        updateState({name:"selectToken_swap_confirm_page" , prop:"retryOnce",value:true});
        const timer = setTimeout(() => {
            if(__p(["selectToken_swap_confirm_page" , "verifying"]))
            {
                clearTimeout(timer);
                fetchPerTokenInfo({tokenId});
            }
        }, 5000);
    }
}
