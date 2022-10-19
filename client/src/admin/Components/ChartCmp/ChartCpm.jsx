import './ChartCmp.css';
import { LineChart, Line, XAxis, CartesianGrid, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({ title, data, dataKey, grid }) {
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <Tooltip />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
