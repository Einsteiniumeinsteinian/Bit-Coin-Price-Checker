console.log('Connected Successfully');
const currencySpan = document.getElementById('Currency-sign')
const radioTags = document.querySelectorAll('input[type="radio"]')
const bitcoinRate = document.querySelector('#Bitcoin-rate')
const refreshBtn = document.getElementById('refresh-data-btn')
var currencies = {
    EUR: '€',
    GBP: '£',
    USD: '$'
}

// ? h1 initial Dollar Value
bitcoinRate.textContent = BitCoinAPiCaller('USD')
refreshBtn.addEventListener('click', function(){
    radioTags.forEach(radioTag => {
        if (radioTag.checked) return bitcoinRate.textContent = BitCoinAPiCaller(radioTag.value)
    });
})


radioTags.forEach(radioTag => {
    radioTag.addEventListener('click', function () {
        currencySpan.textContent = currencies[this.value]
        BitCoinAPiCaller(this.value)
    })
});

function BitCoinAPiCaller(currency) {
    let XHR = new XMLHttpRequest()
    XHR.onreadystatechange = function () {
        console.log(XHR.readyState)
        if (XHR.readyState == 4 && XHR.status == 200) {
            let data = JSON.parse(XHR.responseText)
            bitcoinRate.textContent = data.bpi[currency].rate
        }else{
            bitcoinRate.textContent = 'Something Went Really Wrong'
        }
    }
    XHR.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json')
    XHR.send()
}


// function isRadioTagChecked (){
//     for(i = 0; i < radioTags.length; i++){
//         if (radioTags[i].checked){
//             return console.log(radioTags[i].value)

//     }
// }
// }