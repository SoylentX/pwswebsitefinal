const form = document.getElementById("quizForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let age = parseInt(document.getElementById("age").value);
    let smoke = document.getElementById("smoke").value;

    let klachten = Array.from(document.querySelectorAll(".klachten input[type=checkbox]:checked"))
      .map(cb => cb.value);

    let aandoeningen = Array.from(document.querySelectorAll(".aandoeningen input[type=checkbox]:checked"))
      .map(cb => cb.value);

    let advies = "<h2>Persoonlijk advies</h2>";
    let risicoGevonden = false;

    if (age >= 35 && smoke === "ja") {
      advies += "<p>⚠️ Zeer Belangrijk: Ben je 35 jaar of ouder én rook je? De combinatiepil is dan riskant omdat het de kans op trombose en hartproblemen aanzienlijk vergroot. Een spiraal (hormoon of koper) of hormoonstaafje is hier een veiliger keuze. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
      risicoGevonden = true;
    }

    if (age >= 40) {
      advies += "<p>⚠️ Ouder dan 40: Vanaf deze leeftijd neemt je risico op trombose door hormonale anticonceptie toe. Dit is iets om **zeker te bespreken** met je arts. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
      risicoGevonden = true;
    }

    const cardiovasculaireRisicos = ["Trombose", "Bloedstolsels", "Hartaanval", "Hart- en vaatziekten"];
    const heeftCardioRisico = aandoeningen.some(a => cardiovasculaireRisicos.includes(a));

    if (heeftCardioRisico) {
      advies += "<p>❌ Hoog Risico/Afgeraden: Vanwege eerdere trombose of hart- en vaatziekten wordt de combinatiepil sterk afgeraden. Een spiraal is in deze gevallen vaak de meest geschikte en veilige methode. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
      risicoGevonden = true;
    }
    
    if (aandoeningen.includes("Borstkanker")) {
      advies += "<p>❌ Hoog Risico/Afgeraden: Bij (voormalige) borstkanker, of als dit veel in de familie voorkomt, wordt hormonale anticonceptie in de meeste gevallen afgeraden. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
      risicoGevonden = true;
    }
    
    if (aandoeningen.includes("Leverziekte")) {
      advies += "<p>⚠️ Leverfunctie: Hormonale middelen zijn vaak minder geschikt bij leverziekten, omdat je lever de hormonen moet verwerken. Overleg altijd met je arts! (Let op: Dit is geen vervanging voor medisch advies!)</p>";
      risicoGevonden = true;
    }
    
    if (aandoeningen.includes("Diabetes")) {
      advies += "<p>⚠️ Diabetes (met complicaties): Als je diabetes hebt met complicaties, is extra voorzichtigheid nodig. Je arts zal dan waarschijnlijk een **spiraal** aanraden. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
      risicoGevonden = true;
    }

    if (klachten.includes("Stemmingswisselingen") || klachten.includes("Depressieve gevoelens") || klachten.includes("Prikkelbaarheid")) {
      advies += "<p>💡 Stemming/PMS: De invloed van de pil op de stemming verschilt sterk per persoon. Sommige vrouwen ervaren verbetering, anderen juist verslechtering. Overweeg een non-hormonale methode of bespreek dit punt specifiek met je arts. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    }
    
    if (klachten.includes("Migraine met aura")) {
      advies += "<p>❌ Migraine met Aura: De combinatiepil is in dit geval niet geschikt vanwege het verhoogde risico op een beroerte. Een middel zonder oestrogeen (progestageen-only, zoals de minipil of hormoonspiraal) is een beter alternatief. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    }
    
    if (klachten.includes("Zware menstruatie") || klachten.includes("Pijnlijke menstruatie")) {
      advies += "<p>👍 Menstruatieklachten: De hormoonspiraal is zeer effectief in het verminderen van zware bloedingen en menstruatiepijn. Dit kan een goede optie zijn. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    }
    
    if (klachten.includes("Acne")) {
      advies += "<p>👍 Acne: Sommige combinatiepillen kunnen helpen bij acne doordat ze de aanmaak van mannelijke hormonen verminderen (anti-androgene werking). (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    }
    
    if (klachten.includes("Gewichtstoename") || klachten.includes("Hoofdpijn")) {
      advies += "<p>⚠️ Bijwerkingen: Gewichtstoename en hoofdpijn zijn veelgenoemde bijwerkingen. Als dit storend is, overweeg dan een andere vorm van anticonceptie. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    }
    
    if (klachten.includes("Onregelmatige bloeding")) {
        advies += "<p>⚠️ Spotting: Onregelmatige bloedingen (spotting) komen vaak voor bij middelen die alleen progestageen bevatten (zoals de minipil of hormoonstaafje). Bespreek of dit acceptabel is. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    }

    if (!risicoGevonden && advies === "<h2>Persoonlijk advies</h2>") {
      advies += "<p>✅ Geen Directe Risico’s: Op basis van je antwoorden zijn er geen grote contra-indicaties gevonden. De meeste vormen van anticonceptie zijn mogelijk geschikt. Overleg met een arts om de beste keuze te maken op basis van je wensen. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    } else if (risicoGevonden && advies === "<h2>Persoonlijk advies</h2>") {
        advies += "<p>⚠️ Belangrijke Risico's Gevonden: Er zijn risico's op basis van je leeftijd/rookgedrag of medische geschiedenis. Neem contact op met een arts om een veilig alternatief te bespreken. (Let op: Dit is geen vervanging voor medisch advies!)</p>";
    }

    localStorage.setItem("advies", advies);
    window.location.href = "results.html";
  });
}

const resultDiv = document.getElementById("result");
if (resultDiv) {
  let advies = localStorage.getItem("advies");
  if (advies) {
    resultDiv.innerHTML = advies;
  } else {
    resultDiv.innerHTML = "<p>Geen resultaten gevonden. Vul eerst de vragenlijst in.</p>";
  }
}

function toggleCheckboxes(groupClass, noneValue) {
  const noneCheckbox = document.querySelector(`.${groupClass} input[value="${noneValue}"]`);
  const allCheckboxes = document.querySelectorAll(`.${groupClass} input[type="checkbox"]`);

  if (noneCheckbox) {
    noneCheckbox.addEventListener('change', function() {
      const isChecked = this.checked;
      
      allCheckboxes.forEach(checkbox => {
        if (checkbox !== noneCheckbox) {
          checkbox.disabled = isChecked;
          
          if (isChecked) {
            checkbox.checked = false;
          }
        }
      });
    });
  }
}

toggleCheckboxes('klachten', 'Geen klachten');
toggleCheckboxes('aandoeningen', 'Geen aandoeningen');
