import { Button, Space, Form, message, InputNumber, Typography } from "antd";
import { useCallback, useState } from "react";
import service from "../api";
import { useFetch } from "../hooks";

const Config = () => {
	const [form] = Form.useForm();
	const { loading: loadingData } = useFetch("/config", (data) => {
		form.setFieldsValue(data);
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(async (values) => {
		try {
			setLoading(true);
			const res = await service.post("/config", values);
			message.success(res.data);
			setLoading(false);
		} catch (error) {
			message.error(error.message);
			setLoading(false);
		}
	}, []);

	const formLoading = loading || loadingData;

	return (
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
						Save
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
	);
};
export default Config;
