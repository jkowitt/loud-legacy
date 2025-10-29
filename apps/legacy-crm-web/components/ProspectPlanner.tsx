"use client";

import { useMemo, useState } from "react";

const DEFAULTS = {
  salesGoal: 250000,
  averageDeal: 35000,
  winRate: 28,
  currentPipeline: 125000,
  coverageRatio: 3
};

const toNumber = (value: string, fallback: number) => {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};

export function ProspectPlanner() {
  const [salesGoal, setSalesGoal] = useState(DEFAULTS.salesGoal);
  const [averageDeal, setAverageDeal] = useState(DEFAULTS.averageDeal);
  const [winRate, setWinRate] = useState(DEFAULTS.winRate);
  const [currentPipeline, setCurrentPipeline] = useState(DEFAULTS.currentPipeline);
  const [coverageRatio, setCoverageRatio] = useState(DEFAULTS.coverageRatio);

  const metrics = useMemo(() => {
    const rate = Math.max(winRate, 1) / 100;
    const effectiveAverage = Math.max(averageDeal, 1);
    const expectedPerOpp = effectiveAverage * rate;

    const currentExpected = Math.max(currentPipeline, 0) * rate;
    const gap = Math.max(salesGoal - currentExpected, 0);
    const requiredClosed = Math.ceil(gap / effectiveAverage) || 0;
    const requiredOpportunities = Math.ceil(gap / expectedPerOpp) || 0;
    const recommendedProspects = Math.ceil(requiredOpportunities * Math.max(coverageRatio, 1));

    return {
      expectedPerOpp,
      currentExpected,
      gap,
      requiredClosed,
      requiredOpportunities,
      recommendedProspects
    };
  }, [averageDeal, coverageRatio, currentPipeline, salesGoal, winRate]);

  return (
    <div className="crm-prospect">
      <div className="crm-prospect__intro">
        <h3>Prospect coverage planner</h3>
        <p>
          Plug in your revenue target and pipeline metrics to see how many qualified prospects you need to hit
          goal. Adjust win rate, deal value, and coverage ratio to match your playbook.
        </p>
      </div>

      <form className="crm-form" onSubmit={(event) => event.preventDefault()}>
        <div className="crm-form__grid">
          <label className="crm-field">
            <span>Sales goal (expected revenue)</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={salesGoal}
              onChange={(event) => setSalesGoal(toNumber(event.target.value, salesGoal))}
            />
          </label>
          <label className="crm-field">
            <span>Average deal value</span>
            <input
              type="number"
              min={1}
              step={500}
              value={averageDeal}
              onChange={(event) => setAverageDeal(toNumber(event.target.value, averageDeal))}
            />
          </label>
          <label className="crm-field">
            <span>Win rate (%)</span>
            <input
              type="number"
              min={1}
              max={100}
              step={1}
              value={winRate}
              onChange={(event) => setWinRate(toNumber(event.target.value, winRate))}
            />
          </label>
          <label className="crm-field">
            <span>Current open pipeline</span>
            <input
              type="number"
              min={0}
              step={500}
              value={currentPipeline}
              onChange={(event) => setCurrentPipeline(toNumber(event.target.value, currentPipeline))}
            />
          </label>
          <label className="crm-field">
            <span>Coverage ratio</span>
            <input
              type="number"
              min={1}
              step={0.5}
              value={coverageRatio}
              onChange={(event) => setCoverageRatio(toNumber(event.target.value, coverageRatio))}
            />
            <small>Recommended opportunities per target closed deal (default 3x).</small>
          </label>
        </div>
      </form>

      <div className="crm-prospect__results">
        <div className="crm-prospect__stat">
          <strong>${metrics.gap.toLocaleString()}</strong>
          <span>Revenue gap after current pipeline impact</span>
        </div>
        <div className="crm-prospect__stat">
          <strong>{metrics.requiredClosed}</strong>
          <span>Closed deals needed</span>
        </div>
        <div className="crm-prospect__stat">
          <strong>{metrics.requiredOpportunities}</strong>
          <span>Qualified opportunities required</span>
        </div>
        <div className="crm-prospect__stat highlight">
          <strong>{metrics.recommendedProspects}</strong>
          <span>Prospects to source with {coverageRatio.toFixed(1)}x coverage</span>
        </div>
      </div>

      <ul className="crm-prospect__notes">
        <li>
          Expected revenue per opportunity:{" "}
          <strong>${Math.round(metrics.expectedPerOpp).toLocaleString()}</strong>
        </li>
        <li>
          Current pipeline contributes ~
          <strong> ${Math.round(metrics.currentExpected).toLocaleString()}</strong> based on win rate.
        </li>
        <li>Export these numbers into the Activities board to spin up follow-up cadences automatically.</li>
      </ul>
    </div>
  );
}
