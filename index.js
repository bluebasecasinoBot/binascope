import { $, __m, __p, __sC, __SYD, __v, manage_mediaQuery, mediaFunction, SYD_VAR } from "./sydneyDom_v3.js";
import "./styles/styleComponents.js"
import "./styles/main.js"
import "./styles/walletStyle.js"
import "./styles/contract.js"
import "./styles/xCodeBase.js"
import "./variables.js"
//navs
import "./nav/topNav.js"
import "./nav/sideNav.js"

//Ai page
import "./ai/ai.js"

//graps
import "./utils/graph.js"

//aux
import "./utils/addWallet.js"


//wallet dashboard
import "./wallet/dashboard.js"
//wallet analytics
import "./wallet/analytics.js"
//contract scanner
import "./scanner/contract.js"
//token pages
import "./token/insight.js"
import "./token/trend.js"
import "./token/live.js"
//Feedback
import "./feedback.js"
//APIs
import { fetchAccessToken, fetchTokenPlatform, fetchTokens_trending, fetchWalletDetails, fetchWalletTxn, liveTrends } from "./utils/apiUtils.js";
import "./utils/api.js"

import { checkAdxAvailable, updateState, updateState__bulk } from "./utils/stateAssets.js";

__SYD.container = function()
{
    return $(
        "div",
        {
            style:__sC["container"]({method:"add",style:{backgroundColor:SYD_VAR.container_bg.get()}})
        },
        [
            __SYD.subContainer()
        ]
    )
}

__SYD.subContainer = function()
{
    return $(
        "section",
        {
            style:__sC["subContainer"]() + __sC["br-1"]() + __sC["thinBorder"]() + __sC["row-start"]()
        },
        [
            __SYD.topNav(),
            __SYD.sideNav(),
            __SYD.walletDashboard(),
            __SYD.walletAnalytics(),
            __SYD.contract(),
            __SYD.live(),
            __SYD.insight(),
            __SYD.trend(),
            __SYD.notification(),
            __SYD.feedback(),
            __SYD.binascopeAi_page(),
            $(
                "p",
                {style:`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-family:h-txt;position:fixed;bottom:10px;left:10px;z-index:12000;font-weight:700;pointer-events:none;`},
                ["Powered by sydney.js"]
            )

        ],
        {
            createState:{
                stateName:"subContainer",
                state:{
                    fontTitle:"22px",
                    fontHeader:"13px",
                    fontSmall:"11px",
                    fontNormHeader:"18px",
                    fontBigTitle:"30px",
                    accessToken:""
                }
            }
        }
    )
}

__m(__SYD.container(),async()=>{
    manage_mediaQuery(window.innerWidth);
    checkAdxAvailable();
    updateState({name:"sideNav",prop:"shift",value:true}) //close side bar on load
    mediaFunction.push(()=>{__p(["wallet_A_G","draw"])()});
    mediaFunction.push(()=>{__p(["graph_I","draw"])();});

    __p(["live","timely"])()

    await fetchAccessToken();
    await fetchTokenPlatform();
})