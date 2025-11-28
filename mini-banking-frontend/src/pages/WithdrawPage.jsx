"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { debitMoney } from "../api/bankingApi"
import TransactionForm from "../components/TransactionForm"
import { toast } from "react-toastify"

export default function WithdrawPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleWithdraw = async (formData) => {
    setLoading(true)
    try {
      await debitMoney({ amount: Number.parseFloat(formData.amount) })
      toast.success("Withdrawal successful!")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Withdrawal failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <TransactionForm
          title="Withdraw Money"
          onSubmit={handleWithdraw}
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
