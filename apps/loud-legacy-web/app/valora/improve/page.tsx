"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

interface UploadedPhoto {
  id: string;
  file: string;
  name: string;
  area: string;
  isAnalyzing: boolean;
  analysis: PhotoAnalysis | null;
}

interface PhotoAnalysis {
  overallScore: number;
  condition: "excellent" | "good" | "fair" | "poor";
  issues: string[];
  improvements: Improvement[];
  estimatedValueImpact: number;
}

interface Improvement {
  title: string;
  description: string;
  estimatedCost: { low: number; high: number };
  potentialROI: number;
  priority: "high" | "medium" | "low";
  timeframe: string;
}

const AREA_OPTIONS = [
  { id: "exterior-front", name: "Exterior - Front" },
  { id: "exterior-back", name: "Exterior - Back" },
  { id: "exterior-side", name: "Exterior - Side" },
  { id: "roof", name: "Roof" },
  { id: "kitchen", name: "Kitchen" },
  { id: "bathroom", name: "Bathroom" },
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "basement", name: "Basement" },
  { id: "garage", name: "Garage" },
  { id: "landscaping", name: "Landscaping" },
  { id: "other", name: "Other" },
];

// Simulated AI analysis results
const generateAnalysis = (area: string): PhotoAnalysis => {
  const analyses: Record<string, PhotoAnalysis> = {
    "exterior-front": {
      overallScore: 68,
      condition: "fair",
      issues: ["Faded exterior paint", "Dated front door", "Basic landscaping", "Missing house numbers"],
      improvements: [
        { title: "Fresh Exterior Paint", description: "Repaint the front facade with modern neutral colors. Consider a contrasting accent color for the front door.", estimatedCost: { low: 3500, high: 6000 }, potentialROI: 150, priority: "high", timeframe: "3-5 days" },
        { title: "New Front Door", description: "Replace with a modern fiberglass or steel entry door with decorative glass.", estimatedCost: { low: 1500, high: 3000 }, potentialROI: 200, priority: "high", timeframe: "1 day" },
        { title: "Landscape Enhancement", description: "Add foundation plantings, mulch beds, and seasonal flowers for curb appeal.", estimatedCost: { low: 2000, high: 5000 }, potentialROI: 120, priority: "medium", timeframe: "2-3 days" },
        { title: "Exterior Lighting", description: "Install modern outdoor sconces and path lighting for safety and aesthetics.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 180, priority: "medium", timeframe: "1 day" },
      ],
      estimatedValueImpact: 18500,
    },
    "kitchen": {
      overallScore: 55,
      condition: "fair",
      issues: ["Outdated cabinets", "Old countertops", "Basic appliances", "Poor lighting"],
      improvements: [
        { title: "Cabinet Refacing", description: "Replace cabinet doors and hardware with modern shaker-style fronts in white or gray.", estimatedCost: { low: 4000, high: 8000 }, potentialROI: 175, priority: "high", timeframe: "3-5 days" },
        { title: "Quartz Countertops", description: "Install durable quartz countertops in a neutral pattern. Include new sink and faucet.", estimatedCost: { low: 3500, high: 6000 }, potentialROI: 160, priority: "high", timeframe: "2-3 days" },
        { title: "Stainless Appliances", description: "Upgrade to matching stainless steel appliances for a cohesive modern look.", estimatedCost: { low: 3000, high: 7000 }, potentialROI: 130, priority: "medium", timeframe: "1 day" },
        { title: "Under-Cabinet Lighting", description: "Add LED under-cabinet lighting and update overhead fixtures.", estimatedCost: { low: 500, high: 1200 }, potentialROI: 220, priority: "medium", timeframe: "1 day" },
        { title: "Tile Backsplash", description: "Install a modern subway or mosaic tile backsplash.", estimatedCost: { low: 800, high: 2000 }, potentialROI: 190, priority: "low", timeframe: "1-2 days" },
      ],
      estimatedValueImpact: 35000,
    },
    "bathroom": {
      overallScore: 62,
      condition: "fair",
      issues: ["Dated vanity", "Old fixtures", "Basic tile", "Inadequate storage"],
      improvements: [
        { title: "New Vanity", description: "Install a modern floating vanity with quartz top and undermount sink.", estimatedCost: { low: 1500, high: 3000 }, potentialROI: 165, priority: "high", timeframe: "1-2 days" },
        { title: "Updated Fixtures", description: "Replace faucets, showerhead, and hardware with brushed nickel or matte black.", estimatedCost: { low: 400, high: 900 }, potentialROI: 200, priority: "high", timeframe: "1 day" },
        { title: "Tile Refresh", description: "Re-grout existing tile or install new floor tile. Consider a tile accent wall.", estimatedCost: { low: 1000, high: 3500 }, potentialROI: 145, priority: "medium", timeframe: "2-3 days" },
        { title: "Mirror & Lighting", description: "Install a frameless mirror with integrated LED lighting.", estimatedCost: { low: 300, high: 800 }, potentialROI: 210, priority: "medium", timeframe: "1 day" },
      ],
      estimatedValueImpact: 12000,
    },
    "roof": {
      overallScore: 72,
      condition: "good",
      issues: ["Minor wear visible", "Some debris accumulation", "Gutters need cleaning"],
      improvements: [
        { title: "Professional Cleaning", description: "Power wash roof and clean gutters. Remove moss and debris.", estimatedCost: { low: 300, high: 600 }, potentialROI: 180, priority: "high", timeframe: "1 day" },
        { title: "Gutter Guards", description: "Install gutter guards to prevent debris buildup and reduce maintenance.", estimatedCost: { low: 800, high: 1800 }, potentialROI: 120, priority: "medium", timeframe: "1 day" },
        { title: "Seal & Repair", description: "Seal any minor cracks and repair damaged shingles to extend roof life.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 150, priority: "medium", timeframe: "1-2 days" },
      ],
      estimatedValueImpact: 5000,
    },
    "default": {
      overallScore: 65,
      condition: "fair",
      issues: ["General wear and tear", "Dated finishes", "Deferred maintenance"],
      improvements: [
        { title: "Deep Cleaning", description: "Professional deep cleaning and staging to present the space at its best.", estimatedCost: { low: 200, high: 500 }, potentialROI: 300, priority: "high", timeframe: "1 day" },
        { title: "Fresh Paint", description: "Apply fresh paint in modern neutral tones.", estimatedCost: { low: 500, high: 1500 }, potentialROI: 250, priority: "high", timeframe: "1-2 days" },
        { title: "Update Fixtures", description: "Replace dated light fixtures and hardware with modern alternatives.", estimatedCost: { low: 300, high: 800 }, potentialROI: 200, priority: "medium", timeframe: "1 day" },
      ],
      estimatedValueImpact: 8000,
    },
  };

  return analyses[area] || analyses["default"];
};

export default function ImproveBuildingValuePage() {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedPhoto | null>(null);
  const [selectedArea, setSelectedArea] = useState("exterior-front");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto: UploadedPhoto = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file: event.target.result as string,
            name: file.name,
            area: selectedArea,
            isAnalyzing: true,
            analysis: null,
          };
          setPhotos(prev => [...prev, newPhoto]);

          // Simulate AI analysis
          setTimeout(() => {
            setPhotos(prev => prev.map(p =>
              p.id === newPhoto.id
                ? { ...p, isAnalyzing: false, analysis: generateAnalysis(p.area) }
                : p
            ));
          }, 2500);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const totalValueImpact = photos.reduce((sum, p) => sum + (p.analysis?.estimatedValueImpact || 0), 0);
  const totalInvestment = photos.reduce((sum, p) =>
    sum + (p.analysis?.improvements.reduce((s, i) => s + i.estimatedCost.low, 0) || 0), 0);

  return (
    <main className="valora-dashboard-page">
      <Header />

      {/* Page Header */}
      <section className="val-dash-header">
        <div className="container">
          <div className="val-dash-header-content">
            <div>
              <div className="val-breadcrumb">
                <Link href="/valora">Legacy RE</Link>
                <span>/</span>
                <span>Improve Building Value</span>
              </div>
              <h1>AI Property Improvement Analyzer</h1>
              <p>Upload photos to get AI-powered renovation recommendations and ROI estimates</p>
            </div>
            <div className="val-dash-actions">
              <Link href="/valora/dashboard" className="val-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="val-improve-main">
        <div className="container">
          <div className="val-improve-layout">
            {/* Upload Panel */}
            <div className="val-improve-upload-panel">
              <div className="val-improve-upload-card">
                <h3>Upload Property Photos</h3>
                <p>Add photos of different areas of your property for AI analysis</p>

                <div className="val-improve-area-select">
                  <label>Select Area</label>
                  <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                    {AREA_OPTIONS.map(area => (
                      <option key={area.id} value={area.id}>{area.name}</option>
                    ))}
                  </select>
                </div>

                <div className="val-improve-dropzone" onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="dropzone-text">Drop photos here or click to upload</span>
                  <span className="dropzone-hint">PNG, JPG up to 10MB each</span>
                </div>

                {/* Uploaded Photos */}
                {photos.length > 0 && (
                  <div className="val-improve-photo-list">
                    <h4>Uploaded Photos ({photos.length})</h4>
                    {photos.map(photo => (
                      <div key={photo.id} className={`val-improve-photo-item ${selectedPhoto?.id === photo.id ? "selected" : ""}`} onClick={() => !photo.isAnalyzing && setSelectedPhoto(photo)}>
                        <div className="photo-thumb">
                          <img src={photo.file} alt={photo.name} />
                          {photo.isAnalyzing && <div className="analyzing-overlay"><span className="spinner"></span></div>}
                        </div>
                        <div className="photo-info">
                          <span className="photo-area">{AREA_OPTIONS.find(a => a.id === photo.area)?.name}</span>
                          <span className="photo-status">{photo.isAnalyzing ? "Analyzing..." : `Score: ${photo.analysis?.overallScore}/100`}</span>
                        </div>
                        <button className="photo-delete" onClick={(e) => { e.stopPropagation(); deletePhoto(photo.id); }}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary Card */}
              {photos.length > 0 && photos.some(p => p.analysis) && (
                <div className="val-improve-summary-card">
                  <h4>Analysis Summary</h4>
                  <div className="val-improve-summary-stats">
                    <div className="summary-stat">
                      <span className="stat-label">Areas Analyzed</span>
                      <span className="stat-value">{photos.filter(p => p.analysis).length}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-label">Est. Investment</span>
                      <span className="stat-value">{formatCurrency(totalInvestment)}</span>
                    </div>
                    <div className="summary-stat highlight">
                      <span className="stat-label">Potential Value Add</span>
                      <span className="stat-value">{formatCurrency(totalValueImpact)}</span>
                    </div>
                  </div>
                  <p className="summary-note">Connect with vetted contractors to get quotes</p>
                  <button className="val-improve-contractors-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    Find Contractors (Coming Soon)
                  </button>
                </div>
              )}
            </div>

            {/* Analysis Panel */}
            <div className="val-improve-analysis-panel">
              {!selectedPhoto ? (
                <div className="val-improve-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                  <h3>Upload Photos to Get Started</h3>
                  <p>Our AI will analyze your property photos and provide detailed improvement recommendations with cost estimates and ROI projections.</p>
                  <div className="val-improve-features">
                    <div className="feature">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                      <span>AI-Powered Analysis</span>
                    </div>
                    <div className="feature">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                      <span>Cost Estimates</span>
                    </div>
                    <div className="feature">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>
                      <span>ROI Projections</span>
                    </div>
                  </div>
                </div>
              ) : selectedPhoto.analysis ? (
                <div className="val-improve-analysis">
                  <div className="val-improve-analysis-header">
                    <div className="analysis-image">
                      <img src={selectedPhoto.file} alt="Property" />
                    </div>
                    <div className="analysis-overview">
                      <h3>{AREA_OPTIONS.find(a => a.id === selectedPhoto.area)?.name}</h3>
                      <div className="condition-badge" data-condition={selectedPhoto.analysis.condition}>
                        {selectedPhoto.analysis.condition.charAt(0).toUpperCase() + selectedPhoto.analysis.condition.slice(1)} Condition
                      </div>
                      <div className="score-display">
                        <div className="score-ring">
                          <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke={selectedPhoto.analysis.overallScore >= 70 ? "#22C55E" : selectedPhoto.analysis.overallScore >= 50 ? "#F59E0B" : "#EF4444"} strokeWidth="8" strokeDasharray={`${selectedPhoto.analysis.overallScore * 2.83} 283`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                          </svg>
                          <div className="score-text">{selectedPhoto.analysis.overallScore}</div>
                        </div>
                        <span className="score-label">Condition Score</span>
                      </div>
                    </div>
                  </div>

                  <div className="val-improve-issues">
                    <h4>Issues Identified</h4>
                    <ul>
                      {selectedPhoto.analysis.issues.map((issue, i) => (
                        <li key={i}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                          </svg>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="val-improve-recommendations">
                    <div className="recommendations-header">
                      <h4>Recommended Improvements</h4>
                      <span className="value-impact">Potential Value Add: <strong>{formatCurrency(selectedPhoto.analysis.estimatedValueImpact)}</strong></span>
                    </div>
                    <div className="recommendations-list">
                      {selectedPhoto.analysis.improvements.map((improvement, i) => (
                        <div key={i} className={`recommendation-card priority-${improvement.priority}`}>
                          <div className="recommendation-header">
                            <h5>{improvement.title}</h5>
                            <span className={`priority-badge ${improvement.priority}`}>{improvement.priority}</span>
                          </div>
                          <p>{improvement.description}</p>
                          <div className="recommendation-metrics">
                            <div className="metric">
                              <span className="label">Est. Cost</span>
                              <span className="value">{formatCurrency(improvement.estimatedCost.low)} - {formatCurrency(improvement.estimatedCost.high)}</span>
                            </div>
                            <div className="metric">
                              <span className="label">ROI</span>
                              <span className="value positive">{improvement.potentialROI}%</span>
                            </div>
                            <div className="metric">
                              <span className="label">Timeframe</span>
                              <span className="value">{improvement.timeframe}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="val-improve-analyzing">
                  <div className="analyzing-spinner"></div>
                  <h3>Analyzing Photo...</h3>
                  <p>Our AI is examining the image for improvement opportunities</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
