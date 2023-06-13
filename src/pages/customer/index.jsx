import { Button, Table, message } from "antd";
import { useFetch } from "../../hooks";
import { useCreateCols } from "./hooks";
import service from "../../api";

const Customer = () => {
	const { data, loading, refetch } = useFetch(
		"/customers",
		(data) => data?.data
	);
	const columns = useCreateCols();

	return (
		<>
			<div
				className="flex-between"
				style={{
					paddingBottom: 20,
				}}>
				<Button loading={loading} type="primary">
					Add
				</Button>
				<Button
					loading={loading}
					type="primary"
					onClick={async () => {
						const { data } = await service.get("/cluster");
						message.success(data);
						refetch();
					}}>
					Categorize customers
				</Button>
			</div>
			<Table
				bordered
				loading={loading}
				columns={columns}
				dataSource={data}
				scroll={{
					y: 420,
				}}
			/>
		</>
	);
};
export default Customer;
