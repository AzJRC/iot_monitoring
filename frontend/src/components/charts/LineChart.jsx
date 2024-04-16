import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useDevicesData from "../../hooks/useDevicesData";
import React, { useEffect, useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MAX_LENGTH = 10;

const LineChart = () => { //{ data, options }

    const { data } = useDevicesData()

    const [dataLocalMem, setDataLocalMem] = useState({ value: [], timestamp: [] });
    const associatedDevice = 'pub/test' //Prop

    useEffect(() => {
        const devicesData = data[associatedDevice];
        const newValue = devicesData?.value;
        const newTimestamp = devicesData?.timestamp;
        if (newValue && newTimestamp) {
            // Update local state while limiting the array length to MAX_LENGTH
            console.log(newValue, newTimestamp)
            setDataLocalMem(prevState => {
                const newValueArray = [...prevState.value.slice(-MAX_LENGTH + 1), newValue];
                const newTimestampArray = [...prevState.timestamp.slice(-MAX_LENGTH + 1), newTimestamp];
                return { value: newValueArray, timestamp: newTimestampArray };
            });
        }     
        console.log(dataLocalMem)
    }, [data]);
    
    const lineChartData = {
        labels: dataLocalMem.timestamp,
        datasets: [
          {
              label: 'Temperature',
              data: dataLocalMem.value,
              fill: false,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'transparent',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 3,
              pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
              pointHoverBorderWidth: 10,
              lineTension: 0,
          }
        ]
    }

    const lineChartOptions = {
        pluggins: {
            legend: true,
        },
        scales: {
            y: {
                min: 0,
                max: 60
            }
        }
    }

	return <Line 
        data={lineChartData} 
        options={lineChartOptions}
        width={1000}
    >
    </Line>
};

export default LineChart;
