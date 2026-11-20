(function (root) {
  'use strict';
  // Shared source for public cards, calculator and submitted quotations.
  var packages = [
    { id:'mini', price:99000, hours:2, name:{hu:'Mini',en:'Mini'}, badge:{hu:'Rövidebb esküvőkhöz',en:'Shorter celebrations'},
      summary:{hu:'Ha a szertartást és a körülötte zajló eseményeket szeretnétek filmen visszanézni.',en:'For couples who want a film of the ceremony and the moments around it.'},
      features:{hu:['Szertartások rögzítése','2 óra rendelkezésre állás','3–4 perces highlight rövidfilm','40+ perces összefoglaló film'],en:['Ceremony coverage','2 hours of coverage','3–4 minute highlight film','40+ minute extended film']} },
    { id:'full', price:249000, hours:13, name:{hu:'Teljes',en:'Full'}, badge:{hu:'Egész napra',en:'Full-day coverage'},
      summary:{hu:'A készülődéstől az esti programokig. Rövidfilm a hangulatról, hosszúfilm a fontos eseményekkel.',en:'From getting ready to the evening celebrations. A highlight film to share and an extended film with the key events.'},
      features:{hu:['Teljes esküvői nap rögzítése','13 óra rendelkezésre állás','Drónfelvételek készítése','5–7 perces highlight rövidfilm','90+ perces összefoglaló film'],en:['Full wedding day coverage','13 hours of coverage','Drone footage','5–7 minute highlight film','90+ minute extended film']} },
    { id:'premium', price:399000, hours:13, name:{hu:'Prémium',en:'Premium'}, badge:{hu:'Külön kreatív nappal',en:'Separate creative session'},
      summary:{hu:'Az esküvő mellett egy külön napon is forgatunk, amikor több idő jut a közös felvételekre.',en:'Alongside the wedding day, we film a separate creative session with more time for the two of you.'},
      features:{hu:['Teljes esküvői nap rögzítése','13 óra rendelkezésre állás','Külön napi kreatív videózás','Drónfelvételek készítése','7–8 perces highlight rövidfilm','150+ perces összefoglaló film'],en:['Full wedding day coverage','13 hours of coverage','Creative filming on a separate day','Drone footage','7–8 minute highlight film','150+ minute extended film']} }
  ];
  function parseDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
    var parts=value.split('-').map(Number), year=parts[0], month=parts[1], day=parts[2];
    if(year<1||month<1||month>12||day<1)return null;
    var leap=year%4===0&&(year%100!==0||year%400===0);
    var days=[31,leap?29:28,31,30,31,30,31,31,30,31,30,31];
    return day<=days[month-1]?{year:year,month:month,day:day}:null;
  }
  function today() {
    var parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Budapest',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    var values={};parts.forEach(function(p){values[p.type]=p.value;});
    return values.year+'-'+values.month+'-'+values.day;
  }
  function quote(id,date,hours,minDate) {
    var pack=packages.find(function(p){return p.id===id;}), parsed=parseDate(date);
    if(!pack||!parsed||(minDate&&date<minDate))return null;
    var chosenHours=pack.id==='full'?Number(hours):pack.hours;
    if(pack.id==='full'&&(!Number.isInteger(chosenHours)||chosenHours<8||chosenHours>13))return null;
    var dayOfYear=parsed.month*100+parsed.day;
    var base=dayOfYear>=420&&dayOfYear<=1010?249000:199000;
    return {packageId:pack.id,date:date,hours:chosenHours,amount:pack.id==='full'?base-(13-chosenHours)*8000:pack.price};
  }
  function money(value){return new Intl.NumberFormat('hu-HU').format(value)+' Ft';}
  function displayDate(value,en){if(!parseDate(value))return '';return new Intl.DateTimeFormat(en?'en-GB':'hu-HU',{timeZone:'UTC',year:'numeric',month:'long',day:'numeric'}).format(new Date(value+'T12:00:00Z'));}
  function publicCards(en){var lang=en?'en':'hu';return packages.map(function(p){return '<article class="p-card '+(p.id==='full'?'shine-purple':'')+'"><header class="p-head"><h3 class="p-title">'+p.name[lang]+'</h3><span class="p-badge">'+p.badge[lang]+'</span></header><ul class="p-list">'+p.features[lang].map(function(f){return '<li>'+f+'</li>';}).join('')+'</ul><p class="p-fit">'+p.summary[lang]+'</p><div class="p-price"><div class="price-discount"><span class="price-label">'+(en?'Package price':'Csomagár')+'</span><span class="price-value-strong">'+money(p.price)+'</span></div></div><a class="package-cta" href="#kalkulator" data-package="'+p.id+'">'+(en?'Choose this package':'Ezt a csomagot választom')+'</a></article>';}).join('\n');}
  function selectionCards(en){var lang=en?'en':'hu';return packages.map(function(p){return '<label class="estimate-choice"><input type="radio" name="estimate-package" value="'+p.id+'" '+(p.id==='full'?'checked':'')+'><span class="choice-content"><span class="choice-top"><strong>'+p.name[lang]+'</strong><span class="choice-mark" aria-hidden="true"></span></span><span class="choice-price">'+money(p.price)+'</span><span class="choice-hours">'+p.hours+(en?' hours of coverage':' óra rendelkezésre állás')+'</span><span class="choice-description">'+p.summary[lang]+'</span><span class="choice-features">'+p.features[lang].slice(2).join(' · ')+'</span><span class="choice-action">'+(en?'Select package':'Csomag kiválasztása')+'</span></span></label>';}).join('\n');}
  var api={packages:packages,parseDate:parseDate,today:today,quote:quote,money:money,displayDate:displayDate,publicCards:publicCards,selectionCards:selectionCards};
  root.PadanyiPricing=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
