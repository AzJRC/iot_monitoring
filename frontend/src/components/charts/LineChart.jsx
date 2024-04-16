import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import useDevicesData from "../../hooks/useDevicesData";
import React, { useEffect, useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Legend, Tooltip );



const LineChart = ( {device, lineLabel = 'values', maxLength = 10, yRange = [0, null], chartTitle = ''} ) => { //{ data, options }

    // Declarations

    const MAX_LENGTH = maxLength;

    const { data } = useDevicesData()

    const [dataLocalMem, setDataLocalMem] = useState({ localValues: [], localLabels: [] });
    const [labelsAreTimestamps, setLabelsAreTimestamps] = useState(false);
    const [labels, setLabels] = useState(0);
    const [minimumValue, setMinimumValue] = useState(Infinity);
    const [maximumValue, setMaximumValue] = useState(-Infinity);
    
    // useEffects

    useEffect(() => {
        const devicesData = data[device];
        const newValue = devicesData?.value;
        
        if (newValue && labels !== null) {
            let updatedLabels;
            if (labelsAreTimestamps) {
                updatedLabels = devicesData?.timestamp;
            } else {
                updatedLabels = labels + 1;
                setLabels(prevLabels => prevLabels + 1);
            }
            // Update local state while limiting the array length to MAX_LENGTH
            setDataLocalMem(prevState => {
                const newValueArray = [...prevState.localValues.slice(-MAX_LENGTH + 1), newValue];
                const newTimestampArray = [...prevState.localLabels.slice(-MAX_LENGTH + 1), updatedLabels];
                
                if (yRange[0] === null) {
                    setMinimumValue(Math.min(minimumValue, newValue - 5))
                }
                if (yRange[1] == null) {
                    setMaximumValue(Math.max(maximumValue, newValue + 5))
                }

                return { localValues: newValueArray, localLabels: newTimestampArray };
            });
        }      
    }, [data]);


    // Functions

    const toggleLabels = () => {
        setLabelsAreTimestamps(!labelsAreTimestamps);
    }


    // LineChart parameters

    const lineChartOptions = {
        responsive: true,
        plugins: {
            title: {
              display: chartTitle ? true : false,
              text: chartTitle,
            }
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                display: yRange ? true : false,
                min: yRange[0] !== null ? yRange[0] : minimumValue,
                max: yRange[1] !== null ? yRange[1] : maximumValue
              }
        }
    }
    
    const lineChartData = {
        labels: dataLocalMem.localLabels,
        datasets: [
          {
              label: lineLabel,
              data: dataLocalMem.localValues,
              fill: false,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 2,
              pointBackgroundColor: 'transparent',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 3,
              pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
              pointHoverBorderWidth: 10,
              lineTension: 0,
              yAxisID: 'y'
          }
        ]
    }

	return <Line 
        options={lineChartOptions}        
        data={lineChartData}
    />
};

export default LineChart;
