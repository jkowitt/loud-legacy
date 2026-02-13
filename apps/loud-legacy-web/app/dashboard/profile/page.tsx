"use client";

import { useRallyAuth } from "@/lib/rally-auth";

export default function ProfilePage() {
  const { user } = useRallyAuth();

  return (
    <div className="rally-dash-page">
      <div className="rally-dash-welcome">
        <h1>Profile</h1>
        <p className="rally-dash-subtitle">Your Rally account details</p>
      </div>

      {/* Profile Card */}
      <div className="rally-dash-profile-card">
        <div className="rally-dash-profile-avatar">
          {user?.name?.substring(0, 2).toUpperCase()}
        </div>
        <div className="rally-dash-profile-info">
          <h2>{user?.name}</h2>
          <p className="rally-dash-profile-handle">{user?.handle || "@fan"}</p>
          <span className="rally-dash-profile-role">{user?.role}</span>
        </div>
      </div>

      {/* Account Details */}
      <div className="rally-dash-section">
        <h3>Account Details</h3>
        <div className="rally-dash-detail-grid">
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Email</span>
            <span className="rally-dash-detail-value">{user?.email}</span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Email Verified</span>
            <span className={`rally-dash-detail-value ${user?.emailVerified ? 'verified' : 'unverified'}`}>
              {user?.emailVerified ? "Verified" : "Not verified"}
            </span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Favorite School</span>
            <span className="rally-dash-detail-value">{user?.favoriteSchool || "Not selected"}</span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Supporting Schools</span>
            <span className="rally-dash-detail-value">
              {user?.supportingSchools?.length ? user.supportingSchools.join(", ") : "None"}
            </span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Points</span>
            <span className="rally-dash-detail-value">{(user?.points || 0).toLocaleString()}</span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Tier</span>
            <span className="rally-dash-detail-value">{user?.tier || "Bronze"}</span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Member Since</span>
            <span className="rally-dash-detail-value">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="rally-dash-section">
        <h3>Preferences</h3>
        <div className="rally-dash-detail-grid">
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Email Updates</span>
            <span className="rally-dash-detail-value">{user?.emailUpdates ? "Enabled" : "Disabled"}</span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Push Notifications</span>
            <span className="rally-dash-detail-value">{user?.pushNotifications ? "Enabled" : "Disabled"}</span>
          </div>
          <div className="rally-dash-detail-row">
            <span className="rally-dash-detail-label">Terms Accepted</span>
            <span className="rally-dash-detail-value">{user?.acceptedTerms ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
