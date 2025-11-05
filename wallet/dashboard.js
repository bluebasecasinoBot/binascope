import { $, __p, __sC, __SYD, __v, SYD_VAR } from "../sydneyDom_v3.js";
import { addWallet } from "../utils/addWallet.js";
import {centerVal, copyText, trimVal, updateState, updateState__bulk } from "../utils/stateAssets.js"

function swtchCurrency()
{
    updateState({name:"walletDashboard",prop:"native",value:__p(["walletDashboard","native"])?false:true})
}

function blurMore()
{
    updateState({name:"more_D",prop:"display",value:false})
}
function clickMore()
{
    updateState({name:"more_D",prop:"display",value:__p(["more_D","display"])?false:true});
}

function copyAdx(e)
{
    navigator.clipboard.writeText(__p(["walletDashboard","adx"]))
    .then(() => {
        e.target.querySelector(".icon").style.backgroundImage = "url(./assets/images/check.svg)";
        let timer = setTimeout(()=>{clearTimeout(timer);e.target.querySelector(".icon").style.backgroundImage = "url(./assets/images/copy.svg)";},2000)
    })
    .catch(err => console.error("Failed to copy", err));
}
__SYD.walletDashboard = function()
{
    return $(
        "div",
        {style:__sC["dashboard"]()+__sC["col-start"]({method:"add",style:{gap:"35px",display:__p(["walletDashboard","display"],false)?"flex":"none"}})},
        [
            __SYD.walletAdx_D(),
            __SYD.walletBal_D(),
            __SYD.assets_D(),
            __SYD.addWalletPage()
        ],
        {
            createState:{
                stateName:"walletDashboard",
                state:{display:false,adx:"",native:true,mobile:false,assets:[],nativeBal:0,ticker:""}
            },
            mediaQuery:{query:[{size:"<900px",prop:{mobile:true}}],defState:{mobile:false}}
        }
    )
}

__SYD.addWalletPage = new addWallet("addWalletPage","walletDashboard").template;

__SYD.walletAdx_D = function()
{
    return $(
        "div",
        {style:__sC["l-hx-flx-end"]()},
        [
            //wallet bal comp
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"15px"}})},
                [
                    $("p",{style:__sC["n-txt"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:200;`},["Wallet Adx"]),
                    $(
                        "div",
                        {class:"dim-text",style:__sC["row-start"]({method:"add",style:{gap:"8px",cursor:"pointer"}})},
                        [
                            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[`${__p(["walletDashboard","adx"],"").slice(0,15)} ...`]),
                            $("span",{class:"icon",style:`background-image:url(./assets/images/${"copy"}.svg);`+__sC["n-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]})
                        ],{events:{onclick:copyAdx}}
                    )
                ]
            )
            //wallet bal comp
        ]
    )
}

__SYD.walletBal_D = function()
{
    return $(
        "div",
        {style:__sC["l-hx-flx-end"]()},
        [
            //wallet bal comp
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"15px"}})},
                [
                    $("p",{style:__sC["n-txt"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:200;`},["Current Balance"]),
                    $(
                        "div",
                        {style:__sC["row-start"]({method:"add",style:{gap:"8px"}})},
                        [
                            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},[`${__p(["walletDashboard","native"],true)?"":"$"} ${__p(["walletDashboard","nativeBal"],0).toFixed(8)} ${__p(["walletDashboard","native"],true)?__p(["walletDashboard","ticker"],""):""}`]),
                            $("span",{class:"highlight_icon",style:`transform:${__p(["walletDashboard","native"],true)?"rotateZ(180deg)":"rotateZ(0deg)"};background-image:url(./assets/images/${__p(["walletDashboard","native"],true)?"exchange":"exchange-doll"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"],events:{onclick:swtchCurrency}})
                        ]
                    )
                ]
            ),
            //wallet bal comp

            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"15px"}})},
                [
                    __SYD.more_D(),

                    //Add wallet comp
                    $(
                        "div",
                        {class:"pop-btn",style:__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.themeClr.get(),cursor:"pointer"}})},
                        [
                            $("span",{style:`background-image:url(./assets/images/${"folder"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                            $("p",{style:`display:${__p(["walletDashboard","mobile"])?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["Add Wallet"])
                        ],
                        {events:{onclick:()=>{updateState({name:"addWalletPage",prop:"mainDisplay",value:true})}}}
                    ),
                    //Add wallet comp
                ]
            )
        ]
    )
}

__SYD.more_D = function()
{
    return $(
        "div",
        {style:"position:relative;",tabindex:"0"},
        [
            $(
                "div",
                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.bgWhite_t_5.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                [
                    $("span",{style:`background-image:url(./assets/images/${"dotMenu"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                    $("p",{style:`display:${__p(["walletDashboard","mobile"])?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["More"]),
                ]
            ),
            $(
                "div",
                {
                    style:__sC["more_D_tab"]({method:"add",style:{backgroundColor:SYD_VAR.bgWhite_t_5.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{gap:"15px",display:__p(["more_D","display"],false)?"flex":"none"}}])+__sC["br-.5"]()+`left:${!__p(["walletDashboard","mobile"])?"0px":"unset"};right:${__p(["walletDashboard","mobile"])?"0px":"unset"};`,
                    class:"tab"
                },
                [
                    $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},["View Analytics"],{
                        events:{
                            onclick:e=>{
                                __v["analytic"].parentElement.scrollLeft = __v["analytic"].offsetLeft;
                                updateState__bulk({name:"topNav",task:s=>{
                                    s.hLeft = `${__v["analytic"].offsetLeft}px`;
                                    s.hWidth = `${__v["analytic"].offsetWidth}px`;
                                    s.hTop = `${__v["analytic"].offsetTop}px`;
                                    s.hHeight = `${__v["analytic"].offsetHeight}px`;
                                    s.navOption = "analytic";
                                    return s;
                                }});

                                updateState({name:"walletDashboard",prop:"display",value:false});
                                updateState({name:"walletAnalytics",prop:"display",value:true});

                                __p(["wallet_A_G","draw"])();
                            }
                        }
                    }),

                    $("p",{class:"dim-text",style:`opacity:.3;pointer-events:none;width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},["Add tracker"])
                ]
            )
        ],
        {createState:{stateName:"more_D",state:{display:false,edge:"left"}},events:{onblur:blurMore,onclick:clickMore}}
    )
}

__SYD.assets_D = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"15px",marginTop:"35px",width:"100%"}})
        },
        [
            //assets header
            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["Your Assets"]),
            //assets header
            //assets main
            __SYD.assetsTable_D()
            //assets main
        ]
    )
}

__SYD.assetsTable_D = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"1px",width:"100%",padding:"0px",paddingTop:"0px",overflow:"scroll",maxWidth:"100%",maxHeight:"400px",position:"relative"}})
        },
        [
            __SYD.tableEl_D({name:"Name",symbol:"symbol",chain:"chain",holdings:"holdings",ca:"contract Adx",actions:"actions"}),
            ...(()=>{
                const data = __p(["walletDashboard","assets"],[]);
                const el = [];
                for(let i = 0; i < data.length; i++)
                {
                    el.push(
                        __SYD.tableElC_D(data[i])
                    )
                }
                return el;
            })()
        ]
    )
}
__SYD.tableEl_D = function({name,symbol,chain,holdings,ca,actions}={})
{
    return $(
        "section",
        {style:__sC["row-start"]({method:"add",style:{width:"100%",minWidth:"fit-content",minHeight:"fit-content",position:"sticky",top:"0px",left:"0px",zIndex:"9000",gap:"1px"}})},
        [
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]({method:"add",style:{gap:"5px"}})+__sC["t-cells"]({method:"add",style:{flex:"3",paddingLeft:"10px"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[
                // $("span",{style:`background-image:url(${icon});`+__sC["n-icon"]({method:"add",style:{display:icon?"inline":"none",color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_cover"]}),
                name
            ]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[symbol]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[chain]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[holdings]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[ca]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:".5"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};min-width:65px;`},[actions]),
        ]
    )
}


__SYD.tableElC_D = function({name,symbol,chain,holdings_native,ca,actions,}={})
{
    return $(
        "section",
        {style:__sC["row-start"]({method:"add",style:{width:"100%",minWidth:"fit-content",minHeight:"fit-content",gap:"1px"}})},
        [
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]({method:"add",style:{gap:"7px"}})+__sC["t-cells"]({method:"add",style:{flex:"3",height:"55px",paddingLeft:"10px"}})+`color:${name?SYD_VAR.headerClr.get():SYD_VAR.err.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[
                // $("span",{style:`background-image:url(${icon});`+__sC["n-icon"]({method:"add",style:{display:icon?"inline":"none",color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_cover"]}),
                trimVal(name?name:"not-specified",false,13)
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[
                trimVal(symbol,false,10)
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[
                chain.toUpperCase()
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.success.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[
                $("p",{style:`color:${SYD_VAR.success.get()};`},[`${trimVal(holdings_native,false,8)} ${trimVal(symbol,false,10)}`]),
            ]),

            $("p",{class:"highlight_tab",style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`cursor:pointer;color:${SYD_VAR.pending.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};max-width:${__p(["walletDashboard","mobile"],false)?"120px":"unset"};`},[
                centerVal(ca,10),
            ],{events:{onclick:e=>{copyText(ca)}}}),

            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:".5",height:"55px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:200;background:${SYD_VAR.container_bg_drk.get()};min-width:65px;`},[
                "actions"
            ]),
        ]
    )
}