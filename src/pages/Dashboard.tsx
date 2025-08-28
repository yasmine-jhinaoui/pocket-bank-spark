import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Plus, Send } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    { name: "Checking Account", balance: 12547.89, number: "****1234", type: "checking" },
    { name: "Savings Account", balance: 25300.45, number: "****5678", type: "savings" },
    { name: "Credit Card", balance: -1250.00, number: "****9012", type: "credit" },
  ];

  const recentTransactions = [
    { id: 1, description: "Grocery Store", amount: -85.42, date: "2024-01-15", type: "expense" },
    { id: 2, description: "Salary Deposit", amount: 3500.00, date: "2024-01-14", type: "income" },
    { id: 3, description: "Online Purchase", amount: -129.99, date: "2024-01-13", type: "expense" },
    { id: 4, description: "ATM Withdrawal", amount: -200.00, date: "2024-01-12", type: "expense" },
    { id: 5, description: "Interest Payment", amount: 25.15, date: "2024-01-11", type: "income" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {accounts.map((account, index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-card-foreground">{account.name}</h3>
                <Badge variant={account.type === 'credit' ? 'destructive' : 'secondary'}>
                  {account.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {showBalance ? (
                      <span className={account.balance < 0 ? 'text-destructive' : 'text-success'}>
                        ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        {account.balance < 0 && ' CR'}
                      </span>
                    ) : (
                      '••••••'
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{account.number}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mb-8 shadow-card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Send className="h-6 w-6" />
              <span>Transfer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>Deposit</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ArrowDownLeft className="h-6 w-6" />
              <span>Withdraw</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <ArrowUpRight className="h-6 w-6" />
              <span>Invest</span>
            </Button>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <Button variant="ghost">View All</Button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {transaction.type === 'income' ? 
                      <ArrowUpRight className="h-5 w-5" /> : 
                      <ArrowDownLeft className="h-5 w-5" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.amount > 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;