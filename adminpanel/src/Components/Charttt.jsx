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

    const today = new Date();
    const year = today.getFullYear();

    const [studNum,setStudNum] = useState()

    const { data: jan } = useQuery(["jan"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+1).then((res) => {
            return res.data||0;
        })
    );
    const { data: feb } = useQuery(["feb"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+2).then((res) => {
            return res.data||0;
        })
    );
    const { data: mar } = useQuery(["mar"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+3).then((res) => {
            return res.data||0;
        })
    );
    const { data: apr } = useQuery(["apr"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+4).then((res) => {
            return res.data||0;
        })
    );
    const { data: may } = useQuery(["may"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+5).then((res) => {
            return res.data||0;
        })
    );
    const { data: jun } = useQuery(["jun"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+6).then((res) => {
            return res.data||0;
        })
    );
    const { data: jul } = useQuery(["jul"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+7).then((res) => {
            return res.data||0;
        })
    );
    const { data: aug } = useQuery(["aug"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+8).then((res) => {
            return res.data||0;
        })
    );
    const { data: sep } = useQuery(["sep"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+9).then((res) => {
            return res.data||0;
        })
    );
    const { data: oct } = useQuery(["oct"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+10).then((res) => {
            return res.data||0;
        })
    );
    const { data: nov } = useQuery(["nov"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+11).then((res) => {
            return res.data||0;
        })
    );
    const { data: dec } = useQuery(["dec"], () =>
        makeRequest.get("users/chart?year="+year+"&month="+12).then((res) => {
            return res.data||0;
        })
    );
useEffect(()=>{
    setStudNum([jan,feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec])
},[jan,feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec])
// console.log(jan)

const data = {
    labels: ['january', 'february', 'march', 'april', 'may', 'june', 'julay', 'augest', 'september', 'october', 'november', 'december'],

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
export default Charttt