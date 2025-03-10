import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const entradas = [2400, 2400, 2400, 2400, 2400, 2500, 2600];
const saidas = [1400, 1400, 1400, 1400, 1400, 1400, 1400];
const lucros = [1200, 1300, 1300, 1300, 1300, 1300, 1400];
const xLabels = [
  'Setembro 2024',
  'Outubro 2024',
  'Novembro 2024',
  'Dezembro 2024',
  'Janeiro 2025',
  'Fevereiro 2025',
  'Março 2025',
];

const CadastroFinanceiro = () => {
  return (
    <LineChart
      width={900}
      height={400}
      series={[
        { data: entradas, label: 'Entradas', yAxisId: 'leftAxisId', color: 'blue' },
        { data: saidas, label: 'Saídas', yAxisId: 'rightAxisId', color: 'red' },
        { data: lucros, label: 'Lucro', yAxisId: 'leftAxisId', color: 'green' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[
        { id: 'leftAxisId' },
        { id: 'rightAxisId' },
      ]}
      rightAxis="rightAxisId"
    />
  );
}

export default CadastroFinanceiro;
