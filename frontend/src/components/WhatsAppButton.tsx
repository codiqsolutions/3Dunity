import React from "react";
import { WhatsAppIcon } from "./icons";

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "Hello 3D Unity! I am interested in your 3D printing products and custom services.",
  phoneNumber = "8866961005",
}) => {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  const formattedNumber = cleanNumber.startsWith("91") ? cleanNumber : `91${cleanNumber}`;
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      title="Chat with 3D Unity on WhatsApp"
      aria-label="WhatsApp Chat"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
};

export default WhatsAppButton;
