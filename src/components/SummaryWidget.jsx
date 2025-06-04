import React from "react";
import { transactions } from "../data/mockData";

function SummaryWidget() {
  const threshold = 1000;
  const totalBalance = transactions.reduce(
    (total, current) => total + current.amount,
    0
  );
  const balanceColor =
    totalBalance > threshold ? "green" : totalBalance > 0 ? "yellow" : "red";

  return (
    <div style={{ display: "flex", justifyContent:'center' }}>
      <div>
        <p style={{ color: balanceColor }}>
          Total Balance: {totalBalance.toFixed(2)}
        </p>
        <p>Invoices Created(last 30 days): {transactions.length}</p>
      </div>
    </div>
  );
}
export default SummaryWidget;
