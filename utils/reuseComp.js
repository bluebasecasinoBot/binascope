import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js"
import { updateState, updateState__bulk } from "./stateAssets.js";

export class warn_stateless{
    constructor({msg="" , display=true , type="warn"})
    {
        this.clr = ()=>{
            let clr = SYD_VAR.success.get();
            if(type === "warn") clr = SYD_VAR.pending.get();
            else if(type === "error") clr = SYD_VAR.err.get();
            else if(type === "success") clr = SYD_VAR.success.get();
            return clr;
        }
        this.template = function()
        {
            return $(
                "div",
                {style:__sC["box"]()+__sC["row-start"]({method:"add",style:{opacity:".7",padding:"5px",background:SYD_VAR.tab_bg.get(),position:"absolute",top:"calc(100% + 5px)",left:"35px",gap:"5px",display:display?"flex":"none",color:this.clr()}})+__sC["n-txt"]({method:"add",style:{fontSize:__p(["subContainer","fontHeader"],"13px")}})+__sC["thinBorder"]()+__sC["br-.5"]()},
                [
                    $("span",{style:`background-image:url(./assets/images/${"right-warn"}.svg);`+__sC["n-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})+__sC["no-txt"]()},[],{genericStyle:["bg_fit"]}),
                    $("p",{style:__sC["no-txt"]()},[msg])
                ]
            )
        }
    }
}

__SYD.notification = () =>{
    return $(
        "div",
        {
            style:__sC["dashboard"]({method:"add",style:{display:__p(["notification" , "display"],false) ? "flex" : "none" , position:"absolute",top:"0px",zIndex:"10000",pointerEvents:"none",maxWidth:"inherit",fontFamily:"h-txt"}}),
            class:"base__tabs"
        },
        [
            __SYD.notification_main()
        ],
        {
            createState:{
                stateName:"notification",
                state:{
                    display:false,
                    title:"",
                    msg:"",
                    mode:"success",
                    interval:null,
                    show:({title , msg , mode})=>{
                        if(__p(["notification","interval"],null)!==null)
                        {
                            clearTimeout(__p(["notification","interval"],null))
                        }

                        updateState__bulk({name:"notification",task:s=>{
                            s.title = title;
                            s.msg = msg;
                            s.mode = mode;
                            s.display = true;
                            return s;
                        }});

                        let timer = setTimeout(() => {
                            updateState({name:"notification",prop:"display",value:false});
                        }, 6000);
                        updateState({name:"notification",prop:"interval",value:timer});
                    }
                }
            }
        }
    )
}

__SYD.notification_main = () =>{
    return $(
        "div",
        {
            style:__sC["notification"]({method:"add",style:{background:SYD_VAR[__p(["notification","mode"],"success")].get()}}),
            class:"tab-side-entry"
        },
        [
            $("i" , {class:"fa-solid fa-circle-xmark" , style:__sC["mobileMenu"]({method:"add",style:{height:"18px",width:"18px" , color:SYD_VAR.headerClr.get() , transform:"unset" ,pointerEvents:"auto" , fontSize:"18px",position:"absolute",top:"10px",right:"10px" , zIndex:"200"}})},[],{
                events:{
                    onclick:()=>{
                        updateState__bulk({name:"notification",task:s=>{
                            s.display = false;
                            return s;
                        }})
                    }
                }
            }),
            $(
                "div",
                {
                    style:"display:flex;gap:10px;align-items:center;"
                },
                [
                    $("span",{style:`height:30px;width:30px;min-height:30px;min-width:30px;border-radius:50%;background-image:url(./assets/images/logoTrim.png);display:inline-block;`},[],{genericStyle:["bg_fit"]}),
                    $(
                        "p",
                        {
                            style:`height:fit-content;width:fit-content;color:${SYD_VAR.themeClr.get()};font-size:${__p(["container" , "genRefFont_small"],"14px")};font-weight:900;text-transform:capitalize;`
                        },
                        [
                            __p(["notification" , "title"],"")
                        ]
                    )

                ]
            ),
            $(
                "p",
                {
                    style:`height:fit-content;width:fit-content;color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontHeader"],"13px")};`
                },
                [
                    __p(["notification" , "msg"],"")
                ]
            )
        ]
    )

}
