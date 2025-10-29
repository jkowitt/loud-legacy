/* eslint-disable react/no-array-index-key */
"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AskResponse = {
  reply: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  mocked?: boolean;
};

const starterPrompts = [
  "Help me price a premium tier for my subscription box.",
  "Draft a 90-day launch plan for a bookkeeping service.",
  "What metrics should I review before pitching investors?"
];

const initialAssistantMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I’m Business Now, your always-on operator coach. Share your goal or paste notes, and I’ll help you turn them into clear next steps."
};

export function AskBusinessNow() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestions = useMemo(() => starterPrompts.slice(0, 3), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: input.trim() } as ChatMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ask-business-now", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: nextMessages })
      });

      if (!response.ok) {
        throw new Error(`Advisor unavailable (${response.status})`);
      }

      const data = (await response.json()) as AskResponse;
      const reply = data.reply?.trim();

      if (!reply) {
        throw new Error("Advisor returned an empty response");
      }

      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Advisor request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat">
      <div>
        <h3>Ask Business Now (beta)</h3>
        <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
          Generative advisor that pulls from your workspace context. Responses surface next steps, templates,
          and metrics to track.
        </p>
      </div>
      <div className="chat__messages" aria-live="polite">
        {messages.map((message, index) => (
          <div key={index} className={`chat__bubble chat__bubble--${message.role}`}>
            <span>{message.content}</span>
          </div>
        ))}
        {loading ? (
          <div className="chat__bubble chat__bubble--assistant">
            <span>Thinking through your request…</span>
          </div>
        ) : null}
      </div>

      <form className="chat__form" onSubmit={handleSubmit}>
        <label className="chat__label" htmlFor="ask-business-now-input">
          Describe what you&apos;re working on
        </label>
        <textarea
          id="ask-business-now-input"
          className="chat__input"
          rows={4}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="E.g. I need a launch playbook for a B2B SaaS idea targeting real estate teams."
        />
        <div className="chat__actions">
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Generating..." : "Get guidance"}
          </button>
          <p className="chat__hint">Responses adapt based on your dashboard, templates, and financial data.</p>
        </div>
      </form>

      {error ? <p className="chat__error">⚠️ {error}</p> : null}

      <div className="chat__suggestions">
        <span>Try:</span>
        {suggestions.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="chat__suggestion"
            onClick={() => setInput(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
