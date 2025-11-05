import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";
import { addToken } from "../utils/addWallet.js";
import { daysMapping, fetchPerTokenGraph, intervalMapping, numberToken } from "../utils/apiUtils.js";
import { graph } from "../utils/graph.js";
import { centerVal, trimVal, updateState, updateState__bulk } from "../utils/stateAssets.js";

async function graphOptions_I_select(value)
{
    updateState({name:"graphOptions_I",prop:"current",value});
    const tokenId = __p(["insight","tokenId"]);
    if(tokenId.length > 0)
    {
        await fetchPerTokenGraph({tokenId,day:daysMapping[value],interval:intervalMapping[value]});

        __p(["graph_I","draw"])();
    }
}

function copyAdx(e,value,domOp=true)
{
    navigator.clipboard.writeText(value)
    .then(() => {
        if(domOp)
        {
            e.target.querySelector(".icon").style.backgroundImage = "url(./assets/images/check.svg)";
            let timer = setTimeout(()=>{clearTimeout(timer);e.target.querySelector(".icon").style.backgroundImage = "url(./assets/images/copy.svg)";},2000)
        }
    })
    .catch(err => console.error("Failed to copy", err));
}

function clickMore_el(text)
{
    updateState({name:"more_I",prop:"mode",value:text});

    updateState__bulk({name:"insight",task:s=>{
        s.graphType = text.toLowerCase().split(" ").join("_");
        return s;
    }});
    //update graph data
    updateState({name:"graph_I",prop:"data",value:__p(["insight","graphData",text.toLowerCase().split(" ").join("_")])});
    __p(["graph_I","draw"])();
}

function blurMore()
{
    updateState({name:"more_I",prop:"display",value:false})
}

function clickMore()
{
    updateState({name:"more_I",prop:"display",value:__p(["more_I","display"])?false:true});
}

__SYD.insight = function()
{
    return $(
        "div",
        {style:__sC["dashboard"]()+__sC["col-start"]({method:"add",style:{position:"relative",gap:"35px",display:__p(["insight","display"],false)?"flex":"none",paddingTop:"80px"}})},
        [
            __SYD.title_I(),
            __SYD.price_I(),
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{justifyContent:"space-between",width:"100%"}})},
                [
                    __SYD.more_I(),
                    //Add wallet comp
                    $(
                        "div",
                        {class:"pop-btn",style:__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.themeClr.get(),cursor:"pointer"}})},
                        [
                            $("span",{style:`background-image:url(./assets/images/${"folder"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                            $("p",{style:`display:${__p(["walletDashboard","mobile"])?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]({method:"add",style:{fontWeight:"500"}})},["Inspect Token"])
                        ],
                        {events:{onclick:()=>{updateState({name:"inspectToken_I",prop:"mainDisplay",value:true})}}}
                    ),
                    //Add wallet comp
                ]
            ),
            __SYD.inspectToken_I(),
            __SYD.graph_I(),
            __SYD.graphOptions_I(),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"10px",height:"fit-content",width:"100%"}})},
                [
                    $(
                        "div",
                        {style:__sC["row-start"]()},
                        [
                            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["Token Info"]),
                        ]
                    ),
                    __SYD.display_I()
                ]
            ),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"10px",height:"fit-content",width:"100%"}})},
                [
                    $(
                        "div",
                        {style:__sC["row-start"]()},
                        [
                            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["share token"]),
                        ]
                    ),
                    $(
                        "div",
                        {style:__sC["row-start"]({method:"add",style:{gap:"20px"}})},
                        [
                            __SYD.share_I(),
                            __SYD.swap_I()
                        ]
                    )
                ]
            )
        ],
        {
            createState:{
                stateName:"insight",
                state:{display:false,mobile:false,graphData:{},infoData:{},tokenId:"",graphType:"prices"}
            },
            mediaQuery:{query:[{size:"<900px",prop:{mobile:true}}],defState:{mobile:false}}
        }
    )
}

__SYD.inspectToken_I = new addToken("inspectToken_I","insight").template

__SYD.title_I = function()
{
    return $(
        "div",
        {style:__sC["box"]({method:"add",style:{width:"100%"}})+__sC["br-.5"]()+__sC["row-center"]({method:"add",style:{gap:"10px",padding:"0px",cursor:"pointer",position:"sticky",left:"0px",top:"10px",transform:"translateX(0%)",zIndex:"500"}}),class:""},
        [
            $("p",{style:`font-size:${__p(["subContainer","fontTitle"],"22px")};padding:10px;background-color:${SYD_VAR.tab_bg.get()};border-radius:inherit;color:${SYD_VAR.themeClr.get()};`+__sC["h-txt"]()+__sC["thinBorder"]()},[__p(["insight","infoData"],{}).name?__p(["insight","infoData"],{}).name:"----- ------"])
        ]
    )
}

__SYD.price_I = function()
{
    return $(
        "div",
        {style:__sC["col-center"]({method:"add",style:{width:"100%",padding:"10px",gap:"10px"}})},
        [
            $("p",{style:`font-size:${__p(["subContainer","fontBigTitle"],"30px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},[__p(["insight","infoData"],{}).usdPrice?`$${numberToken(__p(["insight","infoData"],{}).usdPrice)}`:"$0.00000"]),
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"10px"}})},
                [
                    $("p",{style:`font-size:${__p(["subContainer","fontTitle"],"22px")};color:${__p(["insight","infoData"],{}).priceChange?(__p(["insight","infoData"],{}).priceChange.usd < 0 ? SYD_VAR.err.get() :SYD_VAR.success.get()):SYD_VAR.success.get()};`+__sC["h-txt"]()},[
                        __p(["insight","infoData"],{}).priceChange?`${__p(["insight","infoData"],{}).priceChange?(__p(["insight","infoData"],{}).priceChange.usd <= 0 ? "" :"+"):""}$${trimVal(__p(["insight","infoData"],{}).priceChange.usd,false,12)}`:"+$0.000000"
                    ]),
                    $(
                        "div",
                        {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-1"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:__p(["insight","infoData"],{}).priceChange?(__p(["insight","infoData"],{}).priceChange.percentage < 0 ? SYD_VAR.err.get() :SYD_VAR.success.get()):SYD_VAR.success.get(),cursor:"pointer"}}),class:""},
                        [
                            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]({method:"add",style:{fontWeight:"900"}})+__sC["no-txt"]()},[
                                __p(["insight","infoData"],{}).priceChange?`${__p(["insight","infoData"],{}).priceChange.percentage <= 0 ? "" :"+"}${trimVal(__p(["insight","infoData"],{}).priceChange.percentage,false,6)}%`:"+00.00%"
                            ])
                        ]
                    )
                ]
            )
        ]
    )
}

__SYD.more_I = function()
{
    return $(
        "div",
        {style:"position:relative;",tabindex:"0"},
        [
            $(
                "div",
                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.tab_bg.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                [
                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[__p(["more_I","mode"],"prices".split("_").join(" "))]),
                    $("span",{style:`background-image:url(./assets/images/${"toggle"}.svg);`+__sC["mobileMenu"]({method:"use",style:["transition"]})+__sC["n2-icon"]({method:"add",style:{transform:__p(["more_I","display"],false) ? "rotate(180deg)" : "rotate(0deg)",color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                ]
            ),
            $(
                "div",
                {
                    style:__sC["more_D_tab"]({method:"add",style:{backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{zIndex:"1000",gap:"15px",display:__p(["more_I","display"],false)?"flex":"none"}}])+__sC["br-.5"](),
                    class:"tab"
                },
                [
                    __SYD.more_I_EL("market caps"),
                    __SYD.more_I_EL("prices"),
                    __SYD.more_I_EL("total volumes")
                ]
            )
        ],
        {createState:{stateName:"more_I",state:{display:false,edge:"left",mode:"prices"}},events:{onblur:blurMore,onclick:clickMore}}
    )
}

__SYD.more_I_EL = function(text){
    return $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},[text],{events:{onclick:()=>{clickMore_el(text)}}})
}

__SYD.graph_I = new graph({type:"graph_I",parent:"insight"}).template;

__SYD.graphOptions_I = function()
{
    return $(
        "div",
        {style:__sC["row-space"]({method:"add",style:{maxWidth:"500px",alignSelf:"center",width:"100%",gap:"15px",flexWrap:"wrap"}})},
        [
            __SYD.graphOptions_I_EL({text:"1H",isActive:false}),
            __SYD.graphOptions_I_EL({text:"1D"}),
            __SYD.graphOptions_I_EL({text:"1W"}),
            __SYD.graphOptions_I_EL({text:"1M"}),
            __SYD.graphOptions_I_EL({text:"3M"}),
            __SYD.graphOptions_I_EL({text:"ALL",isActive:false}),
        ],
        {createState:{
            stateName:"graphOptions_I",
            state:{current:"1D"}
        }}
    )
}

__SYD.graphOptions_I_EL = function({text , action , isActive=true}){
    return $(
        "div",
        {style:__sC["box"]()+`${__p(["graphOptions_I","current"],"1D")===text?__sC["thinBorder"]():""}`+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{pointerEvents:isActive?"auto":"none",opacity:isActive?"1":".2",gap:"10px",backgroundColor:__p(["graphOptions_I","current"],"1D")===text?SYD_VAR.tab_bg.get():"transparent",cursor:"pointer",position:"relative"}}),class:`pop-btn ${__p(["graphOptions_I","current"],"1D")===text?"":"highlight_icon"}`},
        [
            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[text]),
        ],
        {
            events:{
                onclick:()=>{
                    if(isActive)graphOptions_I_select(text);
                }
            }
        }
    )
}

__SYD.display_I = function()
{
    return $(
        "div",
        {style:__sC["col-start"]({method:"add",style:{width:"100%",minHeight:"fit-content",gap:"2px",overflow:"hidden"}})+__sC["br-1"]()},
        [
            // __SYD.display_I_EL({isCopy:true}),
            ...(()=>{
                const data = __p(["insight","infoData"],{});
                const el = new Array();
                if(Object.keys(data).length>0)
                {
                    //token Name
                    el.push(__SYD.display_I_EL({title:"name" , value:data.name}));
                    //token Symbol
                    el.push(__SYD.display_I_EL({title:"symbol" , value:data.symbol}));
                    //token Network
                    if(data.network.length>0)
                    {
                        if(data.network[0].length > 0)
                        {
                            el.push(__SYD.display_I_EL({title:"network" , value:data.network[0]}));
                        }else{
                            if(Object.keys(SYD_VAR.nativeTokens.get()).includes(__p(["insight","tokenId"])))
                            {
                                el.push(__SYD.display_I_EL({title:"network" , value:SYD_VAR.nativeTokens.get()[__p(["insight","tokenId"])].platform}));
                            }
                        }
                    }
                    //token CA mint
                    if(data.mint)
                    {
                        el.push(__SYD.display_I_EL({title:"mint" , value:data.mint , isCopy:true}));
                    }else
                    {
                        if(Object.keys(SYD_VAR.nativeTokens.get()).includes(__p(["insight","tokenId"])))
                        {
                            el.push(__SYD.display_I_EL({title:"mint" , value:SYD_VAR.nativeTokens.get()[__p(["insight","tokenId"])].contract_address , isCopy:true}));
                        }
                    }
                    //token total supply
                    el.push(__SYD.display_I_EL({title:"total supply" , value:data.total_supply}));
                    //market cap
                    el.push(__SYD.display_I_EL({title:"market cap" , value:data.market_cap}));
                    //token volume
                    el.push(__SYD.display_I_EL({title:"volume" , value:data.volume}))
                }
                return el;
            })()
        ]
    )
}

__SYD.display_I_EL = function({title="token symbol",value = "value here",isCopy=false,clr})
{
    return $(
        "div",
        {class:isCopy?"highlight_tab":"",style:__sC["box"]({method:"add",style:{width:"100%",padding:"25px 15px",backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["row-center"]({method:"add",style:{justifyContent:"space-between",cursor:isCopy?"pointer":"unset"}})+__sC["br-.5"]()},
        [
            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[title.length>15?trimVal(title,true,15):title]),
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"5px"}})},
                [
                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${clr?clr:SYD_VAR.greyText.get()};`+__sC["n-txt"]({method:"add",style:{fontWeight:"700"}})+__sC["no-txt"]()},[isCopy?centerVal(value):value]),
                    ...(isCopy?[$("span",{class:"icon",style:`background-image:url(./assets/images/${"copy"}.svg);`+__sC["n-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]})]:[])
                ]
            ),
        ],{events:{onclick:e=>{if(isCopy)copyAdx(e,value)}}}
    )
}

__SYD.share_I = function()
{
    return $(
        "div",
        {class:"highlight_tab",style:__sC["box"]()+__sC["col-center"]({method:"add",style:{cursor:"pointer",backgroundColor:SYD_VAR.tab_bg.get(),padding:"20px 35px",gap:"10px"}})+__sC["br-1"]()+__sC["thinBorder"]()},
        [
            $(
                "div",
                {style:__sC["mobileMenu"]({method:"add",style:{position:"static",transform:"unset",backgroundImage:"url(./assets/images/share.svg)"}})},[],{genericStyle:["bg_fit"]}
            ),
            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["share"])
        ],{events:{onclick:e=>{if(__p(["insight","infoData"],{}).links){
            if(__p(["insight","infoData"],{}).links.length>0)copyAdx(e,__p(["insight","infoData"],{}).links[0],false)
        }}}}
    )
}

__SYD.swap_I = function()
{
    return $(
        "a",
        {href:"https://www.aetherpay.org/" , target:"blank",class:"highlight_tab",style:__sC["box"]()+__sC["col-center"]({method:"add",style:{cursor:"pointer",backgroundColor:SYD_VAR.tab_bg.get(),padding:"20px 35px",gap:"10px"}})+__sC["br-1"]()+__sC["thinBorder"]()},
        [
            $(
                "div",
                {style:__sC["mobileMenu"]({method:"add",style:{position:"static",transform:"unset",backgroundImage:"url(./assets/images/swap.svg)"}})},[],{genericStyle:["bg_fit"]}
            ),
            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["swap"])
        ]
    )
}