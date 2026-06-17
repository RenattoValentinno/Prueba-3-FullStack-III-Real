import { useState, useEffect } from "react";

export default function PointsPage() {
  const [pointsList, setPointsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPoints = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      // Fíjate que quitamos el "http://localhost:8080" para evitar el CORS
      const response = await fetch("http://localhost:8080/api/points", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });

      // Si la ruta relativa de arriba te falla (ruta no encontrada),
      // descomenta la de abajo y comenta la de arriba:
      // const response = await fetch("http://localhost:8080/api/points", { ... });

      if (!response.ok) {
        throw new Error("No se pudo cargar la lista de puntos.");
      }

      const data = await response.json();
      setPointsList(data);
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar la lista automáticamente al abrir la página
  useEffect(() => {
    loadPoints();
  }, []);

  return (
    <main className="page">
      <div className="page-header">
        <h2>🎁 Puntos de Clientes</h2>
        <button className="btn-secondary" onClick={loadPoints} disabled={loading}>
          {loading ? "Actualizando..." : "↻ Actualizar Lista"}
        </button>
      </div>

      {error && <p className="msg msg--error">{error}</p>}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Correo del Cliente</th>
              <th>Puntos Acumulados</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="empty-row">Cargando puntos...</td></tr>
            ) : pointsList.length === 0 ? (
              <tr><td colSpan="3" className="empty-row">No hay clientes con puntos registrados.</td></tr>
            ) : (
              pointsList.map((customer) => (
                <tr key={customer.customerEmail}>
                  <td><strong>{customer.customerEmail}</strong></td>
                  <td style={{ color: '#15803d', fontWeight: 'bold' }}>
                    {customer.points}
                  </td>
                  <td>
                    <span className={`badge ${customer.points > 100 ? 'badge-COMPLETED' : 'badge-PROCESSING'}`}>
                      {customer.points > 100 ? 'VIP' : 'Estándar'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}