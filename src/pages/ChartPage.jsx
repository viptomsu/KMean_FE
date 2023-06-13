/* eslint-disable no-unused-vars */
import React from "react";
import { useFetch } from "../hooks";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LineChart,
	Line,
	PieChart,
	Pie,
	AreaChart,
	Area,
	ScatterChart,
	Scatter,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	ZAxis,
} from "recharts";

function ChartPage() {
	const { data, loading } = useFetch("/customers", (data) => data?.data);

	const calculateAverageIncomeByAge = () => {
		const result = [];
		const ageGroups = {};

		data?.forEach((entry) => {
			const ageGroup = Math.floor(entry.age / 10) * 10;

			if (!ageGroups[ageGroup]) {
				ageGroups[ageGroup] = {
					ageGroup,
					count: 0,
					totalIncome: 0,
				};
			}

			ageGroups[ageGroup].count++;
			ageGroups[ageGroup].totalIncome += entry.annualIncome;
		});

		for (const ageGroup in ageGroups) {
			const averageIncome =
				ageGroups[ageGroup].totalIncome / ageGroups[ageGroup].count;
			result.push({ ageGroup, averageIncome });
		}

		return result;
	};

	const calculateAverageSpendingScoreByAgeGroup = () => {
		const result = [];
		const ageGroups = {};

		data?.forEach((entry) => {
			const ageGroup = Math.floor(entry.age / 10) * 10;

			if (!ageGroups[ageGroup]) {
				ageGroups[ageGroup] = {
					ageGroup,
					count: 0,
					totalSpendingScore: 0,
				};
			}

			ageGroups[ageGroup].count++;
			ageGroups[ageGroup].totalSpendingScore += entry.spendingScore;
		});

		for (const ageGroup in ageGroups) {
			const averageSpendingScore =
				ageGroups[ageGroup].totalSpendingScore / ageGroups[ageGroup].count;
			result.push({ ageGroup, averageSpendingScore });
		}

		return result;
	};

	const calculateMinSpendingScoreByAgeGroup = () => {
		const result = [];
		const ageGroups = {};

		data?.forEach((entry) => {
			const ageGroup = Math.floor(entry.age / 10) * 10;

			if (!ageGroups[ageGroup]) {
				ageGroups[ageGroup] = {
					ageGroup,
					minSpendingScore: entry.spendingScore,
				};
			} else {
				if (entry.spendingScore < ageGroups[ageGroup].minSpendingScore) {
					ageGroups[ageGroup].minSpendingScore = entry.spendingScore;
				}
			}
		});

		for (const ageGroup in ageGroups) {
			result.push(ageGroups[ageGroup]);
		}

		return result;
	};

	const aggregatedData = calculateAverageIncomeByAge();
	const aggregatedData2 = calculateAverageSpendingScoreByAgeGroup();

	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<h2>Biểu đồ</h2>
			<BarChart width={600} height={400} data={aggregatedData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="ageGroup" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="averageIncome" fill="#8884d8" />
			</BarChart>

			<BarChart width={600} height={400} data={aggregatedData2}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="ageGroup" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="averageSpendingScore" fill="#8884d8" />
			</BarChart>

			<ScatterChart width={600} height={400}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="age" type="number" name="Age" />
				<YAxis dataKey="annualIncome" type="number" name="Annual Income" />
				<Tooltip cursor={{ strokeDasharray: "3 3" }} />
				<Legend />
				<Scatter name="Age-income" data={data} fill="#8884d8" />
			</ScatterChart>

			<ScatterChart width={600} height={400}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="age" type="number" name="Age" />
				<YAxis dataKey="spendingScore" type="number" name="Spending Score" />
				<Tooltip cursor={{ strokeDasharray: "3 3" }} />
				<Legend />
				<Scatter name="Age-spendingScore" data={data} fill="#8884d8" />
			</ScatterChart>
		</div>
	);
}

export default ChartPage;
