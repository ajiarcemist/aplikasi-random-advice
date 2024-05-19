const adviceId = document.querySelector("#adviceId");
const adviceText = document.querySelector("#advicetext");
const btn = document.querySelector("#btn");

function getData(adviceData) {
  const adviceNum = adviceData.id;
  const advice = adviceData.advice;

  adviceId.textContent = adviceNum;
  adviceText.innerHTML = `<p>${advice}</p>`;
  console.log(`Displayed advice #${adviceNum}: "${advice}"`);
}

function saveToLocalStorage(id, advice) {
  localStorage.setItem("id", id);
  localStorage.setItem("advice", advice);
  console.log(`Saved advice #${id} to local storage: "${advice}"`);
}

async function getAdvice() {
  console.log("Fetching new advice from API...");
  try {
    const response = await fetch(
      `https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`
    );
    const data = await response.json();
    const adviceData = data.slip;
    saveToLocalStorage(adviceData.id, adviceData.advice);
    console.log("Successfully fetched new advice from API");
    return adviceData;
  } catch (error) {
    console.error("Error fetching advice:", error);
    return null;
  }
}

btn.addEventListener("click", async function () {
  console.log("Button clicked. Fetching new advice...");
  btn.innerText = "Loading...";
  const adviceData = await getAdvice();
  if (adviceData) {
    getData(adviceData);
  }
  btn.innerHTML = '<img src="./images/icon-dice.svg" alt="dadu" />';
  console.log("Button text reset to default.");
});

function getItem() {
  const id = localStorage.getItem("id");
  const advice = localStorage.getItem("advice");
  console.log(`Retrieved advice #${id} from local storage: "${advice}"`);
  return { id, advice };
}

window.onload = async () => {
  console.log("Page loaded. Checking for saved advice...");
  btn.innerText = "Loading...";
  const savedAdvice = getItem();
  if (savedAdvice.id && savedAdvice.advice) {
    console.log("Saved advice found. Displaying saved advice...");
    getData(savedAdvice);
  } else {
    console.log("No saved advice found. Fetching new advice...");
    const adviceData = await getAdvice();
    if (adviceData) {
      getData(adviceData);
    }
  }
  btn.innerHTML = '<img src="./images/icon-dice.svg" alt="dadu" />';
  console.log("Button text reset to default.");
};
