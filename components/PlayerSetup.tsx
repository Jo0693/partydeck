"use client";

import { useState } from "react";
import { usePartyStore, Sex } from "@/lib/state";

export default function PlayerSetup() {
  const { players, addPlayer, removePlayer, currentIndex } = usePartyStore();
  const [name, setName] = useState("");
  const [sex, setSex] = useState<Sex>("H");
  const [age, setAge] = useState<number>(25);

  const submit = () => {
    if (!name.trim()) return;
    addPlayer({
      name: name.trim(),
      sex,
      age: Math.max(0, Math.min(120, age || 0)),
    });
    setName("");
  };

  return (
    <div className="pd-player-setup">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.6fr) 80px 80px 110px",
          gap: "0.4rem",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="pd-input"
        />
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value as Sex)}
          className="pd-select"
        >
          <option value="H">H</option>
          <option value="F">F</option>
          <option value="X">X</option>
        </select>
        <input
          type="number"
          min={0}
          max={120}
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value || "0", 10))}
          className="pd-input"
        />
        <button onClick={submit} className="pd-btn-primary">
          + Ajouter
        </button>
      </div>

      <div style={{ marginTop: "0.75rem" }} className="pd-player-chips">
        {players.length === 0 && (
          <span style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>
            Ajoute des participants pour suivre les tours.
          </span>
        )}
        {players.map((p, i) => (
          <span
            key={p.id}
            className={
              "pd-player-chip" +
              (i === currentIndex ? " pd-player-chip--active" : "")
            }
          >
            {p.name} · {p.sex} · {p.age}
            <button
              className="pd-player-remove"
              onClick={() => removePlayer(p.id)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
