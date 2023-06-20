import { Button, Space, Form, message, InputNumber, Typography } from "antd";
import { useCallback, useState } from "react";
import service from "../api";
import { useFetch } from "../hooks";
import GroupChart from "../components/charts/GroupChart";

const Config = () => {
	const [form] = Form.useForm();
	const { loading: loadingData } = useFetch("/config", (data) => {
		form.setFieldsValue(data);
	});
	const [loading, setLoading] = useState(false);
	const { data: chartData, refetch } = useFetch("/circle-chart");

	const handleSubmit = useCallback(async (values) => {
		try {
			setLoading(true);
			await service.post("/config", values);
			const { data } = await service.get("/cluster");
			message.success(data);
			refetch();
			setLoading(false);
		} catch (error) {
			message.error(error.message);
			setLoading(false);
		}
	}, []);

	const formLoading = loading || loadingData;

	return (
		<div>
			<Form
				layout="vertical"
				form={form}
				onFinish={handleSubmit}
				loading={formLoading}>
				<div
					className="flex-between"
					style={{
						marginBottom: 20,
					}}>
					<Typography.Title level={4} style={{ marginTop: 0 }}>
						Setting parameters for KMean
					</Typography.Title>
					<Form.Item noStyle shouldUpdate>
						<Button loading={formLoading} htmlType="submit" type="primary">
							Categorize customers
						</Button>
					</Form.Item>
				</div>
				<Space className="w-full">
					<Form.Item label="K" name="k" rules={[{ required: true }]}>
						<InputNumber className="w-full" placeholder="input k" />
					</Form.Item>
					<Form.Item label="Iter" name="max_iter" rules={[{ required: true }]}>
						<InputNumber className="w-full" placeholder="input max iter" />
					</Form.Item>
					<Form.Item label="Tol" name="tol" rules={[{ required: true }]}>
						<InputNumber className="w-full" placeholder="input tol" />
					</Form.Item>
				</Space>
			</Form>
			<GroupChart data={chartData} />
		</div>
	);
};
export default Config;
