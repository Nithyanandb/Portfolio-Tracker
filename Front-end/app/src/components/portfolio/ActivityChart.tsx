// src/components/portfolio/ActivityChart.tsx
import React from 'react';
import { Area } from '@ant-design/plots';

interface ActivityChartProps {
  data: { date: string; count: number }[];
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'count',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        formatter: (v: number) => `${v} logins`,
      },
    },
    smooth: true,
    line: {
      color: '#6b7280',
    },
    areaStyle: {
      fill: 'l(270) 0:#ffffff 1:#6b7280',
    },
  };

  return <Area {...config} />;
};