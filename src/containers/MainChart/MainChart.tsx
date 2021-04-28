import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { XY } from '../..';

type MainChartProps = {
    data: XY[];
    hasRightAc: boolean;
    hasRightGy: boolean;
};

export const MainChart: React.FC<MainChartProps> = ({data, hasRightAc, hasRightGy}) => {
    return (
        <LineChart data={data} width={1000} height={600}>
            {hasRightAc && <Line type="monotone" dataKey="rightAc" stroke="#bd1f17" isAnimationActive={false} dot={false} />}
            {hasRightGy && <Line type="monotone" dataKey="rightGy" stroke="#f5ed00" isAnimationActive={false} dot={false} />}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="x" interval="preserveStartEnd" />
            <YAxis />
        </LineChart>
    );
}