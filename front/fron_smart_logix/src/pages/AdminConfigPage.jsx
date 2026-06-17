import { useState, useEffect } from "react";

export default function AdminConfigPage() {
  const [config, setConfig] = useState({
    pesosPorPunto: 100,
    cantidadMinDescuento: 15,
    porcentajeDescuento: 5,
    envioGratisMinimo: 50000,
  });

  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem("app_business_config");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: Number(value) });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("app_business_config", JSON.stringify(config));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <main className="page">
      <div className="page-header">
        <h2>⚙️ Panel de Configuración Global (Admin)</h2>
      </div>

      <form onSubmit={handleSave} className="form-card" style={{ maxWidth: "600px" }}>
        {guardado && (
          <p className="msg msg--success" style={{ background: "#dcfce7", color: "#15803d", padding: "10px", borderRadius: "5px" }}>
            ¡Configuración guardada correctamente en el sistema!
          </p>
        )}

        <h3 style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "5px", color: "#3b82f6", marginTop: "10px" }}>
          🎁 Sistema de Puntos e Incentivos
        </h3>
        <div className="form-grid" style={{ marginBottom: "25px" }}>
          <label>
            Pesos requeridos para ganar 1 punto ($)
            <input
              type="number"
              name="pesosPorPunto"
              value={config.pesosPorPunto}
              onChange={handleChange}
              min="1"
            />
          </label>
        </div>

        <h3 style={{ borderBottom: "2px solid #10b981", paddingBottom: "5px", color: "#10b981" }}>
          📈 Reglas de Descuento por Volumen
        </h3>
        <div className="form-grid" style={{ marginBottom: "25px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <label>
            Cantidad mínima de ítems (Bloque)
            <input
              type="number"
              name="cantidadMinDescuento"
              value={config.cantidadMinDescuento}
              onChange={handleChange}
              min="1"
            />
          </label>
          <label>
            Porcentaje de descuento por bloque (%)
            <input
              type="number"
              name="porcentajeDescuento"
              value={config.porcentajeDescuento}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </label>
        </div>

        <h3 style={{ borderBottom: "2px solid #f59e0b", paddingBottom: "5px", color: "#f59e0b" }}>
          🚚 Logística y Distribución
        </h3>
        <div className="form-grid" style={{ marginBottom: "25px" }}>
          <label>
            Monto mínimo para Envío Gratis ($)
            <input
              type="number"
              name="envioGratisMinimo"
              value={config.envioGratisMinimo}
              onChange={handleChange}
              min="0"
            />
          </label>
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "10px" }}>
          💾 Guardar Configuración del Negocio
        </button>
      </form>
    </main>
  );
}