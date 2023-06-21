import { useMemo } from "react";
import { useFetch } from "../../hooks";
import { Tag } from "antd";

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
				title: "Annual income (k$)",
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
					text: group.name || group.id,
					value: group.id,
				})),
				onFilter: (value, record) => record.label === value,
				render: (groupId) => {
					const group = groups?.find((val) => val.id === groupId);
					if(group) {
						return <Tag color={group.color}>{group.name || group.id}</Tag>
					}
					return null;
				}
			},
		];
	}, [groups]);
};
