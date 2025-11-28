"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { creditMoney } from "../api/bankingApi"
import TransactionForm from "../components/TransactionForm"
import { toast } from "react-toastify"

export default function DepositPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleDeposit = async (formData) => {
    setLoading(true)
    try {
      await creditMoney({ amount: Number.parseFloat(formData.amount) })
      toast.success("Deposit successful!")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Deposit failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <TransactionForm
          title="Deposit Money"
          onSubmit={handleDeposit}
          loading={loading}
          fields={[
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
