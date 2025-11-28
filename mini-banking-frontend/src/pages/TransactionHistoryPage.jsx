"use client"

import { useEffect, useState } from "react"
import { getTransactionHistory } from "../api/bankingApi"
import TransactionTable from "../components/TransactionTable"
import { Loader } from "../components/Loader"
import { toast } from "react-toastify"

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasNext, setHasNext] = useState(false)

  useEffect(() => {
    loadTransactions()
  }, [page])

  const loadTransactions = async () => {
    setLoading(true)
    try {
      const res = await getTransactionHistory(page, 10)
      setTransactions(res.data.content || [])
      setHasNext(!res.data.last)
    } catch (error) {
      toast.error("Failed to load transactions")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction History</h1>
        <TransactionTable
          transactions={transactions}
          onNext={() => setPage(page + 1)}
          onPrevious={() => setPage(Math.max(0, page - 1))}
          hasNext={hasNext}
          hasPrevious={page > 0}
        />
      </div>
    </div>
  )
}
