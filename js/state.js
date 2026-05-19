let pcState=1;
Object.defineProperty(window,'pcState',{get:()=>pcState,set:(v)=>{pcState=v}});
