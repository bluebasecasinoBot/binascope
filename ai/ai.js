import { $, __p, __sC, __SYD, SYD_VAR } from "../sydneyDom_v3.js";

__SYD.binascopeAi_page = function()
{
    return $(
        "div",
        {style:__sC["dashboard"]()+__sC["col-center"]({method:"add",style:{overflow:"hidden",gap:"10px",display:__p(["binascopeAi_page","display"],false)?"flex":"none",paddingTop:"95px"}})},
        [
            __SYD.binascopeAi_page_title(),
            __SYD.binascopeAi_page_aiImage()
        ],
        {
            createState:{
                stateName:"binascopeAi_page",
                state:{
                    display:false,
                    mobile:false
                }
            },
            mediaQuery:{
                query:[{size:"<500px" , prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.binascopeAi_page_title = function()
{
    return $(
        "div",
        {
            style:"align-self:center;font-size:30px;font-weight:900;font-family:h-txt;"+__sC["box"]({method:"add",style:{
                color: "#F3BA2F",
                fontWeight: "800",
                fontSize: __p(["binascopeAi_page","mobile"],false)?"16px":"22px",
                fontFamily: "h-txt",
                background: "linear-gradient(135deg, rgba(243, 186, 47, 0.15) 0%, transparent 50%, rgba(243, 186, 47, 0.15) 100%)",
                backgroundSize: "300% 300%",
                padding: "20px 40px",
                border: "1px solid rgba(243, 186, 47, 0.4)",
                borderImage: "linear-gradient(45deg, #F3BA2F, transparent, #F3BA2F) 1",
                borderRadius: "4px",
                animation: __p(["binascopeAi_page","display"],false)?"hologramPulse 2s ease-in-out infinite":"unset",
                position: "relative",
                display: "inline-block",
                letterSpacing: "3px",
                textTransform: "uppercase",
            }})
        },
        [
            "Binascope AI"
        ]
    )
}

__SYD.binascopeAi_page_aiImage = function()
{
    return $(
        "div",
        {
            style:"height:100%;width:100%;max-width:700px;background:#000000;padding-bottom:60px;position:relative;font-family:h-txt;"
        },
        [
            $(
                "div",
                {
                    style:"height:100%;width:100%;background-image:url(./assets/images/robot.gif);"
                },[],{genericStyle:["bg_fit"]}
            ),
            $(
                "div",
                {
                    style:__sC["box"]({method:"add",style:{backgroundImage: "linear-gradient(to bottom, #333333, #000000)",color: SYD_VAR.themeClr.get(),border: "none",padding: "12px",fontSize: "16px",fontWeight: "bold",borderRadius: "8px",cursor: "pointer",boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",textShadow: "0 1px 1px rgba(0,0,0,0.5)",width:"fit-content",position:"absolute",bottom:"5px",left:"50%",transform:"translateX(-50%)"}})
                },
                [
                    "Coming soon"
                ]
            ),
            __SYD.binascopeAi_page_cmt1("topLeft" , "Context-Aware Market Insights" , .5),
            __SYD.binascopeAi_page_cmt1("topRight" , "Real-Time Signal Interpretation" , 0),
            __SYD.binascopeAi_page_cmt1("bottomLeft" , "AI-Human Fusion Assistant Mode" , 1),
            __SYD.binascopeAi_page_cmt1("bottomRight" , "Visual AI Chart Marking" , 2)
        ],
        {
            
        }
    )
}

__SYD.binascopeAi_page_cmt1 = function(mode , value , animeDelay)
{
    const styles = {
        topRight:"position:absolute;top:calc(10% + 50px);right:0px;",
        topLeft:"position:absolute;top:10%;left:0px;",
        bottomRight:"position:absolute;bottom:calc(10% + 50px);right:0px;",
        bottomLeft:"position:absolute;bottom:10%;left:0px;"
    };

    const style_el = {
        topLeft:"position:absolute;top:50%;right:0px;transform:translateX(100%);border-left:unset;border-bottom:unset;",
        topRight:"position:absolute;top:50%;left:0px;transform:translateX(-100%);border-right:unset;border-bottom:unset;",
        bottomLeft:"position:absolute;top:50%;right:0px;transform:translateX(100%);border-left:unset;border-bottom:unset;",
        bottomRight:"position:absolute;top:50%;left:0px;transform:translateX(-100%);border-right:unset;border-bottom:unset;"
    }
    return $(
        "div",
        {
            style:__sC["box"]({method:"add",style:{
                color: "#F3BA2F",
                fontWeight: "200",
                fontSize: __p(["binascopeAi_page","mobile"],false)?"9px":"11px",
                fontFamily: "h-txt",
                background: "linear-gradient(135deg, rgba(243, 186, 47, 0.15) 0%, transparent 50%, rgba(243, 186, 47, 0.15) 100%)",
                backgroundSize: "300% 300%",
                padding: "20px 40px",
                border: "1px solid rgba(243, 186, 47, 0.4)",
                borderImage: "linear-gradient(45deg, #F3BA2F, transparent, #F3BA2F) 1",
                borderRadius: "4px",
                animation: __p(["binascopeAi_page","display"],false)?"hologramPulse 2s ease-in-out infinite":"unset",
                position: "absolute",
                display: "inline-block",
                letterSpacing: "3px",
                textTransform: "uppercase",
                animationDelay:`${animeDelay}s`
            }})+"padding:10px;"+styles[`${mode}`]
        },
        [
            value,
            $(
                "div",
                {
                    style:`height:50%;width:50px;border:1px dashed ${SYD_VAR.themeClr.get()};`+style_el[mode]
                }
            )
        ]
    )
}