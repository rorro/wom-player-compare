import { getMetricName, formatNumber } from "@wise-old-man/utils";

export default function BossRow({ metric, top }) {
  let metricName = metric.metric;
  try {
    metricName = getMetricName(metric.metric);
  } catch (e) {
    console.log(
      `Error getting metric name for ${metric.metric}. Wise Old Man utils package probably needs to be updated.`
    );
  }

  return (
    <tr
      className={`border-b border-gray-700 text-sm text-gray-100 ${
        top ? "bg-green-900" : ""
      }`}
    >
      <td className="p-2">
        <img src={`metrics/${metric.metric}.png`} alt={metric.metric} />
      </td>
      <td className="p-2 capitalize text-gray-300">{metricName}</td>
      <td className="p-2 text-gray-300">
        {metric.rank === -1 ? "---" : formatNumber(metric.rank)}
      </td>
      <td className="p-2 text-gray-300">
        {metric.kills === -1 ? "---" : formatNumber(metric.kills)}
      </td>
    </tr>
  );
}
