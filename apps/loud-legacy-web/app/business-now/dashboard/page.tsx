"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Sample data
const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 35000 },
  { month: "Mar", revenue: 48000, expenses: 33000 },
  { month: "Apr", revenue: 61000, expenses: 38000 },
  { month: "May", revenue: 55000, expenses: 36000 },
  { month: "Jun", revenue: 67000, expenses: 41000 },
];

const recentTransactions = [
  { id: 1, description: "Client Payment - ABC Corp", amount: 12500, type: "income", date: "2024-01-18" },
  { id: 2, description: "Software Subscription", amount: -299, type: "expense", date: "2024-01-17" },
  { id: 3, description: "Consulting Fee - XYZ Inc", amount: 8500, type: "income", date: "2024-01-16" },
  { id: 4, description: "Office Supplies", amount: -156, type: "expense", date: "2024-01-15" },
  { id: 5, description: "Project Milestone - StartupCo", amount: 15000, type: "income", date: "2024-01-14" },
];

const tasks = [
  { id: 1, title: "Review Q4 financial statements", priority: "high", dueDate: "2024-01-20", completed: false },
  { id: 2, title: "Prepare investor presentation", priority: "high", dueDate: "2024-01-22", completed: false },
  { id: 3, title: "Update business plan for 2024", priority: "medium", dueDate: "2024-01-25", completed: false },
  { id: 4, title: "Schedule team performance reviews", priority: "medium", dueDate: "2024-01-28", completed: true },
  { id: 5, title: "Renew business insurance", priority: "low", dueDate: "2024-02-01", completed: false },
];

const quickTools = [
  { name: "Invoice Generator", icon: "📄", description: "Create professional invoices", href: "/business-now/tools/invoice" },
  { name: "Expense Tracker", icon: "💰", description: "Track and categorize expenses", href: "/business-now/tools/expenses" },
  { name: "Financial Reports", icon: "📊", description: "Generate detailed reports", href: "/business-now/tools/reports" },
  { name: "Tax Calculator", icon: "🧮", description: "Estimate tax obligations", href: "/business-now/tools/tax" },
];

export default function BusinessNowDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [taskFilter, setTaskFilter] = useState("all");

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, d) => sum + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  const maxValue = Math.max(...revenueData.map(d => Math.max(d.revenue, d.expenses)));

  const filteredTasks = taskFilter === "all"
    ? tasks
    : taskFilter === "completed"
      ? tasks.filter(t => t.completed)
      : tasks.filter(t => !t.completed);

  return (
    <main className="bn-dashboard">
      <Header />

      {/* Dashboard Header */}
      <section className="bn-dash-header">
        <div className="container">
          <div className="bn-dash-header-content">
            <div>
              <div className="bn-breadcrumb">
                <Link href="/business-now">Business Now</Link>
                <span>/</span>
                <span>Dashboard</span>
              </div>
              <h1>Welcome back, Partner</h1>
              <p>Here's what's happening with your business today.</p>
            </div>
            <div className="bn-dash-header-actions">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bn-select"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <Link href="/business-now/resources" className="bn-btn bn-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="bn-dash-stats">
        <div className="container">
          <div className="bn-stats-grid">
            <div className="bn-stat-card">
              <div className="bn-stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="bn-stat-content">
                <span className="bn-stat-label">Total Revenue</span>
                <span className="bn-stat-value">${(totalRevenue / 1000).toFixed(0)}K</span>
                <span className="bn-stat-change positive">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                  </svg>
                  +12.5% from last period
                </span>
              </div>
            </div>

            <div className="bn-stat-card">
              <div className="bn-stat-icon red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="bn-stat-content">
                <span className="bn-stat-label">Total Expenses</span>
                <span className="bn-stat-value">${(totalExpenses / 1000).toFixed(0)}K</span>
                <span className="bn-stat-change negative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
                  </svg>
                  +8.2% from last period
                </span>
              </div>
            </div>

            <div className="bn-stat-card">
              <div className="bn-stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </div>
              <div className="bn-stat-content">
                <span className="bn-stat-label">Net Profit</span>
                <span className="bn-stat-value">${(netProfit / 1000).toFixed(0)}K</span>
                <span className="bn-stat-change positive">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                  </svg>
                  +18.3% from last period
                </span>
              </div>
            </div>

            <div className="bn-stat-card">
              <div className="bn-stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
              </div>
              <div className="bn-stat-content">
                <span className="bn-stat-label">Profit Margin</span>
                <span className="bn-stat-value">{profitMargin}%</span>
                <span className="bn-stat-change positive">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                  </svg>
                  +2.1% from last period
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="bn-dash-content">
        <div className="container">
          <div className="bn-dash-grid">
            {/* Revenue Chart */}
            <div className="bn-card bn-chart-card">
              <div className="bn-card-header">
                <h3>Revenue vs Expenses</h3>
                <div className="bn-chart-legend">
                  <span className="bn-legend-item"><span className="bn-legend-dot blue"></span> Revenue</span>
                  <span className="bn-legend-item"><span className="bn-legend-dot red"></span> Expenses</span>
                </div>
              </div>
              <div className="bn-chart">
                <div className="bn-bar-chart">
                  {revenueData.map((data, index) => (
                    <div key={index} className="bn-bar-group">
                      <div className="bn-bars">
                        <div
                          className="bn-bar revenue"
                          style={{ height: `${(data.revenue / maxValue) * 100}%` }}
                          title={`Revenue: $${data.revenue.toLocaleString()}`}
                        />
                        <div
                          className="bn-bar expenses"
                          style={{ height: `${(data.expenses / maxValue) * 100}%` }}
                          title={`Expenses: $${data.expenses.toLocaleString()}`}
                        />
                      </div>
                      <span className="bn-bar-label">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bn-card">
              <div className="bn-card-header">
                <h3>Recent Transactions</h3>
                <Link href="/business-now/transactions" className="bn-link">View All</Link>
              </div>
              <div className="bn-transactions">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="bn-transaction">
                    <div className="bn-transaction-icon" data-type={tx.type}>
                      {tx.type === "income" ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
                        </svg>
                      )}
                    </div>
                    <div className="bn-transaction-details">
                      <span className="bn-transaction-desc">{tx.description}</span>
                      <span className="bn-transaction-date">{new Date(tx.date).toLocaleDateString()}</span>
                    </div>
                    <span className={`bn-transaction-amount ${tx.type}`}>
                      {tx.type === "income" ? "+" : ""}{tx.amount < 0 ? "-" : ""}${Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="bn-card">
              <div className="bn-card-header">
                <h3>Tasks & To-Dos</h3>
                <div className="bn-task-filters">
                  {["all", "pending", "completed"].map((filter) => (
                    <button
                      key={filter}
                      className={`bn-filter-btn ${taskFilter === filter ? "active" : ""}`}
                      onClick={() => setTaskFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bn-tasks">
                {filteredTasks.map((task) => (
                  <div key={task.id} className={`bn-task ${task.completed ? "completed" : ""}`}>
                    <label className="bn-task-checkbox">
                      <input type="checkbox" defaultChecked={task.completed} />
                      <span className="bn-checkmark"></span>
                    </label>
                    <div className="bn-task-content">
                      <span className="bn-task-title">{task.title}</span>
                      <span className="bn-task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <span className={`bn-task-priority ${task.priority}`}>{task.priority}</span>
                  </div>
                ))}
              </div>
              <button className="bn-add-task">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Task
              </button>
            </div>

            {/* Quick Tools */}
            <div className="bn-card">
              <div className="bn-card-header">
                <h3>Quick Tools</h3>
              </div>
              <div className="bn-tools-grid">
                {quickTools.map((tool, index) => (
                  <Link key={index} href={tool.href} className="bn-tool-card">
                    <span className="bn-tool-icon">{tool.icon}</span>
                    <span className="bn-tool-name">{tool.name}</span>
                    <span className="bn-tool-desc">{tool.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bn-dash-cta">
        <div className="container">
          <div className="bn-cta-content">
            <div className="bn-cta-text">
              <h2>Need help growing your business?</h2>
              <p>Access our library of guides, templates, and resources designed to help you succeed.</p>
            </div>
            <Link href="/business-now/resources" className="bn-btn bn-btn-light">
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
