"use client";

import { useRallyAuth } from "@/lib/rally-auth";

const triviaQuestions = [
  { q: "Which school has won the most NCAA basketball championships?", options: ["UCLA", "Kentucky", "Duke", "North Carolina"], answer: 0 },
  { q: "What year was the first NCAA tournament held?", options: ["1939", "1945", "1952", "1960"], answer: 0 },
  { q: "Which conference has the most tournament wins?", options: ["Big Ten", "ACC", "SEC", "Big 12"], answer: 1 },
];

const liveGame = {
  home: "Rally U Ralliers",
  away: "Gonzaga Bulldogs",
  homeScore: 45,
  awayScore: 42,
  period: "2nd Half",
  clock: "12:34",
  venue: "Rally Arena",
  sport: "Basketball",
};

const upcomingGames = [
  { home: "Rally U Ralliers", away: "Kent State Golden Flashes", date: "Sat, Feb 15", time: "7:00 PM", venue: "Rally Stadium", sport: "Football" },
  { home: "Rally U Ralliers", away: "Duke Blue Devils", date: "Mon, Feb 17", time: "8:30 PM", venue: "Rally Arena", sport: "Basketball" },
  { home: "Ohio State Buckeyes", away: "Rally U Ralliers", date: "Sat, Feb 22", time: "3:30 PM", venue: "Ohio Stadium", sport: "Football" },
];

export default function GamedayPage() {
  const { trackEvent } = useRallyAuth();

  return (
    <div className="rally-dash-page">
      <div className="rally-dash-welcome">
        <h1>Gameday</h1>
        <p className="rally-dash-subtitle">Games, trivia, predictions, and more</p>
      </div>

      {/* Live Game */}
      <div className="rally-dash-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 2s infinite' }} />
          <h3 style={{ margin: 0 }}>Live Now</h3>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginLeft: '4px' }}>{liveGame.sport}</span>
        </div>
        <div className="rally-dash-game-card" style={{ border: '1px solid rgba(255,107,53,0.4)', background: 'rgba(255,107,53,0.08)' }}>
          <div className="rally-dash-game-teams" style={{ fontSize: '18px', fontWeight: 600 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span className="rally-dash-team">{liveGame.home}</span>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#FF6B35' }}>{liveGame.homeScore}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span className="rally-dash-vs">vs</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{liveGame.period} &middot; {liveGame.clock}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span className="rally-dash-team">{liveGame.away}</span>
              <span style={{ fontSize: '32px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{liveGame.awayScore}</span>
            </div>
          </div>
          <div className="rally-dash-game-details">
            <span>{liveGame.venue}</span>
          </div>
        </div>
      </div>

      {/* Upcoming Games */}
      <div className="rally-dash-section">
        <h3>Upcoming Games</h3>
        <div className="rally-dash-games-list">
          {upcomingGames.map((game, i) => (
            <div key={i} className="rally-dash-game-card">
              <div className="rally-dash-game-teams">
                <span className="rally-dash-team">{game.home}</span>
                <span className="rally-dash-vs">vs</span>
                <span className="rally-dash-team">{game.away}</span>
              </div>
              <div className="rally-dash-game-details">
                <span>{game.sport} &middot; {game.date} &middot; {game.time}</span>
                <span>{game.venue}</span>
              </div>
              <div className="rally-dash-game-actions">
                <span className="rally-dash-mobile-only">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  Check-in on mobile
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trivia */}
      <div className="rally-dash-section">
        <h3>Trivia Challenge</h3>
        <p className="rally-dash-subtitle">Answer correctly to earn points!</p>
        <div className="rally-dash-trivia-list">
          {triviaQuestions.map((q, i) => (
            <div key={i} className="rally-dash-trivia-card">
              <p className="rally-dash-trivia-q">{q.q}</p>
              <div className="rally-dash-trivia-options">
                {q.options.map((opt, j) => (
                  <button
                    key={j}
                    className="rally-dash-trivia-opt"
                    onClick={() => trackEvent("trivia_answer", { question: String(i), answer: String(j) })}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div className="rally-dash-section">
        <h3>Score Predictions</h3>
        <p className="rally-dash-subtitle">Predict the final score for bonus points</p>
        <div className="rally-dash-prediction-card">
          <div className="rally-dash-prediction-matchup">
            <div className="rally-dash-prediction-team">
              <span>Rally U</span>
              <input type="number" className="rally-dash-prediction-input" placeholder="0" min="0" max="200" />
            </div>
            <span className="rally-dash-vs">vs</span>
            <div className="rally-dash-prediction-team">
              <span>Gonzaga</span>
              <input type="number" className="rally-dash-prediction-input" placeholder="0" min="0" max="200" />
            </div>
          </div>
          <button
            className="rally-btn rally-btn--primary"
            onClick={() => trackEvent("prediction_submit", { game: "Rally U vs Gonzaga" })}
          >
            Submit Prediction (+25 pts)
          </button>
        </div>
      </div>

      {/* Mobile-only Features Notice */}
      <div className="rally-dash-mobile-notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div>
          <h4>More features on the Rally mobile app</h4>
          <p>Check-in, noise meter, live polls, and photo challenges are available exclusively on the mobile app.</p>
        </div>
      </div>
    </div>
  );
}
