import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";
import { daysMapping, fetchPerTokenGraph, fetchPerTokenInfo, fetchToken_api__get, intervalMapping, liveTrends, numberToken, numberToken_minify } from "../utils/apiUtils.js";
import { trimVal, updateState, updateState__bulk } from "../utils/stateAssets.js";

function updateLivePage(pos)
{
    const cPage = __p(["live","currentPage"],1);
    // if(new Date() - __p(["live","lastUpdated"]) > 10000)
    // {
        if(pos === "left")
        {
            updateState({name:"live",prop:"currentPage",value:cPage < 10 ? cPage+1 : cPage});
            if(cPage < 10)__p(["live","timely"])()
        }else if(pos === "right")
        {
            updateState({name:"live",prop:"currentPage",value:cPage > 1 ? cPage-1 : cPage});
            if(cPage > 0)__p(["live","timely"])()
        }
    // }else {
    //     console.log("please try again in a few seconds");
    //     __p(["notification","show"])({title:"Rate exceeded (Live trend)",msg:`please try again in ${Math.round((10000 - (new Date() - __p(["live","lastUpdated"])))/1000)}s`,mode:"err"})
    // };
}

__SYD.live = function()
{
    return $(
        "div",
        {class:"live",style:__sC["dashboard"]()+__sC["col-start"]({method:"add",style:{overflow:"hidden",overflowY:"scroll",gap:"35px",display:__p(["live","display"],true)?"flex":"none",paddingBottom:"15px"}})},
        [
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"30px"}})},
                [
                    $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["Top #100 tokens (MCAP($))"]),
                    $(
                        "div",
                        {style:__sC["row-start"]({method:"add",style:{gap:"20px"}})},
                        [
                            $(
                                "div",
                                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]({method:"add",style:{height:"40px",width:"40px",backgroundColor:SYD_VAR.themeClr.get(),cursor:"pointer",opacity:__p(["live","currentPage"],1)>1?"1":".4",pointerEvents:__p(["live","currentPage"],1)>1?"auto":"none"}})+__sC["row-center"](),class:"pop-btn"},
                                [
                                    $("span",{style:`background-image:url(./assets/images/${"left.svg"});`+__sC["mobileMenu"]({method:"use",style:["transition"]})+__sC["n2-icon"]()+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]}),
                                ],{events:{onclick:e=>{updateLivePage("right")}}}
                            ),
                            $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[`${__p(["live","currentPage"],1)}/10`]),
                            $(
                                "div",
                                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]({method:"add",style:{height:"40px",width:"40px",backgroundColor:SYD_VAR.themeClr.get(),cursor:"pointer",opacity:__p(["live","currentPage"],1)<10?"1":".4",pointerEvents:__p(["live","currentPage"],1)<10?"auto":"none"}})+__sC["row-center"](),class:"pop-btn"},
                                [
                                    $("span",{style:`background-image:url(./assets/images/${"left.svg"});transform:rotate(180deg);`+__sC["mobileMenu"]({method:"use",style:["transition"]})+__sC["n2-icon"]()+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]}),
                                ],{events:{onclick:e=>{updateLivePage("left")}}}
                            ),
                        ]
                    )
                ]
            ),
            __SYD.assetsTable_L()
        ],
        {
            createState:{
                stateName:"live",
                state:{display:true,mobile:false,timer:null,tokens:[],currentPage:1,lastUpdated:0,appendTokens:async()=>{
                    const rawData = await liveTrends();

                    if(rawData !== null)
                    {
                        if(rawData.length > 0)
                        {
                            const refined = rawData.map((token,id) =>{
                                return {
                                    name:token.name,
                                    icon:token.image,
                                    price_dol:token.current_price===null?0:token.current_price,
                                    marketCap_dol:token.market_cap===null?0:token.market_cap,
                                    marketCap_per:token.market_cap_change_percentage_24h===null?0:token.market_cap_change_percentage_24h,
                                    change:token.price_change_percentage_24h===null?0:token.price_change_percentage_24h,
                                    volume:token.total_volume===null?0:token.total_volume,
                                    maxSupply:token.total_supply===null?0:token.total_supply,
                                    index:`${((__p(["live","currentPage"],1)-1)*100)+id+1}`,
                                    tokenId:token.id
                                }
                            });

                            updateState__bulk({name:"live",task:s=>{
                                s.tokens = refined;
                                s.lastUpdated = new Date();
                                return s;
                            }})
                        }
                    }
                },
                timely:async (run = true)=>{
                    if(__p(["live","display"]))
                    {
                        clearInterval(__p(["live","timer"],null));
                        if(run) {
                            __p(["live","appendTokens"])();
                        }
                    }
                    let timer = setInterval(async () => {
                        console.log("updating")
                        if(__p(["live","display"]))
                        {
                            await __p(["live","appendTokens"])();
                        }else{
                            if(__p(["live","timer"],null) !== null)
                            {
                                clearInterval(__p(["live","timer"],null))
                            }   
                        }
                    }, 1000*15);
                    updateState({name:"live",prop:"timer",value:timer})
                }}
            },
            mediaQuery:{query:[{size:"<900px",prop:{mobile:true}}],defState:{mobile:false}}
        }
    )
}

__SYD.assetsTable_L = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"1px",width:"100%",padding:"0px",paddingTop:"0px",overflow:"scroll",maxWidth:"100%",height:"100%",position:"relative",minHeight:"400px"}})
        },
        [
            __SYD.tableEl_L({name:"Name",price_dol:"price($)",price_per:"price(%)",marketCap_dol:"MCAP($)",marketCap_per:"MCAP(%)",change:"24H",volume:"volume",maxSupply:"supply"}),
            ...(()=>{
                const data = __p(["live","tokens"],[]);
                const el = [];
                for(let i = 0; i < data.length; i++)
                {
                    el.push(
                        __SYD.tableElC_L(data[i])
                    )
                }
                return el;
            })()
        ]
    )
}

__SYD.tableEl_L = function({name,price_dol,marketCap_dol,marketCap_per,change,volume,maxSupply}={})
{
    return $(
        "section",
        {style:__sC["row-start"]({method:"add",style:{width:"100%",minWidth:"fit-content",minHeight:"fit-content",position:"sticky",top:"0px",left:"0px",zIndex:"9000",gap:"1px"}})},
        [
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]({method:"add",style:{gap:"5px"}})+__sC["t-cells"]({method:"add",style:{flex:"3",paddingLeft:"10px"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};max-width:${__p(["live","mobile"],false)?"120px":"unset"};`},[
                // $("span",{style:`background-image:url(${icon});`+__sC["n-icon"]({method:"add",style:{display:icon?"inline":"none",color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_cover"]}),
                name
            ]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]()+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};`},[price_dol]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:"1"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};min-width:80px;max-width:${__p(["live","mobile"],false)?"80px":"unset"};`},[change]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:"1"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};min-width:80px;`},[marketCap_dol]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:"1"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};min-width:80px;`},[marketCap_per]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:"1"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};min-width:80px;`},[volume]),
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]()+__sC["t-cells"]({method:"add",style:{flex:"1"}})+`color:${SYD_VAR.greyText.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};font-weight:500;background:${SYD_VAR.tableBg.get()};min-width:80px;`},[maxSupply])
        ]
    )
}

__SYD.tableElC_L = function({name,price_dol,marketCap_dol,marketCap_per,change,volume,maxSupply,icon,index,tokenId}={})
{
    return $(
        "section",
        {class:"highlight_tab",style:__sC["row-start"]({method:"add",style:{width:"100%",minWidth:"fit-content",cursor:"pointer",minHeight:"fit-content",gap:"1px"}})},
        [
            $("p",{style:__sC["n-txt"]()+__sC["row-center"]({method:"add",style:{gap:"7px"}})+__sC["t-cells"]({method:"add",style:{flex:"3",height:"55px",paddingLeft:"10px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};max-width:${__p(["live","mobile"],false)?"120px":"unset"};`},[
                //count
                $("span",{style:`font-size:10px;color:${SYD_VAR.greyText.get()};`},[`#${index}`]),
                //count
                $("span",{style:`background-image:url(${icon});`+__sC["n-icon"]({method:"add",style:{display:icon?"inline":"none",color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_cover"]}),
                trimVal(name?name:"not-specified",false,12)
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};`},[
                `${price_dol}`
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px",flex:"1"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};min-width:80px;max-width:${__p(["live","mobile"],false)?"80px":"unset"};`},[
                $("p",{style:`color:${change<0?SYD_VAR.err.get():SYD_VAR.success.get()};min-width:80px;`},[`${change.toFixed(3)}%`]),
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px",flex:"1"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.success.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};min-width:80px;`},[
                `${`${Number(marketCap_dol)>1000000?numberToken_minify(marketCap_dol):marketCap_dol.toFixed(2)}`}`
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px",flex:"1"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${marketCap_per<0?SYD_VAR.err.get():SYD_VAR.success.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};min-width:80px;`},[
                `${marketCap_per.toFixed(3)}%`
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px",flex:"1"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`color:${SYD_VAR.success.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;background:${SYD_VAR.container_bg_drk.get()};min-width:80px;`},[
                `${Number(volume)>1000000?numberToken_minify(volume):volume.toFixed(2)}`
            ]),

            $("p",{style:__sC["n-txt"]()+__sC["t-cells"]({method:"add",style:{height:"55px",flex:"1"}})+__sC["col-start"]({method:"add",style:{justifyContent:"center",gap:"7px"}})+`cursor:pointer;color:${SYD_VAR.pending.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:500;min-width:80px;background:${SYD_VAR.container_bg_drk.get()};`},[ `${Number(maxSupply)>1000000?numberToken_minify(maxSupply):maxSupply.toFixed(2)}` ]),
        ],
        {
            events:{
                onclick:async e=>{
                    const graphMode = __p(["graphOptions_I","current"]);
                    updateState({name:"insight",prop:"tokenId",value:tokenId});

                    await fetchPerTokenGraph({tokenId:tokenId,day:daysMapping[graphMode],interval:intervalMapping[graphMode]});

                    await fetchPerTokenInfo({tokenId:tokenId});
                }
            }
        }
    )

}


