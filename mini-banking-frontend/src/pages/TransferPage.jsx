"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { transferMoney } from "../api/bankingApi"
import TransactionForm from "../components/TransactionForm"
import { toast } from "react-toastify"

export default function TransferPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleTransfer = async (formData) => {
    setLoading(true)
    try {
      await transferMoney({
        recipientEmail: formData.recipientEmail,
        amount: Number.parseFloat(formData.amount),
      })
      toast.success("Transfer successful!")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Transfer failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <TransactionForm
          title="Transfer Money"
          onSubmit={handleTransfer}
          loading={loading}
          fields={[
            {
              name: "recipientEmail",
              label: "Recipient Email",
              type: "email",
              placeholder: "recipient@example.com",
              required: true,
            },
            {
              name: "amount",
              label: "Amount",
              type: "number",
              placeholder: "Enter amount",
              required: true,
            },
          ]}
        />
      </div>
    </div>
  )
}
