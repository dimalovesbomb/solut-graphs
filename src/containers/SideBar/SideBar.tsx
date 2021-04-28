import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import './SideBar.css';

const pieData = [
    {name: 'background', value: 400},
    {name: 'turn', value: 300},
    {name: 'hammer', value: 200},
    {name: 'drill', value: 100},
];

const COLORS = ['#42b6f5', '#0cb06f', '#ba8313', '#bd1961'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: React.FC<any> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const SideBar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__upper">
                <div className="ac">
                    <span className="ac__line"></span>
                    <span className="title">Accelerometer</span> 
                </div>
                <div className="gy">
                    <span className="gy__line"></span>
                    <span className="title">Gyroscope</span>
                </div>
            </div>
            <div className="sidebar__middle">
                <div className="background">
                    <span className="bg__figure"></span>
                    <span className="title">Background</span>
                </div>
                <div className="turn">
                    <span className="turn__figure"></span>
                    <span className="title">Turn</span>
                </div>
                <div className="hammer">
                    <span className="hammer__figure"></span>
                    <span className="title">Hammer</span>
                </div>
                <div className="drill">
                    <span className="drill__figure"></span>
                    <span className="title">Drill</span>
                </div>
            </div>
            <div className="sidebar__footer">
                <PieChart width={230} height={230}>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    );
}