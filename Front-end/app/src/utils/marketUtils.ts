export const generateMockGraphData = (points: number, isPositive: boolean) => {
    const graphData: number[] = [];
    const timeLabels: string[] = [];
    
    const baseValue = 100;
    let currentValue = baseValue;
    
    for (let i = 0; i < points; i++) {
      const time = new Date();
      time.setHours(time.getHours() - (points - i));
      timeLabels.push(time.toLocaleTimeString());
      
      // Generate realistic-looking price movements
      const change = (Math.random() - (isPositive ? 0.3 : 0.7)) * 5;
      currentValue += change;
      currentValue = Math.max(currentValue, baseValue * 0.7); // Prevent too low values
      graphData.push(currentValue);
    }
    
    return { graphData, timeLabels };
  };