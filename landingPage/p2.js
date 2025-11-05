import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";
import { numberToken_minify } from "./utils/functions.js";

__SYD["page2"] = function()
{
    return $(
        "div",
        {
            class:__p(["page2","active"],false)?"opacity-change":"",
            style: `display:flex;flex-direction:row;gap:20px;align-items:center;justify-content:center;flex-wrap:wrap;min-height:fit-content;width:100%;padding:${__p(['page2','flex'],'row')==="row"?"120px 40px":"120px 10px"};font-family:font1;opacity:${__p(["page2","active"],false)?"1":"0"};background-color:${SYD_VAR.nav_bg.get()};`+__sC["thinBorder"]()
        },
        [
            ...(()=>{
                const data = __p(["page2","data"],[]);
                const el = data.map((token,i) => __SYD.p2_card({cname:token.name,icon:token.image,price:token.current_price,change:token.price_change_percentage_24h,supply:token.total_supply , volume:token.total_volume ,dly:`${i*.2}s`}));
                return el;
            })()
        ],
        {
            createState:{
                stateName:"page2",
                state:{flex:"row",imgHeight:500,active:false,data:[]}
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{flex:"column-reverse"}},{size:"<400px",prop:{imgHeight:400}}],
                defState:{flex:"row",imgHeight:500}
            }
        }
    )
}

__SYD.p2_card = function({cname="" , supply=0 , volume=0 , price="" , change="" , icon="" , dly="0s"}={})
{
    return $(
        "div",
        {
            class:__p(["page2","active"],false)?"animated scale-up":"",
            style:`height:250px;width:100%;max-width:300px;background-color:${SYD_VAR.cardClr.get()};border-radius:10px;padding:20px;animation-delay:${dly};`+__sC["row-start"]({method:"add",style:{alignItems:"flex-start",gap:"10px"}})+__sC["thinBorder_theme"]({method:"add",style:{borderColor:SYD_VAR.mainTheme.get()}}),
            
        },
        [
            $(
                "span",
                {style:`height:40px;width:40px;min-width:40px;border-radius:50%;background-image:url(${icon});`},
                [],
                {genericStyle:["bg_cover"]}
            ),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"8px",height:"100%",width:"100%",justifyContent:"space-between"}})},
                [
                    $(
                        "div",
                        {style:__sC["col-start"]({method:"add",style:{gap:"8px",width:"100%"}})},
                        [
                            $(
                                "p",
                                { style:`font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.cardClr_txt.get()};` },[ `${cname}` ]
                            ),
                            $(
                                "p",
                                { style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:300;color:${SYD_VAR.cardClr_txt.get()};` },[ $("span",{style:`font-weight:300;font-size:${__p(["container","fontHeader"],"16px")};`},["Total supply: "]),`${supply === 0 ? "----":numberToken_minify(supply)}` ]
                            ),
                            $(
                                "p",
                                { style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:300;color:${SYD_VAR.cardClr_txt.get()};` },[ $("span",{style:`font-weight:300;font-size:${__p(["container","fontHeader"],"16px")};`},["Total Volume: "]),`${volume===0?"----":numberToken_minify(volume)}` ]
                            ),
                            $(
                                "div",
                                {style:__sC["row-start"]({method:"add",style:{justifyContent:"space-between",width:"100%",padding:"10px",borderRadius:"20px",backgroundColor:SYD_VAR.nav_bg.get()}})},
                                [
                                    $(
                                        "p",
                                        { style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:600;color:${SYD_VAR.darkThemeText1.get()};` },[ `$${price}` ]
                                    ),
                                    $(
                                        "p",
                                        { style:`font-size:${__p(["container","fontSmall"],"13px")};font-weight:600;color:${change<0?SYD_VAR.err.get():SYD_VAR.success.get()};` },[ `${change}%` ]
                                    )
                                ]
                            )
                        ]
                    ),
                    $(
                        "div",
                        { style: __sC["nav_actions"]() },
                        [
                            $(
                                "button",
                                { style:`padding:15px 20px;background:transparent;border:2px solid ${SYD_VAR.mainTheme.get()};border-radius:30px;overflow:hidden;display:flex;align-items:center;padding-left:15px;font-weight:900;cursor:pointer;min-width:max-content;color:${SYD_VAR.mainTheme.get()}`},
                                ["Buy & Trade"]
                            ),
                        ]
                    ),
                ]
            )
        ]
    )
}