(function () {
  'use strict';
  var P=window.PadanyiPricing, en=document.documentElement.lang==='en', lang=en?'en':'hu';
  var calculator=document.getElementById('kalkulator');
  if(!calculator||!P)return;
  document.querySelector('.pricing-grid').innerHTML=P.publicCards(en);
  document.getElementById('estimate-packages').innerHTML=P.selectionCards(en);
  var date=document.getElementById('estimate-date'), location=document.getElementById('estimate-location');
  var hours=document.getElementById('estimate-hours'), hoursWrap=document.getElementById('estimate-hours-wrap');
  var hoursLabel=document.getElementById('estimate-hours-value'), fixedCoverage=document.getElementById('estimate-fixed-coverage');
  var result=document.getElementById('estimate-price'), summary=document.getElementById('estimate-summary');
  var error=document.getElementById('estimate-error'), apply=document.getElementById('estimate-apply');
  var form=document.getElementById('contactForm'), contactLocation=document.getElementById('contact-location');
  var contactSummary=document.getElementById('contact-estimate'), selected='full';
  function pack(){return P.packages.find(function(p){return p.id===selected;});}
  function currentQuote(){return P.quote(selected,date.value,hours.value,P.today());}
  function details(q){return pack().name[lang]+' · '+P.displayDate(q.date,en)+' · '+q.hours+(en?' hours':' óra')+(selected==='premium'?(en?' + separate creative session':' + külön napi kreatív filmezés'):'');}
  function sync(){
    date.min=P.today();var q=currentQuote(),full=selected==='full';
    hoursWrap.hidden=!full;fixedCoverage.hidden=full;
    fixedCoverage.textContent=pack().hours+(en?' hours of coverage':' óra rendelkezésre állás')+(selected==='premium'?(en?' + creative filming on a separate day':' + külön napi kreatív videózás'):'');
    hoursLabel.textContent=hours.value+(en?' hours':' óra');hours.setAttribute('aria-valuetext',hoursLabel.textContent);
    var next=q?P.money(q.amount):(en?'Choose a date':'Válasszatok dátumot');
    if(result.textContent!==next){result.textContent=next;result.classList.remove('price-updated');void result.offsetWidth;result.classList.add('price-updated');}
    summary.textContent=q?details(q):pack().name[lang]+(en?' package':' csomag');
    error.textContent=date.value&&!q?(en?'Please choose a valid date today or later.':'Mai vagy későbbi, érvényes dátumot válasszatok.'):'';
    date.setAttribute('aria-invalid',String(Boolean(date.value&&!q)));apply.disabled=!q;
    form.querySelector('.form-submit').disabled=!q || form.dataset.sending==='true';
    document.getElementById('contact-package').value=pack().name[lang];document.getElementById('contact-date').value=q?q.date:'';
    document.getElementById('contact-hours').value=q?String(q.hours):'';document.getElementById('estimated-price').value=q?String(q.amount):'';
    contactSummary.textContent=q?details(q)+' · '+P.money(q.amount)+(en?' + travel':' + kiszállás'):(en?'Choose your package and date in the calculator above.':'Válasszatok csomagot és dátumot a fenti kalkulátorban.');
  }
  calculator.addEventListener('change',function(e){if(e.target.name==='estimate-package')selected=e.target.value;sync();});
  date.addEventListener('input',sync);hours.addEventListener('input',sync);
  location.addEventListener('input',function(){contactLocation.value=location.value;});
  contactLocation.addEventListener('input',function(){location.value=contactLocation.value;});
  document.querySelectorAll('[data-package]').forEach(function(link){link.addEventListener('click',function(){selected=link.dataset.package;document.querySelector('input[name="estimate-package"][value="'+selected+'"]').checked=true;sync();});});
  function goTo(target){target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  apply.addEventListener('click',function(){sync();if(!currentQuote())return;contactLocation.value=location.value;goTo(document.getElementById('ajanlatkeres'));document.getElementById('contact-name').focus({preventScroll:true});});
  // Capture runs before the existing Formspree listener builds FormData.
  form.addEventListener('submit',function(e){sync();if(!currentQuote()){e.preventDefault();e.stopImmediatePropagation();error.textContent=en?'Please choose your wedding date before sending.':'Az ajánlatkérés előtt adjátok meg az esküvő dátumát.';goTo(calculator);date.focus({preventScroll:true});date.reportValidity();}},true);
  form.addEventListener('reset',function(){setTimeout(function(){selected='full';date.value='';hours.value='13';location.value='';document.querySelector('input[name="estimate-package"][value="full"]').checked=true;sync();},0);});
  sync();
})();
