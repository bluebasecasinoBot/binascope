import { updateState, updateState__bulk } from "../stateAssets.js";
import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";

function closeWidget()
{
    if(!__p(["wallet_connect","infoDisplay"],false))
    {
        updateState({name:"wallet_connect",prop:"animation",value:"enter-top_setting"})
        setTimeout(() => {
            updateState({name:"wallet_connect",prop:"display",value:false})
        }, 700);
    }
}

function selectWalletFunc(type)
{
    updateState({name:"wallet_connect",prop:"net",value:i})
}

const connectWallet = async() =>{
    const type = __p(["wallet_connect","select"]);
    if(type !== null)
    {
        const providers = window.ethereum.providers || [window.ethereum];
        const flg = SYD_VAR.platforms.get().filter(val => val.type === type).map(val => val.flag)
        let provider;
        if(type === "phantom") provider = window.phantom?.ethereum?.isPhantom ? window.phantom.ethereum : null;
        else provider = providers.find(p => p[flg[0]]);
        
        try
        {
            const accounts = await provider.request({ method: "eth_requestAccounts" });
            console.log(type, "connected:", accounts);
            alert("wallet connected");
            closeWidget();
        }catch(err)
        {
            console.log(err);
            alert(`an error occured while connecting to ${type}, please contact the developer`);
            closeWidget();
        }
    }
}

__SYD.wallet_connect = function()
{
    return $(
        "div",
        {
            style:`height:100vh;width:100vw;position:fixed;top:0px;left:0px;z-index:10000;background-color:rgba(0,0,0,.8);font-family:font1;padding:20px 0px;`+__sC["row-center"]({method:"add",style:{display:__p(["wallet_connect","display"],false)?"flex":"none",justifyContent:"center",paddingBottom:__p(["wallet_connect","mobile"],false)?"0px":"20px"}})
        },
        [
            //Main select element here
            __SYD.wallet_main()
            //Main select element here
        ],
        {
            createState:{
                stateName:"wallet_connect",
                state:{mobile:false,display:false,animation:"",select:null,hover:null}
            },
            mediaQuery:{
                query:[{size:"<500px",prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.wallet_main = function()
{
    return $(
        "div",
        {
            style:`outline:none;padding:20px;height:100%;width:100%;max-width:500px;border-radius:30px;background-color:${SYD_VAR.darkTheme.get()};color:${SYD_VAR.darkThemeText1.get()};`+__sC["thinBorder"]({method:"add",style:{
                borderBottomLeftRadius:__p(["wallet_connect","mobile"],false)?"unset":"30px",
                borderBottomRightRadius:__p(["wallet_connect","mobile"],false)?"unset":"30px",
            }}) + __sC["col-start"]({
                method:"add",
                style:{
                    gap:"20px"
                }
            }),
            class:`animated ${__p(["wallet_connect","animation"],"")}`,
            tabindex:"0"
        },
        [
            __SYD.wallet_main_1(),
            __SYD.wallet_main_2(),
            $(
                "p",
                {
                    style:`display:${__p(["wallet_connect","select"],null) === null?"none":"flex"};align-items:center;font-size:${__p(["container","fontSmall"],"13px")};font-weight:100;`
                },
                ["Wallet:",$("span",{style:`margin-left:5px;padding:5px;background:${SYD_VAR.nav_bg.get()};color:${SYD_VAR.mainTheme.get()};font-weight:900;border-radius:15px;`+__sC["thinBorder"]()},[__p(["wallet_connect","select"],null) === null ? "" : SYD_VAR.platforms.get().filter(wallet => wallet.type === __p(["wallet_connect","select"],null))[0].platform])]
            ),
            __SYD.wallet_connect_btn()
        ],
        {
            type:"wallet_main",
            events:{
                onblur:closeWidget
            }
        }
    )
}

__SYD.wallet_main_1 = function()
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
                ["Select wallet"]
            ),
            $(
                "span",
                {
                    style:`cursor:pointer;height:25px;width:25px;display:block;background-image:url(./assets/image/close.svg);border:2px solid ${SYD_VAR.mainTheme.get()};border-radius:50%;background-size:80%;`
                },[],{
                    genericStyle:["bg_fit"],
                    events:{onclick:closeWidget}
                }
            )
        ]
    )
}

__SYD.wallet_main_2 = function()
{
    return $(
        "div",
        {
            style:__sC["row-start"]({method:"add",style:{minHeight:"fit-content",width:"100%",gap:"20px",flexWrap:"wrap",justifyContent:__p(["wallet_connect","mobile"],false)?"center":"flex-start",padding:__p(["wallet_connect","mobile"],false)?"10px 5px":"20px",backgroundColor:SYD_VAR.nav_bg.get(),borderRadius:"30px"}})+__sC["thinBorder"]()
        },
        [
            ...(()=>{
                const el = [];
                const wallets = SYD_VAR.platforms.get();
                for(let i = 0; i < wallets.length; i++)
                {
                    el.push(
                        __SYD.wallet_el({type:wallets[i].type,logo:`./assets/image/${wallets[i].icon}`,name:wallets[i].platform,isActive:wallets[i].available})
                    )
                }
                return el;
            })()    
        ]
    )
}

__SYD.wallet_el = function({type , logo , name , isActive})
{
    return $(
        "div",
        {
            style:__sC["col-start"]({method:"add",style:{height:"fit-content",cursor:"pointer",width:"fit-content",gap:"5px",alignItems:"center",justifyContent:"center",pointerEvents:isActive?"auto":"none",opacity:isActive?"1":".4"}})
        },
        [
            $(
                "span",
                {
                    style:`height:60px;width:60px;min-width:60px;display:block;border-radius:50%;background-size:50%;background-color:${SYD_VAR.nav_bg.get()};background-image:url(${logo});`+__sC["thinBorder"]()+`${__p(["wallet_connect","hover"],null) == type || __p(["wallet_connect","select"],null) == type ? `border:2px solid ${SYD_VAR.mainTheme.get()};transition:unset;`:""}`+__sC["no-txt"]()
                },[],{events:{onclick:()=>{selectWalletFunc(type)}},genericStyle:["bg_cover"]}
            ),
            $(
                "p",
                {
                    style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:300;text-transform:capitalize;color:${__p(["wallet_connect","select"],null) == type ? SYD_VAR.mainTheme.get():SYD_VAR.darkThemeText1.get()};`+__sC["no-txt"]()
                },
                [`${name}`]
            ),
        ],
        {
            events:{
                onmouseover:()=>{
                    if(isActive) updateState({name:"wallet_connect",prop:"hover",value:type})
                },
                onmouseout:()=>{
                    if(isActive) updateState({name:"wallet_connect",prop:"hover",value:null})
                },
                onclick:()=>{
                    if(isActive) updateState({name:"wallet_connect",prop:"select",value:type});
                }
            }
        }
    )
}

__SYD.wallet_connect_btn = function()
{
    return $(
        "div",
        { style: __sC["nav_actions"]({method:"add",style:{alignSelf:"flex-end",cursor:"pointer"}}) },
        [
            $(
                "button",
                { style:`pointer-events:none;padding:15px 20px;background:transparent;border:2px solid ${SYD_VAR.darkThemeText1.get()};border-radius:30px;overflow:hidden;display:flex;align-items:center;padding-left:15px;font-weight:900;cursor:pointer;min-width:max-content;color:${SYD_VAR.darkThemeText1.get()}`},
                ["Connect"]
            ),
        ],
        {
            events:{
                onclick:connectWallet
            }
        }
    )
}