export const Line = (data: any[], title: string) => {
  return {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data?.map((d) => d.name) || [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: title,
        type: "line",
        smooth: true,
        itemStyle: {
          color: "#3b82f6",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(59, 130, 246, 0.5)" },
              { offset: 1, color: "rgba(59, 130, 246, 0)" },
            ],
          },
        },
        data: data?.map((d) => d.value) || [],
      },
    ],
  };
};
