import { $, __p, __sC, __sS, __SYD, __v, SYD_VAR } from "./sydneyDom_v3.js";
import { fetchToken_api__post } from "./utils/apiUtils.js";
import { updateState } from "./utils/stateAssets.js";

__sS([
    {
        nameTag:"feedback",
        style:{
            height:"100%",
            width:"100%",
            background:"rgba(0,0,0,.8)",
            position:"fixed",
            top:"0px",
            left:"0px",
            zIndex:"9999",
            padding:"15px"
        }
    }
])

__SYD.feedback = function()
{
    return $(
        "div",
        {
            style:__sC["feedback"]()+__sC["row-center"]({method:"add",style:{display:__p(["feedback","display"],false)?"flex":"none"}})
        },
        [
            __SYD.feedback_main(),
        ],
        {
            createState:{
                stateName:"feedback",
                state:{display:false}
            }
        }
    )
}

__SYD.feedback_main = function()
{
    return $(
        "div",
        {style:__sC["box"]()+__sC["col-start"]()+__sC["thinBorder"]()+__sC["br-.5"]()+`width:100%;max-width:500px;padding:10px;position:relative;background-color:${SYD_VAR.tab_bg.get()};gap:10px;`},
        [
            $("p",{style:`width:100%;text-align:center;font-size:${__p(["subContainer","fontNormHeader"],"18px")};color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["User Feedback"]),
            __SYD.feedback_rating(),
            __SYD.feedbackMsgTab(),
            $("span",{style:`position:absolute;top:10px;right:10px;background-image:url(./assets/images/${"cancel"}.svg);`+__sC["n2-icon"]({method:"add",style:{color:SYD_VAR.themeClr.get()}})},[],{genericStyle:["bg_fit"],events:{
                onclick:()=>{
                    updateState({name:"feedback",prop:"display",value:false})
                }
            }})
        ],{createState:{stateName:"feedback_main",state:{index:-1,review:""}}}
    )
}

__SYD.feedback_rating = function()
{
    return $(
        "div",
        {style:__sC["row-center"]()+"width:100%;padding:5px;"},
        [
            __SYD.feedback_star(1),
            __SYD.feedback_star(2),
            __SYD.feedback_star(3),
            __SYD.feedback_star(4),
            __SYD.feedback_star(5),

        ]
    )
}

__SYD.feedback_star = function(index)
{
    return $("span",{style:`background-image:url(./assets/images/${__p(["feedback_main","index"],-1) >= index?"star-clr":"star"}.svg);`+__sC["mobileMenu"]({method:"use",style:["transition","cursor"]})+__sC["n2-icon"]()},[],{
        genericStyle:["bg_fit"],
        events:{
            onclick:e=>{
                updateState({name:"feedback_main",prop:"index",value:index})
            }
        }
    })
}

__SYD.feedbackMsgTab = function()
{
    return $(
        "div",
        {style:__sC["col-start"]({method:"add",style:{gap:"10px",marginTop:"10px",width:"100%"}})},
        [
            $("p",{style:`width:100%;text-align:left;font-size:16px;color:${SYD_VAR.headerClr.get()};`+__sC["h-txt"]()},["Leave a message"]),
            $(
                "textarea",
                {style:__sC["viewer_C"]({method:"add",style:{color:SYD_VAR["headerClr"].get(),backgroundColor:SYD_VAR.tab_bg.get(),minHeight:"150px"}})+__sC["br-.5"](),placeholder:"Leave a review for our developer team(optional)"},[],{type:"feedbackTxtArea"}
            ),
            $(
                "div",
                {style:__sC["box"]()+"align-self:flex-end"},
                [
                    __SYD.actions_C_EL({text:"send" , action:sendReview , icon:__p(["feedbackMsgTab","loading"],false)?"trail.gif":"send.svg" , active:!__p(["feedbackMsgTab","loading"],false)})
                ]
            )
        ],{
            createState:{stateName:"feedbackMsgTab",state:{loading:false}}
        }
    )
}

async function sendReview()
{
    const rating = __p(["feedback_main","index"]);
    if(rating>-1)
    {
        updateState({name:"feedbackMsgTab",prop:"loading",value:true});
        const data = await fetchToken_api__post({url:`${SYD_VAR.domain}/client_review`,body:{token:__p(["subContainer","accessToken"],""),msg:{stars:rating,review:__v["feedbackTxtArea"].value,date:new Date().toDateString()}}});
        updateState({name:"feedbackMsgTab",prop:"loading",value:false});

        if(data)
        {
            if(data.type === "success")
            {
                __p(["notification","show"])({title:"Community Feedback",msg:`${rating >= 3 ? "😁":"😅"} Thanks for your review`,mode:"success"});
                __v["feedbackTxtArea"].value = "";
                updateState({name:"feedback_main",prop:"index",value:-1});
                updateState({name:"feedback",prop:"display",value:false})
                //close review page
            }else {
                __p(["notification","show"])({title:"Community Feedback (Err)",msg:"An error occured while saving review",mode:"err"})
            }
        }else{
            __p(["notification","show"])({title:"Community Feedback (Err)",msg:"Review not recorded due to an error",mode:"err"})
        }

        updateState({name:"feedbackMsgTab",prop:"loading",value:false})
    }else {
        __p(["notification","show"])({title:"Community Feedback (Err)",msg:"Please rate the site before proceeding",mode:"err"})
    }
}
