const adviceId = document.querySelector('#adviceId');
const adviceText = document.querySelector('#advicetext');
const btn = document.querySelector('#btn');

function getData(adviceData) {
    const adviceNum = adviceData.slip.id;
    const advice = adviceData.slip.advice;

    adviceId.textContent = adviceNum;
    adviceText.innerHTML = `<p>${advice}</p>`;
}

function saveToLocalStorage(id, advice) {
    localStorage.setItem('id', id);
    localStorage.setItem('advice', advice);
}

function getAdvice() {
    return fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(value => {
            const adviceData = value.slip;
            saveToLocalStorage(adviceData.id, adviceData.advice);
            return adviceData;
        });
}

btn.addEventListener('click', async function() {
    btn.innerText = "Loading...";
    try {
        const adviceData = await getAdvice();
        getData(adviceData);
    } catch (error) {
        console.error(error);
    } finally {
        btn.innerHTML = '<img src="./images/icon-dice.svg" alt=""></img>';
    }
});

function getItem() {
    return {
        slip: {
            id: localStorage.getItem('id'),
            advice: localStorage.getItem('advice')
        }
    };
}

window.onload = () => {
    const savedAdvice = getItem();
    if (savedAdvice.slip.id && savedAdvice.slip.advice) {
        getData(savedAdvice);
    } else {
        getAdvice().then(adviceData => getData(adviceData));
    }
};
