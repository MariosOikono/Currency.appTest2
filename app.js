const app = Vue.createApp({
  data() {
    return {
      amount: "",
      fromCurrency: "USD",
      toCurrency: "EUR",
      convertedAmount: "",
      rates: {},
      newCurrency: "",
      newRate: "",
    };
  },

  methods: {
    async getCurrenciesOnLoad() {
      const response = await fetch(`/getCurrenciesOnLoad`);

      const data = await response.json();
      console.log(data);
      this.rates = data;
      console.log(this.rates);
    },
    convertAmount() {
      const amount = parseFloat(this.amount);
      const rates = this.rates;
      this.convertedAmount = (
        (amount * rates[this.fromCurrency]) /
        rates[this.toCurrency]
      ).toFixed(2);
    },
    async addCurrency() {
      const newCurrencyInput = this.newCurrency;
      const newRateInput = this.newRate;
      const inputsData = { newCurrencyInput, newRateInput };

      const response = await fetch(
        `/addCurrency?newCurrency=${this.newCurrency}&newRate=${this.newRate}`,
        {
          method: "POST",
          body: JSON.stringify(inputsData),
        }
      );

      if (!response.ok) {
        console.log("error");
      }
      const responseData = await response.json();

      console.log(responseData);

      this.getCurrenciesOnLoad();

      setTimeout(() => {
        document.querySelector(".currency").value = "";
        document.querySelector(".rate").value = "";
      }, 500);
    },
  },
  mounted() {
    this.getCurrenciesOnLoad();
  },
});

app.mount("#app");
