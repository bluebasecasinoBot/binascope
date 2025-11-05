import { __bal, fetchTokens_page_mc_volume_price, fetchTokens_trending, gasFeeRequest, swapToken } from "./functionals.js";
import { mainPage__mainDisplay_1_walletAdx_sec__main_wallet__el__display, manageToken__display, swapToken_main__display, swapToken_main__token_display_panel_section_mode_popup_displayState, swapToken_main__wallet_setting_tabs__el__display, updateState, updateState__, updateState__bulk, updateState__push } from "./state_check.js";
import { __c, __sC, __SYD, SYD_VAR , __p, sydDOM, __v, $ } from "../sydneyDom_v3.js";

__SYD.swapToken_main = () =>{
    return __c(
        "div",
        {
            style:__sC["manageToken"]() + swapToken_main__display(),
            class:"base__tabs"
        },
        [
            // __SYD.mainPage__topTab(),
            // __SYD.swapToken_main__searchTab(),
            __SYD.swapToken_main_swap_el_main(),
            __SYD.swapToken_main__token_display_panel(),
            __SYD.swapToken_main__swapConfirm()
            // __SYD.swapToken_main__wallet_setting_tabs(),
            // __SYD.swapToken_main__bottom_tab()
        ],
        {
            createState:{
                stateName:"swapToken_main",
                state:{
                    swapNetworkTransit:false,
                    search_active:false,
                    search_value:"",
                    swapTabMode:"top", //programmatically switching tab position
                    swapTabsAnimation:"",
                    canSwap:false,
                    swap1:{
                        inputValue:0
                    },
                    swap2:{
                        inputValue:0
                    },
                    checkCanSwap:()=>{
                        if(__p(["swapToken_main_swap_el_main_el2" , "swap2" , "init"]) && __p(["swapToken_main_swap_el_main_el2" , "swap1" , "init"]))
                        {
                            updateState__bulk({name:"swapToken_main",task:s=>{
                                s.swap1.inputValue = 0;
                                s.swap2.inputValue = 0;
                                return s;
                            }})

                            updateState({name:"swapToken_main" , prop:"canSwap" , value:true});
                        }
                    },
                    resetSwap:()=>{
                        updateState__bulk({name:"swapToken_main_swap_el_main_el2",task:s=>{
                            s.swap1.init = false;
                            s.swap2.init = false;
                            return s;
                        }});
                        updateState__bulk({name:"swapToken_main",task:s=>{
                            s.swap1.inputValue = 0;
                            s.swap2.inputValue = 0;
                            s.canSwap = false;
                            return s;
                        }})

                        console.log("swap reset bro")
                    },
                    tokenDisplay:{
                        show:false,
                        currentDisplaying:[],
                        tokens:[],
                        maxDisplaySize:10
                    }
                }
            }
        }
    )
}

__SYD.swapToken_main_swap_el_main = () =>{
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main"]() + `background:${SYD_VAR.nav_bg.get()};`+__sC["thinBorder"]() 
        },
        [
            __SYD.swapToken_main_swap_el_main_el1(),
            __SYD.swapToken_main_swap_el_main_el2(),
            __SYD.swapToken_main_main_swap_button()
        ]
    )
}

__SYD.swapToken_main_swap_el_main_el1 = () =>{ //hold swap text and swap settings icons
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el1"]()
        },
        [
            __c("p" , {style:`pointer-events:none;text-align:left;width:fit-content;color:${SYD_VAR.darkThemeText1.get()};`} , ["Swap"]),
            __c(
                "div",
                {
                    style:"height:fit-content;width:fit-content;position:relative;",
                    tabindex:"0"
                },
                [
                    $(
                        "span",
                        {style:__sC["mainPage__topTab__main_acc_sec_wallet_copy_sec__copyIcon"]({method:"add",style:{height:"20px",width:"20px" , display:"block" , fontSize:"20px" , backgroundImage:"url(./assets/image/gear.svg)"}})},[],{genericStyle:["bg_fit"]}
                    ),
                    __SYD.swapSetting()
                ],
                {
                    type:"swapSetting_parent",
                    events:{
                        onclick:()=>{
                            updateState__bulk({name:"swapSetting",task:s=>{
                                s.display = true;
                                s.animation = "enter-bottom_setting"
                                return s;
                            }})
                        },
                        onblur:()=>{
                            if(!__p(["swapSetting","infoDisplay"],false))
                            {
                                updateState({name:"swapSetting",prop:"animation",value:"enter-top_setting"})
                                setTimeout(() => {
                                    updateState({name:"swapSetting",prop:"display",value:false})
                                }, 700);
                            }
                        }
                    }
                }
            )
        ]
    )
}


__SYD.swapToken_main_swap_el_main_el2 = () =>{//hold swap tabs
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el2"]()
        },
        [
            __SYD.swapToken_main_swap_el_main_el2_mainTab_swap({type:__p(["swapToken_main" , "swapTabMode"],"top") === "top" ? "main" : "aux"}),
            __SYD.swapToken_main_swap_el_main_el2_mainTab_swap({type:__p(["swapToken_main" , "swapTabMode"],"top") === "top" ? "aux" : "main"}),
        ],
        {
            createState:{
                stateName:"swapToken_main_swap_el_main_el2",
                state:{
                    swap1:{
                        init:false,
                        inputBox:[],
                        currentBoxWidth:40,
                        // inputValue:0,
                        utils:{
                            chainName:"",
                            mne:"eth",
                            icon:"./assets/defaultToken.svg",
                            tokenId:"",
                            ca:"",
                            bal:0,
                            xChangeFee:1
                        }
                    },
                    swap2:{
                        init:false,
                        inputBox:[],
                        currentBoxWidth:40,
                        // inputValue:0,
                        utils:{
                            chainName:"",
                            mne:"btc",
                            icon:"./assets/defaultToken.svg",
                            tokenId:"",
                            ca:"",
                            bal:0,
                            xChangeFee:1
                        }
                    }
                }
            }
        }
    )
}

__SYD.swapToken_main_main_swap_button = () =>{
    let active = true;
    if(__p(["swapToken_main" , "canSwap"],false))
    {
        active = __p(["swapToken_main" , "swap1" , "inputValue"],0) <= 0 ? false : true;
    }
    return __c(
        "div",
        {
            style:__sC["login_signup__submit_button"]()+__sC["thinBorder"]() + `background:${SYD_VAR.mainTheme.get()};color:#000000;display:flex;opacity:${active ? "1" : ".6"};cursor:${active ? "pointer" : "not-allowed"}`,
            class:"ascend"
        },
        [
            "Connect"
        ],
        {
            events:{
                onclick:e =>{
                    updateState__bulk({name:"wallet_connect",task:s=>{
                        s.display = true;
                        s.animation = "enter-bottom_setting";
                        return s;
                    }});
                    __v["wallet_main"].focus()
                }
            }
        }
    )
}


__SYD.swapToken_main_swap_el_main_el2_swapIcon_holder = ({type}) =>{
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el2_swapIcon_holder"]() + `display:${type === "main" ? "flex" : "none"};border:5px solid ${SYD_VAR.nav_bg.get()};background:${SYD_VAR.darkTheme.get()};color:${SYD_VAR.darkThemeText1.get()};` + __sC[__p(["swapToken_main" , "swapTabMode"],"top") === "top" ? "swapToken_main_swap_el_main_el2_swapIcon_holder_custom1" : "swapToken_main_swap_el_main_el2_swapIcon_holder_custom2"]()
        },
        [
            $(
                "span",
                {style:__sC["mainPage__topTab__main_acc_sec_wallet_copy_sec__copyIcon"]({method:"add",style:{height:"20px",width:"20px" , display:"block" , fontSize:"20px" , backgroundImage:"url(./assets/image/swap.svg)"}})},[],{genericStyle:["bg_fit"]}
            )
        ],
        {
            events:{
                onmouseover:e =>{
                    e.target.style.color = "#ffffff"
                },
                onmouseout:e =>{
                    e.target.style.color = SYD_VAR.darkThemeText1.get()
                },
                onclick:e =>{
                    // updateState({name:"swapToken_main" , prop:"swapTabMode" , value:__p(["swapToken_main" , "swapTabMode"],"top") === "top" ? "down" : "top"});

                    const mainState = __p(["swapToken_main_swap_el_main_el2"],{})

                    const swap1_utils = mainState.swap2.utils;
                    const swap2_utils = mainState.swap1.utils;

                    updateState__({name:"swapToken_main_swap_el_main_el2" , prop:["swap1" , "utils"] , value:swap1_utils});

                    updateState__({name:"swapToken_main_swap_el_main_el2" , prop:["swap2" , "utils"] , value:swap2_utils});

                    const event = new MouseEvent('input', {
                            bubbles: false,
                            cancelable: false,
                            view: window
                        });
                    __v[`swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHoldermain`].dispatchEvent(event)

                    // updateState({name:"swapToken_main" , prop:"swapTabsAnimation" , value:"swap__tabs_entry"});

                    // let timer = setTimeout(() => {
                    //     updateState({name:"swapToken_main" , prop:"swapTabsAnimation" , value:""});
                    //     clearTimeout(timer);
                    // }, 700);
                }
            }
        }
    )
}

__SYD.swapToken_main_swap_el_main_el2_mainTab_swap = ({type = "main"}={}) =>{
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen"]() + (type === "main" ? __sC["swapToken_main_swap_el_main_el2_mainTab_swap1"]() : "") + `background:${SYD_VAR.darkTheme.get()};`+__sC["thinBorder"]() ,
            class:__p(["swapToken_main" , "swapTabsAnimation"],"")
        },
        [
            $(
                "div",
                {
                    style:__sC["row-center"]({method:"add",style:{justifyContent:"space-between"}})
                },
                [
                    __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1_selectPlaceHolder({type}),
                    $(
                        "div",
                        {style:__sC["col-start"]({method:"add",style:{gap:"20px",alignItems:"flex-end"}})},
                        [
                            __c(
                                "div",{style:__sC["dummy_div"]()},[
                                    __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHolder({type})
                                ]
                            ),
                            __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el3({type})
                        ]
                    )
                ]
            ),
            // __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1({type}),
            // // __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el2({type}),
            __SYD.swapToken_main_swap_el_main_el2_swapIcon_holder({type}),
            // __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el3({type}),
            // __SYD.swapToken_main_swap_el_main_el2_swapIcon_holder()
        ]
    )
}

__SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1 = ({type}) =>{ //assets select tab
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el1"]({method:"add",style:{padding:"unset"}}), //Reused style here
            class:"ascend"
        },
        [
            __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1_selectPlaceHolder({type}),
            __c(
                "div",{style:__sC["dummy_div"]()},[
                    __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHolder({type})
                ]
            )
        ]
    )
}


__SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1_selectPlaceHolder = ({type}) =>{
    const util_info = {icon:"./assets/image/logo_favicon.png" , mne:"select"};
    let tokenType = "";
    if(__p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "init"],false))
    {
        const data = __p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "utils"]);
        util_info.icon = data.icon;
        util_info.mne = data.mne;
        tokenType = data.mne;
    }
    // const util_info = __p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "utils"],{icon:"./assets/defaultToken.svg" , mne:"select"});

    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el1_selectPlaceHolder"]() + `background:${SYD_VAR.nav_bg.get()}`
        },
        [
            __c("div",{style:`min-height:25px;min-width:25px;border-radius:50%;background-image:url(${util_info.icon});position:relative;`},[
                // __SYD.skibidi_smallIcon({tokenType})
            ],{genericStyle:["bg_fit"]}),
            __c("p" , {style:`text-transform:capitalize;pointer-events:none;text-align:left;width:fit-content;color:${SYD_VAR.darkThemeText1.get()};`} , [`${util_info.mne}`]),
            __c("i" , {class:"fa-solid fa-caret-down" , style:__sC["mainPage__topTab__main_acc_sec_wallet_copy_sec__copyIcon"]({method:"add",style:{height:"14px",width:"14px" , fontSize:"14px" , color:SYD_VAR.darkThemeText1.get()}})},[])
        ],
        {
            events:{
                onclick:()=>{

                    updateState__bulk({name:"select_cont",task:s=>{
                        s.display = true;
                        s.animation = "enter-bottom_setting";
                        s.mode = type;
                        return s;
                    }});
                    __v["select_main"].focus()
                },
            }
        }
    )
}

__SYD.skibidi_smallIcon = ({tokenType}) =>{
    return __c("span",{style:`position:absolute;bottom:0px;left:50%;height:15px;width:15px;border-radius:10px;background-image:url(../assets/image/logo_favicon.png);border:1px solid ${SYD_VAR.darkTheme.get()};display:${tokenType === "base" ? "block" : "none"};`},[],{genericStyle:["bg_cover"]})
}


__SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHolder = ({type}) =>{
    const boxValue = __p(["swapToken_main" , type === "main" ? "swap1" : "swap2" , "inputValue"],"");

    const boxWidth = __p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "currentBoxWidth"],40);

    return __c(
        "input",
        {
            style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHolder"]({method:"add" , style:{width:`${boxWidth}px`}}) + `color:${SYD_VAR.darkThemeText1.get()};font-weight:900;`,
            class:"swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHolder",
            placeholder:"0.0",
            type:"text",
            min:"0",
            value:boxValue === 0 ? "" : boxValue
            // ...(()=>{return type === "main" ? {} : {"readonly":"true"}})()
        },[

        ],
        {
            type:`swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHolder${type}`,
            events:{
                oninput:e =>{
                    let content = e.target.value;
                    if(isNaN(Number(e.target.value)))
                    {
                        e.target.value = __p(['swapToken_main' , type === "main" ? "swap2" : "swap1" , "inputValue"])
                    }else
                    {
                        if(Number(content) < 0)
                        {
                            e.target.value = 0;
                            content = `0`;
                        };

                        if(type === "main")
                        {
                            const maxBal = __p(["swapToken_main_swap_el_main_el2","swap1","utils","bal"]);
                            if(Number(content) > maxBal)
                            {
                                e.target.value = maxBal;
                                content = `${maxBal}`
                            }

                        }

                        const scrollWidth = e.target.scrollWidth;

                        if(scrollWidth < 100)
                        {
                            // e.target.style.width = `${scrollWidth}px`;
                            updateState__({name:"swapToken_main_swap_el_main_el2" , prop:[type === "main" ? "swap1" : "swap2" , "currentBoxWidth"] , value:scrollWidth});

                            if(__p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "inputBox"],[]).length <= content.length)
                            {
                                updateState__push({name:"swapToken_main_swap_el_main_el2" , prop:[type === "main" ? "swap1" : "swap2" , "inputBox"] , value:scrollWidth});

                            }else
                            {
                                // e.target.style.width = `${__p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "inputBox"],[])[content.length]}px`;

                                updateState__({name:"swapToken_main_swap_el_main_el2" , prop:[type === "main" ? "swap1" : "swap2" , "currentBoxWidth"] , value:__p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "inputBox"],[])[content.length]});
                            }
                        }else{
                            content = content.split("");
                            content.splice(content.length-1 , 1);
                            content = content.join("");
                            e.target.value = content;
                        }

                        const rate1 = __p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2" , "utils" , "xChangeFee"]);
                        const rate2 = __p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap2" : "swap1" , "utils" , "xChangeFee"]);
                        const converted = ((rate1/rate2) * Number(content)).toFixed(6);

                        if(type !== "main")
                        {
                            const maxBal = __p(["swapToken_main_swap_el_main_el2","swap1","utils","bal"]);
                            if(converted > maxBal)
                            {
                                e.target.value = (maxBal * (rate2 / rate1)).toFixed(6);
                                content = (maxBal * (rate2 / rate1)).toFixed(6);
                            }
                        }
                        updateState__bulk({name:"swapToken_main_swap_el_main_el2",task:s=>{
                            s[type === "main" ? "swap2" : "swap1"].inputBox = [40, 40, 40, 45, 56, 67, 78, 89];
                            s[type === "main" ? "swap2" : "swap1"].currentBoxWidth = 89;
                            return s;
                        }})

                        // updateState__bulk({name:"swapToken_main",task:s=>{
                        //     console.log(s)
                        //     if(type !== "main")
                        //     {
                        //         s[type === "main" ? "swap2" : "swap1"].inputValue = Math.min(converted , __p(["swapToken_main_swap_el_main_el2","swap1","utils","bal"]));
                        //     }else {
                        //         s[type === "main" ? "swap2" : "swap1"].inputValue = converted;
                        //     }
                            
                        //     return s;
                        // }})

                        // updateState__({name:"swapToken_main" , prop:[type === "main" ? "swap1" : "swap2" , "inputValue"] , value:Number(content) === 0 ? "" : Number(content)});
                    }
                }
            }
        }
    )
}


__SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el2 = ({type}) =>{
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el1"]({method:"add" , style:{padding:"unset" , justifyContent:"flex-start" , gap:"10px" , display:type === "main" ? "flex" : "none"}}),
            class:"ascend"
        },
        [
            __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator({name:"25%" , type:"half/half" , parent:type}),
            __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator({name:"50%" , type:"half" , parent:type}),
            __SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator({name:"max" , type:"full" , parent:type}),
        ]
    )
}

__SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator = ({name = "max" , type = "full" , parent} = {}) =>{
    return __c(
        "div",
        {
            style:__sC["dummy_div"]({method:"add",style:{color:SYD_VAR.darkThemeText1.get(),cursor:"pointer"}})
        },
        [
            __c(
                "div",
                {
                    style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator"]() + `color:inherit;background:${SYD_VAR.nav_bg.get()};` + `font-weight:500;font-size:${__p(["container" , "genRefFont_small"],"14px")};` + __sC["f_c_!interact"]()
                },[__c("p",{style:__sC["f_c_camelCase"]({method:"add",style:{color:"inherit"}})},[name])]
            )
        ],
        {
            type:`swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator_${name}_${parent}`,
            events:{
                onclick:e =>{
                    //do something here
                    const bal = __p(["swapToken_main_swap_el_main_el2" , "swap1" , "utils" , "bal"]);
                    let updated = bal;
                    if(bal > 0)
                    {
                        if(type === "half") updated = bal * 0.5;
                        else if(type === "half/half") updated = bal * .25;
                        updateState__({name:"swapToken_main" , prop:["swap1" , "inputValue"] , value:updated});
                        // updateState__bulk({name:"swapToken_main" , task:s=>{
                        //     return s;
                        // }})

                        const event = new MouseEvent('input', {
                            bubbles: false,
                            cancelable: false,
                            view: window
                        });
                        __v["swapToken_main_swap_el_main_el2_mainTab_gen_el1_amountHoldermain"].dispatchEvent(event);
                    }
                },
                onmouseover:e =>{
                    if(e.target === __v[`swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator_${name}_${parent}`])e.target.style.color = "#ffffff"
                },
                onmouseout:e =>{
                    if(e.target === __v[`swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator_${name}_${parent}`])e.target.style.color = SYD_VAR.darkThemeText1.get()
                }
            }
        }
    )
}


__SYD.swapToken_main_swap_el_main_el2_mainTab_gen_el3 = ({type}) =>{
    let balVal = 0;
    let nativeCurrency = "Eth";
    let dollRate = 1.0;//xchange rate of native token and dolls;
    let inputVal = 0;
    const data = __p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2"]);
    if(data)
    {
        if(data.init)
        {
            balVal = data.utils.bal;
            nativeCurrency = data.utils.mne;
            dollRate = data.utils.xChangeFee;
            inputVal = __p(["swapToken_main" , type === "main" ? "swap1" : "swap2" , "inputValue"]);
        }
    }

    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el1"]({method:"add",style:{padding:"unset"}}) + `color:${SYD_VAR.darkThemeText1.get()};`
        },
        [
            // __c(
            //     "div",
            //     {
            //         style:__sC["dummy_div"]()
            //     },
            //     [
            //         __c("p",{style:`font-weight:500;font-size:${__p(["container" , "genRefFont_small"],"14px")};`},[`Balance: ${(balVal).toFixed(8)} ${nativeCurrency}`])
            //     ]
            // ),
            __c(
                "div",
                {
                    style:__sC["dummy_div"]({method:"add",style:{width:"100%"}})
                },
                [
                    __c("p",{style:`width:100%;text-align:right;font-weight:500;font-size:${__p(["container" , "genRefFont_small"],"14px")};`},[`~ $ ${(inputVal * dollRate).toFixed(2)}`])
                ]
            )
        ]
    )
}

//Tab for displaying latest tokens based on user's preference
__SYD.swapToken_main__token_display_panel = () =>{
    return __c(
        "div",
        {
            style:__sC["mainPage__mainDisplay_1_walletAdx_sec"]({method:"add",style:{gap:"15px"}})
        },
        [
            __SYD.swapToken_main__token_display_panel_section_title(),
            __SYD.swapToken_main__token_display_panel_section_mode(),
            __SYD.swapToken_main__token_display_panel_section_showTokens()
        ]
    )
}

__SYD.swapToken_main__token_display_panel_section_title = () =>{
    return __c(
        "div",
        {
            style:__sC["dummy_div"]()
        },
        [
            __c("p",{style:`color:${SYD_VAR.darkThemeText1.get()};` + __sC["f_c_title"]()},["Tokens"])
        ]
    )
}

__SYD.swapToken_main__token_display_panel_section_mode = () =>{
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el1"]({method:"add" , style:{position:"relative" , padding:"unset" , justifyContent:"flex-start" , gap:"10px" , flexWrap:"wrap"}})
        },
        [
            __SYD.swapToken_main__token_display_panel_section_mode_modeGenerator({index:__p(["swapToken_main__token_display_panel_section_mode","index","tab1"],0) , type:"tab1"}),
            __SYD.swapToken_main__token_display_panel_section_mode_modeGenerator({index:__p(["swapToken_main__token_display_panel_section_mode","index","tab2"],5) , type:"tab2"}),
            __SYD.swapToken_main__token_display_panel_section_mode_modeGenerator({index:__p(["swapToken_main__token_display_panel_section_mode","index","tab3"],1) , type:"tab3"}),
            __SYD.swapToken_main__token_display_panel_section_mode_popup()
        ],
        {
            createState:{
                stateName:"swapToken_main__token_display_panel_section_mode",
                state:{
                    pop_tab_x:0,
                    currentTab:"tab1",
                    index:{tab1:0,tab2:5,tab3:1},
                    genericFilterChain:"all",
                    tabs_content:{
                        tab1:[
                            {name:"trending",type:"trend"},
                            {name:"marketCap",type:"mc"},
                            {name:"volume",type:"volume"},
                            {name:"price",type:"price"},
                        ],
                        tab2:[
                            {name:"bitcoin",type:"bitcoin"},
                            {name:"ethereum",type:"ethereum"},
                            {name:"solana",type:"solana"},
                            {name:"polygon",type:"polygon"},
                            {name:"sui",type:"sui"},
                            {name:"all networks",type:"all"},
                        ],
                        tab3:[
                            {name:"1h",type:"1h"},
                            {name:"24h",type:"24h"},
                            {name:"7d",type:"7d"},
                            {name:"30d",type:"30d"}
                        ],
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
        else if(type === "tab2") name = "all networks"
        else if(type === "tab3") name = "24h"
    }

    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el1_selectPlaceHolder"]({method:"add",style:{gap:"5px"}}) + `background:${SYD_VAR.nav_bg.get()};color:${SYD_VAR.darkThemeText1.get()};`
        },
        [
            __c(
                "div",
                {
                    style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator"]({method:"add",style:{padding:"5px"}}) + `color:inherit;font-weight:500;font-size:${__p(["container" , "genRefFont_small"],"14px")};` + __sC["f_c_!interact"]()
                },[__c("p",{style:__sC["f_c_camelCase"]()+"color:inherit;",class:"ascend"},[name])]
            ),
            __c("i" , {class:"fa-solid fa-caret-down" , style:__sC["mainPage__topTab__main_acc_sec_wallet_copy_sec__copyIcon"]({method:"add",style:{height:"14px",width:"14px" , fontSize:"14px" , color:"inherit"}}) + __sC["f_c_!interact"]()},[])
        ],
        {
            type:`swapToken_main__token_display_panel_section_mode_modeGenerator_${type}`,
            events:{
                onmouseover:e =>{
                    if(e.target === __v[`swapToken_main__token_display_panel_section_mode_modeGenerator_${type}`]) e.target.style.color = "#ffffff";
                },
                onmouseout:e =>{
                    if(e.target === __v[`swapToken_main__token_display_panel_section_mode_modeGenerator_${type}`]) e.target.style.color = SYD_VAR.darkThemeText1.get()

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
        const data = __p(["swapToken_main__token_display_panel_section_mode" , "tabs_content"],{tab1:[
            {name:"trending",type:"trend"},
            {name:"marketCap",type:"mc"},
            {name:"volume",type:"volume"},
            {name:"price",type:"price"},
        ],
        tab2:[
            {name:"bitcoin",type:"bitcoin"},
            {name:"ethereum",type:"ethereum"},
            {name:"solana",type:"solana"},
            {name:"polygon",type:"polygon"},
            {name:"sui",type:"sui"},
            {name:"all networks",type:"all"},
        ],
        tab3:[
            {name:"1h",type:"1h"},
            {name:"24h",type:"24h"},
            {name:"7d",type:"7d"},
            {name:"30d",type:"30d"}
        ],})[tab];

        if(data)
        {
            for(let i = 0; i < data.length; i++)
            {
                el.push(__SYD.swapToken_main__token_display_panel_section_mode_popup_el({type:tab , value:data[i].name , index:i}))
            }
        }
        return el;
    }

    return __c(
        "div",
        {
            style:__sC["mainPage__topTab__main_wallet_adx_section"]({method:"add" , style:{zIndex:"9999" , left:`${__p(["swapToken_main__token_display_panel_section_mode","pop_tab_x"],0)}px` , minWidth:"120px"}}) + swapToken_main__token_display_panel_section_mode_popup_displayState() + __sC["outlined_tab"](),
            class:"tab_entry"
        },
        [
            __c(
                "ul",
                {
                    style:__sC["mainPage__topTab__main_wallet_adx_section_ul"]() + `display:${__p(["swapToken_main__token_display_panel_section_mode" , "currentTab"],"tab1") === "tab1" ? "flex" : "none"}`
                },
                [
                    ...run("tab1")
                ]
            ),
            __c(
                "ul",
                {
                    style:__sC["mainPage__topTab__main_wallet_adx_section_ul"]() + `display:${__p(["swapToken_main__token_display_panel_section_mode" , "currentTab"],"tab1") === "tab2" ? "flex" : "none"}`
                },
                [
                    ...run("tab2")
                ]
            ),
            __c(
                "ul",
                {
                    style:__sC["mainPage__topTab__main_wallet_adx_section_ul"]() + `display:${__p(["swapToken_main__token_display_panel_section_mode" , "currentTab"],"tab1") === "tab3" ? "flex" : "none"}`
                },
                [
                    ...run("tab3")
                ]
            ),
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
    return __c(
        "div",
        {
            style:__sC["swapToken_main_swap_el_main_el2_mainTab_gen_el2_btnGenerator"]({method:"add",style:{padding:"5px",width:"100%"}}) + `color:${SYD_VAR.darkThemeText1.get()};font-weight:500;font-size:${__p(["container" , "genRefFont_small"],"14px")};transition:all linear .3s;`
        },[__c("p",{style:__sC["f_c_camelCase"]()+"color:inherit;"},[value])],
        {
            events:{
                onclick:async e =>{
                    //close pop up
                    updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_bool" , value:false});

                    !__p(["swapToken_main__token_display_panel_section_mode_popup" , "ex_bool"]) && !__p(["swapToken_main__token_display_panel_section_mode_popup" , "self_bool"]) ? updateState({name:"swapToken_main__token_display_panel_section_mode_popup" , prop:"self_display" , value:false}) : "";
                    //close pop up

                    //clear def display array
                    updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "currentDisplaying"] , value:[]});
                    updateState__({name:"swapToken_main__token_display_panel_section_mode" , prop:["index" , type] , value:index}); 


                    if(type === "tab1")
                    {
                        updateState__({name:"swapToken_main__token_display_panel_section_mode" , prop:["index" , type] , value:index});
                        updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "show"] , value:false});
                        const data = __p(["swapToken_main__token_display_panel_section_mode" , "tabs_content" , type])[index];
                        if(data.type === "trend")
                        {
                            await fetchTokens_trending()
                        }else
                        {
                            await fetchTokens_page_mc_volume_price({type:data.type})
                        }
                    }else if(type === "tab2")
                    {

                        console.log(__p(["swapToken_main__token_display_panel_section_mode" , "index" , type]))
                        updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "show"] , value:false});
                        
                        // let timer = setTimeout(() => {
                            updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "show"] , value:true});   
                        //     clearTimeout(timer);                        
                        // }, 300);
                    }

                    // const availableTokens = __p(["swapToken_main" , "tokenDisplay" , "tokens"]);

                    // const contents_data = __p(["swapToken_main__token_display_panel_section_mode" , "tabs_content"]);

                    // if(contents_data["tab2"][index].type !== "all")
                    // {   
                    //     for(let i = 0; i < availableTokens.length; i++)
                    //     {
                        
                    //         let dispState_network = availableTokens[i].platform.toLowerCase() === contents_data["tab2"][index].type.toLowerCase() ? true : false;
                    //         if(dispState_network && i < __p(["swapToken_main" , "tokenDisplay" , "maxDisplaySize"]))
                    //         {
                    //             updateState__push({name:"swapToken_main" , prop:["tokenDisplay" , "currentDisplaying"] , value:i});
                    //         }
                    //     }
                    // }else updateState__({name:"swapToken_main" , prop:["tokenDisplay" , "currentDisplaying"] , value:[""]});
                    
                    // console.log(__p(["swapToken_main" , "tokenDisplay" , "currentDisplaying"]));
                },
                onmouseover:e =>{
                    e.target.style.color = "#ffffff";
                },
                onmouseout:e =>{
                    e.target.style.color = SYD_VAR.darkThemeText1.get();
                }
            }
        }
    )
}


__SYD.swapToken_main__token_display_panel_section_showTokens = () =>{
    return __c(
        "div",
        {
            style:__sC["mainPage__topTab__main_wallet_adx_section_ul"]() + "gap:15px;padding-bottom:60px;"//re-used
        },
        [
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:0}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:1}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:2}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:3}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:4}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:5}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:6}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:7}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:8}),
            __SYD.swapToken_main__token_display_panel_section_showTokens_el({tokenId:9}),
            __c(
                "div",
                {
                    style:__sC["dummy_div"]({method:"add" , style:{display:__p(["swapToken_main" , "tokenDisplay" , "currentDisplaying"],[""]).length === 0 ? "flex" : "none"}})
                },
                [
                    __c("p",{style:__sC["f_c_camelCase"]()+`font-weight:900;color:${SYD_VAR.darkThemeText1.get()};`},["no token available"])
                ]
            )
        ]
    )
}



__SYD.swapToken_main__token_display_panel_section_showTokens_el = ({tokenId = 0}) =>{
    let isReady = __p(["swapToken_main" , "tokenDisplay" , "show"],false);

    let data = {name:"" , logoUrl:"" , usdVal:"" , increment:"" , mc:"" , incrementClr:"#EA3943" , platformLogo:"" , platform:""};
    if(isReady)
    {
        const availableTokens = __p(["swapToken_main" , "tokenDisplay" , "tokens"]);
        if(availableTokens.length > tokenId)
        {
            let {name , price , mc , logoUrl , platformLogo , platform} = availableTokens[tokenId];
            data = {name , usdVal:`$${price.usdVal.toFixed(8)}` , increment:`${price.increment>0 ? "+" : ""}${price.increment.toFixed(2)}%` , mc:`${mc} MC` , logoUrl , incrementClr:price.increment > 0 ? "#16C784" : "#EA3943" , platformLogo , platform};
        }else isReady = false;
    }

    const checkDisplayState = () =>{
        const index = __p(["swapToken_main__token_display_panel_section_mode" , "index" , "tab2"],5);
        let dispState_network = true;
        const contents_data = __p(["swapToken_main__token_display_panel_section_mode" , "tabs_content"]);
        if(contents_data)
        {
            if(contents_data["tab2"][index].type !== "all" && isReady)
            {
                dispState_network = data.platform.toLowerCase() === contents_data["tab2"][index].type.toLowerCase() ? true : false;
                console.log(dispState_network)
            }
        }
        return dispState_network;
    }

    return __c(
        "div",
        {
            style:__sC["mainPage__mainDisplay_1_walletAdx_sec__main_wallet_el"]({method:"add" , style:{pointerEvents:`${isReady ? "auto" : "none"}` , fontSize:`${__p(["container" , "genRefFont_small"],"14px")}`}}) + `display:${checkDisplayState() ? "flex" : "none"};`,
            class:"button_hover__sp1"
        },
        [
            __c(
                "div",
                {
                    style:__sC["mainPage__topTab__main_acc_sec"]()//re-used
                },
                [
                    //token logo
                    __c("div",{style:__sC["mainPage__mainDisplay_1_walletAdx_sec__main_wallet_el_logo"]({method:"add",style:{minHeight:"64px",minWidth:"64px",maxHeight:"64px",maxWidth:"64px"}}) + `background-image:url(${data.logoUrl});background-color:${SYD_VAR.darkTheme.get()}`},[
                        __c("span",{style:`position:absolute;bottom:0px;left:50%;height:25px;width:25px;border-radius:10px;background-color:${SYD_VAR.nav_bg.get()};background-image:url(${data.platformLogo});border:2px solid ${SYD_VAR.darkTheme.get()}`},[],{genericStyle:["bg_cover"]})
                    ],{genericStyle:["bg_fit"]}),
                    //token logo

                    //token name
                    __c(
                        "div",
                        {
                            style:__sC["mainPage__topTab__main_acc_sec_name_acc"](),
                            title:`${data.name}\n${data.platform}`
                        },
                        [
                            __c("p" , {class:isReady ? "" : "skeleton-loader-long" , style:`color: #ffffff ;text-transform:capitalize;font-weight:700;` + __sC["ellipse_text"]()},[data.name]),

                            __c("p" , {class:isReady ? "" : "skeleton-loader" , style:`color: ${SYD_VAR.darkThemeText1.get()} ;text-transform:capitalize;font-weight:300;`},[`${data.mc}`]),
                        ]
                    )
                ]
            ),

            __c(
                "div",
                {
                    style:__sC["mainPage__topTab__main_acc_sec_name_acc"]() + "align-items:flex-end"
                },
                [
                    __c("p" , {class:isReady ? "" : "skeleton-loader" , style:`color: #ffffff ;text-transform:capitalize;font-weight:300;`},[`${data.usdVal}`]),


                    __c("p" , {class:isReady ? "" : "skeleton-loader" , style:`color: ${data.incrementClr} ;text-transform:capitalize;font-weight:900;font-size:${Number(__p(["container" , "genRefFont_small"],"14px").split("px")[0])-1}px`},[`${data.increment}`]),
                ]
            )
        ],
        {
            type:`swapToken_main__token_display_panel_section_showTokens_el_${tokenId}`
        }
    )
}



__SYD.swapToken_main__swapConfirm = () =>{
    return __c(
        "div",
        {
            style:__sC["login_signup_main"]({method:"add",style:{position:"fixed",top:"0px",left:"0px"}}) + `display:${__p(["swapToken_main__swapConfirm" , "display"],false) ? "flex" : "none"}`
        },
        [
            __SYD.swapToken_main__swapConfirm__main(),
        ],
        {
            createState:{
                stateName:"swapToken_main__swapConfirm",
                state:{
                    display:false
                }
            }
        }
    )
}


__SYD.swapToken_main__swapConfirm__main = () =>{
    return __c(
        "div",
        {
            style:__sC["login_signup__tab_container"]({method:"add",style:{position:"relative",display:"flex" , flexDirection:"column",gap:"30px",maxHeight:"600px" , maxWidth:"600px" , padding:"30px"}}) + `background-color:${SYD_VAR.nav_bg.get()};` + __sC["login_signup_main"]({method:"use",style:["alignItems","flexDirection"]}),
            class:"tab_entry"
        },
        [
            __c("i" , {class:"fa-solid fa-circle-xmark" , style:__sC["mainPage__topTab__main_acc_sec_wallet_copy_sec__copyIcon"]({method:"add",style:{height:"20px",width:"20px" , color:SYD_VAR.darkThemeText1.get() , fontSize:"20px",position:"absolute",top:"15px",right:"15px" , zIndex:"200"}})},[],{
                    events:{
                    onclick:()=>{
                        updateState__bulk({name:"swapToken_main__swapConfirm",task:s=>{
                            s.display = false;
                            return s;
                        }})
                    }
                }
            }),
            __c(
                "div",
                {
                    style:__sC["login_signup__tab__inputs"]({method:"add",style:{gap:"70px",position:"relative"}})
                },
                [
                    __SYD.swapToken_main__swapConfirm__main_tokenDisplay(),
                    __SYD.swapToken_main__swapConfirm__main_tokenPartition(),
                    //animation stream to show flow from token 1 to token 2
                    __SYD.swapToken_main__swapConfirm__main_tokenDisplay({type:"aux"}),
                ]
            ),
            __c(
                "div",
                {
                    style:"display:flex;gap:5px;width:100%;"
                },
                [
                    __c(
                        "div",
                        {
                            style:__sC["login_signup__submit_button"]({method:"add" , style:{opacity:__p(["swapToken_main" , "swapNetworkTransit"],false) ? ".5" : "1" , cursor:__p(["swapToken_main" , "swapNetworkTransit"],false) ? "not-allowed" : "pointer" , height:"40px" , fontWeight:"400" , borderRadius:"7px" , fontSize:`${__p(["container" , "genRefFont_small"],"14px")}` , background:SYD_VAR.darkTheme.get() , color:SYD_VAR.darkThemeText1.get()}})
                        },
                        [
                            "cancel"
                        ],
                        {
                            events:{
                                onclick:()=>{
                                    if(!__p(["swapToken_main" , "swapNetworkTransit"],false))
                                    {
                                        updateState__bulk({name:"swapToken_main__swapConfirm",task:s=>{
                                            s.display = false;
                                            return s;
                                        }})
                                    }
                                }
                            }
                        }
                    ),
                    __c(
                        "div",
                        {
                            style:__sC["login_signup__submit_button"]({method:"add" , style:{opacity:__p(["swapToken_main" , "swapNetworkTransit"],false) ? ".5" : "1" , cursor:__p(["swapToken_main" , "swapNetworkTransit"],false) ? "not-allowed" : "pointer" , height:"40px" , fontWeight:"400" , borderRadius:"7px" , fontSize:`${__p(["container" , "genRefFont_small"],"14px")}`}})
                        },
                        [
                            "proceed"
                        ],
                        {
                            events:{
                                onclick:async e =>{
                                    if(!__p(["swapToken_main" , "swapNetworkTransit"],false))
                                    {
                                        updateState({name:"swapToken_main" , prop:"swapNetworkTransit" , value:true});
                                        await swapToken();
                                    }
                                }
                            }
                        }
                    )
                ]
            ),
        ]
    )
}

__SYD.swapToken_main__swapConfirm__main_tokenPartition = () =>{
    return __c(
        "div",
        {
            style:`height:74px;width:15px;background:${SYD_VAR.darkTheme.get()};position:absolute;top:50%;transform:translateY(-50%) translateX(-50%);left:50%;border:5px double ${SYD_VAR.darkTheme.get()};`,
            class:"radiate_chain"
        },
        [
            __c("span",{class:"chain_blub_strain_effect" , style:`position:absolute;top:0px;left:50%;transform:translateY(-50%) translateX(-50%);height:25px;width:25px;background:inherit;border-radius:50%;border:inherit;border-bottom-color:${SYD_VAR.darkTheme.get()};`}),
            __c("span",{class:"chain_blub_strain_effect_" , style:`position:absolute;bottom:0px;left:50%;transform:translateY(50%) translateX(-50%);height:25px;width:25px;background:inherit;border-radius:50%;border:inherit;border-top-color:${SYD_VAR.darkTheme.get()};`}),
        ]
    )
}

__SYD.swapToken_main__swapConfirm__main_tokenDisplay = ({type = "main"} = {}) =>{
    const tokenType = "eth";
    const info = {name:"eth" , logo:"./assets/defaultToken.svg" , chainName:"ethereum" , amount:0};
    if(__p(["swapToken_main" , "canSwap"]))
    {
        const data = __p(["swapToken_main_swap_el_main_el2" , type === "main" ? "swap1" : "swap2"]);
        info.name = data.utils.mne;
        info.logo = data.utils.icon;
        info.chainName = data.utils.chainName;
        info.amount = __p(["swapToken_main" , type === "main" ? "swap1" : "swap2" , "inputValue"]);
    }
    return __c(
        "div",
        {
            style:__sC["mainPage__mainDisplay_1_walletAdx_sec__main_wallet_el"]({method:"add",style:{background:SYD_VAR.darkTheme.get() , border:`unset` , zIndex:"100"}}) + __sC["login_signup__tab_container"]({method:"use",style:["border"]}),
            class:"button_hover__sp1 ascend"
        },
        [
            __c(
                "div",
                {
                    style:__sC["mainPage__topTab__main_acc_sec"]({method:"add",style:{width:"100%",justifyContent:"space-between"}})//re-used
                },
                [
                    __c(
                        "div",
                        {
                            style:__sC["mainPage__topTab__main_acc_sec"]()
                        },
                        [
                            //token logo
                            __c("div",{style:__sC["mainPage__mainDisplay_1_walletAdx_sec__main_wallet_el_logo"]({method:"add",style:{backgroundColor:SYD_VAR.nav_bg.get() , minHeight:"70px",minWidth:"70px",maxHeight:"70px",maxWidth:"70px" , backgroundImage:`url(${info.logo})`}})},[
                                tokenType === "base" ? __c("span",{style:`position:absolute;bottom:0px;left:50%;height:25px;width:25px;border-radius:10px;background-image:url(./assets/base_mono.png);border:1px solid ${SYD_VAR.darkTheme.get()}`},[],{genericStyle:["bg_cover"]}) : ""
                            ],{genericStyle:["bg_cover"]}),
                            //token logo

                            //token name
                            __c(
                                "div",
                                {
                                    style:__sC["mainPage__topTab__main_acc_sec_name_acc"]({method:"add",style:{fontSize:`${__p(["container" , "genRefFont_small"],"14px")}`}})
                                },
                                [
                                    __c("p" , {style:`color: #ffffff ;text-transform:capitalize;font-weight:700;`},[`${info.name}`]),
                                    
                                    __c("p" , {style:`color: ${SYD_VAR.darkThemeText1.get()};text-transform:capitalize;font-weight:300;font-size:15px;`},[`${info.chainName}`]),
                                ]
                            ),
                        ]
                    ),
                    //token amount
                    __c(
                        "div",
                        {
                            style:__sC["mainPage__topTab__main_acc_sec_name_acc"]() + "align-items:flex-end"
                        },
                        [
                            __c("p" , {style:`color: #ffffff ;text-transform:capitalize;font-weight:300;font-size:${__p(["container" , "genRefFont_small"],"14px")};`},[`${info.amount} ${info.name}`]),
                        ]
                    )
                ]
            )
        ]
    )
}