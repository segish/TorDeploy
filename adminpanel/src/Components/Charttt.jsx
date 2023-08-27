import { Line } from 'react-chartjs-2'
import {
    LineElement,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { makeRequest } from '../axios';
ChartJS.register(
    LineElement,
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Legend,
    Tooltip
)
const Charttt = () => {
    const { data: studNumresponse } = useQuery(["chartdata  "], () =>
        makeRequest.get("users/chart").then((res) => {
            return res.data || 0;
        })
    );
    const [studNum, setStudNum] = useState(Array(12).fill(0));
    useEffect(() => {
        studNumresponse?.forEach(item => {
            setStudNum(prevStudNum => {
                const updatedStudNum = [...prevStudNum];
                updatedStudNum[item._id - 1] = item.count;
                return updatedStudNum;
            });
        });
    }, [studNumresponse])
    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [{
            label: 'Students',
            data: studNum,
            backgroundColor: 'orange',
            borderColor: 'orange',
            tension: 0.1,
            fill: true
        }]
    }
    const options = {
        plugins: {
            legend: true
        }
    }
    return (
        <div className=" h-full overflow-auto">
            <Line className='dark:text-white h-full w-full'
                width={2000}
                height={1000}
                data={data}
                options={options}
            >
            </Line>
        </div>
    )
}
export default Charttt;