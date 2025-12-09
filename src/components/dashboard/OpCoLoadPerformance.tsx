interface OpCoPerformanceData {
  name: string;
  headers: { source: number; valid: number; loaded: number };
  lines: { source: number; valid: number; loaded: number };
  loadRate: number;
}

interface OpCoLoadPerformanceProps {
  data: OpCoPerformanceData[];
  title?: string;
}

const getLoadRateColor = (rate: number) => {
  if (rate >= 50) return "text-success";
  if (rate >= 30) return "text-warning";
  return "text-destructive";
};

export function OpCoLoadPerformance({ data, title = "Detailed Breakdown - Headers & Lines" }: OpCoLoadPerformanceProps) {
  // Calculate totals
  const totals = data.reduce(
    (acc, row) => ({
      headersSource: acc.headersSource + row.headers.source,
      headersValid: acc.headersValid + row.headers.valid,
      headersLoaded: acc.headersLoaded + row.headers.loaded,
      linesSource: acc.linesSource + row.lines.source,
      linesValid: acc.linesValid + row.lines.valid,
      linesLoaded: acc.linesLoaded + row.lines.loaded,
    }),
    { headersSource: 0, headersValid: 0, headersLoaded: 0, linesSource: 0, linesValid: 0, linesLoaded: 0 }
  );

  const totalLoadRate = totals.headersSource > 0 
    ? ((totals.headersLoaded / totals.headersSource) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
      <div className="stat-card overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">OPCO</th>
                <th colSpan={3} className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider border-l border-slate-600">HEADERS</th>
                <th colSpan={3} className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider border-l border-slate-600">LINES</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider border-l border-slate-600">LOAD RATE (SOURCE)</th>
              </tr>
              <tr className="bg-slate-600 text-white">
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase border-l border-slate-500">SOURCE</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase">VALID</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-cyan-300">LOADED</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase border-l border-slate-500">SOURCE</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase">VALID</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-cyan-300">LOADED</th>
                <th className="px-6 py-3 border-l border-slate-500"></th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {data.map((row, index) => (
                <tr key={row.name} className={`border-b border-border hover:bg-muted/20 transition-colors ${index % 2 === 0 ? 'bg-card' : 'bg-muted/5'}`}>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-center text-muted-foreground border-l border-border">{row.headers.source.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-center text-muted-foreground">{row.headers.valid.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-primary">{row.headers.loaded.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-center text-muted-foreground border-l border-border">{row.lines.source.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-center text-muted-foreground">{row.lines.valid.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-primary">{row.lines.loaded.toLocaleString()}</td>
                  <td className={`px-6 py-4 text-sm text-right font-bold border-l border-border ${getLoadRateColor(row.loadRate)}`}>
                    {row.loadRate.toFixed(2)}%
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-slate-100 dark:bg-slate-800 border-t-2 border-slate-400">
                <td className="px-6 py-4 text-sm font-bold text-foreground">TOTAL</td>
                <td className="px-6 py-4 text-sm text-center font-bold text-muted-foreground border-l border-border">{totals.headersSource.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-center font-bold text-muted-foreground">{totals.headersValid.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-center font-bold text-primary">{totals.headersLoaded.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-center font-bold text-muted-foreground border-l border-border">{totals.linesSource.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-center font-bold text-muted-foreground">{totals.linesValid.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-center font-bold text-primary">{totals.linesLoaded.toLocaleString()}</td>
                <td className={`px-6 py-4 text-sm text-right font-bold border-l border-border ${getLoadRateColor(parseFloat(totalLoadRate))}`}>
                  {totalLoadRate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}