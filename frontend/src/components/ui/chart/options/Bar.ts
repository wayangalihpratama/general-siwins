export const Bar = (
  data: any[],
  title: string,
  horizontal: boolean = false,
) => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: "{b}: {c}",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      top: "10%",
      containLabel: true,
    },
    xAxis: horizontal
      ? { type: "value" }
      : {
          type: "category",
          data: data?.map((d) => d.name) || [],
          axisLabel: { interval: 0, rotate: 30 },
        },
    yAxis: horizontal
      ? {
          type: "category",
          data: data?.map((d) => d.name) || [],
        }
      : { type: "value" },
    series: [
      {
        name: title,
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: "#3b82f6",
        },
        data: data?.map((d) => d.value) || [],
      },
    ],
  };
};
