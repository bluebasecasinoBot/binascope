import { $, __sS, __sC, SYD_VAR, __p, __v } from "../sydneyDom_v3.js";
import { daysMapping, fetchPerToken_ca_chain, fetchPerTokenGraph, fetchPerTokenInfo, fetchTokenID, fetchWalletDetails, fetchWalletTxn, intervalMapping } from "./apiUtils.js";
import { updateState } from "./stateAssets.js";

__sS([
    {
        nameTag:"overlay",
        style:{
            height:"100%",
            width:"100%",
            position:"fixed",
            zIndex:"10000",
            left:"0px",
            top:"0px",
            paddingTop:"80px"
        }
    }
]);

const addWalletSectionsDom = [];

export class addWallet{
    constructor(type , parent)
    {
        this.type = type;
        this.parent = parent;
        addWalletSectionsDom.push(type);
        this.blurMore = function ()
        {
            updateState({name:`${type}`,prop:"display",value:false})
        }
        this.clickMore = function()
        {
            updateState({name:`${type}`,prop:"display",value:__p([`${type}`,"display"])?false:true});
        }
        this.blurMore_chain = function ()
        {
            updateState({name:`${type}`,prop:"displayChain",value:false})
        }
        this.clickMore_chain = function()
        {
            updateState({name:`${type}`,prop:"displayChain",value:__p([`${type}`,"displayChain"])?false:true});
        }

        this.template = ()=>{
            return $(
                "div",
                {style:__sC["row-center"]()+__sC["overlay"]({method:"add",style:{alignItems:"flex-start",display:__p([type,"mainDisplay"],false)?"flex":"none",backgroundColor:"rgba(0,0,0,.6)"}})},
                [
                    $(
                        "div",
                        {style:__sC["box"]({method:"add",style:{transform:"translateY(50px)",backgroundColor:SYD_VAR.tab_bg.get(),width:"calc(100% - 30px)",maxWidth:"600px",padding:"25px 15px",position:"relative"}})+__sC["thinBorder"]()+__sC["col-start"]({method:"add",style:{gap:"15px"}})+__sC["br-1"]()},
                        [
                            $(
                                "div",
                                {style:__sC["box"]([{method:"add",style:{position:"relative",width:"100%"}},{method:"remove",style:["padding"]}])+__sC["row-center"]()},
                                [
                                    $(
                                        "div",
                                        {style:__sC["box"]([{method:"add",style:{width:"100%",maxWidth:"900px"}},{method:"remove",style:["padding"]}])+__sC["row-start"]({method:"add",style:{gap:"10px",alignItems:"center",position:"relative"}})},
                                        [
                                            $(
                                                "input",
                                                {id:`search_${type}_input`,style:__sC["searchInput"]({method:"add",style:{background:SYD_VAR.container_bg.get(),color:SYD_VAR.headerClr.get()}})+__sC["thinBorder"]()+__sC["br-.5"](),placeholder:`Paste ${__p([type,"tokenType"],"")} Wallet Address`},[],{type:`addWalletInput_${type}`}
                                            )
                                        ]
                                    )
                                ]
                            ),

                            $("span",{style:`position:absolute;bottom:calc(100% + 10px);right:0px;background-image:url(./assets/images/${"cancel"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"],events:{onclick:()=>{updateState({name:type,prop:"mainDisplay",value:false})}}}),

                            $(
                                "div",
                                {style:__sC["row-start"]({method:"add",style:{gap:"10px"}})},
                                [
                                    //select wallet type
                                    $(
                                        "div",
                                        {style:"position:relative;",tabindex:"0"},
                                        [
                                            $(
                                                "div",
                                                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.bgWhite_t_5.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                                                [
                                                    $("span",{style:`transform:rotate(${__p([`${type}`,"display"],false)?"0deg":"180deg"});background-image:url(./assets/images/${"toggle"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                                                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[__p([type,"tokenType"],"").length===0?"Token Type":__p([type,"tokenType"],"")]),
                                                ]
                                            ),
                                            $(
                                                "div",
                                                {
                                                    style:__sC["more_D_tab"]({method:"add",style:{backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{gap:"15px",display:__p([`${type}`,"display"],false)?"flex":"none"}}])+__sC["br-.5"]()+`left:0px;z-index:100;`,
                                                    class:"tab"
                                                },
                                                [
                                                    $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},["EVM"],{events:{onclick:e=>{updateState({name:type,prop:"tokenType",value:"EVM"})}}}),

                                                    // $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},["SVM"],{events:{onclick:e=>{updateState({name:type,prop:"tokenType",value:"SVM"})}}})
                                                ]
                                            )
                                        ],
                                        {events:{onblur:this.blurMore,onclick:this.clickMore}}
                                    ),

                                    //select chain
                                    $(
                                        "div",
                                        {style:"position:relative;",tabindex:"0"},
                                        [
                                            $(
                                                "div",
                                                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.bgWhite_t_5.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                                                [
                                                    $("span",{style:`transform:rotate(${__p([`${type}`,"displayChain"],false)?"0deg":"180deg"});background-image:url(./assets/images/${"toggle"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                                                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[__p([type,"chain"],"").length===0?"chain":__p([type,"chain"],"")]),
                                                ]
                                            ),
                                            $(
                                                "div",
                                                {
                                                    style:__sC["more_D_tab"]({method:"add",style:{maxHeight:"170px",overflowY:"scroll",backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{gap:"15px",display:__p([`${type}`,"displayChain"],false)?"flex":"none"}}])+__sC["br-.5"]()+`left:0px;z-index:100;`,
                                                    class:"tab"
                                                },
                                                [
                                                    ...(()=>{
                                                        const data = SYD_VAR.moralise_gecko_match.get();
                                                        const el = [];
                                                        data.forEach(value => {
                                                            el.push(
                                                                $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},[value.moralis.toUpperCase()],{events:{onclick:e=>{updateState({name:type,prop:"chain",value:value.moralis})}}})
                                                            )
                                                        });
                                                        return el;
                                                    })()
                                                ]
                                            )
                                        ],
                                        {events:{onblur:this.blurMore_chain,onclick:this.clickMore_chain}}
                                    )
                                ]
                            ),
                            $(
                                "div",
                                {class:"pop-btn",style:__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.themeClr.get(),cursor:"pointer"}})+`${(__p([type,"chain"],"").length>0&&__p([type,"tokenType"],"").length>0)?"pointer-events:auto;opacity:1;" : "pointer-events:none;opacity:.5;"}`},
                                [
                                    $("span",{style:`background-image:url(./assets/images/${__p([type,"loading"])?"load.gif":"plus.svg"});`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_cover"]}),
                                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]({method:"add",style:{fontWeight:"700"}})},["Add"])
                                ],
                                {events:{onclick:async e=>{
                                        //fetch wallet details and transaction history
                                        if(__v[`addWalletInput_${type}`].value.length>0 && __p([type,"chain"],"").length>0&&__p([type,"tokenType"],"").length>0)
                                        {
                                            updateState({name:type,prop:"loading",value:true});
                                            //add adx to dashboard and analytics page
                                            updateState({name:"walletDashboard",prop:"adx",value:__v[`addWalletInput_${type}`].value});

                                            updateState({name:"walletAnalytics",prop:"adx",value:__v[`addWalletInput_${type}`].value});
                                            //add adx to dashboard and analytics page

                                            //close add page
                                            await fetchWalletDetails(type);
                                            await fetchWalletTxn(type);

                                            updateState({name:type,prop:"loading",value:false});

                                            addWalletSectionsDom.forEach(type=>{updateState({name:type,prop:"mainDisplay",value:false});})
                                        }
                                        //fetch wallet details and transaction history
                                }}}
                            ),
                        ],
                    ),
                ],
                {createState:{stateName:type,state:{mainDisplay:false,display:false,displayChain:false,tokenType:"",chain:"",loading:false}}}
            )
        }
    }
}


export class addToken{
    constructor(type , parent)
    {
        this.type = type;
        this.parent = parent;
        this.blurMore = function ()
        {
            updateState({name:`${type}`,prop:"display",value:false})
        }
        this.clickMore = function()
        {
            updateState({name:`${type}`,prop:"display",value:__p([`${type}`,"display"])?false:true});
        }
        this.blurMore_chain = function ()
        {
            updateState({name:`${type}`,prop:"displayChain",value:false})
        }
        this.clickMore_chain = function()
        {
            updateState({name:`${type}`,prop:"displayChain",value:__p([`${type}`,"displayChain"])?false:true});
        }

        this.template = ()=>{
            return $(
                "div",
                {style:__sC["row-center"]()+__sC["overlay"]({method:"add",style:{alignItems:"flex-start",display:__p([type,"mainDisplay"],false)?"flex":"none",backgroundColor:"rgba(0,0,0,.6)"}})},
                [
                    $(
                        "div",
                        {style:__sC["box"]({method:"add",style:{transform:"translateY(50px)",backgroundColor:SYD_VAR.tab_bg.get(),width:"calc(100% - 30px)",maxWidth:"600px",padding:"25px 15px",position:"relative"}})+__sC["thinBorder"]()+__sC["col-start"]({method:"add",style:{gap:"15px"}})+__sC["br-1"]()},
                        [
                            $(
                                "div",
                                {style:__sC["box"]([{method:"add",style:{position:"relative",width:"100%"}},{method:"remove",style:["padding"]}])+__sC["row-center"]()},
                                [
                                    $(
                                        "div",
                                        {style:__sC["box"]([{method:"add",style:{width:"100%",maxWidth:"900px"}},{method:"remove",style:["padding"]}])+__sC["row-start"]({method:"add",style:{gap:"10px",alignItems:"center",position:"relative"}})},
                                        [
                                            $(
                                                "input",
                                                {id:`search_${type}_input`,style:__sC["searchInput"]({method:"add",style:{background:SYD_VAR.container_bg.get(),color:SYD_VAR.headerClr.get()}})+__sC["thinBorder"]()+__sC["br-.5"](),placeholder:`Paste Token contract Address`},[],{type:"addCaInput"}
                                            )
                                        ]
                                    )
                                ]
                            ),

                            $("span",{style:`position:absolute;bottom:calc(100% + 10px);right:0px;background-image:url(./assets/images/${"cancel"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"],events:{onclick:()=>{updateState({name:type,prop:"mainDisplay",value:false})}}}),

                            $(
                                "div",
                                {style:__sC["row-start"]({method:"add",style:{gap:"10px"}})},
                                [
                                    //select token platform
                                    $(
                                        "div",
                                        {style:"position:relative;",tabindex:"0"},
                                        [
                                            $(
                                                "div",
                                                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.bgWhite_t_5.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                                                [
                                                    $("span",{style:`transform:rotate(${__p([`${type}`,"display"],false)?"0deg":"180deg"});background-image:url(./assets/images/${"toggle"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                                                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[__p([type,"tokenPlatform"],"").length===0?"select platform":__p([type,"tokenPlatform"],"")]),
                                                ]
                                            ),
                                            $(
                                                "div",
                                                {
                                                    style:__sC["more_D_tab"]({method:"add",style:{maxHeight:"250px",overflowY:"scroll",backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{gap:"15px",display:__p([`${type}`,"display"],false)?"flex":"none"}}])+__sC["br-.5"]()+`left:0px;z-index:100;`,
                                                    class:"tab"
                                                },
                                                [
                                                    ...(()=>{
                                                        const data = SYD_VAR.cGeckoPlatforms.get();
                                                        const el = [];
                                                        data.forEach(value => {
                                                            el.push(
                                                                $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},[value.toUpperCase()],{events:{onclick:e=>{updateState({name:type,prop:"tokenPlatform",value})}}})
                                                            )
                                                        });
                                                        return el;
                                                    })()
                                                ]
                                            )
                                        ],
                                        {events:{onblur:this.blurMore,onclick:this.clickMore}}
                                    ),
                                ]
                            ),
                            $(
                                "div",
                                {class:"pop-btn",style:__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.themeClr.get(),cursor:"pointer"}})+`${(__p([type,"tokenPlatform"],"").length>0)?`pointer-events:${__p([type,"loading"])?"none":"auto"};opacity:${__p([type,"loading"])?".5":"1"};` : "pointer-events:none;opacity:.5;"}`},
                                [
                                    $("span",{style:`background-image:url(./assets/images/${__p([type,"loading"])?"load.gif":"inspect.svg"});`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]({method:"add",style:{fontWeight:"700"}})},["inspect"])
                                ],
                                {events:{onclick:async e=>{
                                    if(__v["addCaInput"].value.length>0 && __p([type,"tokenPlatform"],"").length>0)
                                    {
                                        updateState({name:type,prop:"loading",value:true})
                                        const id = await fetchPerToken_ca_chain(__p([type,"tokenPlatform"],"") , __v["addCaInput"].value);

                                        const graphMode = __p(["graphOptions_I","current"]);
                                        updateState({name:"insight",prop:"tokenId",value:id});

                                        await fetchPerTokenGraph({tokenId:id,day:daysMapping[graphMode],interval:intervalMapping[graphMode]});

                                        updateState({name:type,prop:"loading",value:false})

                                        updateState({name:type,prop:"mainDisplay",value:false})
                                    }
                                }}}
                            ),
                        ],
                    ),
                ],
                {createState:{stateName:type,state:{mainDisplay:false,display:false,displayChain:false,tokenPlatform:"",loading:false}}}
            )
        }
    }
}