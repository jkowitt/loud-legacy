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

// Rent Roll Unit Interface
interface RentRollUnit {
  id: string;
  unitNumber: string;
  unitType: string;
  sqft: number;
  beds?: number;
  baths?: number;
  monthlyRent: number;
  marketRent: number;
  leaseStart: string;
  leaseEnd: string;
  tenant: string;
  status: "occupied" | "vacant" | "notice";
}

// Operating Expense Interface
interface OperatingExpense {
  id: string;
  category: string;
  annual: number;
  monthly: number;
  perUnit?: number;
  perSqft?: number;
}

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
  rentRoll: RentRollUnit[];
  expenses: OperatingExpense[];
  isPublic: boolean;
  askingPrice?: number;
  listingDate?: string;
  purchasePrice?: string;
  downPaymentPercent?: string;
  interestRate?: string;
  loanTerm?: string;
  grossRent?: string;
  vacancyRate?: string;
  operatingExpenseRatio?: string;
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

// Default Operating Expenses by Category
const DEFAULT_EXPENSES: OperatingExpense[] = [
  { id: "1", category: "Property Taxes", annual: 0, monthly: 0 },
  { id: "2", category: "Insurance", annual: 0, monthly: 0 },
  { id: "3", category: "Utilities", annual: 0, monthly: 0 },
  { id: "4", category: "Repairs & Maintenance", annual: 0, monthly: 0 },
  { id: "5", category: "Property Management", annual: 0, monthly: 0 },
  { id: "6", category: "Landscaping", annual: 0, monthly: 0 },
  { id: "7", category: "Trash Removal", annual: 0, monthly: 0 },
  { id: "8", category: "Professional Fees", annual: 0, monthly: 0 },
  { id: "9", category: "Reserves", annual: 0, monthly: 0 },
  { id: "10", category: "Other", annual: 0, monthly: 0 },
];

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
  const [activeTab, setActiveTab] = useState<"underwriting" | "rentroll" | "pnl" | "valuation" | "comps" | "improvements" | "map">("underwriting");

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

  // Rent Roll State
  const [rentRoll, setRentRoll] = useState<RentRollUnit[]>([]);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [newUnit, setNewUnit] = useState<Partial<RentRollUnit>>({
    unitNumber: "",
    unitType: "1BR",
    sqft: 0,
    monthlyRent: 0,
    marketRent: 0,
    leaseStart: "",
    leaseEnd: "",
    tenant: "",
    status: "occupied"
  });

  // Operating Expenses State
  const [expenses, setExpenses] = useState<OperatingExpense[]>(DEFAULT_EXPENSES);

  // Workspace State
  const [savedWorkspaces, setSavedWorkspaces] = useState<SavedWorkspace[]>([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [showSavedWorkspaces, setShowSavedWorkspaces] = useState(false);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Marketplace State
  const [isPublic, setIsPublic] = useState(false);
  const [askingPrice, setAskingPrice] = useState("");
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [promoteSuccess, setPromoteSuccess] = useState(false);

  // Check if property type is NOT single-family (shows underwriting workspace)
  const isIncomeProperty = propertyType && propertyType !== "single-family" && propertyType !== "land";

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

  // Add Unit to Rent Roll
  const addUnit = () => {
    if (!newUnit.unitNumber) return;
    const unit: RentRollUnit = {
      id: Date.now().toString(),
      unitNumber: newUnit.unitNumber || "",
      unitType: newUnit.unitType || "1BR",
      sqft: newUnit.sqft || 0,
      beds: newUnit.beds,
      baths: newUnit.baths,
      monthlyRent: newUnit.monthlyRent || 0,
      marketRent: newUnit.marketRent || 0,
      leaseStart: newUnit.leaseStart || "",
      leaseEnd: newUnit.leaseEnd || "",
      tenant: newUnit.tenant || "",
      status: newUnit.status || "occupied"
    };
    setRentRoll(prev => [...prev, unit]);
    setNewUnit({
      unitNumber: "",
      unitType: "1BR",
      sqft: 0,
      monthlyRent: 0,
      marketRent: 0,
      leaseStart: "",
      leaseEnd: "",
      tenant: "",
      status: "occupied"
    });
    setShowAddUnit(false);
  };

  // Delete Unit from Rent Roll
  const deleteUnit = (id: string) => {
    setRentRoll(prev => prev.filter(u => u.id !== id));
  };

  // Update Expense
  const updateExpense = (id: string, field: "annual" | "monthly", value: number) => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === id) {
        if (field === "annual") {
          return { ...exp, annual: value, monthly: Math.round(value / 12) };
        } else {
          return { ...exp, monthly: value, annual: value * 12 };
        }
      }
      return exp;
    }));
  };

  // Calculate totals from rent roll
  const rentRollTotals = {
    totalUnits: rentRoll.length,
    occupiedUnits: rentRoll.filter(u => u.status === "occupied").length,
    vacantUnits: rentRoll.filter(u => u.status === "vacant").length,
    noticeUnits: rentRoll.filter(u => u.status === "notice").length,
    totalSqft: rentRoll.reduce((sum, u) => sum + u.sqft, 0),
    totalMonthlyRent: rentRoll.reduce((sum, u) => sum + (u.status === "occupied" ? u.monthlyRent : 0), 0),
    totalMarketRent: rentRoll.reduce((sum, u) => sum + u.marketRent, 0),
    occupancyRate: rentRoll.length > 0 ? (rentRoll.filter(u => u.status === "occupied").length / rentRoll.length * 100) : 0,
    lossToLease: rentRoll.reduce((sum, u) => sum + (u.marketRent - u.monthlyRent), 0),
  };

  // Calculate P&L totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.annual, 0);
  const grossPotentialRent = rentRollTotals.totalMarketRent * 12;
  const actualRent = rentRollTotals.totalMonthlyRent * 12;
  const vacancyLoss = grossPotentialRent - actualRent;
  const effectiveGrossIncome = actualRent;
  const noiFromPnL = effectiveGrossIncome - totalExpenses;

  // Run Full Analysis
  const runAnalysis = async () => {
    if (!address || !propertyType) return;

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate mock comps
    const mockComps: CompProperty[] = [
      { id: "1", address: "123 Oak Street", distance: "0.3 mi", salePrice: 425000, saleDate: "2024-01-15", sqft: 2100, pricePerSqft: 202, propertyType, yearBuilt: 1995, beds: 4, baths: 2.5 },
      { id: "2", address: "456 Maple Avenue", distance: "0.5 mi", salePrice: 398000, saleDate: "2024-02-08", sqft: 1950, pricePerSqft: 204, propertyType, yearBuilt: 1998, beds: 3, baths: 2 },
      { id: "3", address: "789 Pine Road", distance: "0.7 mi", salePrice: 445000, saleDate: "2024-01-28", sqft: 2250, pricePerSqft: 198, propertyType, yearBuilt: 2001, beds: 4, baths: 3 },
      { id: "4", address: "321 Elm Boulevard", distance: "0.9 mi", salePrice: 412000, saleDate: "2023-12-20", sqft: 2050, pricePerSqft: 201, propertyType, yearBuilt: 1992, beds: 4, baths: 2 },
      { id: "5", address: "654 Cedar Lane", distance: "1.1 mi", salePrice: 438000, saleDate: "2024-02-14", sqft: 2180, pricePerSqft: 201, propertyType, yearBuilt: 2003, beds: 4, baths: 2.5 },
    ];

    const baseSqft = parseInt(sqft) || 2000;
    const avgPricePerSqft = 205;
    const estimatedValue = baseSqft * avgPricePerSqft;

    const mockValuation: ValuationResult = {
      estimatedValue,
      valueRange: { low: Math.round(estimatedValue * 0.92), high: Math.round(estimatedValue * 1.08) },
      confidence: 87,
      approaches: {
        income: { value: Math.round(estimatedValue * 1.02), capRate: 5.8, noi: Math.round(estimatedValue * 0.058) },
        sales: { value: estimatedValue, pricePerSqft: avgPricePerSqft, adjustedComps: 5 },
        cost: { value: Math.round(estimatedValue * 0.95), landValue: Math.round(estimatedValue * 0.25), improvements: Math.round(estimatedValue * 0.85), depreciation: Math.round(estimatedValue * 0.15) },
      },
      marketFactors: [
        "Strong buyer demand in area (+8% YoY)",
        "Limited inventory driving prices up",
        "School district rated 8/10",
        "Recent commercial development nearby",
        "Property taxes 1.2% of assessed value",
      ],
      improvements: [
        { area: "Kitchen", issue: "Dated appliances and countertops", recommendation: "Update to modern stainless appliances and quartz counters", estimatedCost: 25000, potentialValueAdd: 45000, priority: "high" },
        { area: "Bathrooms", issue: "Original fixtures and tile", recommendation: "Remodel master bath, update fixtures in secondary baths", estimatedCost: 18000, potentialValueAdd: 30000, priority: "high" },
        { area: "Exterior", issue: "Landscaping needs attention", recommendation: "Professional landscaping and curb appeal improvements", estimatedCost: 8000, potentialValueAdd: 15000, priority: "medium" },
        { area: "HVAC", issue: "System 15+ years old", recommendation: "Replace with high-efficiency system", estimatedCost: 12000, potentialValueAdd: 18000, priority: "medium" },
        { area: "Flooring", issue: "Carpet in living areas worn", recommendation: "Install hardwood or luxury vinyl plank", estimatedCost: 10000, potentialValueAdd: 20000, priority: "low" },
      ],
      conditionScore: uploadedImages.length > 0 ? 72 : 75,
    };

    setComps(mockComps);
    setValuation(mockValuation);
    if (!purchasePrice) {
      setPurchasePrice(estimatedValue.toString());
    }
    setIsAnalyzing(false);
    setAnalysisComplete(true);
    setActiveTab("valuation");
  };

  // Calculate Underwriting
  const calculateUnderwriting = () => {
    const price = parseFloat(purchasePrice) || 0;
    if (price === 0) {
      setUnderwriting(null);
      return;
    }

    const downPmt = price * (parseFloat(downPaymentPercent) / 100);
    const loan = price - downPmt;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    const monthly = loan * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const annualDebt = monthly * 12;

    // Use rent roll data if available, otherwise use manual input
    const gross = rentRoll.length > 0 ? rentRollTotals.totalMonthlyRent * 12 : (parseFloat(grossRent) * 12 || 0);
    const vacancy = parseFloat(vacancyRate) / 100;
    const egi = gross * (1 - vacancy);

    // Use P&L expenses if available
    const opex = rentRoll.length > 0 ? totalExpenses : egi * (parseFloat(operatingExpenseRatio) / 100);
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
      noi,
      cashFlow: cf,
      capRate: price > 0 ? (noi / price) * 100 : 0,
      cashOnCash: downPmt > 0 ? (cf / downPmt) * 100 : 0,
      dscr: annualDebt > 0 ? noi / annualDebt : 0,
      grm: gross > 0 ? price / gross : 0,
    });
  };

  useEffect(() => {
    if (purchasePrice || grossRent || rentRoll.length > 0) {
      calculateUnderwriting();
    }
  }, [purchasePrice, downPaymentPercent, interestRate, loanTerm, grossRent, vacancyRate, operatingExpenseRatio, rentRoll, expenses]);

  // Save Workspace
  const saveWorkspace = () => {
    const workspace: SavedWorkspace = {
      id: currentWorkspaceId || Date.now().toString(),
      name: workspaceName || `${propertyType ? PROPERTY_TYPES.find(t => t.id === propertyType)?.name : "Property"} - ${address || "Underwriting"}`,
      date: new Date().toLocaleDateString(),
      address: address ? `${address}, ${city}, ${state} ${zipCode}` : "No address",
      propertyType,
      valuation,
      underwriting,
      comps,
      images: uploadedImages,
      notes,
      rentRoll,
      expenses,
      isPublic,
      askingPrice: askingPrice ? parseFloat(askingPrice) : undefined,
      listingDate: isPublic ? new Date().toISOString() : undefined,
      purchasePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      grossRent,
      vacancyRate,
      operatingExpenseRatio,
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

  // Promote to Marketplace
  const promoteToMarketplace = () => {
    if (!askingPrice) return;
    setIsPublic(true);
    saveWorkspace();
    setShowPromoteModal(false);
    setPromoteSuccess(true);
    setTimeout(() => setPromoteSuccess(false), 3000);
  };

  // Load Workspace
  const loadWorkspace = (workspace: SavedWorkspace) => {
    if (workspace.address && workspace.address !== "No address") {
      const addressParts = workspace.address.split(", ");
      setAddress(addressParts[0] || "");
      setCity(addressParts[1] || "");
      const stateZip = addressParts[2]?.split(" ") || [];
      setState(stateZip[0] || "");
      setZipCode(stateZip[1] || "");
    }
    setPropertyType(workspace.propertyType);
    setValuation(workspace.valuation);
    setUnderwriting(workspace.underwriting);
    setComps(workspace.comps);
    setUploadedImages(workspace.images);
    setNotes(workspace.notes);
    setWorkspaceName(workspace.name);
    setCurrentWorkspaceId(workspace.id);
    setRentRoll(workspace.rentRoll || []);
    setExpenses(workspace.expenses || DEFAULT_EXPENSES);
    setIsPublic(workspace.isPublic || false);
    setAskingPrice(workspace.askingPrice?.toString() || "");

    // Restore underwriting inputs
    if (workspace.purchasePrice) setPurchasePrice(workspace.purchasePrice);
    if (workspace.downPaymentPercent) setDownPaymentPercent(workspace.downPaymentPercent);
    if (workspace.interestRate) setInterestRate(workspace.interestRate);
    if (workspace.loanTerm) setLoanTerm(workspace.loanTerm);
    if (workspace.grossRent) setGrossRent(workspace.grossRent);
    if (workspace.vacancyRate) setVacancyRate(workspace.vacancyRate);
    if (workspace.operatingExpenseRatio) setOperatingExpenseRatio(workspace.operatingExpenseRatio);

    if (workspace.valuation) {
      setAnalysisComplete(true);
      setActiveTab("valuation");
    } else {
      setActiveTab("underwriting");
    }
    setShowSavedWorkspaces(false);
  };

  // Delete Workspace
  const deleteWorkspace = (id: string) => {
    setSavedWorkspaces(prev => prev.filter(w => w.id !== id));
    if (currentWorkspaceId === id) setCurrentWorkspaceId(null);
  };

  // Reset Analysis
  const resetAnalysis = () => {
    setAddress(""); setCity(""); setState(""); setZipCode(""); setPropertyType("");
    setSqft(""); setLotSize(""); setYearBuilt(""); setUnits("1"); setBeds(""); setBaths("");
    setUploadedImages([]); setValuation(null); setUnderwriting(null); setComps([]);
    setAnalysisComplete(false); setCurrentWorkspaceId(null); setWorkspaceName(""); setNotes("");
    setPurchasePrice(""); setGrossRent(""); setActiveTab("underwriting");
    setRentRoll([]); setExpenses(DEFAULT_EXPENSES); setIsPublic(false); setAskingPrice("");
    setDownPaymentPercent("25"); setInterestRate(CURRENT_RATES.commercial.toString()); setLoanTerm("30");
    setVacancyRate("5"); setOperatingExpenseRatio("35");
  };

  // Export Report
  const exportReport = (format: "pdf" | "excel") => {
    alert(`Exporting ${format.toUpperCase()} report...`);
  };

  // Format Currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  // Get available tabs based on property type and analysis state
  const getAvailableTabs = () => {
    const tabs: Array<"underwriting" | "rentroll" | "pnl" | "valuation" | "comps" | "improvements" | "map"> = [];

    if (isIncomeProperty) {
      tabs.push("underwriting", "rentroll", "pnl");
    }

    if (analysisComplete) {
      tabs.push("valuation", "comps", "improvements", "map");
    }

    return tabs;
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
                <Link href="/valora">Legacy RE</Link>
                <span>/</span>
                <span>Property Intelligence</span>
              </div>
              <h1>Property Analysis & Valuation</h1>
              <p>AI-powered valuations, comps, and underwriting for all property types</p>
            </div>
            <div className="val-dash-actions">
              <Link href="/valora/marketplace" className="val-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Marketplace
              </Link>
              <Link href="/valora/improve" className="val-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
                Improve Value
              </Link>
              {savedWorkspaces.length > 0 && (
                <button className="val-dash-btn secondary" onClick={() => setShowSavedWorkspaces(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                  </svg>
                  Saved ({savedWorkspaces.length})
                </button>
              )}
              {(analysisComplete || isIncomeProperty) && (
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
                <label>Property Address <span className="optional">(optional for underwriting)</span></label>
                <input type="text" placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} className="val-input" />
                <div className="val-input-row">
                  <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="val-input" />
                  <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="val-input small" />
                  <input type="text" placeholder="ZIP" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="val-input small" />
                </div>
              </div>

              {/* Property Type */}
              <div className="val-form-section">
                <label>Property Type</label>
                <div className="val-type-selector">
                  <button className="val-type-dropdown" onClick={() => setShowPropertyTypes(!showPropertyTypes)}>
                    {propertyType ? (
                      <>
                        <span>{PROPERTY_TYPES.find(t => t.id === propertyType)?.icon}</span>
                        <span>{PROPERTY_TYPES.find(t => t.id === propertyType)?.name}</span>
                      </>
                    ) : (
                      <span>Select property type...</span>
                    )}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  {showPropertyTypes && (
                    <div className="val-type-menu">
                      {PROPERTY_TYPES.map(type => (
                        <button key={type.id} className={`val-type-option ${propertyType === type.id ? "active" : ""}`} onClick={() => { setPropertyType(type.id); setShowPropertyTypes(false); }}>
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
                    <input type="number" placeholder="Sq Ft" value={sqft} onChange={(e) => setSqft(e.target.value)} className="val-input" />
                    <span className="val-input-suffix">sqft</span>
                  </div>
                  <div className="val-input-group">
                    <input type="number" placeholder="Lot Size" value={lotSize} onChange={(e) => setLotSize(e.target.value)} className="val-input" />
                    <span className="val-input-suffix">acres</span>
                  </div>
                </div>
                <div className="val-input-row">
                  <input type="number" placeholder="Year Built" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} className="val-input" />
                  {isIncomeProperty && (
                    <input type="number" placeholder="# Units" value={units} onChange={(e) => setUnits(e.target.value)} className="val-input" />
                  )}
                </div>
                {(propertyType === "single-family" || propertyType === "multifamily") && (
                  <div className="val-input-row">
                    <input type="number" placeholder="Beds" value={beds} onChange={(e) => setBeds(e.target.value)} className="val-input" />
                    <input type="number" placeholder="Baths" value={baths} onChange={(e) => setBaths(e.target.value)} className="val-input" />
                  </div>
                )}
              </div>

              {/* Photo Upload */}
              <div className="val-form-section">
                <label>Property Photos <span className="optional">(optional)</span></label>
                <div className="val-photo-dropzone" onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
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
              <button className="val-analyze-btn" onClick={runAnalysis} disabled={!address || !propertyType || isAnalyzing}>
                {isAnalyzing ? (<><span className="val-spinner"></span>Analyzing Property...</>) : (
                  <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>Run AI Analysis</>
                )}
              </button>
            </div>

            {/* Current Interest Rates */}
            <div className="val-rates-card">
              <h4>Current Interest Rates</h4>
              <div className="val-rates-list">
                <div className="val-rate-item"><span>30-Year Fixed</span><span className="rate">{CURRENT_RATES.conventional30}%</span></div>
                <div className="val-rate-item"><span>15-Year Fixed</span><span className="rate">{CURRENT_RATES.conventional15}%</span></div>
                <div className="val-rate-item"><span>Commercial</span><span className="rate">{CURRENT_RATES.commercial}%</span></div>
                <div className="val-rate-item"><span>Bridge Loan</span><span className="rate">{CURRENT_RATES.bridge}%</span></div>
                <div className="val-rate-item"><span>SBA 504</span><span className="rate">{CURRENT_RATES.sba504}%</span></div>
              </div>
              <span className="val-rates-updated">Updated: {CURRENT_RATES.lastUpdated}</span>
            </div>

            {/* Quick Links */}
            <div className="val-quick-links-card">
              <h4>Quick Links</h4>
              <Link href="/valora/marketplace" className="val-quick-link">Browse Marketplace</Link>
              <Link href="/valora/improve" className="val-quick-link">Improve Building Value</Link>
              <Link href="/valora/brokers" className="val-quick-link">Broker Portal</Link>
            </div>
          </div>

          {/* Right Panel - Underwriting Workspace / Results */}
          <div className="val-results-panel">
            {!isIncomeProperty && !analysisComplete ? (
              <div className="val-empty-results">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                  <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3>Select a Property Type</h3>
                <p>Choose a non-single-family property type (Multifamily, Commercial, Industrial, etc.) to open the underwriting workspace, or enter an address to run AI analysis.</p>
              </div>
            ) : (
              <>
                {/* Workspace Header */}
                <div className="val-results-header">
                  <div className="val-results-title">
                    {address ? (
                      <>
                        <h2>{address}</h2>
                        <p>{city}, {state} {zipCode}</p>
                      </>
                    ) : (
                      <>
                        <h2>{PROPERTY_TYPES.find(t => t.id === propertyType)?.name} Underwriting</h2>
                        <p>Enter deal inputs below to analyze returns</p>
                      </>
                    )}
                    {isPublic && <span className="val-public-badge">On Market</span>}
                  </div>
                  <div className="val-results-actions">
                    <input type="text" placeholder="Workspace name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} className="val-workspace-input" />
                    <button className="val-save-btn" onClick={saveWorkspace}>{saveSuccess ? "Saved!" : "Save"}</button>
                    {!isPublic && valuation && (
                      <button className="val-promote-btn" onClick={() => setShowPromoteModal(true)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                        List for Sale
                      </button>
                    )}
                    {promoteSuccess && <span className="val-promote-success">Listed!</span>}
                    <div className="val-export-dropdown">
                      <button className="val-export-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
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
                  {getAvailableTabs().map(tab => (
                    <button key={tab} className={`val-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                      {tab === "rentroll" ? "Rent Roll" : tab === "pnl" ? "P&L" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="val-tab-content">
                  {/* Underwriting Tab */}
                  {activeTab === "underwriting" && isIncomeProperty && (
                    <div className="val-underwriting-content">
                      <div className="val-uw-inputs">
                        <h4>Deal Inputs</h4>
                        <div className="val-uw-grid">
                          <div className="val-uw-input"><label>Purchase Price</label><input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="Enter amount" /></div>
                          <div className="val-uw-input"><label>Down Payment %</label><input type="number" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(e.target.value)} /></div>
                          <div className="val-uw-input"><label>Interest Rate %</label><input type="number" step="0.125" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} /></div>
                          <div className="val-uw-input"><label>Loan Term (years)</label><input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} /></div>
                        </div>
                        {rentRoll.length === 0 && (
                          <>
                            <h4 style={{ marginTop: "1.5rem" }}>Income Inputs</h4>
                            <div className="val-uw-grid">
                              <div className="val-uw-input"><label>Monthly Gross Rent</label><input type="number" value={grossRent} onChange={(e) => setGrossRent(e.target.value)} placeholder="Or use Rent Roll" /></div>
                              <div className="val-uw-input"><label>Vacancy Rate %</label><input type="number" value={vacancyRate} onChange={(e) => setVacancyRate(e.target.value)} /></div>
                              <div className="val-uw-input"><label>Operating Expense %</label><input type="number" value={operatingExpenseRatio} onChange={(e) => setOperatingExpenseRatio(e.target.value)} /></div>
                            </div>
                          </>
                        )}
                        {rentRoll.length > 0 && (
                          <p className="val-uw-note">Income and expenses calculated from Rent Roll and P&L tabs</p>
                        )}
                      </div>
                      {underwriting && (
                        <div className="val-uw-results">
                          <h4>Analysis Results</h4>
                          <div className="val-uw-metrics">
                            <div className={`val-uw-metric ${underwriting.cashFlow >= 0 ? "positive" : "negative"}`}><span className="metric-label">Annual Cash Flow</span><span className="metric-value">{formatCurrency(underwriting.cashFlow)}</span></div>
                            <div className={`val-uw-metric ${underwriting.cashOnCash >= 8 ? "positive" : underwriting.cashOnCash >= 5 ? "neutral" : "negative"}`}><span className="metric-label">Cash-on-Cash</span><span className="metric-value">{underwriting.cashOnCash.toFixed(2)}%</span></div>
                            <div className={`val-uw-metric ${underwriting.capRate >= 6 ? "positive" : underwriting.capRate >= 4 ? "neutral" : "negative"}`}><span className="metric-label">Cap Rate</span><span className="metric-value">{underwriting.capRate.toFixed(2)}%</span></div>
                            <div className={`val-uw-metric ${underwriting.dscr >= 1.25 ? "positive" : underwriting.dscr >= 1 ? "neutral" : "negative"}`}><span className="metric-label">DSCR</span><span className="metric-value">{underwriting.dscr.toFixed(2)}x</span></div>
                          </div>
                          <div className="val-uw-breakdown">
                            <div className="breakdown-section">
                              <h5>Financing</h5>
                              <div className="breakdown-row"><span>Down Payment</span><span>{formatCurrency(underwriting.downPayment)}</span></div>
                              <div className="breakdown-row"><span>Loan Amount</span><span>{formatCurrency(underwriting.loanAmount)}</span></div>
                              <div className="breakdown-row"><span>Monthly Payment</span><span>{formatCurrency(underwriting.monthlyPayment)}</span></div>
                              <div className="breakdown-row"><span>Annual Debt Service</span><span>{formatCurrency(underwriting.annualDebtService)}</span></div>
                            </div>
                            <div className="breakdown-section">
                              <h5>Income & Expenses</h5>
                              <div className="breakdown-row"><span>Gross Rental Income</span><span>{formatCurrency(underwriting.grossRent)}</span></div>
                              <div className="breakdown-row"><span>Less Vacancy ({underwriting.vacancy}%)</span><span>-{formatCurrency(underwriting.grossRent * (underwriting.vacancy / 100))}</span></div>
                              <div className="breakdown-row"><span>Effective Gross Income</span><span>{formatCurrency(underwriting.effectiveGrossIncome)}</span></div>
                              <div className="breakdown-row"><span>Operating Expenses</span><span>-{formatCurrency(underwriting.operatingExpenses)}</span></div>
                              <div className="breakdown-row highlight"><span>Net Operating Income (NOI)</span><span>{formatCurrency(underwriting.noi)}</span></div>
                            </div>
                          </div>
                        </div>
                      )}
                      {!underwriting && (
                        <div className="val-uw-empty">
                          <p>Enter a purchase price and income details to see underwriting analysis</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rent Roll Tab */}
                  {activeTab === "rentroll" && isIncomeProperty && (
                    <div className="val-rentroll-content">
                      <div className="val-rentroll-header">
                        <h4>Rent Roll</h4>
                        <button className="val-add-unit-btn" onClick={() => setShowAddUnit(true)}>+ Add Unit</button>
                      </div>
                      {rentRoll.length > 0 ? (
                        <>
                          <div className="val-rentroll-summary">
                            <div className="summary-stat"><span>Total Units</span><span>{rentRollTotals.totalUnits}</span></div>
                            <div className="summary-stat"><span>Occupied</span><span className="positive">{rentRollTotals.occupiedUnits}</span></div>
                            <div className="summary-stat"><span>Vacant</span><span className="negative">{rentRollTotals.vacantUnits}</span></div>
                            <div className="summary-stat"><span>Occupancy</span><span>{rentRollTotals.occupancyRate.toFixed(1)}%</span></div>
                            <div className="summary-stat"><span>Monthly Income</span><span>{formatCurrency(rentRollTotals.totalMonthlyRent)}</span></div>
                            <div className="summary-stat"><span>Loss to Lease</span><span className="negative">{formatCurrency(rentRollTotals.lossToLease)}/mo</span></div>
                          </div>
                          <div className="val-rentroll-table">
                            <div className="val-rentroll-row header">
                              <span>Unit</span><span>Type</span><span>Sq Ft</span><span>Rent</span><span>Market</span><span>Tenant</span><span>Lease End</span><span>Status</span><span></span>
                            </div>
                            {rentRoll.map(unit => (
                              <div key={unit.id} className="val-rentroll-row">
                                <span className="unit-num">{unit.unitNumber}</span>
                                <span>{unit.unitType}</span>
                                <span>{unit.sqft}</span>
                                <span>{formatCurrency(unit.monthlyRent)}</span>
                                <span>{formatCurrency(unit.marketRent)}</span>
                                <span>{unit.tenant || "-"}</span>
                                <span>{unit.leaseEnd || "-"}</span>
                                <span className={`status ${unit.status}`}>{unit.status}</span>
                                <button className="delete-unit" onClick={() => deleteUnit(unit.id)}>×</button>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="val-rentroll-empty">
                          <p>No units added yet. Click "+ Add Unit" to build your rent roll.</p>
                          <p className="hint">Adding units will automatically feed income data to the underwriting analysis.</p>
                        </div>
                      )}
                      {showAddUnit && (
                        <div className="val-add-unit-form">
                          <h5>Add Unit</h5>
                          <div className="add-unit-grid">
                            <input placeholder="Unit #" value={newUnit.unitNumber} onChange={(e) => setNewUnit({...newUnit, unitNumber: e.target.value})} />
                            <select value={newUnit.unitType} onChange={(e) => setNewUnit({...newUnit, unitType: e.target.value})}>
                              <option>Studio</option><option>1BR/1BA</option><option>2BR/1BA</option><option>2BR/2BA</option><option>3BR/2BA</option>
                            </select>
                            <input type="number" placeholder="Sq Ft" value={newUnit.sqft || ""} onChange={(e) => setNewUnit({...newUnit, sqft: parseInt(e.target.value)})} />
                            <input type="number" placeholder="Monthly Rent" value={newUnit.monthlyRent || ""} onChange={(e) => setNewUnit({...newUnit, monthlyRent: parseInt(e.target.value)})} />
                            <input type="number" placeholder="Market Rent" value={newUnit.marketRent || ""} onChange={(e) => setNewUnit({...newUnit, marketRent: parseInt(e.target.value)})} />
                            <input placeholder="Tenant Name" value={newUnit.tenant} onChange={(e) => setNewUnit({...newUnit, tenant: e.target.value})} />
                            <input type="date" placeholder="Lease End" value={newUnit.leaseEnd} onChange={(e) => setNewUnit({...newUnit, leaseEnd: e.target.value})} />
                            <select value={newUnit.status} onChange={(e) => setNewUnit({...newUnit, status: e.target.value as "occupied" | "vacant" | "notice"})}>
                              <option value="occupied">Occupied</option><option value="vacant">Vacant</option><option value="notice">Notice</option>
                            </select>
                          </div>
                          <div className="add-unit-actions">
                            <button className="cancel" onClick={() => setShowAddUnit(false)}>Cancel</button>
                            <button className="add" onClick={addUnit}>Add Unit</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* P&L Tab */}
                  {activeTab === "pnl" && isIncomeProperty && (
                    <div className="val-pnl-content">
                      <h4>Pro Forma P&L Statement</h4>
                      <div className="val-pnl-section income">
                        <h5>Income</h5>
                        <div className="pnl-row"><span>Gross Potential Rent</span><span>{formatCurrency(grossPotentialRent)}</span></div>
                        <div className="pnl-row negative"><span>Less: Vacancy & Loss to Lease</span><span>-{formatCurrency(vacancyLoss)}</span></div>
                        <div className="pnl-row total"><span>Effective Gross Income</span><span>{formatCurrency(effectiveGrossIncome)}</span></div>
                      </div>
                      <div className="val-pnl-section expenses">
                        <h5>Operating Expenses</h5>
                        {expenses.map(exp => (
                          <div key={exp.id} className="pnl-row editable">
                            <span>{exp.category}</span>
                            <div className="expense-inputs">
                              <input type="number" value={exp.monthly || ""} onChange={(e) => updateExpense(exp.id, "monthly", parseInt(e.target.value) || 0)} placeholder="Monthly" />
                              <span className="per-label">/mo</span>
                              <input type="number" value={exp.annual || ""} onChange={(e) => updateExpense(exp.id, "annual", parseInt(e.target.value) || 0)} placeholder="Annual" />
                              <span className="per-label">/yr</span>
                            </div>
                          </div>
                        ))}
                        <div className="pnl-row total"><span>Total Operating Expenses</span><span>-{formatCurrency(totalExpenses)}</span></div>
                      </div>
                      <div className="val-pnl-section noi">
                        <div className="pnl-row highlight"><span>Net Operating Income (NOI)</span><span>{formatCurrency(noiFromPnL)}</span></div>
                        <div className="pnl-metrics">
                          <div><span>Expense Ratio</span><span>{effectiveGrossIncome > 0 ? ((totalExpenses / effectiveGrossIncome) * 100).toFixed(1) : 0}%</span></div>
                          <div><span>Per Unit/Year</span><span>{rentRoll.length > 0 ? formatCurrency(totalExpenses / rentRoll.length) : "-"}</span></div>
                          <div><span>Per Sq Ft/Year</span><span>{rentRollTotals.totalSqft > 0 ? `$${(totalExpenses / rentRollTotals.totalSqft).toFixed(2)}` : "-"}</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Valuation Tab */}
                  {activeTab === "valuation" && valuation && (
                    <div className="val-valuation-content">
                      <div className="val-main-value">
                        <div className="val-value-card primary">
                          <span className="label">Estimated Market Value</span>
                          <span className="value">{formatCurrency(valuation.estimatedValue)}</span>
                          <div className="range">
                            <span>{formatCurrency(valuation.valueRange.low)}</span>
                            <div className="range-bar"><div className="range-fill" style={{ width: "50%" }}></div></div>
                            <span>{formatCurrency(valuation.valueRange.high)}</span>
                          </div>
                          <span className="confidence">{valuation.confidence}% Confidence</span>
                        </div>
                        {uploadedImages.length > 0 && (
                          <div className="val-condition-score">
                            <div className="score-ring">
                              <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke={valuation.conditionScore >= 70 ? "#22C55E" : valuation.conditionScore >= 50 ? "#F59E0B" : "#EF4444"} strokeWidth="8" strokeDasharray={`${valuation.conditionScore * 2.83} 283`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                              </svg>
                              <div className="score-text"><span>{valuation.conditionScore}</span><small>/100</small></div>
                            </div>
                            <span className="score-label">Condition Score</span>
                          </div>
                        )}
                      </div>
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
                      <div className="val-market-factors">
                        <h4>Market Factors</h4>
                        <ul>{valuation.marketFactors.map((factor, i) => <li key={i}>{factor}</li>)}</ul>
                      </div>
                    </div>
                  )}

                  {/* Comps Tab */}
                  {activeTab === "comps" && (
                    <div className="val-comps-content">
                      <div className="val-comps-header"><h4>Comparable Sales</h4><span>{comps.length} properties within 1.5 miles</span></div>
                      <div className="val-comps-table">
                        <div className="val-comps-row header"><span>Address</span><span>Distance</span><span>Sale Price</span><span>Date</span><span>Sq Ft</span><span>$/SF</span></div>
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
                        <div className="summary-item"><span>Average Sale Price</span><span>{formatCurrency(comps.reduce((a, b) => a + b.salePrice, 0) / comps.length)}</span></div>
                        <div className="summary-item"><span>Average $/SF</span><span>${Math.round(comps.reduce((a, b) => a + b.pricePerSqft, 0) / comps.length)}</span></div>
                        <div className="summary-item"><span>Median Sale Price</span><span>{formatCurrency(comps.sort((a, b) => a.salePrice - b.salePrice)[Math.floor(comps.length / 2)].salePrice)}</span></div>
                      </div>
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
                          <span className="roi">ROI: {((valuation.improvements.reduce((a, b) => a + b.potentialValueAdd, 0) / valuation.improvements.reduce((a, b) => a + b.estimatedCost, 0) - 1) * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="val-improvements-list">
                        {valuation.improvements.map((item, i) => (
                          <div key={i} className={`val-improvement-item priority-${item.priority}`}>
                            <div className="improvement-header"><span className="area">{item.area}</span><span className={`priority ${item.priority}`}>{item.priority}</span></div>
                            <p className="issue">{item.issue}</p>
                            <p className="recommendation">{item.recommendation}</p>
                            <div className="improvement-numbers">
                              <div><span>Est. Cost</span><span className="cost">{formatCurrency(item.estimatedCost)}</span></div>
                              <div><span>Value Add</span><span className="value-add">{formatCurrency(item.potentialValueAdd)}</span></div>
                              <div><span>ROI</span><span className="item-roi">{((item.potentialValueAdd / item.estimatedCost - 1) * 100).toFixed(0)}%</span></div>
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" /></svg>
                        <h4>Interactive Map</h4>
                        <p>View property location, nearby comps, and area amenities</p>
                        <div className="map-legend">
                          <div className="legend-item"><span className="dot subject"></span><span>Subject Property</span></div>
                          <div className="legend-item"><span className="dot comp"></span><span>Comparable Sales ({comps.length})</span></div>
                        </div>
                        <p className="map-note">Map integration available with API key</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div className="val-notes-section">
                  <h4>Notes</h4>
                  <textarea placeholder="Add notes about this property or deal..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}></textarea>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Promote to Marketplace Modal */}
      {showPromoteModal && (
        <div className="val-modal-overlay" onClick={() => setShowPromoteModal(false)}>
          <div className="val-modal" onClick={(e) => e.stopPropagation()}>
            <div className="val-modal-header"><h3>List Property for Sale</h3><button onClick={() => setShowPromoteModal(false)}>×</button></div>
            <div className="val-modal-content">
              <p>Make this property visible to buyers on the Legacy RE Marketplace.</p>
              <div className="promote-form">
                <label>Asking Price</label>
                <input type="number" placeholder="Enter asking price" value={askingPrice} onChange={(e) => setAskingPrice(e.target.value)} />
                {valuation && <p className="estimate-note">Estimated value: {formatCurrency(valuation.estimatedValue)}</p>}
              </div>
              <div className="promote-actions">
                <button className="cancel" onClick={() => setShowPromoteModal(false)}>Cancel</button>
                <button className="promote" onClick={promoteToMarketplace} disabled={!askingPrice}>List Property</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Workspaces Modal */}
      {showSavedWorkspaces && (
        <div className="val-modal-overlay" onClick={() => setShowSavedWorkspaces(false)}>
          <div className="val-modal" onClick={(e) => e.stopPropagation()}>
            <div className="val-modal-header"><h3>Saved Workspaces</h3><button onClick={() => setShowSavedWorkspaces(false)}>×</button></div>
            <div className="val-modal-content">
              {savedWorkspaces.length > 0 ? (
                <div className="val-workspaces-list">
                  {savedWorkspaces.map(workspace => (
                    <div key={workspace.id} className="val-workspace-item">
                      <div className="workspace-info" onClick={() => loadWorkspace(workspace)}>
                        <span className="workspace-name">{workspace.name} {workspace.isPublic && <span className="public-tag">On Market</span>}</span>
                        <span className="workspace-address">{workspace.address}</span>
                        <div className="workspace-meta">
                          <span>{workspace.date}</span>
                          <span>{PROPERTY_TYPES.find(t => t.id === workspace.propertyType)?.name}</span>
                          {workspace.valuation && <span className="workspace-value">{formatCurrency(workspace.valuation.estimatedValue)}</span>}
                          {!workspace.valuation && workspace.underwriting && <span className="workspace-value">NOI: {formatCurrency(workspace.underwriting.noi)}</span>}
                        </div>
                      </div>
                      <button className="workspace-delete" onClick={() => deleteWorkspace(workspace.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="val-no-workspaces"><p>No saved workspaces yet</p></div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
