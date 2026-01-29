"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Portfolio data - starts empty for user to add their own
const properties: { id: number; name: string; type: string; address: string; value: number; sqft: number; capRate: number; status: string; change: number }[] = [];

const recentDeals: { id: number; name: string; type: string; value: number; date: string; status: string }[] = [];

const marketTrends = [
  { sector: "Office", trend: "stable", change: 0, forecast: "neutral" },
  { sector: "Multifamily", trend: "stable", change: 0, forecast: "neutral" },
  { sector: "Industrial", trend: "stable", change: 0, forecast: "neutral" },
  { sector: "Retail", trend: "stable", change: 0, forecast: "neutral" },
];

const tasks: { id: number; title: string; property: string; due: string; priority: string }[] = [];

// Saved Analysis Interface
interface SavedAnalysis {
  id: string;
  date: string;
  images: string[];
  result: AIAnalysisResult;
  propertyName?: string;
}

// AI Analysis Result Interface
interface AIAnalysisResult {
  overallCondition: string;
  conditionScore: number;
  exteriorFindings: string[];
  interiorFindings: string[];
  estimatedValue: number;
  valueRange: { low: number; high: number };
  confidence: number;
  marketFactors: string[];
  recommendations: string[];
}

export default function ValoraDashboard() {
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [analysisType, setAnalysisType] = useState<"exterior" | "interior" | "both">("both");
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [showSavedAnalyses, setShowSavedAnalyses] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalPortfolioValue = properties.reduce((sum, p) => sum + p.value, 0);
  const totalSqft = properties.reduce((sum, p) => sum + p.sqft, 0);
  const avgCapRate = (properties.reduce((sum, p) => sum + p.capRate, 0) / properties.length).toFixed(1);
  const activeDeals = recentDeals.filter(d => d.status !== "closed").length;

  const filteredProperties = propertyFilter === "all"
    ? properties
    : properties.filter(p => p.type.toLowerCase() === propertyFilter.toLowerCase());

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

  const runAIAnalysis = async () => {
    if (uploadedImages.length === 0) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockResult: AIAnalysisResult = {
      overallCondition: "Good",
      conditionScore: 78,
      exteriorFindings: [
        "Roof appears in good condition with no visible damage",
        "Exterior walls show minor weathering, recommend repainting within 2 years",
        "Windows are double-pane, energy efficient",
        "Landscaping well-maintained, curb appeal above average",
        "Parking lot surface shows some wear, may need resealing"
      ],
      interiorFindings: [
        "Flooring in common areas shows moderate wear",
        "HVAC system appears well-maintained",
        "Lighting fixtures are modern and energy-efficient",
        "Paint and finishes are in good condition",
        "No visible signs of water damage or structural issues"
      ],
      estimatedValue: 4250000,
      valueRange: { low: 3900000, high: 4600000 },
      confidence: 85,
      marketFactors: [
        "Strong rental demand in area (+3.2% YoY)",
        "Recent comparable sales support valuation",
        "Interest rates currently at 7.25%",
        "Local employment growth positive",
        "New development nearby may impact future value"
      ],
      recommendations: [
        "Schedule professional roof inspection before acquisition",
        "Budget $45,000 for exterior repainting in capital plan",
        "Consider parking lot resurfacing ($25,000 estimate)",
        "Property positioned well for value-add opportunity",
        "Recommend proceeding with due diligence"
      ]
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setUploadedImages([]);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setPropertyName("");
    setSaveSuccess(false);
  };

  const saveAnalysis = () => {
    if (!analysisResult) return;

    const newAnalysis: SavedAnalysis = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      images: uploadedImages,
      result: analysisResult,
      propertyName: propertyName || "Untitled Property"
    };

    setSavedAnalyses(prev => [newAnalysis, ...prev]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const deleteAnalysis = (id: string) => {
    setSavedAnalyses(prev => prev.filter(a => a.id !== id));
  };

  const openNewAnalysis = () => {
    resetAnalysis();
    setShowAIAnalysis(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "commercial":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="val-type-svg">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
          </svg>
        );
      case "multifamily":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="val-type-svg">
            <path d="M3 21h18M9 21V8l6-4v17M3 21V10l6-2" />
            <path d="M13 10h.01M13 14h.01M13 18h.01M5 14h.01M5 18h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "retail":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="val-type-svg">
            <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path d="M3 9l2.45-4.9A2 2 0 017.24 3h9.52a2 2 0 011.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
        );
      case "industrial":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="val-type-svg">
            <path d="M2 20h20M4 20V8l5 4V8l5 4V4h6v16" />
            <path d="M17 10h.01M17 14h.01M17 18h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="val-type-svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↑";
      case "down": return "↓";
      default: return "→";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "#22C55E";
      case "down": return "#EF4444";
      default: return "#64748B";
    }
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
                <span>Dashboard</span>
              </div>
              <h1>Portfolio Intelligence</h1>
              <p>Real-time insights for smarter real estate decisions.</p>
            </div>
            <div className="val-dash-actions">
              {savedAnalyses.length > 0 && (
                <button
                  className="val-dash-btn secondary"
                  onClick={() => setShowSavedAnalyses(!showSavedAnalyses)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                  Saved ({savedAnalyses.length})
                </button>
              )}
              <button className="val-dash-btn primary" onClick={openNewAnalysis}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Property Analysis Section */}
      <section className="val-ai-analysis-section">
        <div className="container">
          <div className="val-ai-toggle-card" onClick={() => setShowAIAnalysis(!showAIAnalysis)}>
            <div className="val-ai-toggle-content">
              <div className="val-ai-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73v1.54a7 7 0 015.73 5.73h1.54A2 2 0 0122 12a2 2 0 01-1.73 3h-1.54a7 7 0 01-5.73 5.73v1.54A2 2 0 0112 22a2 2 0 01-1-3.73v-1.54a7 7 0 01-5.73-5.73H3.73A2 2 0 012 12a2 2 0 013-1.73V8.73A7 7 0 0110.73 3V1.73A2 2 0 0112 2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="val-ai-toggle-text">
                <h3>AI Property Analysis</h3>
                <p>Upload property photos for AI-powered condition assessment and fair market value prediction</p>
              </div>
              <div className="val-ai-toggle-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showAIAnalysis ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {showAIAnalysis && (
            <div className="val-ai-panel">
              {!analysisResult ? (
                <div className="val-ai-upload-section">
                  <div className="val-ai-upload-header">
                    <h4>Upload Property Photos</h4>
                    <div className="val-ai-type-selector">
                      {(["exterior", "interior", "both"] as const).map(type => (
                        <button
                          key={type}
                          className={`val-ai-type-btn ${analysisType === type ? "active" : ""}`}
                          onClick={() => setAnalysisType(type)}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className="val-ai-dropzone"
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
                    <div className="val-ai-dropzone-content">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17,8 12,3 7,8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span>Drop photos here or click to upload</span>
                      <small>Support JPG, PNG up to 10MB each</small>
                    </div>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="val-ai-uploaded-images">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="val-ai-image-preview">
                          <img src={img} alt={`Upload ${index + 1}`} />
                          <button
                            className="val-ai-image-remove"
                            onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadedImages.length > 0 && (
                    <div className="val-ai-actions">
                      <button className="val-ai-btn secondary" onClick={resetAnalysis}>
                        Clear All
                      </button>
                      <button
                        className="val-ai-btn primary"
                        onClick={runAIAnalysis}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <span className="val-ai-spinner"></span>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                              <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73v1.54a7 7 0 015.73 5.73h1.54A2 2 0 0122 12a2 2 0 01-1.73 3h-1.54a7 7 0 01-5.73 5.73v1.54A2 2 0 0112 22a2 2 0 01-1-3.73v-1.54a7 7 0 01-5.73-5.73H3.73A2 2 0 012 12a2 2 0 013-1.73V8.73A7 7 0 0110.73 3V1.73A2 2 0 0112 2z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            Run AI Analysis
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="val-ai-results">
                  <div className="val-ai-results-header">
                    <h4>AI Analysis Results</h4>
                    <button className="val-ai-btn secondary small" onClick={resetAnalysis}>
                      New Analysis
                    </button>
                  </div>

                  {/* Condition Score */}
                  <div className="val-ai-score-section">
                    <div className="val-ai-score-card">
                      <div className="val-ai-score-ring">
                        <svg viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={analysisResult.conditionScore >= 70 ? "#22C55E" : analysisResult.conditionScore >= 50 ? "#F59E0B" : "#EF4444"}
                            strokeWidth="8"
                            strokeDasharray={`${analysisResult.conditionScore * 2.83} 283`}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="val-ai-score-value">
                          <span>{analysisResult.conditionScore}</span>
                          <small>/100</small>
                        </div>
                      </div>
                      <div className="val-ai-score-label">
                        <span className="condition">{analysisResult.overallCondition}</span>
                        <span className="confidence">{analysisResult.confidence}% Confidence</span>
                      </div>
                    </div>

                    <div className="val-ai-value-card">
                      <div className="val-ai-value-main">
                        <span className="label">Estimated Fair Market Value</span>
                        <span className="value">${(analysisResult.estimatedValue / 1000000).toFixed(2)}M</span>
                      </div>
                      <div className="val-ai-value-range">
                        <span>${(analysisResult.valueRange.low / 1000000).toFixed(2)}M</span>
                        <div className="val-ai-range-bar">
                          <div className="val-ai-range-indicator" style={{ left: '50%' }}></div>
                        </div>
                        <span>${(analysisResult.valueRange.high / 1000000).toFixed(2)}M</span>
                      </div>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="val-ai-findings-grid">
                    <div className="val-ai-findings-card">
                      <h5>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        Exterior Analysis
                      </h5>
                      <ul>
                        {analysisResult.exteriorFindings.map((finding, i) => (
                          <li key={i}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="val-ai-findings-card">
                      <h5>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18M9 21V9" />
                        </svg>
                        Interior Analysis
                      </h5>
                      <ul>
                        {analysisResult.interiorFindings.map((finding, i) => (
                          <li key={i}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Market Factors & Recommendations */}
                  <div className="val-ai-findings-grid">
                    <div className="val-ai-findings-card market">
                      <h5>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                        </svg>
                        Market Factors
                      </h5>
                      <ul>
                        {analysisResult.marketFactors.map((factor, i) => (
                          <li key={i}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="val-ai-findings-card recommendations">
                      <h5>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                          <polyline points="22,4 12,14.01 9,11.01" />
                        </svg>
                        AI Recommendations
                      </h5>
                      <ul>
                        {analysisResult.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="val-ai-save-section">
                    <input
                      type="text"
                      placeholder="Property name (optional)"
                      value={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                      className="val-ai-property-input"
                    />
                    {saveSuccess && (
                      <span className="val-ai-save-success">Analysis saved!</span>
                    )}
                  </div>

                  <div className="val-ai-result-actions">
                    <button className="val-ai-btn secondary" onClick={resetAnalysis}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      New Analysis
                    </button>
                    <button className="val-ai-btn primary" onClick={saveAnalysis}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Save to Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Saved Analyses Modal */}
      {showSavedAnalyses && savedAnalyses.length > 0 && (
        <div className="val-saved-modal-overlay" onClick={() => setShowSavedAnalyses(false)}>
          <div className="val-saved-modal" onClick={(e) => e.stopPropagation()}>
            <div className="val-saved-modal-header">
              <h3>Saved Analyses</h3>
              <button className="val-saved-close" onClick={() => setShowSavedAnalyses(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="val-saved-list">
              {savedAnalyses.map((analysis) => (
                <div key={analysis.id} className="val-saved-item">
                  <div className="val-saved-thumbnail">
                    {analysis.images[0] ? (
                      <img src={analysis.images[0]} alt="Property" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
                      </svg>
                    )}
                  </div>
                  <div className="val-saved-info">
                    <span className="val-saved-name">{analysis.propertyName}</span>
                    <span className="val-saved-date">{analysis.date}</span>
                    <div className="val-saved-stats">
                      <span>Score: {analysis.result.conditionScore}/100</span>
                      <span>Value: ${(analysis.result.estimatedValue / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>
                  <button
                    className="val-saved-delete"
                    onClick={() => deleteAnalysis(analysis.id)}
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <section className="val-dash-stats">
        <div className="container">
          <div className="val-dash-stats-grid">
            <div className="val-dash-stat">
              <div className="val-dash-stat-icon emerald">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">${(totalPortfolioValue / 1000000).toFixed(0)}M</span>
                <span className="val-dash-stat-label">Portfolio Value</span>
              </div>
            </div>

            <div className="val-dash-stat">
              <div className="val-dash-stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">{(totalSqft / 1000).toFixed(0)}K</span>
                <span className="val-dash-stat-label">Total Sq Ft</span>
              </div>
            </div>

            <div className="val-dash-stat">
              <div className="val-dash-stat-icon amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">{avgCapRate}%</span>
                <span className="val-dash-stat-label">Avg Cap Rate</span>
              </div>
            </div>

            <div className="val-dash-stat">
              <div className="val-dash-stat-icon violet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">{activeDeals}</span>
                <span className="val-dash-stat-label">Active Deals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="val-dash-main">
        <div className="container">
          <div className="val-dash-layout">
            {/* Properties Table */}
            <div className="val-dash-card full-width">
              <div className="val-dash-card-header">
                <h3>Property Portfolio</h3>
                <div className="val-property-filters">
                  {["all", "commercial", "multifamily", "retail", "industrial"].map((filter) => (
                    <button
                      key={filter}
                      className={`val-filter-btn ${propertyFilter === filter ? "active" : ""}`}
                      onClick={() => setPropertyFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="val-properties-table">
                {filteredProperties.length > 0 ? (
                  <>
                    <div className="val-properties-header">
                      <span>Property</span>
                      <span>Type</span>
                      <span>Value</span>
                      <span>Sq Ft</span>
                      <span>Cap Rate</span>
                      <span>Change</span>
                      <span>Status</span>
                    </div>
                    {filteredProperties.map((property) => (
                      <div key={property.id} className="val-property-row">
                        <div className="val-property-info">
                          <div className="val-property-icon">{getTypeIcon(property.type)}</div>
                          <div>
                            <span className="val-property-name">{property.name}</span>
                            <span className="val-property-address">{property.address}</span>
                          </div>
                        </div>
                        <span className="val-property-type">{property.type}</span>
                        <span className="val-property-value">${(property.value / 1000000).toFixed(1)}M</span>
                        <span className="val-property-sqft">{(property.sqft / 1000).toFixed(0)}K</span>
                        <span className="val-property-cap">{property.capRate}%</span>
                        <span className={`val-property-change ${property.change >= 0 ? "positive" : "negative"}`}>
                          {property.change >= 0 ? "+" : ""}{property.change}%
                        </span>
                        <span className={`val-property-status ${property.status}`}>
                          {property.status === "active" ? "Active" : "Under Review"}
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="val-empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
                    </svg>
                    <p>No properties yet</p>
                    <span>Add your first property to start building your portfolio</span>
                  </div>
                )}
              </div>
              <Link href="/valora/properties" className="val-view-all-btn">
                View All Properties
              </Link>
            </div>

            {/* Recent Deals */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Recent Deals</h3>
                <Link href="/valora/deals" className="val-dash-link">View All</Link>
              </div>
              <div className="val-deals-list">
                {recentDeals.length > 0 ? (
                  recentDeals.map((deal) => (
                    <div key={deal.id} className="val-deal-row">
                      <div className="val-deal-info">
                        <span className="val-deal-name">{deal.name}</span>
                        <span className="val-deal-date">{deal.date}</span>
                      </div>
                      <div className="val-deal-meta">
                        <span className="val-deal-type">{deal.type}</span>
                        <span className="val-deal-value">${(deal.value / 1000000).toFixed(1)}M</span>
                      </div>
                      <span className={`val-deal-status ${deal.status}`}>
                        {deal.status === "closed" ? "Closed" : deal.status === "pending" ? "Pending" : "In Progress"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="val-empty-state-sm">
                    <p>No deals yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Market Trends */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Market Trends</h3>
                <Link href="/valora/market" className="val-dash-link">Full Report</Link>
              </div>
              <div className="val-trends-list">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="val-trend-row">
                    <span className="val-trend-sector">{trend.sector}</span>
                    <div className="val-trend-indicator">
                      <span
                        className="val-trend-arrow"
                        style={{ color: getTrendColor(trend.trend) }}
                      >
                        {getTrendIcon(trend.trend)}
                      </span>
                      <span
                        className="val-trend-change"
                        style={{ color: getTrendColor(trend.trend) }}
                      >
                        {trend.change > 0 ? "+" : ""}{trend.change}%
                      </span>
                    </div>
                    <span className={`val-trend-forecast ${trend.forecast}`}>
                      {trend.forecast.charAt(0).toUpperCase() + trend.forecast.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Action Items</h3>
                <button className="val-add-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
              <div className="val-tasks-list">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div key={task.id} className="val-task-row">
                      <div className="val-task-checkbox">
                        <input type="checkbox" />
                      </div>
                      <div className="val-task-info">
                        <span className="val-task-title">{task.title}</span>
                        <span className="val-task-property">{task.property}</span>
                      </div>
                      <div className="val-task-meta">
                        <span className="val-task-due">{task.due}</span>
                        <span className={`val-task-priority ${task.priority}`}>{task.priority}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="val-empty-state-sm">
                    <p>No action items</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tools */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Analysis Tools</h3>
              </div>
              <div className="val-quick-tools">
                <button className="val-quick-tool">
                  <div className="val-tool-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 20V10M12 20V4M6 20v-6" />
                    </svg>
                  </div>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Valuation Model</span>
                    <span className="val-tool-desc">Run DCF analysis</span>
                  </div>
                </button>
                <button className="val-quick-tool">
                  <div className="val-tool-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                    </svg>
                  </div>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Comp Analysis</span>
                    <span className="val-tool-desc">Find comparables</span>
                  </div>
                </button>
                <button className="val-quick-tool">
                  <div className="val-tool-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                    </svg>
                  </div>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Market Map</span>
                    <span className="val-tool-desc">Location insights</span>
                  </div>
                </button>
                <button className="val-quick-tool">
                  <div className="val-tool-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Report Builder</span>
                    <span className="val-tool-desc">Generate reports</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
