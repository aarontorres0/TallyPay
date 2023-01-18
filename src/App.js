import "./App.css";

import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(0.15);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [splitBill, setSplitBill] = useState("No");
  const [peopleCounter, setPeopleCounter] = useState(1);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  const calculateTotalAmount = useCallback(() => {
    setTipAmount((parseFloat(billAmount) * tipPercent).toFixed(2));
    setTotalAmount((parseFloat(billAmount) + parseFloat(tipAmount)).toFixed(2));
  }, [billAmount, tipAmount, tipPercent]);

  useEffect(() => {
    calculateTotalAmount();
  }, [calculateTotalAmount]);

  useEffect(() => {
    setTotalPerPerson((totalAmount / peopleCounter).toFixed(2));
  }, [totalAmount, peopleCounter]);

  useEffect(() => {
    if (!isNaN(billAmount) && billAmount > 0) {
      setTotalPerPerson((totalAmount / peopleCounter).toFixed(2));
    } else {
      setTotalPerPerson(0);
    }
  }, [totalAmount, peopleCounter, billAmount]);

  const handleIncrement = () => {
    setPeopleCounter(peopleCounter + 1);
  };

  const handleDecrement = () => {
    if (peopleCounter > 1) {
      setPeopleCounter(peopleCounter - 1);
    }
  };

  return (
    <div className="container">
      <h1>TallyUp 💳</h1>
      <label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter bill amount"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
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

      <div class="input-group">
        <div class="split-bill-group">
          <div className="split-bill-group">
            <label>Split Bill?</label>
            <div className="segmented-control">
              <button
                className={`segmented-control__button ${
                  splitBill === "Yes" ? "active" : ""
                }`}
                onClick={() => setSplitBill("Yes")}
              >
                Yes
              </button>
              <button
                className={`segmented-control__button ${
                  splitBill === "No" ? "active" : ""
                }`}
                onClick={() => setSplitBill("No")}
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div class="people-counter">
          {splitBill === "Yes" && (
            <div className="people-counter">
              <label>Number of People:</label>
              <button onClick={handleDecrement}>-</button>
              <span>{peopleCounter}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          )}
        </div>
      </div>

      <div className="total-container">
        <h2>Total Information</h2>
        <label>Tip : ${isNaN(tipAmount) ? 0 : tipAmount}</label>
        <hr />
        <label>Total : ${isNaN(totalAmount) ? 0 : totalAmount}</label>
        <hr />
        {splitBill === "Yes" && (
          <>
            <label>
              Total per person : ${isNaN(totalPerPerson) ? 0 : totalPerPerson}
            </label>
            <br />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
