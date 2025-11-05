import { $, __p, __sC, __sS, __SYD, __v, SYD_VAR } from "../sydneyDom_v3.js";
import { numberToken_minify } from "./apiUtils.js";
import { updateState, updateState__bulk } from "./stateAssets.js";

__sS([
    {
        nameTag:"graph",
        style:{
            minHeight:"350px",
            width:"100%",
            position:"relative",
            padding:"20px",
            // paddingTop:"100px",
            background:"green",
            alignSelf:"center",
            borderRadius:"5px"
        }
    }
])

export class graph{
    constructor({type = "graph1" , parent})
    {
        this.type = type;
        this.graphParent = parent;
        this.template = ()=>{
                return $(
                    "div",
                    {class:"highlight_canvas",style:__sC["graph"]({method:"add",style:{background:SYD_VAR.container_bg.get()}})},
                    [
                        $(
                            "canvas",
                            {style:`height:calc(100% - 20px);width:calc(100% - 35px);z-index:100;position:absolute;top:50%;right:0%;transform:translateY(-50%);`},[],{type:`${this.type}_canvas`}
                        ),
                        $(
                            "div",
                            {style:"height:100%;width:100%;position:absolute;top:0;left:0;opacity:.4;"+__sC["col-start"]({method:"add",style:{justifyContent:"space-between"}})},
                            [
                                ...(()=>{
                                    const min = __p([this.type,"min"],0);
                                    const max = __p([this.type,"max"],1);
                                    const el = [];
                                    const factor = (max-min)/(9);
                                    let increment = min;
                                    for(let i = 0; i < 10; i++)
                                    {
                                        el.unshift(
                                            $("div",{title:`${increment}`,style:`width:100%;font-weight:400;color:${SYD_VAR.headerClr.get()};font-size:${__p(["subContainer","fontSmall"],"11px")};font-weight:400;gap:10px;`+__sC["n-txt"]()+__sC["row-center"]()},[$("p",{style:"min-width:max-content;"},[`${increment>1000? numberToken_minify(increment) : increment.toFixed(2)}`.slice(0,4)]),$("span",{style:`border-top:2px dashed ${SYD_VAR.greyText.get()};width:100%;`})])
                                        )
                                        increment += factor;
                                    }
                                    return el;
                                })()
                            ]
                        )
                    ],
                    {
                        createState:{
                            stateName:this.type,
                            state:{
                                data:[],
                                min:0,
                                max:1,
                                startX:0,
                                canvasInterval:null,
                                parent:this.graphParent,
                                graphClr:SYD_VAR.themeClr.get(),
                                draw:()=>{
                                    if(__p([__p([this.type,"parent"]),"display"])){
                                        if(__p([this.type,"canvasInterval"])!==null)clearInterval(__p([this.type,"canvasInterval"]));
                                        const canvas = __v[`${this.type}_canvas`];
                                        const dpr = window.devicePixelRatio||1;
                                        canvas.height = canvas.parentElement.offsetHeight*dpr;
                                        canvas.width = canvas.parentElement.offsetWidth*dpr;

                                        const ctx = canvas.getContext("2d");
                                        // ctx.scale(dpr,dpr);
                                        const xVector = xScaleVector(this.type , 0 , canvas.width);
                                        const yVector = yScaleVector(this.type , 0 , canvas.height);
                                        let limit = 1;

                                        let canvasInterval = setInterval(() => {
                                            ctx.clearRect(0 , 0 , canvas.width , canvas.height);
                                            ctx.beginPath();
                                            ctx.strokeStyle = __p([this.type,"graphClr"]);
                                            ctx.lineWidth = 3*dpr;
                                            for(let i = 0; i < limit; i++)
                                            {
                                                if(xVector[i+1])
                                                {
                                                    ctx.moveTo(((xVector[i])+__p([this.type,"startX"])),(canvas.height-yVector[i]));
                                                    ctx.lineTo(((xVector[i+1])+__p([this.type,"startX"])),(canvas.height-yVector[i+1]));
                                                }
                                            }
                                            ctx.stroke();
                                            ctx.closePath();

                                            // ctx.fillStyle = __p([this.type,"graphClr"]);
                                            // for(let i = 0; i < limit; i++)
                                            // {
                                            //     ctx.beginPath();
                                            //     ctx.arc(((xVector[i])+__p([this.type,"startX"])) , (canvas.height-yVector[i]) , 5*dpr , 0 , 2*Math.PI);
                                            //     ctx.fill()
                                            //     ctx.closePath();
                                            // }

                                            if(limit < xVector.length) limit++;
                                            else clearInterval(canvasInterval);
                                        }, Math.max(1 , (1000 / xVector.length)));

                                        updateState({name:this.type,prop:"canvasInterval",value:canvasInterval})
                                    }
                                }
                            }
                        }
                    }
                )
        }
    };
}


export function xScaleVector(type , min , max)
{
    const vector = __p([type,"data"],[]);
    const freeSpace = max-min;
    const factor = freeSpace/(vector.length-1);
    let increment = min;
    const xVector = new Array();
    vector.forEach(point =>{
        xVector.push(increment);

        increment += factor;
    });

    return xVector;
}


export function yScaleVector(type , a , b)
{
    const vector = __p([type,"data"],[]);
    const min = [...vector].sort((a,b)=>a-b)[0];
    const max = [...vector].sort((a,b)=>b-a)[0];
    if(__p([type,"min"]) !== min || __p([type,"max"]) !== max)
    {
        updateState__bulk({name:type,task:s=>{
            s.min = min;
            s.max = max;
            return s;
        }});
    }   
    const yVector = new Array();

    vector.forEach(point=>{
        yVector.push(
            a + (((point-min)*(b-a))/(max-min))
        )
    })

    return yVector;
}