import { useState } from "react";
import { BD_PHONE } from "../../services/contactDetails";

const chatUrl = `https://wa.me/${BD_PHONE.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Staria Properties, I'd like to know more about your services.")}`;

export function WhatsAppButton() {
  const [showLabel, setShowLabel] = useState(true);

  return (
    <div className="whatsapp-widget">
      {showLabel && (
        <div className="whatsapp-label">
          <button type="button" className="whatsapp-dismiss" aria-label="Dismiss WhatsApp chat label" onClick={() => setShowLabel(false)}>
            <span aria-hidden="true">×</span>
          </button>
          <a href={chatUrl} target="_blank" rel="noopener noreferrer">Live Chat On WhatsApp</a>
        </div>
      )}
      <a className="whatsapp-button" href={chatUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Staria Properties on WhatsApp (opens in a new tab)">
        <svg viewBox="0 0 32 32" width="36" height="36" fill="currentColor" aria-hidden="true">
          <path d="M16 .8A15.1 15.1 0 0 0 2.9 23.4L.8 31.2l8-2.1A15.2 15.2 0 1 0 16 .8Zm0 27.5c-2.2 0-4.3-.6-6.2-1.7l-.4-.3-4.7 1.2L6 23l-.3-.5A12.4 12.4 0 1 1 16 28.3Zm6.8-9.3c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.5 1.5 3.7c.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.7.9.3 1.7.2 2.3.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.6-.5Z" />
        </svg>
      </a>
    </div>
  );
}
