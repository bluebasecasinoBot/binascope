const visualTreeParams = {
    ws:null,
    mounted:false,
    sent:false,
    root:'container'
}

const MEDIA_QUERY = new Object();

export const mediaFunction = [];

export const SYD_VAR = {};

export class SYD_VAR_constructor
{
    constructor({value})
    {
        this.value = value;
        this.change = (value)=>this.value = value;
        this.update = ({branch = 'container' , value}) =>{
            const state = __g(branch);
            this.value = value;
            __u(branch , {type:"a" , value:state})
        }//USE CASE : SYD_VAR.varName.update({value:"variable new value"})
        this.get = () =>{
            return this.value
        }
    }
}

let prevX = 0;

const GENERIC_DOM = {
    bg_cover:{
        parent:{backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'},
        child:{}
    },
    bg_fit:{
        parent:{backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:'no-repeat'},
        child:{}
    },
    flex_col:{
        parent:{display:'flex',flexDirection:'column',alignItems:'center'},
        child:{}
    },
    fl_el:{
        parent:{position:'relative'},
        child:{position:'absolute',top:'0',left:'0',height:'100%',width:'100%'}
    }
}

window.onload = () =>{
    // manage_mediaQuery(600);
    manage_mediaQuery(window.innerWidth)
}

window.onresize = () =>{    
    manage_mediaQuery(window.innerWidth);
    mediaFunction.forEach(func=>func());
}

// window.onfocus = () =>{
//     manage_mediaQuery(600);

//     manage_mediaQuery(window.innerWidth)

// }

// window.onblur = () =>{
//     manage_mediaQuery(600);

//     manage_mediaQuery(window.innerWidth)

// }

// window.onbeforeunload = () =>{
//     manage_mediaQuery(600);

//     manage_mediaQuery(window.innerWidth)

// }

export const manage_mediaQuery = (width) =>{
    // console.log(MEDIA_QUERY)
    for(let i = 0; i < Object.keys(MEDIA_QUERY).length; i++)
    {
        const unitInfo = MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].query;
        let newMap = unitInfo.map(val =>{return val});
        let sorted = newMap;
        let mediaMatch = false

        // console.log(newMap)
        // adding default style;
        
        const sort = () =>{
            let current = [500000,0]
            for(let j = 0; j < newMap.length; j++)
            {
                const unit_size = Number(/\d{1,}/.exec(newMap[j].size)[0])
                switch(unit_size < current[0])
                {
                    case true:
                        current = [unit_size,j]
                }
            }
            sorted.push(newMap[current[1]])
            newMap.splice(current[1],1)
            switch(true)
            {
                case newMap.length > 0:
                    sort()
            }
        }
        // sort()
        // sorted = sorted.reverse()

        for(let i = 0; i < sorted.length; i++)
        {
            const val = sorted[i];

            let boolBreak = false;

            try{
                const mode_reg = /(\<|\>)(\={0,})/.exec(val.size)[0];
                const px_size = Number(/\d{1,}/.exec(val.size)[0]);

                const querySizeArr = sorted.map(val =>{return Number(/\d{1,}/.exec(val.size)[0])});
    
                switch(mode_reg)
                {
                    case '<':
                        if(width < px_size)
                        {
                            applyStyle(val.prop)
                            if(querySizeArr.sort((a,b) =>{return a-b}).indexOf(px_size) < sorted.length-1)
                            {
                                boolBreak = true
                            }
                        }
                        // else
                        // {
                        //     applyStyle(val,1)
                        // }
                    break;
                    case '<=' :
                        if(width <= px_size)
                        {
                            applyStyle(val.prop)
                            if(querySizeArr.sort((a,b) =>{return a-b}).indexOf(px_size) < sorted.length-1)
                            {
                                boolBreak = true
                            }
                        }
                        // else
                        // {
                        //     applyStyle(val,1)
                        // }
                    break;
                    case '>' :
                        if(width > px_size)
                        {
                            applyStyle(val.prop);
                            if(querySizeArr.sort((a,b) =>{return b-a}).indexOf(px_size) === sorted.length-1)
                            {
                                boolBreak = true
                            }
                        }
                        // else
                        // {
                        //     applyStyle(val,1)
                        // }
                    break;
                    case '>=' :
                        if(width >= px_size)
                        {
                            applyStyle(val.prop);
                            if(querySizeArr.sort((a,b) =>{return b-a}).indexOf(px_size) < sorted.length-1)
                            {
                                boolBreak = true
                            }
                        }
                        // else
                        // {
                        //     applyStyle(val,1)
                        // }
                    break;
                }
            }
            catch(err)
            {
                console.log(err.message)
                console.error('please enter a valid media query parameter')
            }

            if(boolBreak)
            {
                break;
            }
        }

        function applyStyle(val)
        {
            mediaMatch = true;
            const state = getState(Object.keys(MEDIA_QUERY)[i]);
            for(let k = 0; k < Object.keys(val).length; k++)
            {
                const unit_prop = val[Object.keys(val)[k]]
                state[`${Object.keys(val)[k]}`] = unit_prop;
            }
            useState(`${Object.keys(MEDIA_QUERY)[i]}`,{type:'a',value:state})
        }

        function applyStyle_def()
        {
            const val = MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].defState
            const state = getState(Object.keys(MEDIA_QUERY)[i]);
            for(let k = 0; k < Object.keys(val).length; k++)
            {
                const unit_prop = val[Object.keys(val)[k]]
                state[`${Object.keys(val)[k]}`] = unit_prop;
            }
            useState(`${Object.keys(MEDIA_QUERY)[i]}`,{type:'a',value:state})
        }

        switch(mediaMatch)
        {
            case true:
                MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].stateCount = 1;
                break;
            default:
                applyStyle_def()
        }

        function addDefault_style()
        {
            const defaultObj = MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].defState === undefined ? {} : MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].defState;
            switch(Number(Object.keys(defaultObj).length) > 0 && MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].stateCount === 1 && !mediaMatch)
            {
                case true:
                    MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].stateCount = 0;
                    applyStyle_def(MEDIA_QUERY[Object.keys(MEDIA_QUERY)[i]].defState)
            }
        }

        addDefault_style()
    }        
}

class addStyleComponent{
    constructor(style)
    {
        this.defaultStyle = style;
        this.capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const refineX = (x) =>{
            let dummy = x;
            for(let index in dummy)
            {
               if(this.capitals.includes(dummy[index]))
               {
                    let idNum = dummy.indexOf(dummy[index]);
                    dummy = dummy.slice(0,idNum)+`-${dummy[index].toLowerCase()}`+dummy.slice(idNum+1,dummy.length)
               }
            }
            return dummy;
        }
        this.merge = (useObj) =>{
            let string = new String();
            for(let [x,y] of Object.entries(useObj))
            {
                x = refineX(x);
                let styleEntity = `${x}: ${y}; `
                string += styleEntity;
            }
            return string;
        }
        this.mergedStyle = this.merge(this.defaultStyle);

        this.update = (cmd = {}) =>{
            let returnable;
            let newStyle = new Object;
            Object.assign(newStyle,this.defaultStyle);
            
            const operation = (obj = {}) =>{
                let {method,style} = obj;
                switch(true)
                {
                    case method === 'remove':
                        style = style === undefined ? [] : style;
                        for(let x of style)
                        {
                            if(x in newStyle)
                            {
                                delete newStyle[x];
                            }
                        }
                        returnable = this.merge(newStyle);
                    break;
                    case method === 'add':
                        style = style === undefined ? {} : style;
                        for(let [y,z = ''] of Object.entries(style))
                        {
                            newStyle[y] = z;
                        }
                        returnable = this.merge(newStyle);
                    break;
                    case method === 'use':
                        style = style === undefined ? [] : style;
                        const newStylePatch = new Object();
                        for(let x of style)
                        {
                            if(x in newStyle)
                            {
                                newStylePatch[x] = newStyle[x]
                            }
                        };
                        newStyle = newStylePatch
                        // console.log(newStyle,newStylePatch)
                        returnable = this.merge(newStylePatch)
                    break;
                    default:
                        returnable = this.mergedStyle;
                }
            }

            try{
                cmd.forEach(val =>{
                    operation(val)
                })
            }
            catch(err)
            {
                operation(cmd)
            }
            return returnable;
        }
    }
}
export const sydDOM = new Object();
export const __SYD = sydDOM;
export const virtualDom = new Object();
export const __v = virtualDom;
export const DomType = new Object();
export const styleComponent = new Object();
export const __sC = styleComponent
export const setStyle = (styleArray = []) =>{
    let returnable = []
    const run = ({nameTag,style = {}}) =>{
        if(nameTag === undefined)
        {
            console.error("please enter a style name for reference")
        }else{
            styleComponent[nameTag] = new addStyleComponent(style).update;
            returnable.push(styleComponent[nameTag]());
        }
    }
    switch(true)
    {
        case styleArray.length !== undefined:
            // styleArray.style = styleArray.style === undefined ? {} : styleArray.style;
            for(let elem of styleArray)
            {
                run(elem)
            }
        break;
        default:
            styleArray.style = styleArray.style === undefined ? {} : styleArray.style;
            run(styleArray)
    }
   return returnable.length === 1 ? returnable[0] : returnable;
}
export const __sS = setStyle
//RENDER SECTION

class creator{
    constructor({tagname,attribute,children,Dom,createState,eventListener , innerHTML})
    {
        this.element = document.createElement(tagname);
        switch(true)
        {
            case Dom !== null:  
                virtualDom[Dom] = this.element;
                DomType[Dom] = Dom;
        }
        Object.keys(attribute).forEach((val,id,array)=>{
            this.element.setAttribute(val,attribute[val])
        })
        this.addEventListeners = () =>
        {
            for(let j = 0; j < Object.keys(eventListener).length; j++)
            {
                const val = Object.keys(eventListener)[j]
                switch(true)
                {
                    case /^on/.test(val):
                        this.element[val] = eventListener[val]
                    break;
                }
            }
        }
        this.addEventListeners();

        this.addInnerHtml = () =>{
            innerHTML.forEach(val =>{
                this.element.innerHTML = val
            })
        }

        this.addInnerHtml()

        children.forEach(val =>{
           const child = render(val);
           this.element.appendChild(child);
        })
    }
}

export const render = (vapp) =>{
    if(typeof vapp === 'string') 
    {
        return document.createTextNode(vapp)
    }else {
        // let vapp_element = appendGenericStyle(vapp)
        return new creator(vapp).element;
    }
}

//MOUNT SECTION

export const mount = (VDom , func=()=>{}) =>{
    const Dom = render(VDom);
    
    document.getElementById('root').replaceWith(Dom);
    visualTreeParams.mounted = true;
    if(visualTreeParams['ws'] !== null)
    {
        visualTreeParams['ws'].addEventListener('open', e =>{
            console.log(visualTreeParams['root'])
            visualTreeParams['ws'].send(JSON.stringify({header:'visualTree',data:sydDOM[visualTreeParams['root']]()}));
        })
        visualTreeParams.sent = true;
    }
    func();

    // const observer = new ResizeObserver(entries => {
    //     for (let entry of entries) {
    //         manage_mediaQuery(window.innerWidth);
    //         mediaFunction.forEach(func=>func());
    //     }
    // });

    // observer.observe(Dom);
    return Dom
}

export const __m = mount


// DIFFING ALGORITHM

class diffAlgo{
    constructor(type,oldVApp,newVApp)
    {
        this.oldVApp = oldVApp;
        this.newVApp = newVApp;
        this.$dom = virtualDom[type];
        this.Ndom = [];
        this.patches = new Array();
        this.type = type
        diffAlgo.startDiffing(this)
    }
    static startDiffing(params)
    {
        const {oldVApp,newVApp,$dom,type} = params;
        let {patches} = params;

        const startTagComparison = (oldVApp,newVApp) =>{
            if(oldVApp.tagname === newVApp.tagname)
            {
                return true;
            }else return false;
        }


        const updateAttr = (oldVAppAttr,newVAppAttr,parent) =>{
            for(let [x,y] of Object.entries(newVAppAttr))
            {
                // console.log(x,y , y === oldVAppAttr[x] , oldVAppAttr[x])
                switch(true)
                {
                    case !(x in oldVAppAttr) || y !== oldVAppAttr[x]:
                        patches.push(
                            [parent,parent =>{
                                parent.setAttribute(x,y)
                                parent[`${x}`] = y;
                            }]
                        )
                    break;
                }
            }

            for(let [x,y] of Object.entries(oldVAppAttr))
            {
                if(!(x in newVAppAttr))
                {
                    patches.push(
                        [parent,parent =>{
                            parent.removeAttribute(x);
                        }]
                    )
                }
            }
        }

        const zip = (Ochildren,Nchildren) =>{
            const zipped = new Array();
            for(let i = 0; i < Math.min(Ochildren.length,Nchildren.length); i++){
                zipped.push([Ochildren[i],Nchildren[i]])
            }
            return zipped
        }

        const updateChild = (Ochildren,Nchildren,parent , type) =>{
            const arrays = zip(Ochildren,Nchildren);

            arrays.forEach((val,idx) =>{
                if(val.length > 0)
                {
                    //update eventListeners
                    if(val.length > 1)
                    {
                        if(val[1].eventListener)
                        {
                            Object.keys(val[1].eventListener).forEach(event =>{
                                if(val[1].eventListener[event] !== val[0].eventListener[event])
                                {
                                    patches.push(
                                        [parent,parent =>{
                                            parent.childNodes[idx][event] = val[1].eventListener[event]
                                        }]
                                    )
                                }
                            })
                        }

                        //update innerHTML
                        if(val[1].innerHTML)
                        {
                            val[1].innerHTML.forEach((element , eid)  =>{
                                if(element !== val[0].innerHTML[eid])
                                {
                                    patches.push(
                                        [parent,parent =>{
                                            parent.innerHTML = element;
                                            
                                        }]
                                    )
                                }
                            })
                        }
                        //update innerHTML
                    } 
                    //update eventListeners
                    startchildProcess(val[0],val[1],parent.childNodes[idx] , type)
                }
            });

            for(let i = 0; i < Nchildren.length; i++)
            {
                switch(true)
                {
                    case i > arrays.length-1:
                        patches.push(
                            [parent,parent =>{
                                parent.appendChild(render(Nchildren[i]));
                            }]
                        ) 
                }
            }

            const dummy = [];

            for(let i = 0; i < Ochildren.length; i++)
            {
                switch(true)
                {
                    case i > arrays.length-1:
                        dummy.push(i)
                }
            }
            for(let i = dummy.length-1; i >= 0;i--)
            {
                patches.push(
                    [parent,parent =>{
                        try
                        {
                            if(parent.childNodes[dummy[i]]) parent.removeChild(parent.childNodes[dummy[i]]);
                        }catch(err)
                        {
                            console.log(err)
                            console.log(parent.childNodes[dummy[i]])
                        }
                    }]
                ) 
            }
            //trim dom element to fit exactly with vDom
            const value = Array.from(parent.childNodes).length;
            for(let i = value-1; i > Nchildren.length-1; i--)
            {
                parent.removeChild(parent.childNodes[i])
            }
            //trim dom element to fit exactly with vDom
        }

        const stringProcess = (parent,newVApp) =>{
            patches.push(
                [parent,parent =>{
                    parent.replaceWith(render(newVApp));
                }]
            )
        }

        const startchildProcess = (oldVApp,newVApp,parent) =>{
            switch(true)
            {
                case typeof newVApp === 'string':
                    switch(true)
                    {
                        case newVApp !== oldVApp:
                            stringProcess(parent,newVApp);
                    }
                break;
                default:
                    const boolean = startTagComparison(oldVApp,newVApp);
                    switch(true)
                    {
                        case boolean:
                            updateAttr(oldVApp.attribute,newVApp.attribute,parent);
                            updateChild(oldVApp.children,newVApp.children,parent,type);
                        break;
                        default:
                            patches.push(
                                [parent,parent =>{
                                    parent.replaceWith(render(newVApp));
                                }]
                            ) 
                    }
            }
        }
        startchildProcess(oldVApp,newVApp,$dom);
        
        patches.forEach(val => val[1](val[0]));
    }
}

export const sydDiff = ({type, oldVApp, newVApp}) =>{
    new diffAlgo(type,oldVApp,newVApp);
}
// export default diffAlgo;

//CREATE ELEMENT SECTION

const appendGenericStyle = (vapp) =>{
    vapp.genericStyle.forEach(val =>{
        vapp.attribute.style  = vapp.attribute.style === undefined ? '' : vapp.attribute.style;
        switch(true)
        {
            case !val.includes('[_c]'):
                const style_parent = new addStyleComponent(GENERIC_DOM[val].parent).update()
                vapp.attribute.style += vapp.attribute.style[vapp.attribute.style.length-1] !== ';' ? `;${style_parent}` : `${style_parent}`
        }
    })
    // console.log(vapp)
    sydDOM[`${vapp.Dom}`] = vapp;
    return vapp
}

class createElementClass{
    constructor(tagname,attribute,children,type,createState,mediaQuery,events,genericStyle,innerHTML)
    {

        this.mainObj = new Object;
        this.mainObj.tagname = tagname;
        this.mainObj.attribute = attribute;
        this.mainObj.children = children;
        this.mainObj.Dom = type;
        this.mainObj.createState = createState
        this.mainObj.mediaQuery = mediaQuery;
        this.mainObj.eventListener = events;
        this.mainObj.genericStyle = genericStyle;
        this.mainObj.innerHTML = (() =>{
            let innerHTML_array = new Array()
            try{
                innerHTML.forEach(val =>{

                });

                innerHTML_array = innerHTML
            }catch(err){
                innerHTML_array = [innerHTML]
            }

            return innerHTML_array
        })()

        // console.log(this.mainObj.innerHTML)

        this.mainObj.removeAttr = (attrArray) =>{
            for(let attrName of attrArray)
            {
                if(attrName in this.mainObj.attribute)
                {
                    delete this.mainObj.attribute[attrName];
                }
            }
            return this.mainObj;
        }

        this.addStateDom = () =>{
            if(Object.keys(createState).length > 0)
            {   
                this.mainObj.Dom = createState.stateName;
                if(GlobalState[createState.stateName] === undefined)
                {
                    setState(
                        createState
                    )
                }
            }
        }
        this.addStateDom()

        this.addMediaQuery = () =>{
            switch(Object.keys(this.mainObj.mediaQuery).length > 0 && this.mainObj.Dom !== undefined)
            {
                case true:
                    MEDIA_QUERY[this.mainObj.Dom] = this.mainObj.mediaQuery;
                    MEDIA_QUERY[this.mainObj.Dom].stateCount = 0;
            }
        }
        this.addMediaQuery();

        this.addGenericStyle = () =>{
            this.mainObj.genericStyle.forEach(val =>{
                this.mainObj.attribute.style  = this.mainObj.attribute.style === undefined ? '' : this.mainObj.attribute.style;
                switch(val.includes('[_c]'))
                {
                    case false:
                        const style_parent = new addStyleComponent(GENERIC_DOM[val].parent).update();
                        this.mainObj.attribute.style = `${style_parent}${this.mainObj.attribute.style}`

                        this.mainObj.children.forEach((child,cid) =>{
                            switch(true)
                            {
                                case this.mainObj.children[cid].attribute !== undefined && child.genericStyle.every(param =>{return !param.includes(val)}):
                                    // console.log(child.genericStyle)
                                    this.mainObj.children[cid].attribute.style = this.mainObj.children[cid].attribute.style === undefined ? '' : this.mainObj.children[cid].attribute.style

                                    const style_child = new addStyleComponent(GENERIC_DOM[val].child).update();
                                    this.mainObj.children[cid].attribute.style = `${style_child}${this.mainObj.children[cid].attribute.style}`
                            }
                        })
                    break;
                    case true:
                        const getGene = GENERIC_DOM[val.split('[_c]')[0]].child
                        const style_child = new addStyleComponent(getGene === undefined ? {} : getGene).update();
                        this.mainObj.attribute.style = `${style_child}${this.mainObj.attribute.style}`
                }

            })
        }
        this.addGenericStyle()

        this.mainObj.addAttr = (objectAttr = {}) =>{
            Object.entries(objectAttr).forEach(val =>{
                let [x,y] = val;
                y = y === null ? "" : y;
                this.mainObj.attribute[x] = y;
            })
            return this.mainObj;
        }

        this.mainObj.removeChild = (index = this.mainObj.children.length-1) =>{
            let array = true;
            try{
                index.forEach(val =>{})
            }catch(err)
            {
                array = false
            }
            const mainOperation = (index) =>{
                switch(true)
                {
                    case this.mainObj.children[index] !== undefined:
                        this.mainObj.children.splice(index,1);
                    break;
                    default:
                        console.warn('the specified index does not exist')
                }
            }
            switch(true)
            {
                case array:
                    index.forEach((val,idx) =>{
                        mainOperation(val);
                        switch(true)
                        {
                            case index[idx+1] !== undefined:
                                index[idx+1]--;
                        }
                    });
                break;
                default:
                    mainOperation(index)
            }
            return this.mainObj
        }

        this.mainObj.inherit = (array) =>{
            let temporal = this.mainObj;
            for(let i = 0; i < array.length; i++)
            {
                if(temporal[array[i]] !== undefined)
                {
                    temporal = temporal[array[i]];
                }else{
                    break;
                }
            }
            return temporal
        }


        const elementalUpdate = (position,element) =>{
            switch(true)
            {
                case element !== undefined:
                    switch(true)
                    {
                        case position === 'end':
                            this.mainObj.children.push(element);
                        break;
                        case position === 'start':
                            this.mainObj.children.unshift(element)
                        break;
                        default:
                            if(!isNaN(Number(position)))
                            {
                                switch(true)
                                {
                                    case position < this.mainObj.children.length:
                                        this.mainObj.children = [...this.mainObj.children.slice(0,position),element,...this.mainObj.children.slice(position,this.mainObj.children.length)]
                                    break;
                                    default:
                                        console.warn('invalid position parameter!')
                                }
                            }else console.warn('please enter a valid position argument')
                    }
                break;
                default:
                    console.warn('please enter a valid element to add')
            }
        }
        this.mainObj.addChild = ({position = 'end', element = undefined} = {}) =>{
            elementalUpdate(position,element)
            return this.mainObj;
        }

        this.mainObj.replaceChild = ({position,element}) =>{
            if(position === undefined || element === undefined )
            {
                console.warn('please enter a valid argument for position and element')
            }else{
                this.mainObj.children[position] = element;
            }
            return this.mainObj;
        }
    }
}

export const createElement = (tagname = 'div', attribute = {}, children = [],{type = null,createState = {},mediaQuery = {} , innerHTML = [''],events = {}, genericStyle = []} = {}) =>{
   return new createElementClass(tagname,attribute,children,type,createState,mediaQuery,events,genericStyle , innerHTML).mainObj
}

export const __c = createElement;
export const $ = createElement;

// STATES SECTION

class createState{
    constructor(name,newstate,tenary,tenaryOptions)
    {
        this.object = new Object();
        this.object.stateName = name;
        this.object.count = 0;
        this.object.new = newstate;
        this.object.old = 0;
        this.object.tenary = tenary;
        this.tenaryOptions = tenaryOptions;
        this.object.oldAppDiff = {};
        this.newAppDiff = {};
        // console.log(newstate,oldstate)
        this.loadTenary = () =>{
            if(tenary)
            {
                this.object.old = this.tenaryOptions[0];
                this.object.new = this.tenaryOptions[1];
            }
        }
        this.loadTenary();

        const commenceDiffAlgorithm = () =>{
            const oldapp = {};
            Object.assign(oldapp , this.object.oldAppDiff);
            const newapp = {};
            Object.assign(newapp , sydDOM[this.object.stateName]());

            if(oldapp !== newapp)
            {
                sydDiff(
                    {
                        type:this.object.stateName,
                        oldVApp:oldapp,
                        newVApp:newapp
                    }
                );

                Object.assign(this.object.oldAppDiff , newapp);
                //sigma🗿🫰🗿 fixed this bug on 10 / 08 / 25
            }
        }
        
        this.object.update = (type,value) =>{
            switch(true)
            {
                case this.object.tenary:
                    commenceDiffAlgorithm()
                    this.object.old = this.object.new;
                    this.object.new = this.object.new === this.tenaryOptions[0] ? this.tenaryOptions[1] : this.tenaryOptions[0];
                break;
                case type === 'i' || type === 'increment':
                    if(!isNaN(Number(this.object.new)))
                    {
                        this.object.old = this.object.new;
                        this.object.new += value;
                        commenceDiffAlgorithm()
                    }else console.warn(`cannot increment a state of type ${typeof this.object.new}`)
                break;
                case type === 'a' || type === 'assign':
                    this.object.old = this.object.new;
                    this.object.new = value;
                    commenceDiffAlgorithm()
                break;
                case type === 'd'|| type === 'decrement':
                    if(!isNaN(Number(this.object.new))){
                        if(this.object.new > 0)
                        {
                            this.object.old = this.object.new;
                            this.object.new -= value;
                        }else{
                            this.object.old = this.object.new;
                            this.object.new = 0;
                        }
                        commenceDiffAlgorithm()
                    }else console.warn(`cannot decrement a state of type ${typeof this.object.new}`);
                break;
            }

            return this.object
        }
    }
}

const GlobalState = new Object();
//{newstate = 0,tenary = false, tenaryOptions = [false,true], state}
export const setState = ({stateName,state = 0, tenary = false, tenaryOptions = [false,true]}) =>{
    let newstate = state;
    switch(true)
    {
        case stateName !== undefined:
            GlobalState[stateName] = new createState(stateName,newstate,tenary,tenaryOptions).object;
            GlobalState[stateName].oldAppDiff = sydDOM[stateName]();
        break;
        default: console.error('Enter a name for the addState')
    }
}

export const getState = (stateName) =>{
    let object = new Object
    let returnable = undefined;
    if(GlobalState[stateName] !== undefined)
    {
        for(let [n,v] of Object.entries(GlobalState[stateName].new))
        {
            object[n] = v;
        }
        // if(Object.keys(GlobalState[stateName].oldAppDiff).length === 0)
        // {
        //     GlobalState[stateName].oldAppDiff = sydDOM[stateName]()
        // }
        returnable = object;
    }

    // console.log(GlobalState[stateName].oldAppDiff);

    return returnable;
}

export const __g = getState

export const useState = (name,{type = 'i',value = 1} = {}) =>{
    switch(true)
    {
        case GlobalState[name] !== undefined && type !== undefined:
            return GlobalState[name].update(type,value);
            //[version]
        break;
        default:
            // console.error('State Does Not Exist');
            return GlobalState[name];
    }
}

export const __u = useState;

export const visualTree = ({visual = false,port = 9090,root = 'container'}) =>{
    switch(true)
    {
        case visual:
            visualTreeParams['ws'] = new WebSocket(`ws://localhost:${port}`);
            visualTreeParams['root'] = root
                visualTreeParams['ws'].addEventListener('open', e =>{
                    if(visualTreeParams.mounted && !visualTreeParams.sent && Object.keys(sydDOM).length > 0)
                    {
                        visualTreeParams['ws'].send(JSON.stringify({header:'visualTree',data:sydDOM[visualTreeParams['root']]()}));
                    }
                })  
    }
}
export const preState = (acessNames,defaultState) =>{
    let arrayBool = true;
    let stateName = ''
    try{
        acessNames.forEach(val =>{})
    }catch(err){
        arrayBool = false
    }
    stateName = arrayBool ? acessNames[0] : acessNames
    let resolve;
    if(GlobalState[stateName] !== undefined)
    {
        resolve = GlobalState[stateName].new;
        if(arrayBool)
        {
            for(let i = 1; i < acessNames.length; i++)
            {
                if(resolve[acessNames[i]] !== undefined)
                {
                    resolve = resolve[acessNames[i]];
                }else{
                    resolve = defaultState
                }
            }
        }
    }else
    {
        resolve = defaultState
    }
    return resolve
}

export const __p = preState