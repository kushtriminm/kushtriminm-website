export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/38349833888?text=Hello!%20I%20am%20interested%20in%20your%20travel%20offers."
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: "#22c55e",
        color: "white",
        padding: "14px 22px",
        borderRadius: "999px",
        textDecoration: "none",
        fontWeight: "bold",
        zIndex: 9999,
        boxShadow: "0 10px 25px rgba(0,0,0,.25)",
      }}
    >
      WhatsApp
    </a>
  );
}