"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Property Types
const PROPERTY_TYPES = [
  { id: "single-family", name: "Single Family", icon: "🏠" },
  { id: "multifamily", name: "Multifamily", icon: "🏢" },
  { id: "commercial", name: "Commercial", icon: "🏬" },
  { id: "industrial", name: "Industrial", icon: "🏭" },
  { id: "retail", name: "Retail", icon: "🛒" },
  { id: "office", name: "Office", icon: "🏛️" },
  { id: "mixed-use", name: "Mixed Use", icon: "🏗️" },
  { id: "land", name: "Land", icon: "🌍" },
  { id: "hospitality", name: "Hospitality", icon: "🏨" },
  { id: "self-storage", name: "Self Storage", icon: "📦" },
];

// Saved Workspace Interface
interface SavedWorkspace {
  id: string;
  name: string;
  date: string;
  address: string;
  propertyType: string;
  valuation: ValuationResult | null;
  underwriting: UnderwritingData | null;
  comps: CompProperty[];
  images: string[];
  notes: string;
}

// Valuation Result Interface
interface ValuationResult {
  estimatedValue: number;
  valueRange: { low: number; high: number };
  confidence: number;
  approaches: {
    income: { value: number; capRate: number; noi: number };
    sales: { value: number; pricePerSqft: number; adjustedComps: number };
    cost: { value: number; landValue: number; improvements: number; depreciation: number };
  };
  marketFactors: string[];
  improvements: ImprovementItem[];
  conditionScore: number;
}

// Comp Property Interface
interface CompProperty {
  id: string;
  address: string;
  distance: string;
  salePrice: number;
  saleDate: string;
  sqft: number;
  pricePerSqft: number;
  propertyType: string;
  yearBuilt: number;
  beds?: number;
  baths?: number;
  units?: number;
  capRate?: number;
}

// Improvement Item Interface
interface ImprovementItem {
  area: string;
  issue: string;
  recommendation: string;
  estimatedCost: number;
  potentialValueAdd: number;
  priority: "high" | "medium" | "low";
}

// Underwriting Data Interface
interface UnderwritingData {
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  annualDebtService: number;
  grossRent: number;
  vacancy: number;
  effectiveGrossIncome: number;
  operatingExpenses: number;
  noi: number;
  cashFlow: number;
  capRate: number;
  cashOnCash: number;
  dscr: number;
  grm: number;
}

// Current Interest Rates (simulated real-time)
const CURRENT_RATES = {
  conventional30: 7.125,
  conventional15: 6.625,
  commercial: 7.50,
  bridge: 10.25,
  sba504: 6.875,
  lastUpdated: new Date().toLocaleString(),
};

export default function ValoraDashboard() {
  // Address & Property State
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [showPropertyTypes, setShowPropertyTypes] = useState(false);

  // Property Details State
  const [sqft, setSqft] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [units, setUnits] = useState("1");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [comps, setComps] = useState<CompProperty[]>([]);
  const [activeTab, setActiveTab] = useState<"valuation" | "comps" | "underwriting" | "improvements" | "map">("valuation");

  // Photo State (optional)
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Underwriting State
  const [underwriting, setUnderwriting] = useState<UnderwritingData | null>(null);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("25");
  const [interestRate, setInterestRate] = useState(CURRENT_RATES.commercial.toString());
  const [loanTerm, setLoanTerm] = useState("30");
  const [grossRent, setGrossRent] = useState("");
  const [vacancyRate, setVacancyRate] = useState("5");
  const [operatingExpenseRatio, setOperatingExpenseRatio] = useState("35");

  // Workspace State
  const [savedWorkspaces, setSavedWorkspaces] = useState<SavedWorkspace[]>([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [showSavedWorkspaces, setShowSavedWorkspaces] = useState(false);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setUploadedImages(prev => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Run Full Analysis
  const runAnalysis = async () => {
    if (!address || !propertyType) return;

    setIsAnalyzing(true);

    // Simulate API calls for property data, comps, and valuation
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate mock comps based on property type
    const mockComps: CompProperty[] = [
      {
        id: "1",
        address: "123 Oak Street",
        distance: "0.3 mi",
        salePrice: 425000,
        saleDate: "2024-01-15",
        sqft: 2100,
        pricePerSqft: 202,
        propertyType: propertyType,
        yearBuilt: 1995,
        beds: 4,
        baths: 2.5,
      },
      {
        id: "2",
        address: "456 Maple Avenue",
        distance: "0.5 mi",
        salePrice: 398000,
        saleDate: "2024-02-08",
        sqft: 1950,
        pricePerSqft: 204,
        propertyType: propertyType,
        yearBuilt: 1998,
        beds: 3,
        baths: 2,
      },
      {
        id: "3",
        address: "789 Pine Road",
        distance: "0.7 mi",
        salePrice: 445000,
        saleDate: "2024-01-28",
        sqft: 2250,
        pricePerSqft: 198,
        propertyType: propertyType,
        yearBuilt: 2001,
        beds: 4,
        baths: 3,
      },
      {
        id: "4",
        address: "321 Elm Boulevard",
        distance: "0.9 mi",
        salePrice: 412000,
        saleDate: "2023-12-20",
        sqft: 2050,
        pricePerSqft: 201,
        propertyType: propertyType,
        yearBuilt: 1992,
        beds: 4,
        baths: 2,
      },
      {
        id: "5",
        address: "654 Cedar Lane",
        distance: "1.1 mi",
        salePrice: 438000,
        saleDate: "2024-02-14",
        sqft: 2180,
        pricePerSqft: 201,
        propertyType: propertyType,
        yearBuilt: 2003,
        beds: 4,
        baths: 2.5,
      },
    ];

    // Generate valuation result
    const baseSqft = parseInt(sqft) || 2000;
    const avgPricePerSqft = 205;
    const estimatedValue = baseSqft * avgPricePerSqft;

    const mockValuation: ValuationResult = {
      estimatedValue: estimatedValue,
      valueRange: {
        low: Math.round(estimatedValue * 0.92),
        high: Math.round(estimatedValue * 1.08)
      },
      confidence: 87,
      approaches: {
        income: {
          value: Math.round(estimatedValue * 1.02),
          capRate: 5.8,
          noi: Math.round(estimatedValue * 0.058),
        },
        sales: {
          value: estimatedValue,
          pricePerSqft: avgPricePerSqft,
          adjustedComps: 5,
        },
        cost: {
          value: Math.round(estimatedValue * 0.95),
          landValue: Math.round(estimatedValue * 0.25),
          improvements: Math.round(estimatedValue * 0.85),
          depreciation: Math.round(estimatedValue * 0.15),
        },
      },
      marketFactors: [
        "Strong buyer demand in area (+8% YoY)",
        "Limited inventory driving prices up",
        "School district rated 8/10",
        "Recent commercial development nearby",
        "Property taxes 1.2% of assessed value",
      ],
      improvements: [
        {
          area: "Kitchen",
          issue: "Dated appliances and countertops",
          recommendation: "Update to modern stainless appliances and quartz counters",
          estimatedCost: 25000,
          potentialValueAdd: 45000,
          priority: "high",
        },
        {
          area: "Bathrooms",
          issue: "Original fixtures and tile",
          recommendation: "Remodel master bath, update fixtures in secondary baths",
          estimatedCost: 18000,
          potentialValueAdd: 30000,
          priority: "high",
        },
        {
          area: "Exterior",
          issue: "Landscaping needs attention",
          recommendation: "Professional landscaping and curb appeal improvements",
          estimatedCost: 8000,
          potentialValueAdd: 15000,
          priority: "medium",
        },
        {
          area: "HVAC",
          issue: "System 15+ years old",
          recommendation: "Replace with high-efficiency system",
          estimatedCost: 12000,
          potentialValueAdd: 18000,
          priority: "medium",
        },
        {
          area: "Flooring",
          issue: "Carpet in living areas worn",
          recommendation: "Install hardwood or luxury vinyl plank",
          estimatedCost: 10000,
          potentialValueAdd: 20000,
          priority: "low",
        },
      ],
      conditionScore: uploadedImages.length > 0 ? 72 : 75,
    };

    setComps(mockComps);
    setValuation(mockValuation);
    setPurchasePrice(estimatedValue.toString());
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  // Calculate Underwriting
  const calculateUnderwriting = () => {
    const price = parseFloat(purchasePrice) || 0;
    const downPmt = price * (parseFloat(downPaymentPercent) / 100);
    const loan = price - downPmt;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    const monthly = loan * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const annualDebt = monthly * 12;
    const gross = parseFloat(grossRent) * 12 || 0;
    const vacancy = parseFloat(vacancyRate) / 100;
    const egi = gross * (1 - vacancy);
    const opex = egi * (parseFloat(operatingExpenseRatio) / 100);
    const noi = egi - opex;
    const cf = noi - annualDebt;

    setUnderwriting({
      purchasePrice: price,
      downPayment: downPmt,
      loanAmount: loan,
      interestRate: parseFloat(interestRate),
      loanTerm: parseFloat(loanTerm),
      monthlyPayment: monthly,
      annualDebtService: annualDebt,
      grossRent: gross,
      vacancy: vacancy * 100,
      effectiveGrossIncome: egi,
      operatingExpenses: opex,
      noi: noi,
      cashFlow: cf,
      capRate: price > 0 ? (noi / price) * 100 : 0,
      cashOnCash: downPmt > 0 ? (cf / downPmt) * 100 : 0,
      dscr: annualDebt > 0 ? noi / annualDebt : 0,
      grm: gross > 0 ? price / gross : 0,
    });
  };

  // Auto-calculate underwriting when inputs change
  useEffect(() => {
    if (purchasePrice && grossRent) {
      calculateUnderwriting();
    }
  }, [purchasePrice, downPaymentPercent, interestRate, loanTerm, grossRent, vacancyRate, operatingExpenseRatio]);

  // Save Workspace
  const saveWorkspace = () => {
    const workspace: SavedWorkspace = {
      id: currentWorkspaceId || Date.now().toString(),
      name: workspaceName || `${address}, ${city}`,
      date: new Date().toLocaleDateString(),
      address: `${address}, ${city}, ${state} ${zipCode}`,
      propertyType: propertyType,
      valuation: valuation,
      underwriting: underwriting,
      comps: comps,
      images: uploadedImages,
      notes: notes,
    };

    if (currentWorkspaceId) {
      setSavedWorkspaces(prev => prev.map(w => w.id === currentWorkspaceId ? workspace : w));
    } else {
      setSavedWorkspaces(prev => [workspace, ...prev]);
      setCurrentWorkspaceId(workspace.id);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Load Workspace
  const loadWorkspace = (workspace: SavedWorkspace) => {
    const addressParts = workspace.address.split(", ");
    setAddress(addressParts[0] || "");
    setCity(addressParts[1] || "");
    const stateZip = addressParts[2]?.split(" ") || [];
    setState(stateZip[0] || "");
    setZipCode(stateZip[1] || "");
    setPropertyType(workspace.propertyType);
    setValuation(workspace.valuation);
    setUnderwriting(workspace.underwriting);
    setComps(workspace.comps);
    setUploadedImages(workspace.images);
    setNotes(workspace.notes);
    setWorkspaceName(workspace.name);
    setCurrentWorkspaceId(workspace.id);
    setAnalysisComplete(true);
    setShowSavedWorkspaces(false);

    if (workspace.underwriting) {
      setPurchasePrice(workspace.underwriting.purchasePrice.toString());
      setGrossRent((workspace.underwriting.grossRent / 12).toString());
    }
  };

  // Delete Workspace
  const deleteWorkspace = (id: string) => {
    setSavedWorkspaces(prev => prev.filter(w => w.id !== id));
    if (currentWorkspaceId === id) {
      setCurrentWorkspaceId(null);
    }
  };

  // Reset Analysis
  const resetAnalysis = () => {
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setPropertyType("");
    setSqft("");
    setLotSize("");
    setYearBuilt("");
    setUnits("1");
    setBeds("");
    setBaths("");
    setUploadedImages([]);
    setValuation(null);
    setUnderwriting(null);
    setComps([]);
    setAnalysisComplete(false);
    setCurrentWorkspaceId(null);
    setWorkspaceName("");
    setNotes("");
    setPurchasePrice("");
    setGrossRent("");
    setActiveTab("valuation");
  };

  // Export Report
  const exportReport = (format: "pdf" | "excel") => {
    // In production, this would generate actual files
    alert(`Exporting ${format.toUpperCase()} report for ${address}...`);
  };

  // Format Currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <main className="valora-dashboard-page">
      <Header />

      {/* Dashboard Header */}
      <section className="val-dash-header">
        <div className="container">
          <div className="val-dash-header-content">
            <div>
              <div className="val-breadcrumb">
                <Link href="/valora">VALORA</Link>
                <span>/</span>
                <span>Property Intelligence</span>
              </div>
              <h1>Property Analysis & Valuation</h1>
              <p>AI-powered valuations, comps, and underwriting for all property types</p>
            </div>
            <div className="val-dash-actions">
              {savedWorkspaces.length > 0 && (
                <button className="val-dash-btn secondary" onClick={() => setShowSavedWorkspaces(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                  </svg>
                  Saved ({savedWorkspaces.length})
                </button>
              )}
              {analysisComplete && (
                <button className="val-dash-btn secondary" onClick={resetAnalysis}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  New Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <div className="val-main-layout">
          {/* Left Panel - Input Form */}
          <div className="val-input-panel">
            <div className="val-input-card">
              <h3>Property Information</h3>

              {/* Address Input */}
              <div className="val-form-section">
                <label>Property Address</label>
                <input
                  type="text"
                  placeholder="Street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="val-input"
                />
                <div className="val-input-row">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="val-input"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="val-input small"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="val-input small"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="val-form-section">
                <label>Property Type</label>
                <div className="val-type-selector">
                  <button
                    className="val-type-dropdown"
                    onClick={() => setShowPropertyTypes(!showPropertyTypes)}
                  >
                    {propertyType ? (
                      <>
                        <span>{PROPERTY_TYPES.find(t => t.id === propertyType)?.icon}</span>
                        <span>{PROPERTY_TYPES.find(t => t.id === propertyType)?.name}</span>
                      </>
                    ) : (
                      <span>Select property type...</span>
                    )}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {showPropertyTypes && (
                    <div className="val-type-menu">
                      {PROPERTY_TYPES.map(type => (
                        <button
                          key={type.id}
                          className={`val-type-option ${propertyType === type.id ? "active" : ""}`}
                          onClick={() => {
                            setPropertyType(type.id);
                            setShowPropertyTypes(false);
                          }}
                        >
                          <span>{type.icon}</span>
                          <span>{type.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Property Details */}
              <div className="val-form-section">
                <label>Property Details</label>
                <div className="val-input-row">
                  <div className="val-input-group">
                    <input
                      type="number"
                      placeholder="Sq Ft"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      className="val-input"
                    />
                    <span className="val-input-suffix">sqft</span>
                  </div>
                  <div className="val-input-group">
                    <input
                      type="number"
                      placeholder="Lot Size"
                      value={lotSize}
                      onChange={(e) => setLotSize(e.target.value)}
                      className="val-input"
                    />
                    <span className="val-input-suffix">acres</span>
                  </div>
                </div>
                <div className="val-input-row">
                  <input
                    type="number"
                    placeholder="Year Built"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    className="val-input"
                  />
                  {(propertyType === "multifamily" || propertyType === "commercial") && (
                    <input
                      type="number"
                      placeholder="# Units"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="val-input"
                    />
                  )}
                </div>
                {(propertyType === "single-family" || propertyType === "multifamily") && (
                  <div className="val-input-row">
                    <input
                      type="number"
                      placeholder="Beds"
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="val-input"
                    />
                    <input
                      type="number"
                      placeholder="Baths"
                      value={baths}
                      onChange={(e) => setBaths(e.target.value)}
                      className="val-input"
                    />
                  </div>
                )}
              </div>

              {/* Photo Upload (Optional) */}
              <div className="val-form-section">
                <label>
                  Property Photos <span className="optional">(optional - helps assess condition)</span>
                </label>
                <div
                  className="val-photo-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span>Drop photos or click to upload</span>
                </div>
                {uploadedImages.length > 0 && (
                  <div className="val-uploaded-photos">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="val-photo-thumb">
                        <img src={img} alt={`Photo ${index + 1}`} />
                        <button onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <button
                className="val-analyze-btn"
                onClick={runAnalysis}
                disabled={!address || !propertyType || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="val-spinner"></span>
                    Analyzing Property...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Run AI Analysis
                  </>
                )}
              </button>
            </div>

            {/* Current Interest Rates */}
            <div className="val-rates-card">
              <h4>Current Interest Rates</h4>
              <div className="val-rates-list">
                <div className="val-rate-item">
                  <span>30-Year Fixed</span>
                  <span className="rate">{CURRENT_RATES.conventional30}%</span>
                </div>
                <div className="val-rate-item">
                  <span>15-Year Fixed</span>
                  <span className="rate">{CURRENT_RATES.conventional15}%</span>
                </div>
                <div className="val-rate-item">
                  <span>Commercial</span>
                  <span className="rate">{CURRENT_RATES.commercial}%</span>
                </div>
                <div className="val-rate-item">
                  <span>Bridge Loan</span>
                  <span className="rate">{CURRENT_RATES.bridge}%</span>
                </div>
                <div className="val-rate-item">
                  <span>SBA 504</span>
                  <span className="rate">{CURRENT_RATES.sba504}%</span>
                </div>
              </div>
              <span className="val-rates-updated">Updated: {CURRENT_RATES.lastUpdated}</span>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="val-results-panel">
            {!analysisComplete ? (
              <div className="val-empty-results">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                  <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3>Enter Property Details</h3>
                <p>Input an address and property type to get AI-powered valuations, comparable sales, and underwriting analysis.</p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="val-results-header">
                  <div className="val-results-title">
                    <h2>{address}</h2>
                    <p>{city}, {state} {zipCode}</p>
                  </div>
                  <div className="val-results-actions">
                    <input
                      type="text"
                      placeholder="Workspace name"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="val-workspace-input"
                    />
                    <button className="val-save-btn" onClick={saveWorkspace}>
                      {saveSuccess ? "Saved!" : "Save"}
                    </button>
                    <div className="val-export-dropdown">
                      <button className="val-export-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        Export
                      </button>
                      <div className="val-export-menu">
                        <button onClick={() => exportReport("pdf")}>Export PDF</button>
                        <button onClick={() => exportReport("excel")}>Export Excel</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="val-tabs">
                  {(["valuation", "comps", "underwriting", "improvements", "map"] as const).map(tab => (
                    <button
                      key={tab}
                      className={`val-tab ${activeTab === tab ? "active" : ""}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="val-tab-content">
                  {/* Valuation Tab */}
                  {activeTab === "valuation" && valuation && (
                    <div className="val-valuation-content">
                      {/* Main Value */}
                      <div className="val-main-value">
                        <div className="val-value-card primary">
                          <span className="label">Estimated Market Value</span>
                          <span className="value">{formatCurrency(valuation.estimatedValue)}</span>
                          <div className="range">
                            <span>{formatCurrency(valuation.valueRange.low)}</span>
                            <div className="range-bar">
                              <div className="range-fill" style={{ width: "50%" }}></div>
                            </div>
                            <span>{formatCurrency(valuation.valueRange.high)}</span>
                          </div>
                          <span className="confidence">{valuation.confidence}% Confidence</span>
                        </div>
                        {uploadedImages.length > 0 && (
                          <div className="val-condition-score">
                            <div className="score-ring">
                              <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                                <circle
                                  cx="50" cy="50" r="45" fill="none"
                                  stroke={valuation.conditionScore >= 70 ? "#22C55E" : valuation.conditionScore >= 50 ? "#F59E0B" : "#EF4444"}
                                  strokeWidth="8"
                                  strokeDasharray={`${valuation.conditionScore * 2.83} 283`}
                                  strokeLinecap="round"
                                  transform="rotate(-90 50 50)"
                                />
                              </svg>
                              <div className="score-text">
                                <span>{valuation.conditionScore}</span>
                                <small>/100</small>
                              </div>
                            </div>
                            <span className="score-label">Condition Score</span>
                          </div>
                        )}
                      </div>

                      {/* Valuation Approaches */}
                      <div className="val-approaches">
                        <h4>Valuation Approaches</h4>
                        <div className="val-approaches-grid">
                          <div className="val-approach-card">
                            <h5>Income Approach</h5>
                            <span className="approach-value">{formatCurrency(valuation.approaches.income.value)}</span>
                            <div className="approach-details">
                              <div><span>Cap Rate:</span><span>{valuation.approaches.income.capRate}%</span></div>
                              <div><span>NOI:</span><span>{formatCurrency(valuation.approaches.income.noi)}</span></div>
                            </div>
                          </div>
                          <div className="val-approach-card">
                            <h5>Sales Comparison</h5>
                            <span className="approach-value">{formatCurrency(valuation.approaches.sales.value)}</span>
                            <div className="approach-details">
                              <div><span>$/SF:</span><span>${valuation.approaches.sales.pricePerSqft}</span></div>
                              <div><span>Comps Used:</span><span>{valuation.approaches.sales.adjustedComps}</span></div>
                            </div>
                          </div>
                          <div className="val-approach-card">
                            <h5>Cost Approach</h5>
                            <span className="approach-value">{formatCurrency(valuation.approaches.cost.value)}</span>
                            <div className="approach-details">
                              <div><span>Land:</span><span>{formatCurrency(valuation.approaches.cost.landValue)}</span></div>
                              <div><span>Depreciation:</span><span>{formatCurrency(valuation.approaches.cost.depreciation)}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Market Factors */}
                      <div className="val-market-factors">
                        <h4>Market Factors</h4>
                        <ul>
                          {valuation.marketFactors.map((factor, i) => (
                            <li key={i}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Comps Tab */}
                  {activeTab === "comps" && (
                    <div className="val-comps-content">
                      <div className="val-comps-header">
                        <h4>Comparable Sales</h4>
                        <span>{comps.length} properties within 1.5 miles</span>
                      </div>
                      <div className="val-comps-table">
                        <div className="val-comps-row header">
                          <span>Address</span>
                          <span>Distance</span>
                          <span>Sale Price</span>
                          <span>Date</span>
                          <span>Sq Ft</span>
                          <span>$/SF</span>
                        </div>
                        {comps.map(comp => (
                          <div key={comp.id} className="val-comps-row">
                            <span className="address">{comp.address}</span>
                            <span>{comp.distance}</span>
                            <span className="price">{formatCurrency(comp.salePrice)}</span>
                            <span>{comp.saleDate}</span>
                            <span>{comp.sqft.toLocaleString()}</span>
                            <span>${comp.pricePerSqft}</span>
                          </div>
                        ))}
                      </div>
                      <div className="val-comps-summary">
                        <div className="summary-item">
                          <span>Average Sale Price</span>
                          <span>{formatCurrency(comps.reduce((a, b) => a + b.salePrice, 0) / comps.length)}</span>
                        </div>
                        <div className="summary-item">
                          <span>Average $/SF</span>
                          <span>${Math.round(comps.reduce((a, b) => a + b.pricePerSqft, 0) / comps.length)}</span>
                        </div>
                        <div className="summary-item">
                          <span>Median Sale Price</span>
                          <span>{formatCurrency(comps.sort((a, b) => a.salePrice - b.salePrice)[Math.floor(comps.length / 2)].salePrice)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Underwriting Tab */}
                  {activeTab === "underwriting" && (
                    <div className="val-underwriting-content">
                      <div className="val-uw-inputs">
                        <h4>Deal Inputs</h4>
                        <div className="val-uw-grid">
                          <div className="val-uw-input">
                            <label>Purchase Price</label>
                            <input
                              type="number"
                              value={purchasePrice}
                              onChange={(e) => setPurchasePrice(e.target.value)}
                            />
                          </div>
                          <div className="val-uw-input">
                            <label>Down Payment %</label>
                            <input
                              type="number"
                              value={downPaymentPercent}
                              onChange={(e) => setDownPaymentPercent(e.target.value)}
                            />
                          </div>
                          <div className="val-uw-input">
                            <label>Interest Rate %</label>
                            <input
                              type="number"
                              step="0.125"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                            />
                          </div>
                          <div className="val-uw-input">
                            <label>Loan Term (years)</label>
                            <input
                              type="number"
                              value={loanTerm}
                              onChange={(e) => setLoanTerm(e.target.value)}
                            />
                          </div>
                          <div className="val-uw-input">
                            <label>Monthly Gross Rent</label>
                            <input
                              type="number"
                              value={grossRent}
                              onChange={(e) => setGrossRent(e.target.value)}
                            />
                          </div>
                          <div className="val-uw-input">
                            <label>Vacancy Rate %</label>
                            <input
                              type="number"
                              value={vacancyRate}
                              onChange={(e) => setVacancyRate(e.target.value)}
                            />
                          </div>
                          <div className="val-uw-input">
                            <label>Operating Expense %</label>
                            <input
                              type="number"
                              value={operatingExpenseRatio}
                              onChange={(e) => setOperatingExpenseRatio(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {underwriting && (
                        <div className="val-uw-results">
                          <h4>Analysis Results</h4>
                          <div className="val-uw-metrics">
                            <div className={`val-uw-metric ${underwriting.cashFlow >= 0 ? "positive" : "negative"}`}>
                              <span className="metric-label">Annual Cash Flow</span>
                              <span className="metric-value">{formatCurrency(underwriting.cashFlow)}</span>
                            </div>
                            <div className={`val-uw-metric ${underwriting.cashOnCash >= 8 ? "positive" : underwriting.cashOnCash >= 5 ? "neutral" : "negative"}`}>
                              <span className="metric-label">Cash-on-Cash Return</span>
                              <span className="metric-value">{underwriting.cashOnCash.toFixed(2)}%</span>
                            </div>
                            <div className={`val-uw-metric ${underwriting.capRate >= 6 ? "positive" : underwriting.capRate >= 4 ? "neutral" : "negative"}`}>
                              <span className="metric-label">Cap Rate</span>
                              <span className="metric-value">{underwriting.capRate.toFixed(2)}%</span>
                            </div>
                            <div className={`val-uw-metric ${underwriting.dscr >= 1.25 ? "positive" : underwriting.dscr >= 1 ? "neutral" : "negative"}`}>
                              <span className="metric-label">DSCR</span>
                              <span className="metric-value">{underwriting.dscr.toFixed(2)}x</span>
                            </div>
                          </div>

                          <div className="val-uw-breakdown">
                            <div className="breakdown-section">
                              <h5>Financing</h5>
                              <div className="breakdown-row">
                                <span>Down Payment</span>
                                <span>{formatCurrency(underwriting.downPayment)}</span>
                              </div>
                              <div className="breakdown-row">
                                <span>Loan Amount</span>
                                <span>{formatCurrency(underwriting.loanAmount)}</span>
                              </div>
                              <div className="breakdown-row">
                                <span>Monthly Payment</span>
                                <span>{formatCurrency(underwriting.monthlyPayment)}</span>
                              </div>
                              <div className="breakdown-row">
                                <span>Annual Debt Service</span>
                                <span>{formatCurrency(underwriting.annualDebtService)}</span>
                              </div>
                            </div>
                            <div className="breakdown-section">
                              <h5>Income & Expenses</h5>
                              <div className="breakdown-row">
                                <span>Gross Rental Income</span>
                                <span>{formatCurrency(underwriting.grossRent)}</span>
                              </div>
                              <div className="breakdown-row">
                                <span>Less Vacancy ({underwriting.vacancy}%)</span>
                                <span>-{formatCurrency(underwriting.grossRent * (underwriting.vacancy / 100))}</span>
                              </div>
                              <div className="breakdown-row">
                                <span>Effective Gross Income</span>
                                <span>{formatCurrency(underwriting.effectiveGrossIncome)}</span>
                              </div>
                              <div className="breakdown-row">
                                <span>Operating Expenses</span>
                                <span>-{formatCurrency(underwriting.operatingExpenses)}</span>
                              </div>
                              <div className="breakdown-row highlight">
                                <span>Net Operating Income (NOI)</span>
                                <span>{formatCurrency(underwriting.noi)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Improvements Tab */}
                  {activeTab === "improvements" && valuation && (
                    <div className="val-improvements-content">
                      <div className="val-improvements-header">
                        <h4>Value-Add Opportunities</h4>
                        <div className="val-improvements-summary">
                          <span>Total Investment: {formatCurrency(valuation.improvements.reduce((a, b) => a + b.estimatedCost, 0))}</span>
                          <span>Potential Value Add: {formatCurrency(valuation.improvements.reduce((a, b) => a + b.potentialValueAdd, 0))}</span>
                          <span className="roi">
                            ROI: {((valuation.improvements.reduce((a, b) => a + b.potentialValueAdd, 0) / valuation.improvements.reduce((a, b) => a + b.estimatedCost, 0) - 1) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="val-improvements-list">
                        {valuation.improvements.map((item, i) => (
                          <div key={i} className={`val-improvement-item priority-${item.priority}`}>
                            <div className="improvement-header">
                              <span className="area">{item.area}</span>
                              <span className={`priority ${item.priority}`}>{item.priority}</span>
                            </div>
                            <p className="issue">{item.issue}</p>
                            <p className="recommendation">{item.recommendation}</p>
                            <div className="improvement-numbers">
                              <div>
                                <span>Est. Cost</span>
                                <span className="cost">{formatCurrency(item.estimatedCost)}</span>
                              </div>
                              <div>
                                <span>Value Add</span>
                                <span className="value-add">{formatCurrency(item.potentialValueAdd)}</span>
                              </div>
                              <div>
                                <span>ROI</span>
                                <span className="item-roi">{((item.potentialValueAdd / item.estimatedCost - 1) * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Map Tab */}
                  {activeTab === "map" && (
                    <div className="val-map-content">
                      <div className="val-map-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                          <circle cx="12" cy="10" r="3" />
                          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                        </svg>
                        <h4>Interactive Map</h4>
                        <p>View property location, nearby comps, and area amenities</p>
                        <div className="map-legend">
                          <div className="legend-item">
                            <span className="dot subject"></span>
                            <span>Subject Property</span>
                          </div>
                          <div className="legend-item">
                            <span className="dot comp"></span>
                            <span>Comparable Sales ({comps.length})</span>
                          </div>
                        </div>
                        <p className="map-note">Map integration available with API key</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div className="val-notes-section">
                  <h4>Notes</h4>
                  <textarea
                    placeholder="Add notes about this property..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  ></textarea>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Saved Workspaces Modal */}
      {showSavedWorkspaces && (
        <div className="val-modal-overlay" onClick={() => setShowSavedWorkspaces(false)}>
          <div className="val-modal" onClick={(e) => e.stopPropagation()}>
            <div className="val-modal-header">
              <h3>Saved Workspaces</h3>
              <button onClick={() => setShowSavedWorkspaces(false)}>×</button>
            </div>
            <div className="val-modal-content">
              {savedWorkspaces.length > 0 ? (
                <div className="val-workspaces-list">
                  {savedWorkspaces.map(workspace => (
                    <div key={workspace.id} className="val-workspace-item">
                      <div className="workspace-info" onClick={() => loadWorkspace(workspace)}>
                        <span className="workspace-name">{workspace.name}</span>
                        <span className="workspace-address">{workspace.address}</span>
                        <div className="workspace-meta">
                          <span>{workspace.date}</span>
                          <span>{PROPERTY_TYPES.find(t => t.id === workspace.propertyType)?.name}</span>
                          {workspace.valuation && (
                            <span className="workspace-value">{formatCurrency(workspace.valuation.estimatedValue)}</span>
                          )}
                        </div>
                      </div>
                      <button className="workspace-delete" onClick={() => deleteWorkspace(workspace.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="val-no-workspaces">
                  <p>No saved workspaces yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
