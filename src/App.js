import "./App.css";

import React, { useState, useEffect } from "react";
import { useCallback } from "react";
function App() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(0.15);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotalAmount = useCallback(() => {
    setTipAmount((parseFloat(billAmount) * tipPercent).toFixed(2));
    setTotalAmount((parseFloat(billAmount) + parseFloat(tipAmount)).toFixed(2));
  }, [billAmount, tipAmount, tipPercent]);

  useEffect(() => {
    calculateTotalAmount();
  }, [calculateTotalAmount]);

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
      <h1>TallyUp</h1>
      <label>
        Bill Amount:
        <input
          type="number"
          placeholder="Enter bill amount"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Tip Percentage:
        <div className="segmented-control-container">
          <div className="segmented-control">
            <button
              className={`segmented-control__button ${
                tipPercent === 0.15 ? "active" : ""
              }`}
              onClick={() => {
                setTipPercent(0.15);
                calculateTotalAmount();
              }}
            >
              15%
            </button>
            <button
              className={`segmented-control__button ${
                tipPercent === 0.18 ? "active" : ""
              }`}
              onClick={() => {
                setTipPercent(0.18);
                calculateTotalAmount();
              }}
            >
              18%
            </button>
            <button
              className={`segmented-control__button ${
                tipPercent === 0.2 ? "active" : ""
              }`}
              onClick={() => {
                setTipPercent(0.2);
                calculateTotalAmount();
              }}
            >
              20%
            </button>
          </div>
        </div>
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
