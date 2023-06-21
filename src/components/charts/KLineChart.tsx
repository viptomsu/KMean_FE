import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography } from "antd";

export default function KLineChart({data}) {

		return (
				<div>
					<Typography.Title level={5}>Loss value base on K</Typography.Title>
					<LineChart
							width={500}
							height={300}
							data={data}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="k"/>
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
				</div>
		);
}