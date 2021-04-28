import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MainChart } from './containers/MainChart/MainChart';
import { SideBar } from './containers/SideBar/SideBar';
import 'regenerator-runtime';
import './index.css';

export type XY = {
    x: string | number;
    rightAc?: number;
    rightGy?: number;
}

const App: React.FC = () => {
    const [hasRightAc, setHasRightAc] = useState(false);
    const [hasRightGy, setHasRightGy] = useState(false);
    const [data, setData] = useState<XY[]>([]);
    useEffect(() => {
        // setInterval(getStuff, 1000);
        getStuff();
    }, []);

    const getStuff = async () => {
        const startDate = new Date().setSeconds(new Date().getSeconds() - 10);
        const endDate = Date.now();
        
        const data = await fetch(`http://localhost:8080/get/all?startDate=${Math.trunc(startDate / 1000)}&endDate=${Math.trunc(endDate / 1000)}`, {
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json());

        const rightAcEx = data.graphs.rightAc.data.map((obj: {x: number, y: number}) => {
            return {x: obj.x, rightAc: obj.y};
        });

        const rightGyEx = data.graphs.rightGy.data.map((obj: {x: number, y: number}) => {
            return {x: obj.x, rightGy: obj.y};
        });
        
        const arrResult = rightAcEx.map((value: XY) => {
            const found = rightGyEx.find((obj: XY) => obj.x === value.x);
            if (found) {
                const timeString = `${new Date(found.x).toLocaleTimeString()}`;
                return {
                    x: timeString,
                    rightAc: value.rightAc,
                    rightGy: found.rightGy
                }
            }
            return null;
          }).filter((obj: XY) => obj);
          
        setHasRightAc(() => Boolean(rightAcEx.length));
        setHasRightGy(() => Boolean(rightGyEx.length));
        
        setData(() => arrResult);
    }
    return (
        <div className="container">
            <MainChart data={data} hasRightAc={hasRightAc} hasRightGy={hasRightGy} />
            <SideBar />
        </div>
    )
}


ReactDOM.render(<App />, 
    document.querySelector('#app')
);
