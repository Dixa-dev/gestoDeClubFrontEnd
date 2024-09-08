import { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


// Colores para las diferentes secciones del gráfico
const COLORS = ['green',  'red'];

// Función para personalizar las etiquetas
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class CuotasPorMes extends PureComponent {
  state = {
    data: [], // Inicialmente los datos estarán vacíos
  };

  componentDidMount() {
    // Aquí deberías hacer la consulta a tu API para obtener los datos
    fetch('https://gestor-de-club.vercel.app/api/estadisticas')
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
      });
      ;
   ;
   
      
  }

  render() {
    return (
        <>
        <h2>Estadisticas de cuotas pagas al dia</h2>
        <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={this.state.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel} // Usar etiquetas personalizadas
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {this.state.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        
      <h2 >color verde cuotas pagas</h2>
      <h2>color rojo cuotas no pagas</h2>
        </>
      
    );
  }
}
