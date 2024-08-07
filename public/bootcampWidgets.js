document.addEventListener("alpine:init", () => {
  Alpine.data("bootcampWidgets", () => ({
    type: "sms",
    price: 0,
    feedback: "",
    billString: "",
    totalBill: "",
    sentence: "",
    longest: "",
    shortest: "",
    totalLengths: 0,
    error: null,
    usage: "",
    available: 0,
    result: "",
    prices: {},
    loading: false,
    error: "",

    analyzeSentence() {
      if (!this.sentence.trim()) {
        this.error = "Please enter a valid sentence.";
        this.longest = "";
        this.shortest = "";
        this.totalLengths = 0;
        return;
      }
      this.error = null;

      axios
        .get(`/api/word_game?sentence='${encodeURIComponent(this.sentence)}'`)
        .then((response) => {
          const { longestWord, shortestWord } = response.data;
          this.longest = longestWord;
          this.shortest = shortestWord;
          this.totalLengths = this.wordLengths(this.sentence);
          setTimeout(() => {
            this.longest = "";
            this.shortest = "";
            this.totalLengths = "";
            this.sentence = "";
          }, 5000);
        })
        .catch((err) => {
          this.error = "Error fetching data: " + err.message;
          this.longest = "";
          this.shortest = "";
          this.totalLengths = 0;
        });
    },
    wordLengths(sentence) {
      const words = sentence.split(" ");
      let sum = 0;
      for (let i = 0; i < words.length; i++) {
        sum += words[i].length;
      }
      return sum;
    },

    submitUpdate() {
      if (isNaN(this.price) || this.price < 0) {
        this.feedback = "Please enter a valid price";
        return;
      }

      axios
        .post(`/api/phonebill/price`, {
          type: this.type,
          price: this.price,
        })
        .then((response) => {
          this.feedback = `The ${this.type} price was set to ${this.price}`;
          alert.feedback;
          setTimeout(() => {
            this.feedback = "";
            this.price = "";
            this.type = "";
          }, 5000);
        })
        .catch((error) => {
          console.error("There was an error updating the price!", error);
          this.feedback = "Error updating the price";
        });
    },

    fetchPrices() {
      this.loading = true;
      this.error = "";

      axios
        .get(`/api/phonebill/prices?call=1&sms=1`)
        .then((response) => {
          this.prices = response.data;
          setTimeout(() => {
            this.prices = "";
          }, 5000);
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    calculateTotal() {
      const data = {
        bill: this.billString,
      };
      axios
        .post(`/api/phonebill/total`, data)
        .then((response) => {
          this.totalBill = response.data.total;
          setTimeout(() => {
            this.billString = "";
            this.totalBill = "";
          }, 5000);
        })
        .catch((error) => {
          console.error("Error calculating total:", error);
        });
    },

    calculateBill() {
      const usage = this.usage;
      const available = parseFloat(this.available);

      axios
        .post("/api/enough", {
          usage: usage,
          available: available,
        })
        .then((response) => {
          this.result = response.data.result;

          setTimeout(() => {
            this.result = "";
            this.usage = "";
            this.available = "";
          }, 5000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  }));
});
