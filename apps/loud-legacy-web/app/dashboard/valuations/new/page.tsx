"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewValuationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState("RESIDENTIAL");
  const [purchasePrice, setPurchasePrice] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");

  // Toggle states for P&L line items
  const [enableIncome, setEnableIncome] = useState(false);
  const [enableExpenses, setEnableExpenses] = useState(false);
  const [enableFinancing, setEnableFinancing] = useState(false);

  // Individual income toggles
  const [enableGrossRent, setEnableGrossRent] = useState(true);
  const [enableOtherIncome, setEnableOtherIncome] = useState(false);
  const [enableVacancy, setEnableVacancy] = useState(true);

  // Individual expense toggles
  const [enablePropertyTax, setEnablePropertyTax] = useState(true);
  const [enableInsurance, setEnableInsurance] = useState(true);
  const [enableUtilities, setEnableUtilities] = useState(false);
  const [enableMaintenance, setEnableMaintenance] = useState(true);
  const [enablePropertyManagement, setEnablePropertyManagement] = useState(false);

  // Income data - initialized to "0"
  const [grossRent, setGrossRent] = useState("0");
  const [otherIncome, setOtherIncome] = useState("0");
  const [vacancyRate, setVacancyRate] = useState("5");

  // Expense data - initialized to "0"
  const [propertyTax, setPropertyTax] = useState("0");
  const [insurance, setInsurance] = useState("0");
  const [utilities, setUtilities] = useState("0");
  const [maintenance, setMaintenance] = useState("0");
  const [propertyManagement, setPropertyManagement] = useState("0");

  // Financing data - initialized to "0"
  const [loanAmount, setLoanAmount] = useState("0");
  const [interestRate, setInterestRate] = useState("0");
  const [loanTerm, setLoanTerm] = useState("30");

  // Results
  const [results, setResults] = useState<any>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Check if property type requires P&L (not single-family residential)
  const showPandL = propertyType !== "RESIDENTIAL";

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('valuation_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setName(draft.name || "");
        setPropertyAddress(draft.propertyAddress || "");
        setPropertyType(draft.propertyType || "RESIDENTIAL");
        setPurchasePrice(draft.purchasePrice || "0");
        setCurrentValue(draft.currentValue || "0");
        setEnableIncome(draft.enableIncome || false);
        setEnableExpenses(draft.enableExpenses || false);
        setEnableFinancing(draft.enableFinancing || false);
        setEnableGrossRent(draft.enableGrossRent !== undefined ? draft.enableGrossRent : true);
        setEnableOtherIncome(draft.enableOtherIncome || false);
        setEnableVacancy(draft.enableVacancy !== undefined ? draft.enableVacancy : true);
        setEnablePropertyTax(draft.enablePropertyTax !== undefined ? draft.enablePropertyTax : true);
        setEnableInsurance(draft.enableInsurance !== undefined ? draft.enableInsurance : true);
        setEnableUtilities(draft.enableUtilities || false);
        setEnableMaintenance(draft.enableMaintenance !== undefined ? draft.enableMaintenance : true);
        setEnablePropertyManagement(draft.enablePropertyManagement || false);
        setGrossRent(draft.grossRent || "0");
        setOtherIncome(draft.otherIncome || "0");
        setVacancyRate(draft.vacancyRate || "5");
        setPropertyTax(draft.propertyTax || "0");
        setInsurance(draft.insurance || "0");
        setUtilities(draft.utilities || "0");
        setMaintenance(draft.maintenance || "0");
        setPropertyManagement(draft.propertyManagement || "0");
        setLoanAmount(draft.loanAmount || "0");
        setInterestRate(draft.interestRate || "0");
        setLoanTerm(draft.loanTerm || "30");
        console.log('✅ Loaded draft from workspace');
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    const timer = setTimeout(() => {
      saveDraftToLocalStorage();
    }, 2000); // Auto-save after 2 seconds of inactivity

    setAutoSaveTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    name, propertyAddress, propertyType, purchasePrice, currentValue,
    enableIncome, enableExpenses, enableFinancing,
    enableGrossRent, enableOtherIncome, enableVacancy,
    enablePropertyTax, enableInsurance, enableUtilities,
    enableMaintenance, enablePropertyManagement,
    grossRent, otherIncome, vacancyRate,
    propertyTax, insurance, utilities, maintenance, propertyManagement,
    loanAmount, interestRate, loanTerm
  ]);

  // Auto-disable P&L sections for residential properties
  useEffect(() => {
    if (!showPandL) {
      setEnableIncome(false);
      setEnableExpenses(false);
      setEnableFinancing(false);
    }
  }, [showPandL]);

  const saveDraftToLocalStorage = () => {
    const draft = {
      name, propertyAddress, propertyType, purchasePrice, currentValue,
      enableIncome, enableExpenses, enableFinancing,
      enableGrossRent, enableOtherIncome, enableVacancy,
      enablePropertyTax, enableInsurance, enableUtilities,
      enableMaintenance, enablePropertyManagement,
      grossRent, otherIncome, vacancyRate,
      propertyTax, insurance, utilities, maintenance, propertyManagement,
      loanAmount, interestRate, loanTerm,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('valuation_draft', JSON.stringify(draft));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const clearDraft = () => {
    localStorage.removeItem('valuation_draft');
    setDraftSaved(false);
  };

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
          incomeData: enableIncome ? {
            grossRent: enableGrossRent ? (parseFloat(grossRent) || 0) : 0,
            otherIncome: enableOtherIncome ? (parseFloat(otherIncome) || 0) : 0,
            vacancyRate: enableVacancy ? (parseFloat(vacancyRate) || 0) : 0,
          } : null,
          expenseData: enableExpenses ? {
            propertyTax: enablePropertyTax ? (parseFloat(propertyTax) || 0) : 0,
            insurance: enableInsurance ? (parseFloat(insurance) || 0) : 0,
            utilities: enableUtilities ? (parseFloat(utilities) || 0) : 0,
            maintenance: enableMaintenance ? (parseFloat(maintenance) || 0) : 0,
            propertyManagement: enablePropertyManagement ? (parseFloat(propertyManagement) || 0) : 0,
          } : null,
          financingData: enableFinancing ? {
            loanAmount: parseFloat(loanAmount) || 0,
            interestRate: parseFloat(interestRate) || 0,
            loanTerm: parseFloat(loanTerm) || 30,
          } : null,
        }),
      });

      if (!valuationResponse.ok) {
        throw new Error('Failed to create valuation');
      }

      const valuation = await valuationResponse.json();
      setResults(valuation);
      // Clear draft after successful calculation
      clearDraft();
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
                <option value="RESIDENTIAL">Residential (Single Family)</option>
                <option value="MULTIFAMILY">Multifamily</option>
                <option value="MIXED_USE">Mixed Use</option>
                <option value="INDUSTRIAL">Industrial</option>
                <option value="LAND">Land</option>
              </select>
            </div>

            {!showPandL && (
              <div className="info-message" style={{ marginTop: '1rem', padding: '0.75rem', background: '#e3f2fd', borderRadius: '6px', fontSize: '0.875rem' }}>
                ℹ️ P&L analysis is not available for single-family residential properties
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Purchase Price *</label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Current Value</label>
                <input
                  type="number"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {showPandL && (
            <>
              <div className="form-section">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Income (Annual)</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enableIncome}
                      onChange={(e) => setEnableIncome(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {enableIncome && (
                  <>
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label>Gross Rent</label>
                        <label className="toggle-switch-small">
                          <input
                            type="checkbox"
                            checked={enableGrossRent}
                            onChange={(e) => setEnableGrossRent(e.target.checked)}
                          />
                          <span className="toggle-slider-small"></span>
                        </label>
                      </div>
                      <input
                        type="number"
                        value={grossRent}
                        onChange={(e) => setGrossRent(e.target.value)}
                        placeholder="0"
                        disabled={!enableGrossRent}
                      />
                    </div>
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label>Other Income</label>
                        <label className="toggle-switch-small">
                          <input
                            type="checkbox"
                            checked={enableOtherIncome}
                            onChange={(e) => setEnableOtherIncome(e.target.checked)}
                          />
                          <span className="toggle-slider-small"></span>
                        </label>
                      </div>
                      <input
                        type="number"
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(e.target.value)}
                        placeholder="0"
                        disabled={!enableOtherIncome}
                      />
                    </div>
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label>Vacancy Rate (%)</label>
                        <label className="toggle-switch-small">
                          <input
                            type="checkbox"
                            checked={enableVacancy}
                            onChange={(e) => setEnableVacancy(e.target.checked)}
                          />
                          <span className="toggle-slider-small"></span>
                        </label>
                      </div>
                      <input
                        type="number"
                        value={vacancyRate}
                        onChange={(e) => setVacancyRate(e.target.value)}
                        placeholder="0"
                        step="0.1"
                        disabled={!enableVacancy}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="form-section">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Expenses (Annual)</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enableExpenses}
                      onChange={(e) => setEnableExpenses(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {enableExpenses && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <label>Property Tax</label>
                          <label className="toggle-switch-small">
                            <input
                              type="checkbox"
                              checked={enablePropertyTax}
                              onChange={(e) => setEnablePropertyTax(e.target.checked)}
                            />
                            <span className="toggle-slider-small"></span>
                          </label>
                        </div>
                        <input
                          type="number"
                          value={propertyTax}
                          onChange={(e) => setPropertyTax(e.target.value)}
                          placeholder="0"
                          disabled={!enablePropertyTax}
                        />
                      </div>
                      <div className="form-group">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <label>Insurance</label>
                          <label className="toggle-switch-small">
                            <input
                              type="checkbox"
                              checked={enableInsurance}
                              onChange={(e) => setEnableInsurance(e.target.checked)}
                            />
                            <span className="toggle-slider-small"></span>
                          </label>
                        </div>
                        <input
                          type="number"
                          value={insurance}
                          onChange={(e) => setInsurance(e.target.value)}
                          placeholder="0"
                          disabled={!enableInsurance}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <label>Utilities</label>
                          <label className="toggle-switch-small">
                            <input
                              type="checkbox"
                              checked={enableUtilities}
                              onChange={(e) => setEnableUtilities(e.target.checked)}
                            />
                            <span className="toggle-slider-small"></span>
                          </label>
                        </div>
                        <input
                          type="number"
                          value={utilities}
                          onChange={(e) => setUtilities(e.target.value)}
                          placeholder="0"
                          disabled={!enableUtilities}
                        />
                      </div>
                      <div className="form-group">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <label>Maintenance</label>
                          <label className="toggle-switch-small">
                            <input
                              type="checkbox"
                              checked={enableMaintenance}
                              onChange={(e) => setEnableMaintenance(e.target.checked)}
                            />
                            <span className="toggle-slider-small"></span>
                          </label>
                        </div>
                        <input
                          type="number"
                          value={maintenance}
                          onChange={(e) => setMaintenance(e.target.value)}
                          placeholder="0"
                          disabled={!enableMaintenance}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label>Property Management</label>
                        <label className="toggle-switch-small">
                          <input
                            type="checkbox"
                            checked={enablePropertyManagement}
                            onChange={(e) => setEnablePropertyManagement(e.target.checked)}
                          />
                          <span className="toggle-slider-small"></span>
                        </label>
                      </div>
                      <input
                        type="number"
                        value={propertyManagement}
                        onChange={(e) => setPropertyManagement(e.target.value)}
                        placeholder="0"
                        disabled={!enablePropertyManagement}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="form-section">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Financing</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={enableFinancing}
                      onChange={(e) => setEnableFinancing(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {enableFinancing && (
                  <>
                    <div className="form-group">
                      <label>Loan Amount</label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Interest Rate (%)</label>
                        <input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          placeholder="0"
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
                  </>
                )}
              </div>
            </>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            {draftSaved && (
              <div style={{
                padding: '0.5rem',
                background: '#e8f5e9',
                borderRadius: '6px',
                fontSize: '0.875rem',
                color: '#2e7d32',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ✓ Draft saved to workspace
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={clearDraft}
                className="button button--secondary"
                style={{ flex: '0 0 auto' }}
              >
                Clear Draft
              </button>
              <button
                type="submit"
                className="button button--primary"
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? 'Calculating...' : '💰 Calculate Valuation'}
              </button>
            </div>

            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-light)',
              marginTop: '0.5rem',
              textAlign: 'center'
            }}>
              Your work is automatically saved every 2 seconds
            </p>
          </div>
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
              {results.noi !== null && results.noi !== undefined && (
                <div className="metric-card">
                  <div className="metric-label">Net Operating Income</div>
                  <div className="metric-value">{formatCurrency(results.noi)}</div>
                  <div className="metric-desc">Annual NOI</div>
                </div>
              )}

              {results.capRate !== null && results.capRate !== undefined && (
                <div className="metric-card">
                  <div className="metric-label">Cap Rate</div>
                  <div className="metric-value">
                    {results.capRate ? `${results.capRate.toFixed(2)}%` : '-'}
                  </div>
                  <div className="metric-desc">Capitalization Rate</div>
                </div>
              )}

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

            {(results.incomeData || results.expenseData || results.financingData) && (
              <div className="results-details">
                <h4>Financial Breakdown</h4>

                {results.incomeData && (
                  <div className="detail-section">
                    <h5>Income</h5>
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
                  </div>
                )}

                {results.expenseData && (
                  <div className="detail-section">
                    <h5>Expenses</h5>
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
                  </div>
                )}

                {results.financingData && (
                  <div className="detail-section">
                    <h5>Financing</h5>
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
                  </div>
                )}
              </div>
            )}

            <div className="results-actions">
              <button
                onClick={() => {
                  setResults(null);
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
