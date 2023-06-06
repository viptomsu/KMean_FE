import { useMemo } from "react";
import { useFetch } from "../../hooks";

export const useCreateCols = (reload) => {
	const { data: groups } = useFetch("/groups");

	return useMemo(() => {
		return [
			{
				title: "Customer ID",
				dataIndex: "id",
				key: "id",
				render: (text) => <a>{text}</a>,
				width: 150,
			},
			{
				title: "Gender",
				dataIndex: "gender",
				key: "gender",
				width: 80,
			},
			{
				title: "Age",
				dataIndex: "age",
				key: "age",
				width: 80,
			},
			{
				title: "Annual income",
				dataIndex: "annualIncome",
				key: "annualIncome",
			},
			{
				title: "Spending score",
				dataIndex: "spendingScore",
				key: "spendingScore",
			},
			{
				title: "Group",
				dataIndex: "label",
				key: "label",
				filters: groups?.map((group) => ({
					text: group,
					value: group,
				})),
				onFilter: (value, record) => record.label === value,
			},
		];
	}, [groups]);
};
