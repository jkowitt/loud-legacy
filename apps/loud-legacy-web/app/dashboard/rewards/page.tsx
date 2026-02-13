"use client";

import { useRallyAuth } from "@/lib/rally-auth";

const tiers = [
  { name: "Bronze", min: 0, max: 999, color: "#D97706" },
  { name: "Silver", min: 1000, max: 2499, color: "#94A3B8" },
  { name: "Gold", min: 2500, max: 4999, color: "#F59E0B" },
  { name: "Platinum", min: 5000, max: Infinity, color: "#A78BFA" },
];

const rewards = [
  { name: "Rally T-Shirt", points: 500, tier: "Bronze", available: true },
  { name: "Team Sticker Pack", points: 250, tier: "Bronze", available: true },
  { name: "Priority Seating Upgrade", points: 1500, tier: "Silver", available: true },
  { name: "Meet & Greet Pass", points: 3000, tier: "Gold", available: true },
  { name: "Signed Jersey", points: 5000, tier: "Gold", available: false },
  { name: "VIP Gameday Experience", points: 8000, tier: "Platinum", available: false },
  { name: "Season Tickets Drawing", points: 10000, tier: "Platinum", available: false },
];

function getTierColor(tier: string) {
  return tiers.find(t => t.name === tier)?.color || "#8B95A5";
}

export default function RewardsPage() {
  const { user, trackEvent } = useRallyAuth();
  const userPoints = user?.points || 2450;
  const userTier = user?.tier || "Gold";
  const currentTier = tiers.find(t => t.name === userTier) || tiers[2];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progress = nextTier
    ? ((userPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;

  return (
    <div className="rally-dash-page">
      <div className="rally-dash-welcome">
        <h1>Rewards</h1>
        <p className="rally-dash-subtitle">Earn points, climb tiers, redeem rewards</p>
      </div>

      {/* Tier Progress */}
      <div className="rally-dash-tier-card">
        <div className="rally-dash-tier-header">
          <div>
            <span className="rally-dash-tier-name" style={{ color: currentTier.color }}>{userTier}</span>
            <span className="rally-dash-tier-points">{userPoints.toLocaleString()} points</span>
          </div>
          {nextTier && (
            <span className="rally-dash-tier-next">
              {(nextTier.min - userPoints).toLocaleString()} to {nextTier.name}
            </span>
          )}
        </div>
        <div className="rally-dash-tier-bar">
          <div className="rally-dash-tier-bar-fill" style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: currentTier.color }} />
        </div>
        <div className="rally-dash-tier-labels">
          {tiers.map((tier) => (
            <span key={tier.name} className={`rally-dash-tier-label ${tier.name === userTier ? 'active' : ''}`} style={tier.name === userTier ? { color: tier.color } : {}}>
              {tier.name}
            </span>
          ))}
        </div>
      </div>

      {/* Rewards List */}
      <div className="rally-dash-section">
        <h3>Available Rewards</h3>
        <div className="rally-dash-rewards-grid">
          {rewards.map((reward, i) => {
            const canRedeem = userPoints >= reward.points && reward.available;
            return (
              <div key={i} className={`rally-dash-reward-card ${!reward.available ? 'locked' : ''}`}>
                <div className="rally-dash-reward-header">
                  <span className="rally-dash-reward-name">{reward.name}</span>
                  <span className="rally-dash-reward-tier" style={{ color: getTierColor(reward.tier) }}>{reward.tier}+</span>
                </div>
                <span className="rally-dash-reward-points">{reward.points.toLocaleString()} pts</span>
                {canRedeem ? (
                  <button
                    className="rally-btn rally-btn--primary rally-btn--small"
                    onClick={() => trackEvent("redeem_reward", { reward: reward.name })}
                  >
                    Redeem
                  </button>
                ) : (
                  <span className="rally-dash-reward-locked">
                    {!reward.available ? "Coming Soon" : `Need ${(reward.points - userPoints).toLocaleString()} more`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Points History */}
      <div className="rally-dash-section">
        <h3>How to Earn Points</h3>
        <div className="rally-dash-earn-grid">
          {[
            { action: "Game Check-In", points: "100 pts", note: "Mobile app only" },
            { action: "Trivia (per correct)", points: "10 pts", note: "" },
            { action: "Score Prediction", points: "25 pts", note: "50 if exact" },
            { action: "Photo Challenge", points: "30 pts", note: "Mobile app only" },
            { action: "Poll Vote", points: "5 pts", note: "" },
            { action: "Referral Bonus", points: "200 pts", note: "" },
          ].map((item, i) => (
            <div key={i} className="rally-dash-earn-item">
              <span className="rally-dash-earn-action">{item.action}</span>
              <span className="rally-dash-earn-points">{item.points}</span>
              {item.note && <span className="rally-dash-earn-note">{item.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
