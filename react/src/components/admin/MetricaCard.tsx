import React from "react";

interface CardMetricaProps {
  icon: React.ReactNode;
  titulo: string;
  valor: string | number;
  detalhes?: string;
}

const CardMetrica: React.FC<CardMetricaProps> = ({ icon, titulo, valor, detalhes }) => (
  <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-rosa-choque">{icon}</span>
      <h3 className="font-bold text-lg">{titulo}</h3>
    </div>
    <p className="text-3xl font-bold">{valor}</p>
    {detalhes && <p className="text-sm opacity-75 mt-1">{detalhes}</p>}
  </div>
);

export default CardMetrica;