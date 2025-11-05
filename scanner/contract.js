import {$, __p, __sC, __SYD, __v, render, SYD_VAR} from "../sydneyDom_v3.js"
import { fetchContractDetails_balance, fetchContractDetails_creator, fetchContractDetails_info } from "../utils/apiUtils.js";
import { warn_stateless } from "../utils/reuseComp.js";
import { updateState, updateState__bulk } from "../utils/stateAssets.js";

function blurMore(dom)
{
    updateState({name:dom,prop:"display",value:false})
}

function clickMore(dom)
{
    updateState({name:dom,prop:"display",value:__p([dom,"display"])?false:true});
}

async function contractFunction(type , e , icon)
{
    e.target.querySelector("span").style.backgroundImage = "url(./assets/images/trail.gif)";
    updateCrt([],false);
    e.target.style.pointerEvents = "none";
    e.target.style.opacity = ".5";

    const data = __p(["contract","data","evm"]);
    let renderData = [];
    switch(type)
    {
        case "info":
            if(data.info.length>0) {
                renderData = data.info
                updateCrt(renderData)
            }
            else {}
        break;
        case "abi":
            if(data.abi.length>0) {
                renderData = data.abi;
                updateCrt(renderData)
            }
            else {}
        break;
        case "code":
            if(data.code.length>0) {
                renderData = data.code;
                updateCrt(renderData)
            }
            else {}
        break;
        case "creator":
            if(data.creator.length>0) {
                renderData = data.creator;
                updateCrt(renderData)
            }
            else {
                await fetchContractDetails_creator(__p(["search_C","ca"]) , __p(["more_C_2","mode"]));
            }
        break;
        case "balance":
            if(data.bal.length>0) {
                renderData = data.bal;
                updateCrt(renderData)
            }else{
                await fetchContractDetails_balance(__p(["search_C","ca"]) , __p(["more_C_2","mode"]));
            }
        break;
        case "function":
            if(data.ctrctFunc.length>0) {
                renderData = data.ctrctFunc;
                updateCrt(renderData)
            }else {}
    }

    e.target.querySelector("span").style.backgroundImage = `url(./assets/images/${icon})`;
    e.target.style.pointerEvents = "auto";
    e.target.style.opacity = "1";
}

function updateCrt(renderData,trans=true)
{
    updateState__bulk({name:"displayPage_C",task:s=>{
        s.displayTags = ()=>{return renderData};
        s.translate = trans;
        return s;
    }})
}

function clickMore_el(text,dom)
{
    updateState({name:dom,prop:"mode",value:`${text} ${dom=="more_C"?"Token":""}`});
    if(dom=="more_C")
    {
        updateState({name:"actions_C",prop:"network",value:text.toLowerCase()})
        updateState__bulk({name:"search_C",task:s=>{
            s.type = text;
            s.inputActive = true;
            return s;
        },value:text});
    }
}

function nullSearch()
{
    if(!__p(["search_C","inputActive"]))
    {
        updateState__bulk({name:"search_C",task:s=>{
            s.errorNode = true;
            s.errorMsg = "Select Token Type"
            return s;
        }});

        let timer = setTimeout(() => {
            updateState({name:"search_C" , prop:"errorNode",value:false});
            clearTimeout(timer);
        }, 3000);
    }
}

async function scanCa(a,e)
{
    const adx = __p(["search_C","ca"]);
    const network = __p(["more_C_2","mode"]);
    if(adx.length > 0)
    {
        try
        {
            updateState({name:"scan_C",prop:"loading",value:true});
            await fetchContractDetails_info(adx , network.toLowerCase());
            updateState({name:"scan_C",prop:"loading",value:false});
    
            updateState({name:"contract",prop:"isScan",value:true})   
        }catch(err)
        {
            updateState({name:"scan_C",prop:"loading",value:false});
             __p(["notification","show"])({title:"Data fetch Error (Contract info)",msg:"No Data found for this contract on specified network",mode:"err"})
        }
    }
}

function clearCa(aux=false)
{
    updateState({name:"contract",prop:"data",value:{evm:{info:[],code:"",creator:[],abi:[],ctrctFunc:[],bal:[]}}})
    
    updateState({name:"search_C",prop:"ca",value:""});
    const inputEvent = new Event('input', { bubbles: true });
    __v["search_C_input"].dispatchEvent(inputEvent); 
}
__SYD.contract = function()
{
    return $(
        "div",
        {style:__sC["dashboard"]()+__sC["col-start"]({method:"add",style:{overflow:"hidden",gap:"35px",display:__p(["contract","display"],false)?"flex":"none"}})},
        [
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"15px"}})},
                [
                    __SYD.more_C(),__SYD.more_C_2(),
                ]
            ),
            __SYD.search_C(),
            __SYD.scan_C(),
            __SYD.actions_C(),
            __SYD.displayPage_C()
        ],
        {
            createState:{
                stateName:"contract",
                state:{display:false,ca:"",mobile:false,isScan:false,data:{evm:{info:[],code:"",creator:[],abi:[],ctrctFunc:[],bal:[]}}}
            },
            mediaQuery:{query:[{size:"<900px",prop:{mobile:true}}],defState:{mobile:false}}
        }
    )
}

__SYD.more_C = function()
{
    return $(
        "div",
        {style:"position:relative;",tabindex:"0"},
        [
            $(
                "div",
                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.tab_bg.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                [
                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[__p(["more_C","mode"],__p(["contract","mobile"],false)?"Token Type":"Select Token Type")]),
                    $("span",{style:`background-image:url(./assets/images/${"toggle"}.svg);`+__sC["mobileMenu"]({method:"use",style:["transition"]})+__sC["n2-icon"]({method:"add",style:{transform:__p(["more_C","display"],false) ? "rotate(0deg)" : "rotate(180deg)",color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                ]
            ),
            $(
                "div",
                {
                    style:__sC["more_D_tab"]({method:"add",style:{backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{zIndex:"1000",gap:"15px",display:__p(["more_C","display"],false)?"flex":"none"}}])+__sC["br-.5"](),
                    class:"tab"
                },
                [
                    __SYD.more_C_EL("EVM"),
                    // __SYD.more_C_EL("SVM"),
                    // __SYD.more_C_EL("BTC")
                ]
            )
        ],
        {createState:{stateName:"more_C",state:{display:false,edge:"left",mode:"Select Token Type"}},events:{onblur:()=>{blurMore("more_C")},onclick:()=>{clickMore("more_C")}}}
    )
}

__SYD.more_C_2 = function()
{
    return $(
        "div",
        {style:"position:relative;",tabindex:"0"},
        [
            $(
                "div",
                {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{gap:"10px",backgroundColor:SYD_VAR.tab_bg.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
                [
                    $("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[__p(["more_C_2","mode"],__p(["contract","mobile"],false)?"network":"select network")]),
                    $("span",{style:`background-image:url(./assets/images/${"toggle"}.svg);`+__sC["mobileMenu"]({method:"use",style:["transition"]})+__sC["n2-icon"]({method:"add",style:{transform:__p(["more_C_2","display"],false) ? "rotate(0deg)" : "rotate(180deg)",color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"]}),
                ]
            ),
            $(
                "div",
                {
                    style:__sC["more_D_tab"]({method:"add",style:{backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["thinBorder"]()+__sC["col-start"]([{method:"add",style:{zIndex:"1000",gap:"15px",display:__p(["more_C_2","display"],false)?"flex":"none"}}])+__sC["br-.5"](),
                    class:"tab"
                },
                [
                    __SYD.more_C_EL("Ethereum","more_C_2"),
                    __SYD.more_C_EL("base","more_C_2"),
                    __SYD.more_C_EL("polygon","more_C_2"),
                    __SYD.more_C_EL("arbitrum","more_C_2"),
                    __SYD.more_C_EL("optimism","more_C_2"),
                    __SYD.more_C_EL("bsc","more_C_2"),
                    __SYD.more_C_EL("avalanche","more_C_2")
                ]
            )
        ],
        {createState:{stateName:"more_C_2",state:{display:false,edge:"left",mode:"ethereum"}},events:{onblur:()=>{blurMore("more_C_2")},onclick:()=>{clickMore("more_C_2")}}}
    )
}

__SYD.more_C_EL = function(text,dom = "more_C"){
    return $("p",{class:"dim-text",style:`width:100%;cursor:pointer;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()},[text],{events:{onclick:()=>{clickMore_el(text,dom)}}})
}

__SYD.search_C = function()
{
    return $(
        "div",
        {style:__sC["box"]([{method:"add",style:{position:"relative",width:"100%",cursor:__p(["search_C","inputActive"],false)?"auto":"not-allowed",marginTop:"15px"}},{method:"remove",style:[...(__p(["contract","mobile"],false)?["padding"]:[])]}])+__sC["row-center"]()},
        [
            $(
                "div",
                {style:__sC["box"]([{method:"add",style:{width:"100%",maxWidth:"900px"}},{method:"remove",style:["padding"]}])+__sC["row-start"]({method:"add",style:{gap:"10px",alignItems:"center",position:"relative"}})},
                [
                    $(
                        "div",
                        {class:"highlight_icon",style:__sC["mobileMenu"]([{method:"add",style:{height:"25px",minWidth:"25px",width:"25px",backgroundImage:"url(./assets/images/search.svg)",position:"relative",pointerEvents:__p(["search_C","inputActive"],false)?"auto":"none"}},{method:"remove",style:["transform","right"]}])},[],{genericStyle:["bg_fit"],events:{}}
                    ),
                    $(
                        "input",
                        {id:"search_C_input",style:__sC["searchInput"]({method:"add",style:{background:SYD_VAR.tab_bg.get(),color:SYD_VAR.headerClr.get(),pointerEvents:__p(["search_C","inputActive"],false)?"auto":"none"}})+__sC["thinBorder"]()+__sC["br-.5"](),placeholder:`Enter ${__p(["search_C","type"],"TOKEN")} contract adx`,...(__p(["search_C","inputActive"],false)?{}:{readonly:true}),value:__p(["search_C","ca"],"")},[],{type:"search_C_input",events:{oninput:e=>{
                            updateState({name:"search_C",prop:"ca",value:e.target.value});
                            updateState({name:"scan_C",prop:"display",value:e.target.value.length > 0 ? true : false});

                            if(e.target.value.length === 0) updateState({name:"contract",prop:"isScan",value:false});
                        }}}
                    ),
                    new warn_stateless({msg:"Select Token Type",display:__p(["search_C","errorNode"],false),type:"warn"}).template()
                ]
            )
        ],
        {
            createState:{
                stateName:"search_C",
                state:{type:"TOKEN",errorNode:false,errorMsg:"Select Token Type",inputActive:false,ca:""}
            },
            events:{onclick:nullSearch}
        }
    )
}

__SYD.scan_C = function()
{
    return $(
        "div",
        {style:__sC["row-center"]({method:"add",style:{width:"100%",display:__p(["scan_C","display"],false)?"flex":"none",gap:"15px",marginTop:"-15px"}})},
        [
            //Leverage action buttons
            __SYD.actions_C_EL({text:"scan" , action:scanCa , icon:__p(["scan_C","loading"],false)?"trail.gif":"scan_yl.svg" , active:!__p(["scan_C","loading"],false)}),
            __SYD.actions_C_EL({text:"clear" , action:clearCa , icon:"cancel_x.svg"})
        ],{createState:{stateName:"scan_C",state:{display:false,loading:false}}}
    )
}

__SYD.actions_C = function()
{
    return $(
        "div",
        {style:__sC["col-start"]({method:"add",style:{gap:"20px",width:"100%"}})},
        [
            $("p",{style:`font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["contract tools"]),
            $(
                "div",
                {style:__sC["box"]({method:"add",style:{width:"100%"}})+__sC["row-center"]({method:"add",style:{gap:"20px",flexWrap:"wrap",overflowY:"scroll"}})},
                [
                    ...(()=>{
                        const data = SYD_VAR.contractOptions.get()[__p(["actions_C","network"],"TOKEN")];
                        const elements = [];
                        if(data && __p(["contract","isScan"],false))
                        {
                            data.forEach(option =>{
                                elements.push(
                                    __SYD.actions_C_EL({text:option.text , action:contractFunction , icon:option.icon , type:option.type})
                                )
                            })
                        }
                        return elements;
                    })(),
                    $("p",{style:`width:100%;text-align:center;font-style:italic;font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.greyText.get()};display:${__p(["contract","isScan"],false)?"none":"auto"};`+__sC["n-txt"]({method:"add",style:{fontWeight:"900"}})+__sC["no-txt"]()},["contract tools will appear here"])
                ],
            )
        ],
        {createState:{stateName:"actions_C",state:{network:""}}}
    )
}

__SYD.actions_C_EL = function({text , action , icon , type="not-specified" , active=true}){
    return $(
        "div",
        {style:__sC["box"]()+__sC["thinBorder"]()+__sC["box"]()+__sC["br-.5"]()+__sC["row-start"]({method:"add",style:{pointerEvents:active?"auto":"none",opacity:active?"1":".4",gap:"10px",backgroundColor:SYD_VAR.tab_bg.get(),cursor:"pointer",position:"relative"}}),class:"pop-btn"},
        [
            $("span",{style:`background-image:url(./assets/images/${icon});`+__sC["mobileMenu"]({method:"use",style:["transition"]})+__sC["n2-icon"]()+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]}),$("p",{style:`font-size:${__p(["subContainer","fontHeader"],"13px")};color:${SYD_VAR.headerClr.get()};`+__sC["n-txt"]()+__sC["no-txt"]()},[text]),
        ],
        {events:{onclick:e=>{if(active){action(type,e,icon)}}}}
    )
}

__SYD.displayPage_C = function()
{
    return $(
        "div",
        {style:__sC["displayPage_C"]({method:"add",style:{height:"100%",backgroundColor:"rgba(0,0,0,.2)"}})+__sC["row-start"]({method:"add",style:{alignItems:"flex-start",gap:"20px",transform:`translateY(${__p(["displayPage_C","translate"],false)?"0%":"100%"})`}})+__sC["thinBorder"]()},
        [
            $(
                "div",
                {style:__sC["displayPage_C"]({method:"add",style:{backgroundColor:SYD_VAR.container_bg.get()}})+__sC["col-start"]({method:"add",style:{alignItems:"flex-start",gap:"20px",transform:`translateY(0%)`}})+__sC["thinBorder"]()},
                [
                    $(
                    "div",
                    {style:__sC["row-start"]({method:"add",style:{justifyContent:"space-between",position:"sticky",top:"10px",left:"50%",height:"fit-content",width:"calc(100% - 20px)",transform:"translateX(0%)",zIndex:"9999"}})},
                    [
                        $("p",{style:`width:100%;text-align:center;font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},[$("span",{style:`color:${SYD_VAR.themeClr.get()};`},["Binascope"])," Contract Scanner"]),
                        $(
                            "div",
                            {style:__sC["mobileMenu"]({method:"add",style:{position:"static",backgroundImage:"url(./assets/images/toggle.svg)",transform:"rotate(180deg)"}})},[],{genericStyle:["bg_fit"],events:{onclick:()=>{updateState({name:"displayPage_C",prop:"translate",value:false})}}}
                        )
                    ]
                ),
                $(
                    "div",
                    {style:__sC["col-start"]({method:"add",style:{width:"100%",gap:"10px",height:"100%",minHeight:"fit-content",paddingBottom:"10px"}})},
                    [
                        // __SYD.display_I_EL({title:"total supply" , value:"supply value here"})
                        ...__p(["displayPage_C","displayTags"],()=>{return []})()
                    ]
                )
                ]
            )
        ],
        {
            createState:{
                stateName:"displayPage_C",
                state:{
                    translate:false,
                    displayTags:()=>{return []}
                }
            }
        }
    )
}

__SYD.viewer_C = function(value="")
{
    return $(
        "textarea",
        {style:__sC["viewer_C"]({method:"add",style:{color:SYD_VAR["pending_"].get(),backgroundColor:SYD_VAR.tab_bg.get()}})+__sC["br-.5"](),readonly:true},
        [value]
    )

}


