import { Card, CardContent, Typography } from "@mui/material";

type MetricCardProps = {
  title: string;
  value: string;
  accent: string;
  design?: string;
};

export function MetricCard({ title, value, accent, design }: MetricCardProps) {
  return (
    <Card className={`${design ?? ""}`} sx={{ borderTop: `4px solid ${accent}` }}>
      <CardContent>
        <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
