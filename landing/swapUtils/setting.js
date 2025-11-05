import { updateState, updateState__bulk } from "../stateAssets.js";
import { $, __p, __sC, __SYD, __v, SYD_VAR } from "../sydneyDom_v3.js";
import { m_out, m_over } from "../utils/functions.js";

const info = {
    slip:"The maximum price change you are willing to accept during a swap. If the price moves beyond this limit, the transaction will not execute.",
    deadline:"The maximum time your swap can remain pending. If it isn’t confirmed within this period, it will automatically cancel."
}

function input_ev(e)
{
    if(isNaN(e.target.value))
    {
        e.target.value = 0;
    }else if(e.target.value.length === 0)
    {
        e.target.value = 0;
    }
    else
    {
        if(e.target.value > 100) e.target.value = 100;
        else if(e.target.value < 0) e.target.value = 0;
    }
}

function input_ev_deadline(e)
{
    if(isNaN(e.target.value))
    {
        e.target.value = 0;
    }
    else if(e.target.value.length === 0)
    {
        e.target.value = 0;
    }else
    {
        if(e.target.value > 500) e.target.value = 500;
        else if(e.target.value < 0) e.target.value = 0;
    }
}

__SYD.swapSetting = function()
{
    return $(
        "div",
        {
            style:`position:absolute;top:100%;right:0px;background-color:${SYD_VAR.darkTheme.get()};padding:20px;min-height:unset;width:300px;border-radius:30px;z-index:999;font-family:font1;font-size:${__p(["container","fontSmall"],"13px")};animation-timing-function: ease-in;`+__sC["col-start"]({method:"add",style:{gap:"10px",display:__p(["swapSetting","display"],false)?"flex":"none"}})+__sC["thinBorder"](),
            class:`animated ${__p(["swapSetting","animation"],"")}`
        },
        [
            __SYD.swapSetting_slippage(),
            __SYD.swapSetting_deadline(),
            __SYD.swapSetting_txt()
        ],
        {
            createState:{
                stateName:"swapSetting",
                state:{display:false , animation:"",infoTxt:"",infoDisplay:false,infoY:0}
            }
        }
    )
}

__SYD.swapSetting_slippage = function()
{
    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{gap:"20px",justifyContent:"space-between",width:"100%"}})
        },
        [
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"5px"}})},
                [
                    $(
                        "p",{style:`color:${SYD_VAR.darkThemeText1.get()};font-weight:100;`},["Max slippage"]
                    ),
                    __SYD.swapInfo("slip")
                ]
            ),
            __SYD.swapSetting_slippage_el()
        ]
    )
}

__SYD.swapSetting_slippage_el = function()
{
    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{padding:"8px",borderRadius:"30px",backgroundColor:SYD_VAR.nav_bg.get()}})+__sC["thinBorder"]()
        },
        [
            $(
                "p",{style:`cursor:pointer;margin-right:5px;color:${SYD_VAR.darkThemeText1.get()};font-weight:100;padding:0px 5px;border-radius:10px;`},["Auto"],
                {
                    events:{
                        onmouseover:m_over,
                        onmouseout:m_out
                    }
                }
            ),
            $(
                "input",
                {class:"swap_setting_input",style:`border:none;outline:none;width:25px;height:20px;background-color:transparent;font-family:font1;text-align:right;color:${SYD_VAR.darkThemeText1.get()};`,value:"0.5",max:"100",min:"0",type:"number"},[],{events:{oninput:input_ev}}
            ),
            $(
                "p",{style:`margin-left:2px;color:${SYD_VAR.darkThemeText1.get()};font-weight:100;`},["%"]
            )
        ]
    )
}


__SYD.swapSetting_deadline = function()
{
    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{gap:"20px",justifyContent:"space-between",width:"100%"}})
        },
        [
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"5px"}})},
                [
                    $(
                        "p",{style:`color:${SYD_VAR.darkThemeText1.get()};font-weight:100;`},["Swap deadline"]
                    ),
                    __SYD.swapInfo("deadline")
                ]
            ),
            __SYD.swapSetting_deadline_el()
        ]
    )
}

__SYD.swapSetting_deadline_el = function()
{
    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{padding:"8px",borderRadius:"30px",backgroundColor:SYD_VAR.nav_bg.get()}})+__sC["thinBorder"]()
        },
        [
            $(
                "input",
                {class:"swap_setting_input",style:`border:none;outline:none;width:25px;height:20px;background-color:transparent;font-family:font1;text-align:right;color:${SYD_VAR.darkThemeText1.get()};`,value:"30",max:"100",min:"0",type:"number"},[],{events:{oninput:input_ev_deadline}}
            ),
            $(
                "p",{style:`margin-left:2px;color:${SYD_VAR.darkThemeText1.get()};font-weight:100;`},["minutes"]
            )
        ]
    )
}

__SYD.swapSetting_txt = function()
{
    return $(
        "div",
        {
            tabindex:"0",
            style:`position:absolute;top:${__p(["swapSetting","infoY"],0)}px;left:20px;display:${__p(["swapSetting","infoDisplay"],false)?"block":"none"};padding:10px;background-color:${SYD_VAR.nav_bg.get()};color:${SYD_VAR.darkThemeText1.get()};font-weight:300;font-size:10px;font-family:font1;border-radius:10px;width:100%;max-width:200px;opacity:.9;`+__sC["thinBorder"]()
        },
        [
            __p(["swapSetting","infoTxt"],"")
        ],
        {
            type:"swapSetting_txt",
            events:{
                onblur:e=>{
                    updateState({name:"swapSetting",prop:"infoDisplay",value:false});
                    __v["swapSetting_parent"].focus()
                }
            }
        }
    )
}

__SYD.swapInfo = function(type)
{
    return $(
        "span",
        {style:"height:15px;width:15px;background-image:url(./assets/image/info.svg);"},[],{
            genericStyle:["bg_cover"],
            events:{
                onclick:e=>{
                    updateState__bulk({name:"swapSetting",task:s=>{
                        s.infoTxt = info[`${type}`]
                        s.infoDisplay = __p(["swapSetting","infoDisplay"])?false:true;
                        s.infoY = e.target.parentElement.offsetTop+e.target.parentElement.offsetHeight;
                        return s;
                    }})
                    __v["swapSetting_txt"].focus();
                }
            }
        }
    )
}