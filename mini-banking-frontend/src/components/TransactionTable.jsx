"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TransactionTable({ transactions, onPrevious, onNext, hasNext, hasPrevious }) {
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">No transactions found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900 capitalize">{tx.type}</td>
                  <td className={`py-3 px-4 font-bold ${tx.type === "CREDIT" ? "text-green-600" : "text-red-600"}`}>
                    {tx.type === "CREDIT" ? "+" : "-"}₹{Math.abs(tx.amount).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <Button
            onClick={onPrevious}
            disabled={!hasPrevious}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          <Button onClick={onNext} disabled={!hasNext} variant="outline" size="sm" className="gap-2 bg-transparent">
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
