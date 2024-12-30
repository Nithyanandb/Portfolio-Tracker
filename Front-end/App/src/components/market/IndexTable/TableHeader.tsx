import React from 'react';

interface TableHeaderProps {
  showMiniChart: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ showMiniChart }) => (
  <tr className="text-gray-400 text-xs">
    <th className="text-left pb-4">Index</th>
    {showMiniChart && <th className="pb-4 w-[100px]">Trend</th>}
    <th className="text-right pb-4">Last</th>
    <th className="text-right pb-4">Change</th>
    <th className="text-right pb-4">% Chg</th>
    <th className="text-right pb-4">High</th>
    <th className="text-right pb-4">Low</th>
    <th className="text-right pb-4">Time</th>
  </tr>
);