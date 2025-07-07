import React from 'react';

import type { LabMetricCardProps } from './labMetrixCard.types';

const LabMetricCard= ({
  title,
  value,
  unit,
  gradientFrom = 'from-pink-400',
  gradientTo = 'to-orange-300',
}: LabMetricCardProps) : React.ReactElement=> {
  return (
    <div
      className={`rounded-xl p-6 text-white text-center shadow-lg bg-gradient-to-br ${gradientFrom} ${gradientTo} hover:scale-102 transition duration-300`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-5xl font-bold mt-2 mb-1">{value}</p>
      <span className="text-sm">{unit}</span>
    </div>
  );
};

export default LabMetricCard;
