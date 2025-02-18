
async function fetchCryptoData(){
    const urlParams= new URLSearchParams(window.location.search);
    const coinCode = urlParams.get("code")
    const response = await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "afc70b97-4379-4e78-abe8-361f42c934ce",
        }),
        body: JSON.stringify({
          currency: "USD",
          code: "ETH",
          meta: true,
        }),
      });


      const coin = await response.json();
      console.log(coin)
      const volume = coin.volume.toLocaleString();
    //   const changeRate = coin.delta.day.toFixed(2)

      document.getElementById("cryptoDetails").innerHTML = `
      <img src="${coin.png64}" alt="${coin.name}>
        <h2 class=""> Name: ${coin.name}</h2>
      <p id="detailsPrice"> Price: $ ${coin.rate?.toFixed(2) || "N/A"}</p>
        <p class="volume">Volume: ${volume}</p>
        <div class="detailStats">
            <label for="changePeriod" class="">Rate of change in:</label>
            <select name="changePeriod" class="" id="changePeriod">
                <option value="hour">Last hour</option>
                <option value="day">Last Day</option>
                <option value="week">Last week</option>
                <option value="month">Last month</option>
                <option value="year">Last year</option>
            </select>
            <p class="" id="changeRate"></p>
        </div>
    `

        document.getElementById("changePeriod").addEventListener("change", function(){
            const selectedPeriod = this.value
            const changeRate = (coin.delta[selectedPeriod].toFixed(2));
            const changeRateElement = document.getElementById("changeRate");

            changeRateElement.innerHTML = `${changeRate}`
        })
}


document.addEventListener("DOMContentLoaded", fetchCryptoData); //Call the function when the page is fully loaded