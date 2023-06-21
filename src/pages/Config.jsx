import { Button, Space, Form, message, InputNumber, Typography, Input } from "antd";
import { useCallback, useState } from "react";
import service from "../api";
import { useFetch } from "../hooks";
import GroupChart from "../components/charts/GroupChart";
import KLineChart from "../components/charts/KLineChart";

const Config = () => {
	const [form] = Form.useForm();
	const [formCategorize] = Form.useForm();
	const { loading: loadingData } = useFetch("/config", (data) => {
		form.setFieldsValue(data);
		formCategorize.setFieldsValue(data);
	});
	const [loading, setLoading] = useState(false);

	const { data: chartData, refetch } = useFetch("/circle-chart");
	const { data: kChartData, refetch: refetchKChart } = useFetch("/k-chart");

	const handleSubmit = useCallback(async (values) => {
		try {
			setLoading(true);
			await service.post("/config", values);
			message.success("Successfully!!");
			refetchKChart();
			setLoading(false);
		} catch (error) {
			message.error(error.message);
			setLoading(false);
		}
	}, []);

	const handleCategorize = useCallback(async (values) => {
		try {
			setLoading(true);
			await service.post("/config/k", values);
			const { data } = await service.get("/cluster");
			message.success(data);
			refetch();
			setLoading(false);
		} catch (error) {
			message.error(error.message);
			setLoading(false);
		}
	})

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
							Submit
						</Button>
					</Form.Item>
				</div>
				<Space className="w-full">
					<Form.Item name="range_start" label="Range Start" rules={[{ required: true, message: 'Please enter the range start' }]}>
						<InputNumber className="w-full" min={2} />
					</Form.Item>
					<Form.Item name="range_end" label="Range End" rules={[{ required: true, message: 'Please enter the range end' }]}>
						<InputNumber className="w-full" min={2} />
					</Form.Item>
					<Form.Item label="Iter" name="max_iter" rules={[{ required: true }]}>
						<InputNumber className="w-full" placeholder="input max iter" />
					</Form.Item>
					<Form.Item label="Tol" name="tol" rules={[{ required: true }]}>
						<InputNumber className="w-full" placeholder="input tol" />
					</Form.Item>
				</Space>
			</Form>
			<KLineChart data={kChartData} />

			<Form
					layout="vertical"
					form={formCategorize}
					onFinish={handleCategorize}
					loading={formLoading}>
				<div
						className="flex-between"
						style={{
							marginBottom: 20,
						}}>
					<Typography.Title level={4} style={{ marginTop: 0 }}>
						Cluster
					</Typography.Title>
					<Form.Item noStyle shouldUpdate>
						<Button loading={formLoading} htmlType="submit" type="primary">
							Categorize
						</Button>
					</Form.Item>
				</div>
				<Space className="w-full">
					<Form.Item label="Enter K" name="k" rules={[{ required: true }]}>
						<InputNumber className="w-full" placeholder="input max iter" />
					</Form.Item>
				</Space>
			</Form>
			<GroupChart data={chartData} />
		</div>
	);
};
export default Config;
