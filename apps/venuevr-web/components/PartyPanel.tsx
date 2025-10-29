"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { createParty } from "../lib/api";
import styles from "./PartyPanel.module.css";

type PartyPanelProps = {
  eventId: string;
};

export function PartyPanel({ eventId }: PartyPanelProps) {
  const [name, setName] = useState("My Crew");
  const mutation = useMutation({
    mutationFn: ({ label }: { label: string }) => createParty(eventId, label)
  });

  return (
    <section className={`surface ${styles.panel}`}>
      <header>
        <h2>Party Mode</h2>
        <p>Launch a private room with positional audio and synchronized playback.</p>
      </header>

      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate({ label: name });
        }}
      >
        <label className={styles.label} htmlFor="party-name">
          Party name
        </label>
        <input
          id="party-name"
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Watch Party Name"
        />
        <button className={styles.submitButton} type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Party"}
        </button>
        {mutation.isSuccess && <p className={styles.success}>Party created. Invite your friends!</p>}
        {mutation.isError && <p className={styles.error}>Failed to create party. Try again.</p>}
      </form>
    </section>
  );
}
