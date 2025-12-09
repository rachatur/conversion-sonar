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
      <div className="stat-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">OPCO</th>
                <th colSpan={3} className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase border-l border-border">HEADERS</th>
                <th colSpan={3} className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase border-l border-border">LINES</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase border-l border-border">LOAD RATE (SOURCE)</th>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2 text-center text-xs font-medium text-muted-foreground border-l border-border">SOURCE</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-muted-foreground">VALID</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-primary">LOADED</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-muted-foreground border-l border-border">SOURCE</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-muted-foreground">VALID</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-primary">LOADED</th>
                <th className="px-4 py-2 border-l border-border"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.name} className={`border-b border-border ${index % 2 === 0 ? '' : 'bg-muted/10'}`}>
                  <td className="px-4 py-4 text-sm font-medium text-foreground">{row.name}</td>
                  <td className="px-4 py-4 text-sm text-center text-muted-foreground border-l border-border">{row.headers.source.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-center text-muted-foreground">{row.headers.valid.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-center font-medium text-primary">{row.headers.loaded.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-center text-muted-foreground border-l border-border">{row.lines.source.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-center text-muted-foreground">{row.lines.valid.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-center font-medium text-primary">{row.lines.loaded.toLocaleString()}</td>
                  <td className={`px-4 py-4 text-sm text-right font-semibold border-l border-border ${getLoadRateColor(row.loadRate)}`}>
                    {row.loadRate.toFixed(2)}%
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-muted/50 border-t-2 border-border">
                <td className="px-4 py-4 text-sm font-bold text-foreground">TOTAL</td>
                <td className="px-4 py-4 text-sm text-center font-semibold text-muted-foreground border-l border-border">{totals.headersSource.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center font-semibold text-muted-foreground">{totals.headersValid.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center font-bold text-primary">{totals.headersLoaded.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center font-semibold text-muted-foreground border-l border-border">{totals.linesSource.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center font-semibold text-muted-foreground">{totals.linesValid.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-center font-bold text-primary">{totals.linesLoaded.toLocaleString()}</td>
                <td className={`px-4 py-4 text-sm text-right font-bold border-l border-border ${getLoadRateColor(parseFloat(totalLoadRate))}`}>
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