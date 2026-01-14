const config = {
    textInputKey: "txtDigerSorusuCevabi",
    radioKey: "anketRadioList",
    submitBtnId: "btnKaydet",
    totalSteps: 15,
    delay: 1500
};


function triggerEvents(el) {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
}


function fillDynamicRadios(doc = document) {
    const radios = doc.querySelectorAll(`input[type="radio"][id*="${config.radioKey}"]`);
    radios.forEach(radio => {
        radio.checked = true;
        triggerEvents(radio);
    });

}

function clickSave(doc = document) {
    const btn = doc.getElementById(config.submitBtnId);
    if (btn) {

        btn.click();
    }
}


function fillFormEverywhere(doc = document) {
    fillDynamicInputs(doc);
    fillDynamicRadios(doc);
    clickSave(doc);

    const iframes = doc.querySelectorAll('iframe');
    iframes.forEach(frame => {
        try {
            const childDoc = frame.contentDocument || frame.contentWindow.document;
            fillFormEverywhere(childDoc);
        } catch (e) {
            console.warn('Iframe erişilemedi (cross-origin olabilir)', e);
        }
    });
}

async function doldur() {
    for (let i = 1; i <= config.totalSteps; i++) {
        const paddedIndex = i.toString().padStart(2, '0');
        console.log(`İşlem sırası: ${paddedIndex}`);

     
        __doPostBack(`grdGenel$ctl${paddedIndex}$btnStartEva`, '');
        

        await new Promise(resolve => setTimeout(resolve, config.delay));

        fillFormEverywhere();

        await new Promise(resolve => setTimeout(resolve, config.delay));
    }
}


doldur();