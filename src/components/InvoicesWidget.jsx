import React, { useState } from "react";
import { Table } from "react-bootstrap";

function InvoicesWidget({invoices, setInvoices, transactions}) {
  const [showInputForm, setShowInputForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    creation_date: "",
    referenceNo: "",
    amount: 0,
  });
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleAddClick = () => {
    setShowInputForm(!showInputForm);
  };

  const handleSaveClick = () => {
    const invoiceToAdd = { ...newInvoice };
    console.log("Saving invoice with date:", invoiceToAdd.creation_date);
    setInvoices([...invoices, invoiceToAdd]);
    setNewInvoice({
      client: "",
      creation_date: "",
      referenceNo: "",
      amount: 0,
    });
    setShowInputForm(false);
  };

  const handleEditClick = (refNo) => {
    setEditingInvoiceId(refNo);
  };

  const handleEditInputChange = (e, refNo) => {
    const { name, value } = e.target;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.referenceNo === refNo ? { ...inv, [name]: value } : inv
      )
    );
  };

  const handleSaveEditClick = () => {
    setEditingInvoiceId(null);
  };

  const handleDeleteRow = (refNo) => {
    alert("Are you sure you want to delete this invoice?");
    setInvoices((prev) => prev.filter((inv) => inv.referenceNo !== refNo));
  }

  const getInvoiceStatus = (invoice, transactions) => {
    return transactions.some(
      (trans) =>
        trans.referenceNo === invoice.referenceNo &&
        trans.amount === invoice.amount &&
        new Date(trans.date) > new Date(invoice.creation_date)
    )
      ? "PAID"
      : "NOT PAID";
  };

  return (
    <div style={{ margin: "40px 40px 40px 40px" }}>
      <h3>Invoices Widget Table</h3>
      <button
        onClick={handleAddClick}
        style={{
          display: "flex",
          background: "none",
          border: "1px solid black",
          marginBottom: "10px",
          float: "right",
        }}
      >
        {showInputForm ? "Cancel" : "Add Invoice"}
      </button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Client</th>
            <th>Creation Date</th>
            <th>Reference Num</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.referenceNo}>
              <td>
                {editingInvoiceId === invoice.referenceNo ? (
                  <input
                    type="text"
                    name="client"
                    value={invoice.client}
                    onChange={(e) =>
                      handleEditInputChange(e, invoice.referenceNo)
                    }
                  />
                ) : (
                  invoice.client
                )}
              </td>
              <td>
                {editingInvoiceId === invoice.referenceNo ? (
                  <input
                    type="date"
                    name="creation_date"
                    value={invoice.creation_date}
                    onChange={(e) =>
                      handleEditInputChange(e, invoice.referenceNo)
                    }
                  />
                ) : (
                  invoice.creation_date
                )}
              </td>
              <td>{invoice.referenceNo}</td>
              <td>
                {editingInvoiceId === invoice.referenceNo ? (
                  <input
                    type="number"
                    name="amount"
                    value={invoice.amount}
                    onChange={(e) =>
                      handleEditInputChange(e, invoice.referenceNo)
                    }
                  />
                ) : (
                  invoice.amount
                )}
              </td>
              <td>{getInvoiceStatus(invoice, transactions)}</td>
              <td>
                {editingInvoiceId === invoice.referenceNo ? (
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={handleSaveEditClick}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleEditClick(invoice.referenceNo)}
                  >
                    Edit
                  </button>
                )}
                <button style={{ marginLeft: "10px" }} onClick={() => handleDeleteRow(invoice.referenceNo)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showInputForm && (
        <tr>
          <td>
            <input
              type="text"
              name="client"
              value={newInvoice.client}
              onChange={handleInputChange}
              placeholder="Client"
            />
          </td>
          <td>
            <input
              type="date"
              name="creation_date"
              value={newInvoice.creation_date}
              onChange={handleInputChange}
              placeholder="Date"
            />
          </td>
          <td>
            <input
              type="text"
              name="referenceNo"
              value={newInvoice.referenceNo}
              onChange={handleInputChange}
              placeholder="Reference Number"
            />
          </td>
          <td>{getInvoiceStatus(newInvoice, transactions)}</td>
          <td>
            <input
              type="number"
              name="amount"
              value={newInvoice.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
          </td>
          <td>
            <button
              onClick={handleSaveClick}
              style={{
                background: "none",
                border: "1px solid black",
                marginLeft: "15px",
              }}
            >
              Save
            </button>
          </td>
        </tr>
      )}
    </div>
  );
}

export default InvoicesWidget;
