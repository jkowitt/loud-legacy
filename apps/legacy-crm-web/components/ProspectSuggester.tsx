"use client";

import { FormEvent, useState } from "react";

type Suggestion = {
  name: string;
  company: string;
  title: string;
  email?: string;
  phone?: string;
  note: string;
};

type ProspectResponse = {
  suggestions: Suggestion[];
  mocked?: boolean;
};

const DEFAULT_PROMPT =
  "Looking for sustainability-focused sponsors in the Midwest with interest in stadium naming rights.";

export function ProspectSuggester() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prospects, setProspects] = useState<Suggestion[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: prompt.trim() })
      });

      if (!response.ok) {
        throw new Error(`Prospect agent unavailable (${response.status})`);
      }

      const data = (await response.json()) as ProspectResponse;
      setProspects(data.suggestions ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate prospects");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="crm-prospect-ai">
      <div className="crm-prospect-ai__intro">
        <h3>Generative prospect scout</h3>
        <p>
          Describe the customer profile you want to reach. The AI agent recommends prospects with contact info,
          reasoning, and next-step suggestions. Export directly into Contacts or Opportunities.
        </p>
      </div>

      <form className="crm-form" onSubmit={handleSubmit}>
        <label className="crm-field">
          <span>Describe your ideal prospect</span>
          <textarea
            rows={3}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Industry, geography, deal type, relationship context..."
          />
        </label>
        <div className="crm-prospect-ai__actions">
          <button type="submit" className="crm-button" disabled={loading}>
            {loading ? "Searching…" : "Generate prospects"}
          </button>
          <span className="crm-prospect-ai__hint">
            The agent references public data, VALORA ROI profiles, and past deal outcomes.
          </span>
        </div>
      </form>

      {error ? <p className="crm-prospect-ai__error">⚠️ {error}</p> : null}

      {prospects.length > 0 ? (
        <div className="crm-prospect-ai__results">
          {prospects.map((prospect) => (
            <article key={`${prospect.name}-${prospect.company}`} className="crm-prospect-ai__card">
              <header>
                <h4>{prospect.name}</h4>
                <span>{prospect.title}</span>
              </header>
              <p className="crm-prospect-ai__company">{prospect.company}</p>
              <p className="crm-prospect-ai__note">{prospect.note}</p>
              <div className="crm-prospect-ai__contact">
                {prospect.email ? <span>{prospect.email}</span> : null}
                {prospect.phone ? <span>{prospect.phone}</span> : null}
              </div>
              <div className="crm-prospect-ai__actions">
                <button type="button" className="crm-pill-button">
                  Create contact
                </button>
                <button type="button" className="crm-pill-button">
                  Add to opportunity
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
