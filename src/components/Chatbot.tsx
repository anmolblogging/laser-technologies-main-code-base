// Chatbot.tsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

// Update this to your WhatsApp number
const WHATSAPP_LINK = "https://wa.me/9100000000";

const Chatbot: React.FC = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="
      fixed bottom-6 right-6 z-50
      flex items-center justify-center
      w-14 h-14
      bg-[#25D366]
      hover:bg-[#1ebe53]
      shadow-xl
      transition-all duration-200
      ring-1 ring-white/10
      outline-none
      "
    style={{
      borderRadius: "50%",
      boxShadow: "0 5px 32px 0 rgba(0,0,0,0.33)"
    }}
  >
    <FaWhatsapp className="w-8 h-8" color="#fff" />
  </a>
);

export default Chatbot;
