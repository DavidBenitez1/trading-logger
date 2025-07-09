import { useState } from "react";

const LOCAL_STORAGE_KEY = "trades";

export default function TradeLogger() {
  const [form, setForm] = useState({
    date: "",
    timeframeD: "",
    timeframeH4: "",
    timeframeH1: "",
    fractalPhase: "",
    fractalType: "",
    fractalPosition: "",
    patternTimeframe: "",
    entryPattern: "",
    slPoints: "",
    tpPoints: "",
    riskPercentage: "",
    entryReason: "",
    decisionType: "",
    entryTime: "",
    beforeImg: null,
    afterImg: null,
  });

  const [trades, setTrades] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleFileChange = (key, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, [key]: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const newTrades = [...trades, form];
    setTrades(newTrades);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTrades));
    setForm({
      date: "",
      timeframeD: "",
      timeframeH4: "",
      timeframeH1: "",
      fractalPhase: "",
      fractalType: "",
      fractalPosition: "",
      patternTimeframe: "",
      entryPattern: "",
      slPoints: "",
      tpPoints: "",
      riskPercentage: "",
      entryReason: "",
      decisionType: "",
      entryTime: "",
      beforeImg: null,
      afterImg: null,
    });
  };

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Registro de Trade</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Fecha" type="date" value={form.date} onChange={e => handleChange("date", e.target.value)} />

        <Input label="Horario de Entrada" type="time" value={form.entryTime} onChange={e => handleChange("entryTime", e.target.value)} />
        
        <Select label="D - Temporalidad Diaria" value={form.timeframeD} options={["Alcista", "Bajista"]} onChange={val => handleChange("timeframeD", val)} />
        <Select label="4H - Temporalidad" value={form.timeframeH4} options={["Alcista", "Bajista"]} onChange={val => handleChange("timeframeH4", val)} />
        <Select label="1H - Temporalidad" value={form.timeframeH1} options={["Alcista", "Bajista"]} onChange={val => handleChange("timeframeH1", val)} />

        <Select label="Fase Estructural" value={form.fractalPhase} options={["Acumulación", "Provocación", "Barrido", "Movimiento Real"]} onChange={val => handleChange("fractalPhase", val)} />

        <Select label="Fractal" value={form.fractalType} options={["Continuidad", "Corrección", "Rompimiento de Estructura"]} onChange={val => handleChange("fractalType", val)} />

        <Select label="¿Dónde estás parado?" value={form.fractalPosition} options={["Inicio", "Mitad", "Finalización"]} onChange={val => handleChange("fractalPosition", val)} />

        <Select label="Temporalidad del Patrón" value={form.patternTimeframe} options={["D", "4H", "1H", "30m", "15m"]} onChange={val => handleChange("patternTimeframe", val)} />

        <Select label="Patrón de Entrada" value={form.entryPattern} options={["OB", "Original/Decisional", "FVG", "Breaker", "Mitigation", "MTR", "Imbalance", "Flash", "Liquidez Oculta", "IFVG"]} onChange={val => handleChange("entryPattern", val)} />

        <Input label="Puntos del SL" type="number" value={form.slPoints} onChange={e => handleChange("slPoints", e.target.value)} />
        <Input label="Puntos del TP" type="number" value={form.tpPoints} onChange={e => handleChange("tpPoints", e.target.value)} />
        <Input label="Porcentaje Arriesgado" type="number" value={form.riskPercentage} onChange={e => handleChange("riskPercentage", e.target.value)} />

        <Select label="¿Cuál es la intención del movimiento?" value={form.entryReason} options={["Barrer varios stop", "Provocación emocional", "Validación de entrada"]} onChange={val => handleChange("entryReason", val)} />

        <Select label="La decisión es..." value={form.decisionType} options={["Intuitiva", "Lógica", "Emocional"]} onChange={val => handleChange("decisionType", val)} />
        
        <Input label="Captura ANTES" type="file" onChange={e => handleFileChange("beforeImg", e.target.files[0])} />
        <Input label="Captura DESPUÉS" type="file" onChange={e => handleFileChange("afterImg", e.target.files[0])} />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Guardar Trade</button>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input className="w-full border rounded p-2" {...props} />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select className="w-full border rounded p-2" value={value} onChange={e => onChange(e.target.value)}>
        <option value="">Seleccionar</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
