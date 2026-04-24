export const BarStack = (
  data: any[],
  title: string,
  horizontal: boolean = false,
) => {
  // Expected data structure for stacking: [{ name: 'Category', value: [v1, v2, v3], seriesNames: ['S1', 'S2', 'S3'] }]
  // Or a more flat structure that we need to group.
  // For now, let's assume standard series data.

  const seriesNames = data?.[0]?.seriesNames || [];
  const categories = data?.map((d) => d.name) || [];

  const series = seriesNames.map((sname: string, idx: number) => ({
    name: sname,
    type: "bar",
    stack: "total",
    emphasis: { focus: "series" },
    data: data?.map((d) => d.value[idx]) || [],
  }));

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: horizontal
      ? { type: "value" }
      : { type: "category", data: categories },
    yAxis: horizontal
      ? { type: "category", data: categories }
      : { type: "value" },
    series: series,
    color: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"],
  };
};
