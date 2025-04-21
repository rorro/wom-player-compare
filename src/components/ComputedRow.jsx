import { getMetricName, formatNumber } from "@wise-old-man/utils";

export default function ComputedRow({ metric, top }) {
  return (
    <tr
      className={`border-b border-gray-700 text-sm text-gray-100 ${
        top ? "bg-green-900" : ""
      }`}
    >
      <td className="p-2">
        <img src={`metrics/${metric.metric}.png`} alt={metric.metric} />
      </td>
      <td className="p-2 capitalize text-gray-300">
        {getMetricName(metric.metric)}
      </td>
      <td className="p-2 text-gray-300">
        {metric.rank === -1 ? "---" : formatNumber(metric.rank)}
      </td>
      <td className="p-2 text-gray-300">
        {metric.value === -1 ? "---" : formatNumber(metric.value)}
      </td>
    </tr>
  );
}
