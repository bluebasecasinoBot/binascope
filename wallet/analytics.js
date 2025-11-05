import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";
import { addWallet } from "../utils/addWallet.js";
import { graph } from "../utils/graph.js";
import {centerVal, copyText, trimVal, updateState, updateState__bulk } from "../utils/stateAssets.js"

function copyAdx(e)
{
    navigator.clipboard.writeText(__p(["walletAnalytics","adx"]))
    .then(() => {
        e.target.querySelector(".icon").style.backgroundImage = "url(./assets/images/check.svg)";
        let timer = setTimeout(()=>{clearTimeout(timer);e.target.querySelector(".icon").style.backgroundImage = "url(./assets/images/copy.svg)";},2000)
    })
    .catch(err => console.error("Failed to copy", err));
}

function blurMore()
{
    updateState({name:"more_A",prop:"display",value:false})
}

function clickMore()
{
    updateState({name:"more_A",prop:"display",value:__p(["more_A","display"])?false:true});
}

const data = {
    "transactionfee":[1000, 1700, 1625, 1775, 1550, 1500, 2000, 1950, 1900, 1975],
    "credits(inflow)":[0, 1200, 0, 250, 0, 0, 800, 0, 0, 150],
    "debits(outflow)":[50, 500, 75, 100, 225, 50, 300, 50, 50, 75]
}

function clickMore_el(text)
{
    updateState({name:"more_A",prop:"mode",value:text});
    let clr = SYD_VAR.themeClr.get();
    let modified = text.toLowerCase().split(" ").join("");
    if(modified === "transactionfee") clr = SYD_VAR.pending.get();
    if(modified === "credits(inflow)") clr = SYD_VAR.success.get();
    if(modified === "debits(outflow)") clr = SYD_VAR.err.get();

    //get data type
    const graphData = [];
    __p(["walletAnalytics","tx_history"],[]).forEach(txn =>{
        // console.log(`to: ${txn.to.toLowerCase()}`);
        // console.log(`from: ${txn.from.toLowerCase()}`);
        // console.log(`adx: ${__p(["walletAnalytics","adx"]).toLowerCase()}`);
        switch(modified)
        {
            case "transactionfee":
                graphData.push(Number(txn.gasPrice)/10**18);
            break;
            case "credits(inflow)":
                if(txn.to.toLowerCase() === __p(["walletAnalytics","adx"]).toLowerCase()) graphData.push(Number(txn.amount));
            break;
            case "debits(outflow)":
                if(txn.from.toLowerCase() === __p(["walletAnalytics","adx"]).toLowerCase()){
                    graphData.push(Number(txn.amount));
                }
        }
    })


    updateState__bulk({name:"wallet_A_G",task:s=>{
        s.graphClr = clr;
        s.data = graphData;//data[text.toLowerCase().split(" ").join("")];
        return s;
    }});
    __p(["wallet_A_G","draw"])()
}

__SYD.walletAnalytics = function()
{
    return $(
        "div",
        {style:__sC["dashboard"]()+__sC["col-start"]({method:"add",style:{gap:"35px",display:__p(["walletAnalytics","display"],false)?"flex":"none"}})},
        [
            __SYD.walletAdx_A(),
            __SYD.walletBal_A(),
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"15px",width:"100%",justifyContent:"space-between"}})},
                [
                    __SYD.more_A(),
                    //Add wallet comp
                    $(
                        "div",
                        {class:"pop-btn",style:__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.themeClr.get(),cursor:"pointer"}})},
                        [
                            $("span",{style:`background-image:url(./assets/images/${"folder"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                            $("p",{style:`display:${__p(["walletDashboard","mobile"])?"none":"block"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},["Add Wallet"])
                        ],
                        {events:{onclick:()=>{updateState({name:"addWalletPage_A",prop:"mainDisplay",value:true})}}}
                    ),
                    //Add wallet comp
                ]
            ),
            __SYD.wallet_A_G(),
            __SYD.assets_D(),
            __SYD.history_A(),
            __SYD.addWalletPage_A()
        ],
        {
            createState:{
                stateName:"walletAnalytics",
                state:{display:false,adx:"",native:true,mobile:false,assets:[],tx_history:[],nativeBal:0,ticker:""}
            },
            mediaQuery:{query:[{size:"<900px",prop:{mobile:true}}],defState:{mobile:false}}
        }
    )
}

__SYD.addWalletPage_A = new addWallet("addWalletPage_A","walletAnalytics").template;
__SYD.wallet_A_G = new graph({type:"wallet_A_G",parent:"walletAnalytics"}).template;

__SYD.walletAdx_A = function()
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
                            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[`${__p(["walletAnalytics","adx"],"0xbF5bee7eC001Bb1794655481F8a732F4789faf82").slice(0,15)} ...`]),
                            $("span",{class:"icon",style:`background-image:url(./assets/images/${"copy"}.svg);`+__sC["n-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]})
                        ],{events:{onclick:copyAdx}}
                    )
                ]
            )
            //wallet bal comp
        ]
    )
}

__SYD.walletBal_A = function()
{
    return $(
        "div",
        {style:__sC["l-hx-flx-end"]({method:"add",style:!__p(["walletBal_A","mobile"],false)?{}:{flexDirection:"column",alignItems:"flex-start",gap:"30px"}})},
        [
            //wallet bal comp
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"15px"}})},
                [
                    $("p",{style:__sC["n-txt"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:200;`},["Native Balance"]),
                    $(
                        "div",
                        {style:__sC["row-start"]({method:"add",style:{gap:"8px"}})},
                        [
                            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},[`${__p(["walletAnalytics","nativeBal"],0).toFixed(8)} ${__p(["walletAnalytics","ticker"],"")}`])
                        ]
                    )
                ]
            ),
            //wallet bal comp

            //wallet bal comp
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"15px"}})},
                [
                    $("p",{style:__sC["n-txt"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:200;`},["Dollar Balance"]),
                    $(
                        "div",
                        {style:__sC["row-start"]({method:"add",style:{gap:"8px"}})},
                        [
                            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["$ 0.00"])
                        ]
                    )
                ]
            ),
            //wallet bal comp
        ],{
            createState:{stateName:"walletBal_A",state:{mobile:false}},
            mediaQuery:{query:[{size:"<600px",prop:{mobile:true}}],defState:{mobile:false}}
        }
    )
}

__SYD.more_A = function()
{
    return $(
        "div",
        {style:"position:relative;",tabindex:"0"},
        [
            $(
                "div",
                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.tab_bg.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                [
                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[__p(["more_A","mode"],"Credits(inflow)")]),
                    $("span",{style:`background-image:url(./assets/images/${"toggle"}.svg);`+__sC["mobileMenu"]({method:"use",style:["transition"]})+__sC["n2-icon"]({method:"add",style:{transform:__p(["more_A","display"],false) ? "rotate(180deg)" : "rotate(0deg)",color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                ]
            ),
            $(
                "div",
                {
                    style:__sC["more_D_tab"]({method:"add",style:{backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{zIndex:"1000",gap:"15px",display:__p(["more_A","display"],false)?"flex":"none"}}])+__sC["br-.5"](),
                    class:"tab"
                },
                [
                    __SYD.more_A_EL("Credits(inflow)"),
                    __SYD.more_A_EL("Debits(outflow)"),
                    __SYD.more_A_EL("transaction fee"),
                ]
            )
        ],
        {createState:{stateName:"more_A",state:{display:false,edge:"left",mode:"Credits(inflow)"}},events:{onblur:blurMore,onclick:clickMore}}
    )
}

__SYD.more_A_EL = function(text){
    return $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},[text],{events:{onclick:()=>{clickMore_el(text)}}})
}

__SYD.assets_A = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"15px",marginTop:"30px",width:"100%"}})
        },
        [
            //assets header
            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["Your Assets"]),
            //assets header
            //assets main
            __SYD.assetsTable_A()
            //assets main
        ]
    )
}

__SYD.assetsTable_A = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"3px",width:"100%",padding:"0px",paddingTop:"0px",overflow:"scroll",maxWidth:"100%",maxHeight:"400px",position:"relative"}})
        },
        [
            __SYD.tableEl_D({name:"Name",symbol:"symbol",chain:"chain",holdings:"holdings",ca:"contract Adx",actions:"actions"}),
            ...(()=>{
                const data = __p(["walletAnalytics","assets"],[]);
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

__SYD.history_A = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"15px",marginTop:"30px",width:"100%"}})
        },
        [
            //assets header
            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["Transaction History"]),
            //assets header
            //assets main
            __SYD.historyTable_A()
            //assets main
        ]
    )
}

__SYD.historyTable_A = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"1px",width:"100%",padding:"0px",paddingTop:"0px",overflow:"scroll",maxWidth:"100%",maxHeight:"400px",position:"relative"}})
        },
        [
            __SYD.tableEl_A({txHash:"Tx Hash",amount:"Amount",from:"from",to:"to",blockNo:"block_no",status:"status"}),
            ...(()=>{
                const data = __p(["walletAnalytics","tx_history"],[]);
                const el = [];
                for(let i = 0; i < data.length; i++)
                {
                    el.push(
                        __SYD.tableElC_A(data[i])
                    )
                }
                return el;
            })()
        ]
    )
}

__SYD.tableEl_A = function({txHash,amount,from,to,blockNo,status}={})
{
    return $(
        "section",
        {style:__sC["row-start"]({method:"add",style:{width:"100%",minWidth:"fit-content",minHeight:"fit-content",position:"sticky",top:"0px",left:"0px",zIndex:"9000"}})},
        [
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]({method:"add",style:{gap:"5px"}})+__sC["t-cells"]({method:"add",style:{flex:"2.5",paddingLeft:"10px"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};`},[
                txHash
            ]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};`},[amount]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};`},[from]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};`},[to]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};`},[blockNo]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:"1"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};`},[status]),
        ]
    )
}


__SYD.tableElC_A = function({txHash,amount,from,to,blockNo,status}={})
{
    return $(
        "section",
        {style:__sC["row-start"]({method:"add",style:{width:"100%",minWidth:"fit-content",minHeight:"fit-content" , gap:"1px"}})},
        [
            $("p",{class:"highlight_tab",style:__sC["n-txt"]()+__sC["row-center"]({method:"add",style:{gap:"7px"}})+__sC["t-cells"]({method:"add",style:{flex:"2.5",height:"55px",paddingLeft:"10px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};cursor:pointer;`},[
                centerVal(txHash,10)
            ],{events:{onclick:e=>{copyText(txHash)}}}),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};`},[
                trimVal(amount,false,10)
            ]),

            $("p",{class:"highlight_tab",style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};cursor:pointer;`},[
                trimVal(from,true,10)
            ],{events:{onclick:e=>{copyText(from)}}}),

            $("p",{class:"highlight_tab",style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};cursor:pointer;`},[
                trimVal(to,true,10)
            ],{events:{onclick:e=>{copyText(to)}}}),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};`},[
                `${blockNo}`
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:"1",height:"55px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};`},[
                $("p",{style:`color:${status==="success"?SYD_VAR.success.get():(status==="pending"?SYD_VAR.pending.get():SYD_VAR.err.get())};`},[
                    $("span",{style:__sC["br-.5"]()+__sC["thinBorder"]({method:"add",style:{backgroundColor:SYD_VAR.bgWhite_t_5.get()}})+"padding:5px"},[status])
                ])
            ]),
        ]
    )
}