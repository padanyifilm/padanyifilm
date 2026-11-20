const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/script.js','utf8');
async function scenario(en,fetchResult){
 const status={textContent:'',className:''},button={disabled:false},estimate={value:'209000'};
 let handler,resets=0,requests=0;
 const form={action:'https://formspree.io/f/xrerwodr',dataset:{},querySelector:()=>button,addEventListener:(event,fn)=>{if(event==='submit')handler=fn;},reset:()=>{resets++;}};
 const nodes={contactForm:form,formStatus:status,'estimated-price':estimate};
 vm.runInNewContext(source,{document:{documentElement:{lang:en?'en':'hu'},querySelectorAll:()=>[],getElementById:id=>nodes[id]||null},localStorage:{getItem:()=> 'declined'},FormData:class {},fetch:async(url,options)=>{assert.equal(url,form.action);assert.equal(options.method,'POST');requests++;return fetchResult();}});
 handler({preventDefault(){}});
 assert.equal(button.disabled,true);
 await new Promise(resolve=>setImmediate(resolve));
 return {status,button,resets,requests};
}
(async()=>{
 for(const en of [false,true]){
  let r=await scenario(en,()=>({ok:true}));assert.equal(r.resets,1);assert.equal(r.status.className,'form-status success');assert.equal(r.requests,1);
  r=await scenario(en,()=>({ok:false,json:async()=>({errors:[{message:'Server rejected request'}]})}));assert.equal(r.resets,0);assert.equal(r.status.className,'form-status error');assert.equal(r.button.disabled,false);
  r=await scenario(en,()=>{throw Error('Network unavailable');});assert.equal(r.resets,0);assert.equal(r.status.className,'form-status error');
  r=await scenario(en,()=>({ok:false,json:async()=>{throw Error('Not JSON');}}));assert.equal(r.resets,0);assert.equal(r.status.className,'form-status error');
 }
 console.log('8 mocked submission scenarios passed; no external requests sent.');
})().catch(e=>{console.error(e);process.exitCode=1;});
