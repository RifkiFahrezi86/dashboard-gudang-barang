"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartItem = {
  label: string;
  value: number;
};

export default function Chart({ data }: { data: ChartItem[] }) {
  return (
    <section className="chart-box">
      <div className="chart-header">
        <h3>Stok Barang</h3>
        <span>Realtime dari database</span>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty">
          Belum ada data stok
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            barSize={28}   // 🔥 ramping
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{ fill: "#c7d2fe", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: "#fff",
              }}
            />

            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[10, 10, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}



    </section>

    
  );
  
}
