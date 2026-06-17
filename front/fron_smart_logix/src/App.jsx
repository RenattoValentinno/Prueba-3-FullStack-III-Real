import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./pages/Login";
import ShipmentsPage from "./pages/Shipments";
import OrderPage from "./pages/Order";
import InventoryPage from "./pages/Inventory";
import { clearLogin, getSaveToken, getSaveUser } from "./service/authService";
import PointsPage from "./pages/PointsPage";
import AdminConfigPage from "./pages/AdminConfigPage";

const ShipmentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
    <rect x="9" y="11" width="14" height="10" rx="2"/>
    <circle cx="12" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
  </svg>
);

const OrderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const InventoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const PRIVATE_ROUTER = [
  { key: "shipment",  label: "Envíos",     hash: "#/shipment",  icon: <ShipmentIcon />  },
  { key: "order",     label: "Órdenes",    hash: "#/order",     icon: <OrderIcon />     },
  { key: "inventory", label: "Inventario", hash: "#/inventory", icon: <InventoryIcon /> },
  { key: "points",    label: "Puntos",     hash: "#/points",    icon: "🎁" },
  { key: "config",    label: "Configuración",  hash: "#/config",    icon: "⚙️" },
];

function getRouteFromHash() {
  return window.location.hash.replace("#/", "") || "shipment";
}

function App() {
  const [isLogin, setIsLogin] = useState(Boolean(getSaveToken()));
  const [current, setCurrent] = useState(getRouteFromHash());

  useEffect(() => {
    function onHashChange() {
      setCurrent(getRouteFromHash());
    }
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function handleLoginSucces() {
    setIsLogin(true);

    const user = getSaveUser();

    if (user?.role === "ROLE_USER") {
      window.location.hash = "#/order";
    } else {
      window.location.hash = "#/shipment";
    }
  }

  function handleLogout() {
    clearLogin();
    setIsLogin(false);
  }

  function renderPage() {
    const user = getSaveUser();

    if (user?.role === "ROLE_USER") {

      if (current === "order") {
        return <OrderPage />;
      }

      if (current === "shipment") return <ShipmentsPage />;

      return (
        <p className="loading">
          No tienes permisos para acceder a esta sección
        </p>
      );
    }

    if (current === "shipment") return <ShipmentsPage />;
    if (current === "order") return <OrderPage />;
    if (current === "inventory") return <InventoryPage />;
    if (current === "points") return <PointsPage />;
    if (current === "config") return <AdminConfigPage />;

    return <p className="loading">Ruta no encontrada</p>;
  }

  if (!isLogin) {
    return <LoginPage handleLoginSucces={handleLoginSucces} />;
  }

  const user = getSaveUser();

  const allowedRoutes =
    user?.role === "ROLE_ADMIN"
      ? PRIVATE_ROUTER
      : PRIVATE_ROUTER.filter(route => route.key === "order" || route.key === "shipment");

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span>📦</span>
          <span>SmartLogix</span>
        </div>

        <nav className="sidebar-nav">
          {allowedRoutes.map((route) => (
            <a
              key={route.key}
              href={route.hash}
              className={`nav-link ${current === route.key ? "active" : ""}`}
            >
              {route.icon}
              {route.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span className="user-role">{user?.role || "USER"}</span>
            <span className="user-name">{user?.username}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Salir</button>
        </div>
      </aside>

      <main className="app-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
