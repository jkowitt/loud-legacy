"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewValuationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState("COMMERCIAL");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  // Income data
  const [grossRent, setGrossRent] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [vacancyRate, setVacancyRate] = useState("5");

  // Expense data
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [utilities, setUtilities] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [propertyManagement, setPropertyManagement] = useState("");

  // Financing data
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");

  // Results
  const [results, setResults] = useState<any>(null);

  const calculateValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);

    try {
      // First create a property if needed
      const propertyResponse = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: propertyAddress,
          propertyType,
        }),
      });

      if (!propertyResponse.ok) {
        throw new Error('Failed to create property');
      }

      const propertyData = await propertyResponse.json();

      // Create valuation
      const valuationResponse = await fetch('/api/valuations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: propertyData.id,
          name,
          purchasePrice: parseFloat(purchasePrice) || 0,
          currentValue: parseFloat(currentValue) || parseFloat(purchasePrice) || 0,
          incomeData: {
            grossRent: parseFloat(grossRent) || 0,
            otherIncome: parseFloat(otherIncome) || 0,
            vacancyRate: parseFloat(vacancyRate) || 0,
          },
          expenseData: {
            propertyTax: parseFloat(propertyTax) || 0,
            insurance: parseFloat(insurance) || 0,
            utilities: parseFloat(utilities) || 0,
            maintenance: parseFloat(maintenance) || 0,
            propertyManagement: parseFloat(propertyManagement) || 0,
          },
          financingData: {
            loanAmount: parseFloat(loanAmount) || 0,
            interestRate: parseFloat(interestRate) || 0,
            loanTerm: parseFloat(loanTerm) || 30,
          },
        }),
      });

      if (!valuationResponse.ok) {
        throw new Error('Failed to create valuation');
      }

      const valuation = await valuationResponse.json();
      setResults(valuation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create valuation');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number | null | undefined) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>New Valuation</h1>
          <p>Create a comprehensive property valuation with financial analysis</p>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: results ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        <form onSubmit={calculateValuation} className="valuation-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label>Valuation Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Main St Apartment Analysis"
                required
              />
            </div>

            <div className="form-group">
              <label>Property Address *</label>
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="123 Main St, City, State"
                required
              />
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="COMMERCIAL">Commercial</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="MULTIFAMILY">Multifamily</option>
                <option value="INDUSTRIAL">Industrial</option>
                <option value="RETAIL">Retail</option>
                <option value="OFFICE">Office</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Purchase Price *</label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="500000"
                  required
                />
              </div>
              <div className="form-group">
                <label>Current Value</label>
                <input
                  type="number"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="550000"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Income (Annual)</h3>
            <div className="form-group">
              <label>Gross Rent</label>
              <input
                type="number"
                value={grossRent}
                onChange={(e) => setGrossRent(e.target.value)}
                placeholder="60000"
              />
            </div>
            <div className="form-group">
              <label>Other Income</label>
              <input
                type="number"
                value={otherIncome}
                onChange={(e) => setOtherIncome(e.target.value)}
                placeholder="5000"
              />
            </div>
            <div className="form-group">
              <label>Vacancy Rate (%)</label>
              <input
                type="number"
                value={vacancyRate}
                onChange={(e) => setVacancyRate(e.target.value)}
                placeholder="5"
                step="0.1"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Expenses (Annual)</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Property Tax</label>
                <input
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                  placeholder="6000"
                />
              </div>
              <div className="form-group">
                <label>Insurance</label>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  placeholder="2000"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Utilities</label>
                <input
                  type="number"
                  value={utilities}
                  onChange={(e) => setUtilities(e.target.value)}
                  placeholder="3000"
                />
              </div>
              <div className="form-group">
                <label>Maintenance</label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(e.target.value)}
                  placeholder="5000"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Property Management</label>
              <input
                type="number"
                value={propertyManagement}
                onChange={(e) => setPropertyManagement(e.target.value)}
                placeholder="4000"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Financing</h3>
            <div className="form-group">
              <label>Loan Amount</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="400000"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="6.5"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Loan Term (years)</label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="button button--primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {loading ? 'Calculating...' : '💰 Calculate Valuation'}
          </button>
        </form>

        {results && (
          <div className="valuation-results">
            <div className="results-header">
              <h3>Valuation Results</h3>
              <button
                onClick={() => router.push('/dashboard/valuations')}
                className="button button--secondary"
              >
                View All Valuations
              </button>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-label">Net Operating Income</div>
                <div className="metric-value">{formatCurrency(results.noi)}</div>
                <div className="metric-desc">Annual NOI</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Cap Rate</div>
                <div className="metric-value">
                  {results.capRate ? `${results.capRate.toFixed(2)}%` : '-'}
                </div>
                <div className="metric-desc">Capitalization Rate</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Property Value</div>
                <div className="metric-value">{formatCurrency(results.currentValue)}</div>
                <div className="metric-desc">Current Market Value</div>
              </div>

              <div className="metric-card">
                <div className="metric-label">Status</div>
                <div className="metric-value" style={{ fontSize: '1.25rem' }}>
                  {results.status}
                </div>
                <div className="metric-desc">Valuation Status</div>
              </div>
            </div>

            <div className="results-details">
              <h4>Financial Breakdown</h4>

              <div className="detail-section">
                <h5>Income</h5>
                {results.incomeData && (
                  <div className="detail-list">
                    <div className="detail-item">
                      <span>Gross Rent:</span>
                      <span>{formatCurrency(results.incomeData.grossRent)}</span>
                    </div>
                    <div className="detail-item">
                      <span>Other Income:</span>
                      <span>{formatCurrency(results.incomeData.otherIncome)}</span>
                    </div>
                    <div className="detail-item">
                      <span>Vacancy Rate:</span>
                      <span>{results.incomeData.vacancyRate}%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h5>Expenses</h5>
                {results.expenseData && (
                  <div className="detail-list">
                    <div className="detail-item">
                      <span>Property Tax:</span>
                      <span>{formatCurrency(results.expenseData.propertyTax)}</span>
                    </div>
                    <div className="detail-item">
                      <span>Insurance:</span>
                      <span>{formatCurrency(results.expenseData.insurance)}</span>
                    </div>
                    <div className="detail-item">
                      <span>Maintenance:</span>
                      <span>{formatCurrency(results.expenseData.maintenance)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h5>Financing</h5>
                {results.financingData && (
                  <div className="detail-list">
                    <div className="detail-item">
                      <span>Loan Amount:</span>
                      <span>{formatCurrency(results.financingData.loanAmount)}</span>
                    </div>
                    <div className="detail-item">
                      <span>Interest Rate:</span>
                      <span>{results.financingData.interestRate}%</span>
                    </div>
                    <div className="detail-item">
                      <span>Loan Term:</span>
                      <span>{results.financingData.loanTerm} years</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="results-actions">
              <button
                onClick={() => {
                  setResults(null);
                  setName("");
                  setPropertyAddress("");
                  setPurchasePrice("");
                  setCurrentValue("");
                  setGrossRent("");
                  setOtherIncome("");
                  setPropertyTax("");
                  setInsurance("");
                  setMaintenance("");
                }}
                className="button button--secondary"
              >
                Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
