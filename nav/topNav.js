import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";
import { fetchTokens_trending } from "../utils/apiUtils.js";
import { updateState, updateState__bulk } from "../utils/stateAssets.js";

const navOptionStyle = function()
{
    const mobile = __p(["topNav","mobile"],false);
    const mobileTog = __p(["topNav","mobileTog"],false);
    if(mobile)
    {
        return "padding:20px;padding-right:30px;position:absolute;height:fit-content;top:calc(100% + 5px);right:0px;"+__sC["col-start"]({method:"add",style:{gap:"15px",display:mobileTog?"flex":"none"}}) + __sC["thinBorder"]() + __sC["br-1"]()
    }else return "overflow-x:scroll;padding:0px 10px;position:relative;height:100%;"+__sC["row-start"]({method:"add",style:{gap:"32px"}})
}

const toggleNav = function(e)
{
    if(__p(["topNav","mobile"],false))
    {
        updateState({name:"topNav",prop:"mobileTog",value:__p(["topNav","mobileTog"],false)?false:true});
        e.target.style.transform = !__p(["topNav","mobileTog"],false) ? "translateY(-50%) rotate(0deg)" : "translateY(-50%) rotate(-180deg)"
    }
}

__SYD.topNav = function(){
    return $(
        "div",
        {style:__sC["topNav"]() + __sC["thinBorder"]({method:'add',style:{borderTop:"unset",borderLeft:"unset",borderRight:"unset"}}) + __sC["row-start"]({method:"add",style:{gap:"50px"}})},
        [
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"10px",height:"60px",minWidth:"150px",backgroundImage:"url(./assets/images/logoTrim.png)"}})},
                [
                    // $(
                    //     "div",
                    //     {style:"height:40px;width:40px;background-image:url(./assets/images/logoTrim.png);"},[],{genericStyle:["bg_fit"]}
                    // ),
                    // $(
                    //     "div",
                    //     {style:`font-size:${__p(["subContainer","fontTitle"],"22px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},
                    //     ["binascope"]
                    // )
                ],
                {
                    genericStyle:["bg_fit"]
                }
            ),
            $(
                "ul",
                {style:navOptionStyle()+`background-color:${__p(["topNav","mobile"],false)?SYD_VAR.container_bg.get():"transparent"};`},
                [
                    __SYD.navBtn({text:"live trends",icon:"live",id:"live"}),
                    __SYD.navBtn({text:"Wallet Dashboard",icon:"wallet",id:"wallet"}),
                    // __SYD.navBtn({text:"Whale Tracker",icon:"whale",id:"whale"}),
                    // __SYD.navBtn({text:"Gas Monitor",icon:"gas",id:"gas"}),
                    __SYD.navBtn({text:"Trending Tokens",icon:"trend",id:"trend"}),
                    __SYD.navBtn({text:"Token Insights",icon:"token",id:"token"}),
                    __SYD.navBtn({text:"Wallet Analytics",icon:"analytic",id:"analytic"}),
                    __SYD.navBtn({text:"Contract Scanner",icon:"scan",id:"scan"}),
                    //bottom highlighter
                    $(
                        "div",
                        {style:__sC["highlight"]({method:"add",style:{background:SYD_VAR.themeClr.get(),left:__p(["topNav","hLeft"],"0px"),width:__p(["topNav","hWidth"],"0px"),display:__p(["topNav","mobile"],true) ? "none" : "block"}})}
                    ),
                    //bottom highlighter
                    //side highlighter
                    $(
                        "div",
                        {style:__sC["highlight-side"]({method:"add",style:{background:SYD_VAR.themeClr.get(),top:__p(["topNav","hTop"],"0px"),height:__p(["topNav","hHeight"],"0px"),display:__p(["topNav","mobile"],true) ? "block" : "none"}})}
                    )
                    //side highlighter
                ]
            ),
            $(
                "div",
                {style:__sC["mobileMenu"]({method:"add",style:{display:__p(["topNav","mobile"],false) ? "flex" : "none",backgroundImage:"url(./assets/images/toggle.svg)",transform:!__p(["topNav","mobileTog"],false)? "translateY(-50%) rotate(0deg)" : "translateY(-50%) rotate(-180deg)"}})},[],{genericStyle:["bg_fit"],events:{onclick:toggleNav}}
            )
        ],
        {
            createState:{
                stateName:"topNav",
                state:{
                    hLeft:"0px",
                    hWidth:"0px",
                    hTop:"0px",
                    hHeight:"0px",
                    mobile:false,
                    navOption:"live",
                    mobileTog:false,
                    swtch:{wallet:"walletDashboard",analytic:"walletAnalytics",scan:"contract",token:"insight",trend:"trend" , live:"live" , aiPage:"binascopeAi_page"}
                }
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.navBtn = function({text,icon,id}={})
{
    return $(
        "div",
        {style:`opacity:${id === __p(["topNav","navOption"],"live") ? "1" : ".5"};font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]({method:"add",style:{cursor:"pointer"}})+__sC["row-start"]({method:"add",style:{gap:"8px",height:"fit-content",padding:"10px 0px",width:"100%"}})},
        [
            $("span",{style:`background-image:url(./assets/images/${icon}.svg);`+__sC["n-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]}),$("p",{style:__sC["no-txt"]()},[text])
        ],
        {
            type:id,
            events:{
                onclick:function(e){
                    e.target.parentElement.scrollLeft = e.target.offsetLeft;
                    updateState__bulk({name:"topNav",task:s=>{
                        s.hLeft = `${e.target.offsetLeft}px`;
                        s.hWidth = `${e.target.offsetWidth}px`;
                        s.hTop = `${e.target.offsetTop}px`;
                        s.hHeight = `${e.target.offsetHeight}px`;
                        s.navOption = id;
                        return s;
                    }});

                    const DOMS = __p(["topNav","swtch"]);
                    if(Object.keys(DOMS).includes(id))
                    {
                        for(let i = 0; i < Object.keys(DOMS).length; i++)
                        {
                            if(Object.keys(DOMS)[i] === id)
                            {
                                if(!__p([DOMS[Object.keys(DOMS)[i]],"display"])) updateState({name:DOMS[Object.keys(DOMS)[i]],prop:"display",value:true})
                            }else
                            {
                                if(__p([DOMS[Object.keys(DOMS)[i]],"display"])) updateState({name:DOMS[Object.keys(DOMS)[i]],prop:"display",value:false})
                            }
                        }
                    }

                    if(id === "analytic")
                    {
                        __p(["wallet_A_G","draw"])()
                    }

                    if(id === "trend")
                    {
                        fetchTokens_trending();
                    }

                    if(id === "live")
                    {
                        console.log(new Date() - __p(["live","lastUpdated"]) > 60000);
                        __p(["live","timely"])(new Date() - __p(["live","lastUpdated"]) > 60000);
                    }

                    updateState({name:"topNav",prop:"mobileTog",value:false});

                    // alert("Utility will be launched soon");
                }
            }
        }
    )
}