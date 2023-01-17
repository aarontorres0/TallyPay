import "./App.css";

import React, { useState } from "react";

function App() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleBillAmountChange = (e) => {
    setBillAmount(e.target.value);
    if (parseFloat(e.target.value) > 0) {
      handleTipPercentChange(tipPercent);
    }
  };

  const handleTipPercentChange = (tipPercent) => {
    setTipPercent(tipPercent);
    setTipAmount((billAmount * tipPercent).toFixed(2));
    setTotalAmount(
      (parseFloat(billAmount) + parseFloat(billAmount * tipPercent)).toFixed(2)
    );
  };

  return (
    <div className="container">
      <h1>Bill Splitting App</h1>
      <label>
        Bill Amount:
        <input
          type="number"
          value={billAmount}
          onChange={handleBillAmountChange}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </label>
      <br />
      <label>Tip Percentage:</label>
      <br />
      <label>
        <input
          type="radio"
          name="tipPercent"
          value={0.15}
          onChange={() => handleTipPercentChange(0.15)}
          checked={tipPercent === 0.15}
        />
        15%
        <input
          type="radio"
          name="tipPercent"
          value={0.18}
          onChange={() => handleTipPercentChange(0.18)}
          checked={tipPercent === 0.18}
        />
        18%
        <input
          type="radio"
          name="tipPercent"
          value={0.2}
          onChange={() => handleTipPercentChange(0.2)}
          checked={tipPercent === 0.2}
        />
        20%
      </label>
      <br />
      <label>
        Tip Amount:
        <span>{tipAmount}</span>
      </label>
      <br />
      <label>
        Total Amount:
        <span>{totalAmount}</span>
      </label>
    </div>
  );
}

export default App;
