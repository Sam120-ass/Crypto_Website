/*57353ec0-f8a0-4d15-85da-efcf35e017ce*/

async function fetchCryptoData(){
    const response = await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "57353ec0-f8a0-4d15-85da-efcf35e017ce",
        }),
        body: JSON.stringify({
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 100,
          meta: true,
        }),
      });



      const data = await response.json();
      console.log("My API response", data);
      updateCryptoList(data);
}

function updateCryptoList(CryptoData){
    const container = document.querySelector("#allCryptoContainer");


    CryptoData.forEach((coin) => {

        const cryptoRow = document.createElement("a");
        cryptoRow.classList.add("singularCrypto");
        cryptoRow.href = `details.html?code=${coin.code}`;

        const PriceChange = coin.delta.day.toFixed(2);
        const changeClass = PriceChange > 0 ? "green-bg" : "red-bg";


        cryptoRow.innerHTML = `
        <div><img class="logoImage" src="${coin.png64}"></div>  
        <div>${coin.name}</div>
        <div class="PriceContainer">
            <div>$ ${coin.rate.toFixed(2)}</div>
            <div class="priceChangeColumn ${changeClass}">
                <p class="priceChange">${PriceChange > 0 ? "+" : ""}${PriceChange}%</p>
            </div>
        </div>`;

        container.appendChild(cryptoRow);
    });
}

document.addEventListener("DOMContentLoaded", fetchCryptoData); // Call the function when the page is fully loaded
