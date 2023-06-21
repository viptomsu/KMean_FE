import { Typography } from "antd";
import React, { useCallback, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? "start" : "end";

	const groupName = payload.name || `Group ${payload.label}`;

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
				{groupName}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="#333">{`Qty: ${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill="#999">
				{`(Rate ${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

const CircleChart = ({ data }) => {
	const [active, setActive] = useState(0);
	const onPieEnter = useCallback((_, index) => {
		setActive(index);
	}, []);

	return (
		<div>
			<Typography.Title level={5}>Customer groups chart</Typography.Title>
			<PieChart width={600} height={400}>
				<Pie
					data={data}
					dataKey="value"
					nameKey="label"
					cx="50%"
					cy="50%"
					outerRadius={120}
					innerRadius={80}
					fill="#8884d8"
					// label={renderCustomizedLabel}
					onMouseEnter={onPieEnter}
					activeShape={renderActiveShape}
					activeIndex={active}>
					{data?.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
			</PieChart>
		</div>
	);
};

export default CircleChart;
