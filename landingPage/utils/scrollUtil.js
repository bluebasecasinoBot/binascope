import { updateState } from "../stateAssets.js";
import { __p, __v, SYD_VAR } from "../sydneyDom_v3.js"

const doms = ["navbar","page2","page3","page4","page5","page6","page7"]

addEventListener("scroll", e =>{
    //scroll events here
    const scrollY = window.scrollY;
    const height = window.innerHeight;
    for(let i = 0; i < doms.length; i++)
    {
        const el = __v[doms[i]];
        const top = el.offsetTop;
        const bottom = el.offsetTop + el.offsetHeight;
        if(doms[i] === "navbar")
        {
            if(scrollY > 80)
            {
                if(!__p(["navbar","active"]))
                {
                    updateState({name:"navbar",prop:"active",value:true})
                }
            }
            else if(scrollY <= 200)
            {
                if(__p(["navbar","active"])) updateState({name:"navbar",prop:"active",value:false})   
            }
        }else
        {
            if((top-scrollY < height/2) && (top-scrollY >= -(el.offsetHeight/2)))
            {
                //Display elements  to flex here
                if(!__p([doms[i],"active"],false)) updateState({name:doms[i],prop:"active",value:true})
                //Display elements  to flex here
            }
        }
    }
    //scroll events here
})