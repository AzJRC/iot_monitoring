import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const socket = io("http://localhost:2357");

const MonitorWindow = () => {
  return (
    <div>
        <RealtimeChart />
    </div>
  )
}

const RealtimeChart = () => {
    const [dataPoints, setDataPoints] = useState('');

    useEffect(() => {
        socket.on('temperature', (data) => {
            // setDataPoints(currentPoints => [...currentPoints, data])
            setDataPoints(data);
        })
    },[])

    // const chartData = {
    //     labels: dataPoints.map
    // }

    return (<p>{dataPoints}</p>)
}

export default MonitorWindow;
