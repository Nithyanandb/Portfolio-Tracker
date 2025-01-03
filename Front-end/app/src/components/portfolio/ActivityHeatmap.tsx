import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface ActivityHeatmapProps {
  data: { date: string; count: number }[];
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ data }) => {
  return (
    <CalendarHeatmap
      startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // Last 1 year
      endDate={new Date()}
      values={data}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-custom-${Math.min(value.count, 4)}`; // Scale counts to 4 levels
      }}
      tooltipDataAttrs={(value) => ({
        'data-tooltip': value
          ? `${value.date}: ${value.count} login${value.count !== 1 ? 's' : ''}`
          : 'No data',
      })}
      showWeekdayLabels={true}
      onClick={(value) => {
        if (value) {
          alert(`Week of ${value.date}: ${value.count} logins`);
        }
      }}
    />
  );
};