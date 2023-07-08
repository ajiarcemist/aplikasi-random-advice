const adviceId = document.querySelector('#adviceId');
const adviceText = document.querySelector('#advicetext');
const btn = document.querySelector('#btn');
function getData(adviceData){
        const adviceNum = adviceData.slip.id;
        const advice = adviceData.slip.advice;
    
        adviceId.textContent = adviceNum;
        adviceText.innerHTML = `<p>${advice}</p>`;
    }

function getAdvice(){
fetch('https://api.adviceslip.com/advice').then(response => {
    return response.json();
}).then((value)=>{
    btn.innerHTML = '<img src="./images/icon-dice.svg" alt=""></img>'
    getData(value)
}).catch(error => {
    console.log(error);
})
}

btn.addEventListener('click', async function(){
   let isLoading = true
   btn.innerText = "Loading..."
    await getAdvice();
   
})
function saveToLocalStorage(id, advice){
    localStorage.setItem('id', id);
    localStorage.setItem('advice', advice);
}

function getItem(){
    return {
        slip: {
          id: localStorage.getItem('id'),
          advice: localStorage.getItem('advice')
        }
      
      }
    }
window.onload = () => {
    saveToLocalStorage('117', "It is easy to sit up and take notice, what's difficult is getting up and taking action.")
    getData(getItem());
}