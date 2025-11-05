import { updateState, updateState__bulk } from "../stateAssets.js";
import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";

function closeWidget()
{
    if(!__p(["select_cont","infoDisplay"],false))
    {
        updateState({name:"select_cont",prop:"animation",value:"enter-top_setting"})
        setTimeout(() => {
            updateState({name:"select_cont",prop:"display",value:false})
        }, 700);
    }
}

function selectNetworkFunc(i)
{
    updateState({name:"select_cont",prop:"net",value:i})
}

__SYD.select_cont = function()
{
    return $(
        "div",
        {
            style:`height:100vh;width:100vw;position:fixed;top:0px;left:0px;z-index:10000;background-color:rgba(0,0,0,.8);font-family:font1;padding:20px 0px;`+__sC["row-center"]({method:"add",style:{display:__p(["select_cont","display"],false)?"flex":"none",justifyContent:"center",paddingBottom:__p(["select_cont","mobile"],false)?"0px":"20px"}})
        },
        [
            //Main select element here
            __SYD.select_main()
            //Main select element here
        ],
        {
            createState:{
                stateName:"select_cont",
                state:{mobile:false,display:false,animation:"",mode:"main",net:null,popularTokens:[]}
            },
            mediaQuery:{
                query:[{size:"<500px",prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.select_main = function()
{
    return $(
        "div",
        {
            style:`outline:none;padding:20px;height:100%;width:100%;max-width:500px;border-radius:30px;background-color:${SYD_VAR.darkTheme.get()};color:${SYD_VAR.darkThemeText1.get()};`+__sC["thinBorder"]({method:"add",style:{
                borderBottomLeftRadius:__p(["select_cont","mobile"],false)?"unset":"30px",
                borderBottomRightRadius:__p(["select_cont","mobile"],false)?"unset":"30px",
            }}) + __sC["col-start"]({
                method:"add",
                style:{
                    gap:"10px"
                }
            }),
            class:`animated ${__p(["select_cont","animation"],"")}`,
            tabindex:"0"
        },
        [
            __SYD.select_main_1(),
            __SYD.selectMain_search(),
            __SYD.selectMain_networks(),
            __SYD.selectMain_tokens(),
            __SYD.selectScroll()
        ],
        {
            type:"select_main",
            events:{
                onblur:closeWidget
            }
        }
    )
}

__SYD.select_main_1 = function()
{
    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{justifyContent:"space-between",width:"100%"}})
        },
        [
            $(
                "p",
                {
                    style:`font-family:header;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:900;`
                },
                [__p(["select_cont","mode"],"main") === "main"?"From":"To"]
            ),
            $(
                "span",
                {
                    style:"cursor:pointer;height:20px;width:20px;display:block;background-image:url(./assets/image/close.svg);"
                },[],{
                    genericStyle:["bg_fit"],
                    events:{onclick:closeWidget}
                }
            )
        ]
    )
}

__SYD.selectMain_search = function()
{
    return $(
        "div",
        {style:`min-height:fit-content;height:fit-content;width:100%;position:relative;overflow:hidden;border-radius:30px;border:3px solid ${SYD_VAR.mainTheme.get()};`},
        [
            $(
                "input",
                {style:`border:unset;outline:unset;height:50px;width:100%;background-color:${SYD_VAR.nav_bg.get()};padding:0 10px;font-weight:900;font-family:font1;color:${SYD_VAR.darkThemeText1.get()};`,placeholder:"Search Address or Name"}
            )
        ]
    )
}

__SYD.selectMain_networks = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"10px",width:"100%",minHeight:"fit-content"}})
        },
        [
            $(
                "p",
                {
                    style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:100;`
                },
                ["Network: ",$("span",{style:`color:${SYD_VAR.mainTheme.get()};font-weight:900;`},["Ethereum"])]
            ),

            //horizontal scrollable
            $(
                "div",
                {style:"height:fit-content;width:100%;overflow-x:scroll;"},
                [
                    $(
                        "div",
                        {
                            style:"height:fit-content;width:100%;padding:5px 0px;"+__sC["row-start"]({method:"add",style:{gap:"15px"}})
                        },
                        [
                            ...(()=>{
                                const el = [];
                                const data = __p(["container","tokenList"],[]);
                                for(let i = 0; i < data.length; i++)
                                {
                                    data[i].image = data[i].image ? data[i].image : {large:""}
                                    el.push(
                                        $(
                                            "span",
                                            {
                                                style:`cursor:pointer;height:50px;width:50px;min-width:50px;display:block;border-radius:20px;background-size:70%;background-color:${SYD_VAR.nav_bg.get()};background-image:url(${data[i].image.large});`+__sC["thinBorder"]()
                                            },[],{events:{onclick:()=>{selectNetworkFunc(i)}},genericStyle:["bg_fit"]}
                                        )
                                    )
                                }
                                return el;
                            })()
                        ]
                    )
                ]
            )
        ]
    )
}

__SYD.selectMain_tokens = function()
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{gap:"10px",overflowX:"scroll",width:"100%",minHeight:"fit-content"}})
        },
        [
            $(
                "p",
                {
                    style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:300;`
                },
                ["Popular Tokens: "]
            ),

            //horizontal scrollable
            $(
                "div",
                {style:"height:fit-content;width:100%;overflow-x:scroll;"},
                [
                    $(
                        "div",
                        {
                            style:"height:fit-content;width:100%;padding:5px 0px;"+__sC["row-start"]({method:"add",style:{gap:"8px"}})
                        },
                        [
                            ...(()=>{
                                const el = [];
                                let data = [];
                                if(__p(["select_cont","net"])!== null)
                                {
                                    if(__p(["select_cont","popularTokens"],[]).length > 0)
                                    {
                                        data = __p(["select_cont","popularTokens"])[__p(["select_cont","net"])].list.slice(0,10);
                                    }
                                }
                                
                                for(let i = 0; i < data.length; i++)
                                {
                                    el.push(
                                        $(
                                            "div",
                                            {style:__sC["row-center"]({method:"add",style:{gap:"5px"}})+__sC["thinBorder"]()+`background-color:${SYD_VAR.nav_bg.get()};border-radius:30px;padding:5px 10px;cursor:pointer;`},
                                            [
                                                $(
                                                    "span",
                                                    {
                                                        style:`cursor:pointer;height:40px;width:40px;min-width:40px;display:block;background-image:url(${data[i].logo});`
                                                    },[],{genericStyle:["bg_fit"]}
                                                ),
                                                $(
                                                    "p",
                                                    {
                                                        style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:300;`
                                                    },
                                                    [`${data[i].symbol}`]
                                                ),
                                            ],
                                            {
                                                events:{
                                                    onclick:e=>{
                                                        updateState__bulk({name:"swapToken_main_swap_el_main_el2" , task:s=>{
                                                            s[__p(["select_cont","mode"],"main") === "main"?"swap1":"swap2"].init = true;
                                                            s[__p(["select_cont","mode"],"main") === "main"?"swap1":"swap2"].utils.mne = data[i].symbol;
                                                            s[__p(["select_cont","mode"],"main") === "main"?"swap1":"swap2"].utils.icon = data[i].logo
                                                            return s;
                                                        }});
                                                        closeWidget();
                                                    }
                                                }
                                            }
                                        )
                                    )
                                }
                                return el;
                            })()
                        ]
                    )
                ]
            )
        ]
    )
}

__SYD.selectScroll = function()
{
    return $(
        "div",
        {
            style:`height:100%;width:100%;padding:20px 10px;`+__sC["col-start"]({method:"add",style:{gap:"15px",overflowY:"scroll"}})
        },
        [
            ...(()=>{
                const el = [];
                let data = [];
                if(__p(["select_cont","net"])!== null)
                {
                    if(__p(["select_cont","popularTokens"],[]).length > 0)
                    {
                        data = __p(["select_cont","popularTokens"])[__p(["select_cont","net"])].list;
                    }
                }
                for(let i = 0;i < data.length; i++)
                {
                    el.push(
                        $(
                            "div",
                            {style:__sC["row-start"]({method:"add",style:{gap:"5px",width:"100%",padding:"10px",backgroundColor:SYD_VAR.nav_bg.get(),borderRadius:"15px",cursor:"pointer"}})+__sC["thinBorder"]()},
                            [
                                $(
                                    "span",
                                    {
                                        style:`cursor:pointer;height:50px;width:50px;min-width:50px;display:block;background-image:url(${data[i].logo});`
                                    },[],{genericStyle:["bg_fit"]}
                                ),
                                $(
                                    "div",
                                    {
                                        style:__sC["row-center"]({method:"add",style:{height:"100%",width:"100%",justifyContent:"space-between"}})
                                    },
                                    [
                                        $(
                                            "div",
                                            {style:__sC["col-start"]({method:"add",style:{height:"100%",width:"fit-content",justifyContent:"space-between"}})},
                                            [
                                                $(
                                                    "p",
                                                    {
                                                        style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:300;`
                                                    },
                                                    [`${data[i].name}`]
                                                ),
                                                $(
                                                    "p",
                                                    {
                                                        style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:300;`
                                                    },
                                                    [`${data[i].symbol}`]
                                                ),
                                            ]
                                        ),
                                        $(
                                            "span",
                                            {
                                                style:`cursor:pointer;height:20px;width:20px;min-width:20px;display:block;background-image:url(./assets/image/right.svg);`
                                            },[],{genericStyle:["bg_fit"]}
                                        ),
                                    ]
                                )
                            ],
                            {
                                events:{
                                    onclick:e=>{
                                        console.log("clicked this")
                                        updateState__bulk({name:"swapToken_main_swap_el_main_el2" , task:s=>{
                                            s[__p(["select_cont","mode"],"main") === "main"?"swap1":"swap2"].init = true;
                                            s[__p(["select_cont","mode"],"main") === "main"?"swap1":"swap2"].utils.mne = data[i].symbol;
                                            s[__p(["select_cont","mode"],"main") === "main"?"swap1":"swap2"].utils.icon = data[i].logo
                                            return s;
                                        }});
                                        closeWidget();
                                    }
                                }
                            }
                        )
                    )
                }
                return el;
            })()
        ]
    )
}