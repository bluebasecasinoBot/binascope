import { $, __p, __sC, __SYD, SYD_VAR, __v } from "../sydneyDom_v3.js";
import { daysMapping, fetchPerTokenGraph, fetchPerTokenInfo, fetchTokens_page_mc_volume_price, fetchTokens_trending, intervalMapping } from "../utils/apiUtils.js";
import { updateState , updateState__ } from "../utils/stateAssets.js";

const swapToken_main__token_display_panel_section_mode_popup_displayState = () =>{
    return `display:${__p(["swapToken_main__token_display_panel_section_mode_popup" , "self_display"],false) ? "flex" : "none"};`
}

__SYD.trend = function()
{
    return $(
        "div",
        {style:__sC["dashboard"]()+__sC["col-start"]({method:"add",style:{position:"relative",gap:"35px",display:__p(["trend","display"],false)?"flex":"none"}})},
        [
            __SYD.swapToken_main__token_display_panel()
        ],
        {
            createState:{
                stateName:"trend",
                state:{display:false,mobile:false,data:{},tokenDisplay:{show:false,currentDisplaying:[],tokens:[]}}
            },
            mediaQuery:{query:[{size:"<900px",prop:{mobile:true}}],defState:{mobile:false}}
        }
    )
}

//Trend tokens fetch
__SYD.swapToken_main__token_display_panel = () =>{
    return $(
        "div",
        {
            style:__sC["mainPage__mainDisplay_1_walletAdx_sec"]({method:"add",style:{gap:"15px",fontFamily:"h-txt"}})
        },
        [
            __SYD.swapToken_main__token_display_panel_section_title(),
            __SYD.swapToken_main__token_display_panel_section_mode(),
            __SYD.swapToken_main__token_display_panel_section_showTokens()
        ]
    )
}

__SYD.swapToken_main__token_display_panel_section_title = () =>{
    return $(
        "div",
        {
            style:__sC["dummy_div"]()
        },
        [
            $("p",{style:`color:${SYD_VAR.headerClr.get()};` + __sC["f_c_title"]({method:"add",style:{fontSize:__p(["subContainer","fontNormHeader"],"18px")}})},["Trending Tokens"])
        ]
    )
}

__SYD.swapToken_main__token_display_panel_section_mode = () =>{
    return $(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el1"]({method:"add" , style:{position:"relative" , padding:"unset" , justifyContent:"flex-start" , gap:"10px" , flexWrap:"wrap"}})
        },
        [
            __SYD.swapToken_main__token_display_panel_section_mode_modeGenerator({index:__p(["swapToken_main__token_display_panel_section_mode","index","tab1"],0) , type:"tab1"}),
            __SYD.swapToken_main__token_display_panel_section_mode_popup()
        ],
        {
            createState:{
                stateName:"swapToken_main__token_display_panel_section_mode",
                state:{
                    pop_tab_x:0,
                    currentTab:"tab1",
                    index:{tab1:0},
                    genericFilterChain:"all",
                    tabs_content:{
                        tab1:[
                            {name:"trending",type:"trend"},
                            {name:"marketCap",type:"mc"},
                            {name:"volume",type:"volume"},
                            {name:"price",type:"price"},
                        ]
                    }
                }
            }
        }
    )
}


__SYD.swapToken_main__token_display_panel_section_mode_modeGenerator = ({index , type = "tab1"} = {}) =>{
    let tab_data = __p(["swapToken_main__token_display_panel_section_mode" , "tabs_content"]);
    let name = "preset";
    if(tab_data)
    {
        name = tab_data[type][index].name;
    }else{
        if(type === "tab1") name = "trending"
    }

    return $(
        "div",
        {
            style:__sC.thinBorder()+__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el1_selectPlaceHolder"]({method:"add",style:{gap:"5px"}}) + `background:${SYD_VAR.tab_bg.get()};color:${SYD_VAR.greyText.get()};`
        },
        [
            $(
                "div",
                {
                    style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator"]({method:"add",style:{padding:"5px"}}) + `color:inherit;font-weight:500;font-size:${__p(["container" , "genRefFont_small"],"14px")};` + __sC["f_c_!interact"]()
                },[$("p",{style:__sC["f_c_camelCase"]()+"color:inherit;",class:"ascend"},[name])]
            ),
            $("span" , {style:__sC["mainPage__topTab__main_acc_sec_wallet_copy_sec__copyIcon"]({method:"add",style:{height:"14px",width:"14px" , fontSize:"14px" , color:"inherit" , backgroundImage:"url(./assets/images/down.svg)"}}) + __sC["f_c_!interact"]()},[],{genericStyle:["bg_cover"]})
        ],
        {
            type:`swapToken_main__token_display_panel_section_mode_modeGenerator_${type}`,
            events:{
                onmouseover:e =>{
                    if(e.target === __v[`swapToken_main__token_display_panel_section_mode_modeGenerator_${type}`]) e.target.style.color = "#ffffff";
                },
                onmouseout:e =>{
                    if(e.target === __v[`swapToken_main__token_display_panel_section_mode_modeGenerator_${type}`]) e.target.style.color = SYD_VAR.greyText.get()

                    updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"ex_bool" , value:false});

                    !__p(["swapToken_main__token_display_panel_section_mode_popup" , "ex_bool"]) && !__p(["swapToken_main__token_display_panel_section_mode_popup" , "self_bool"]) ? updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_display" , value:false}) : ""
                },
                onclick:e =>{
                    const element = e.target;
                    const parent = element.parentElement;
                    const x_rel = element.getBoundingClientRect().left - parent.getBoundingClientRect().left;

                    updateState({name:"swapToken_main__token_display_panel_section_mode" , prop:"currentTab" , value:type})

                    updateState({name:"swapToken_main__token_display_panel_section_mode" , prop:"pop_tab_x" , value:x_rel});

                    updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"ex_bool" , value:true});

                    __p(["swapToken_main__token_display_panel_section_mode_popup" , "ex_bool"]) ? updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_display" , value:true}) : ""
                }
            }
        }
    )
}


__SYD.swapToken_main__token_display_panel_section_mode_popup = () =>{
    function run(tab)
    {
        const el = [];
        // const label = __p(["swapToken_main__token_display_panel_section_mode" , "currentTab"],"tab1");
        const data = __p(["swapToken_main__token_display_panel_section_mode" , "tabs_content"],{
            tab1:[
                {name:"trending",type:"trend"},
                {name:"marketCap",type:"mc"},
                {name:"volume",type:"volume"},
                {name:"price",type:"price"},
            ]
        })[tab];

        if(data)
        {
            for(let i = 0; i < data.length; i++)
            {
                el.push(__SYD.swapToken_main__token_display_panel_section_mode_popup_el({type:tab , value:data[i].name , index:i}))
            }
        }
        return el;
    }

    return $(
        "div",
        {
            style:__sC["mainPage__topTab__main_wallet_adx_section"]({method:"add" , style:{background:SYD_VAR.tab_bg.get(),zIndex:"9999" , left:`${__p(["swapToken_main__token_display_panel_section_mode","pop_tab_x"],0)}px` , minWidth:"120px"}}) + swapToken_main__token_display_panel_section_mode_popup_displayState() + __sC["thinBorder"](),
            class:"tab_entry"
        },
        [
            $(
                "ul",
                {
                    style:__sC["mainPage__topTab__main_wallet_adx_section_ul"]() + `display:${__p(["swapToken_main__token_display_panel_section_mode" , "currentTab"],"tab1") === "tab1" ? "flex" : "none"}`
                },
                [
                    ...run("tab1")
                ]
            )
        ],
        {
            createState:{
                stateName:"swapToken_main__token_display_panel_section_mode_popup",
                state:{
                    self_display:false,
                    self_bool:false,
                    ex_bool:false
                }
            },
            events:{
                onmouseover:e =>{
                    if(!__p(["swapToken_main__token_display_panel_section_mode_popup" , "self_display"]))
                    {
                        updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_bool" , value:true});

                        __p(["swapToken_main__token_display_panel_section_mode_popup" , "self_bool"]) ? updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_display" , value:true}) : ""
                    }
                },
                onmouseout:e =>{
                    // if(e.target === __v["swapToken_main__token_display_panel_section_mode_popup"])
                    // {
                    updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_bool" , value:false});

                    !__p(["swapToken_main__token_display_panel_section_mode_popup" , "ex_bool"]) && !__p(["swapToken_main__token_display_panel_section_mode_popup" , "self_bool"]) ? updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_display" , value:false}) : ""
                    // }
                }
            }
        }
    )
}

__SYD.swapToken_main__token_display_panel_section_mode_popup_el = ({type = "" , value = "" , index}) =>{
    return $(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator"]({method:"add",style:{padding:"5px",width:"100%"}}) + `color:${SYD_VAR.greyText.get()};font-weight:500;font-size:${__p(["container" , "genRefFont_small"],"14px")};transition:all linear .3s;`
        },[$("p",{style:__sC["f_c_camelCase"]()+"color:inherit;"},[value])],
        {
            events:{
                onclick:async e =>{
                    //close pop up
                    updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_bool" , value:false});

                    !__p(["swapToken_main__token_display_panel_section_mode_popup" , "ex_bool"]) && !__p(["swapToken_main__token_display_panel_section_mode_popup" , "self_bool"]) ? updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_display" , value:false}) : "";
                    //close pop up

                    //clear def display array
                    updateState__({name:"trend" , prop:["tokenDisplay" , "currentDisplaying"] , value:[]});
                    updateState__({name:"swapToken_main__token_display_panel_section_mode" , prop:["index" , type] , value:index}); 


                    if(type === "tab1")
                    {
                        updateState__({name:"swapToken_main__token_display_panel_section_mode" , prop:["index" , type] , value:index});
                        updateState__({name:"trend" , prop:["tokenDisplay" , "show"] , value:false});
                        const data = __p(["swapToken_main__token_display_panel_section_mode" , "tabs_content" , type])[index];
                        if(data.type === "trend")
                        {
                            await fetchTokens_trending()
                        }else
                        {
                            await fetchTokens_page_mc_volume_price({type:data.type})
                        }
                    }
                },
                onmouseover:e =>{
                    e.target.style.color = "#ffffff";
                },
                onmouseout:e =>{
                    e.target.style.color = SYD_VAR.greyText.get();
                }
            }
        }
    )
}


__SYD.swapToken_main__token_display_panel_section_showTokens = () =>{
    return $(
        "div",
        {
            style:__sC["mainPage__topTab__main_wallet_adx_section_ul"]() + "gap:15px;padding-bottom:60px;"//re-used
        },
        [
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:0}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:1}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:2}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:3}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:4}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:5}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:6}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:7}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:8}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:9}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:10}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:11}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:12}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:13}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({id:14}),

            $(
                "div",
                {
                    style:__sC["dummy_div"]({method:"add" , style:{display:__p(["trend" , "tokenDisplay" , "currentDisplaying"],[""]).length === 0 ? "flex" : "none"}})
                },
                [
                    $("p",{style:__sC["f_c_camelCase"]()+`font-weight:900;color:${SYD_VAR.greyText.get()};`},["no token available"])
                ]
            )
        ]
    )
}



__SYD.swapToken_main__token_display_panel_section_showTokens_el = ({id = 0}) =>{
    let isReady = __p(["trend" , "tokenDisplay" , "show"],false);

    let data = {name:"" , logoUrl:"" , usdVal:"" , increment:"" , mc:"" , incrementClr:SYD_VAR.success.get() , platformLogo:"" , platform:"" , symbol:"" , tokenId:""};
    if(isReady)
    {
        const availableTokens = __p(["trend" , "tokenDisplay" , "tokens"]);
        if(availableTokens.length > id)
        {
            let {name , price , mc , logoUrl , platformLogo , platform , symbol , tokenId} = availableTokens[id];
            data = {name , usdVal:`$${price.usdVal}` , increment:`${price.increment>0 ? "+" : ""}${price.increment.toFixed(2)}%` , mc:`${mc} MC` , logoUrl , incrementClr:price.increment > 0 ? SYD_VAR.success.get() : SYD_VAR.err.get() , platformLogo , platform , symbol , tokenId};
        }else isReady = false;
    }

    return $(
        "div",
        {
            style:__sC["mainPage__mainDisplay_1_walletAdx_sec__main_wallet_el"]({method:"add" , style:{pointerEvents:`${isReady ? "auto" : "none"}` , fontSize:`${__p(["subContainer","fontHeader"],"13px")}`}}),
            class:"highlight_tab"
        },
        [
            $(
                "div",
                {
                    style:__sC["mainPage__topTab__main_acc_sec"]()//re-used
                },
                [
                    //token logo
                    $("div",{style:__sC["mainPage__mainDisplay_1_walletAdx_sec__main_wallet_el_logo"]({method:"add",style:{minHeight:"64px",minWidth:"64px",maxHeight:"64px",maxWidth:"64px"}}) + `background-image:url(${data.logoUrl});background-color:${SYD_VAR.tab_bg.get()}`},[],{genericStyle:["bg_fit"]}),
                    //token logo

                    //token name
                    $(
                        "div",
                        {
                            style:__sC["mainPage__topTab__main_acc_sec_name_acc"](),
                            title:`${data.name}\n${data.symbol}`
                        },
                        [
                            $("p" , {class:isReady ? "" : "skeleton-loader-long" , style:`color: #ffffff ;text-transform:capitalize;font-weight:700;` + __sC["ellipse_text"]()},[data.name]),

                            $("p" , {class:isReady ? "" : "skeleton-loader" , style:`color: ${SYD_VAR.greyText.get()} ;text-transform:capitalize;font-weight:300;`},[`${data.mc}`]),
                        ]
                    )
                ]
            ),

            $(
                "div",
                {
                    style:__sC["mainPage__topTab__main_acc_sec_name_acc"]() + "align-items:flex-end"
                },
                [
                    $("p" , {class:isReady ? "" : "skeleton-loader" , style:`color: #ffffff ;text-transform:capitalize;font-weight:300;`},[`${data.usdVal}`]),


                    $("p" , {class:isReady ? "" : "skeleton-loader" , style:`color: ${data.incrementClr} ;text-transform:capitalize;font-weight:900;font-size:${Number(__p(["subContainer","fontHeader"],"13px").split("px")[0])-1}px`},[`${data.increment}`]),
                ]
            )
        ],
        {
            type:`swapToken_main__token_display_panel_section_showTokens_el_${id}`,
            events:{
                onclick:async e=>{
                    if(isReady)
                    {
                        const graphMode = __p(["graphOptions_I","current"]);
                        updateState({name:"insight",prop:"tokenId",value:data.tokenId});

                        await fetchPerTokenGraph({tokenId:data.tokenId,day:daysMapping[graphMode],interval:intervalMapping[graphMode]});

                        await fetchPerTokenInfo({tokenId:data.tokenId});
                    }
                }
            }
        }
    )
}
//Trend tokens fetch
