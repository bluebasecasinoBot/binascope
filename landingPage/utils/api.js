import { updateState } from "../stateAssets.js";
import { __p, SYD_VAR } from "../sydneyDom_v3.js";

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

export const fetchTokens = async function ()
{
    const data = await fetchToken_api__get({url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`});

    if(data!==null){
        updateState({name:"page2",prop:"data",value:data.slice(0,3)});
        //get the popular tokens for each network;
        const tokenList = __p(["container","tokenList"],[]);
        const popularTokens = [];
        tokenList.forEach(parcel =>{
            const networkData = {network:parcel.network , list:[]}
            parcel.list.forEach(val =>{
                if(data.some(coin => coin.name.toLowerCase() === val.generic.toLowerCase()))
                {
                    for(let i = 0; i < data.length; i++)
                    {
                        if(data[i].name.toLowerCase() === val.generic.toLowerCase()) {
                            const logo = SYD_VAR.cahcedIcons.get()[data[i].id];
                            networkData.list.push(
                                {name:data[i].name , symbol:data[i].symbol , ca:val.ca , id:data[i].id , logo:logo === undefined?"":logo}
                            );
                            break;
                        }
                    }
                }
            });
            popularTokens.push(networkData);
        });
        updateState({name:"select_cont",prop:"popularTokens",value:popularTokens});

        getTokenLogo(popularTokens)
    }else
    {
        console.log("error occured while fetching live trends");

        return null;
    }

}

export const swapList = async function()
{
    const data = await fetchToken_api__get({url:SYD_VAR.swapList.get()});

    if(data !== null)
    {
        updateState({name:"container",prop:"tokenList",value:data});
        updateState({name:"select_cont",prop:"net",value:0});
    }else console.log("failed to fetch swap tokens");
}

export const getTokenLogo = async function(popularToken)
{
    const cahced = SYD_VAR.cahcedIcons.get();
    let iDs = [];
    for(let i = 0; i < popularToken.length; i++)
    {
        for(let j = 0; j < popularToken[i].list.length; j++)
        {
            if(Object.keys(cahced).every(tokenId => tokenId !== popularToken[i].list[j].id) && !iDs.includes(popularToken[i].list[j].id))
            {
                iDs.push(popularToken[i].list[j].id)
            }
        }
    }

    if(iDs.length > 0)
    {
        const data = await fetchToken_api__get({url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${iDs.join(",")}`});
        const remapData = data.map(val => {
            cahced[val.id] = val.image;
            return {id:val.id , logo:val.image
        }});

        // console.log("logo fetched");

        //update popularTokens logo
        popularToken.forEach((network_data,i) =>{
            network_data.list.forEach((token,j) =>{
                for(let n = 0; n < remapData.length; n++)
                {
                    if(remapData[n].id === token.id){
                        popularToken[i].list[j].logo = remapData[n].logo;
                        break;
                    }
                }
            })
        })

        // console.log(remapData , popularToken)

        updateState({name:"select_cont",prop:"popularTokens",value:popularToken});
        //update popularTokens logo

        //update cached data
        SYD_VAR.cahcedIcons.change(cahced)
        //update cached data

        //after fetching logos, we add the token name to list of cached token logos
    }   
}