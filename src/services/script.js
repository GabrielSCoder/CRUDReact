export function formatter(e, f) {
    setTimeout(function() {
        let v = patternNumber(e.target.value);
        if (v !== e.target.value) {
            e.target.value = v;
        }
    }, 1);
}


export function patternNumber(inpt) {
    let newNumber = inpt.replace(/\D/g, "");
    newNumber = newNumber.replace(/^0/, "");
    if (newNumber.length > 10) {
        newNumber = newNumber.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (newNumber.length > 5) {
        newNumber = newNumber.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (newNumber.length > 2) {
         newNumber = newNumber.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
          newNumber = newNumber.replace(/^(\d*)/, "($1");
    }
    console.log(newNumber)
    return newNumber;
}