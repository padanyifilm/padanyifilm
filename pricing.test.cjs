const assert=require('node:assert/strict');
const P=require('./pricing.js');
let checks=0;
function equal(actual,expected){assert.deepEqual(actual,expected);checks++;}
// Explicit business table, not generated from the implementation formula.
const prices={8:[209000,159000],9:[217000,167000],10:[225000,175000],11:[233000,183000],12:[241000,191000],13:[249000,199000]};
for(const year of [2027,2028,2030]){
 for(const [date,column] of [['04-19',1],['04-20',0],['10-10',0],['10-11',1],['01-01',1],['12-31',1]]){
  for(let hours=8;hours<=13;hours++)equal(P.quote('full',`${year}-${date}`,hours).amount,prices[hours][column]);
  for(const hours of [8,13]){
   equal(P.quote('mini',`${year}-${date}`,hours),{packageId:'mini',date:`${year}-${date}`,hours:2,amount:99000});
   equal(P.quote('premium',`${year}-${date}`,hours),{packageId:'premium',date:`${year}-${date}`,hours:13,amount:399000});
  }
 }
}
for(const date of ['','2027-02-29','2028-02-30','2027-04-31','2027-00-01','2027-13-01','2027-1-01','0000-01-01'])equal(P.quote('full',date,13),null);
for(const hours of [7,14,8.5,'invalid',''])equal(P.quote('full','2027-06-01',hours),null);
equal(P.quote('missing','2027-06-01',13),null);
equal(P.quote('full','2028-02-29',8).amount,159000);
equal(P.quote('full','2027-06-01',13,'2027-06-02'),null);
equal(P.quote('full','2027-06-02',13,'2027-06-02').amount,249000);
equal(P.money(249000).replace(/\s/g,' '),'249 000 Ft');
equal(P.displayDate('2027-04-20',false),'2027. április 20.');
console.log(`${checks} checks passed (TZ=${process.env.TZ||'system'}).`);
