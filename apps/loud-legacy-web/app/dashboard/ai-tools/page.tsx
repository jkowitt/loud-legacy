"use client";

import { useState } from "react";

export default function AIToolsPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!imageUrl) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      // First upload the image
      const formData = new FormData();
      if (selectedImage) {
        formData.append('file', selectedImage);
        formData.append('folder', 'properties');

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadData = await uploadResponse.json();

        // Then analyze it
        const analyzeResponse = await fetch('/api/ai/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageUrl: uploadData.file.url,
          }),
        });

        if (!analyzeResponse.ok) {
          throw new Error('Failed to analyze image');
        }

        const analyzeData = await analyzeResponse.json();
        setAnalysis(analyzeData.analysis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>AI Tools</h1>
          <p>Use AI to analyze properties and get intelligent recommendations</p>
        </div>
      </div>

      <div className="ai-tools-grid">
        <div className="ai-tool-card">
          <div className="tool-header">
            <h2>📸 Image Analysis</h2>
            <p>Upload property photos to analyze condition and identify issues</p>
          </div>

          <div className="tool-content">
            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="image-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload" className="upload-button">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                ) : (
                  <div className="upload-placeholder">
                    <div style={{ fontSize: '3rem' }}>📁</div>
                    <p>Click to upload property image</p>
                  </div>
                )}
              </label>
            </div>

            {error && (
              <div className="error-message">{error}</div>
            )}

            {imageUrl && (
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="button button--primary"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {loading ? 'Analyzing...' : '🤖 Analyze with AI'}
              </button>
            )}

            {analysis && (
              <div className="analysis-results">
                <h3>Analysis Results</h3>

                <div className="result-section">
                  <h4>Condition Score</h4>
                  <div className="condition-score">
                    <div className="score-circle">
                      {analysis.conditionScore}/100
                    </div>
                  </div>
                </div>

                {analysis.issues && analysis.issues.length > 0 && (
                  <div className="result-section">
                    <h4>Issues Identified</h4>
                    <ul className="issues-list">
                      {analysis.issues.map((issue: any, index: number) => (
                        <li key={index} className={`issue-${issue.severity}`}>
                          <strong>{issue.type}:</strong> {issue.description}
                          <span className={`severity severity-${issue.severity}`}>
                            {issue.severity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.recommendations && analysis.recommendations.length > 0 && (
                  <div className="result-section">
                    <h4>Recommendations</h4>
                    <ul className="recommendations-list">
                      {analysis.recommendations.map((rec: any, index: number) => (
                        <li key={index}>
                          <span className={`priority priority-${rec.priority}`}>
                            {rec.priority}
                          </span>
                          <strong>{rec.recommendation}</strong>
                          <div className="rec-details">
                            <span>Cost: {rec.estimatedCost}</span>
                            <span>Value Increase: {rec.valueIncrease}</span>
                            <span>Timeline: {rec.timeline}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="ai-tool-card">
          <div className="tool-header">
            <h2>📍 Smart Geocoding</h2>
            <p>Extract location information from property photos</p>
          </div>
          <div className="tool-content">
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              Upload an image above and we'll identify visible addresses and location clues
            </p>
          </div>
        </div>

        <div className="ai-tool-card">
          <div className="tool-header">
            <h2>💡 Property Recommendations</h2>
            <p>Get AI-powered suggestions to improve property value</p>
          </div>
          <div className="tool-content">
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              Select a property to generate improvement recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
