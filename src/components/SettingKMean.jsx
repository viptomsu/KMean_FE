import { Button, Modal, Form, message, Input } from "antd";
import { useState } from "react";
import service from "../api";
const SettingKMean = ({ refetch }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleOk = async (values) => {
		try {
			setLoading(true);
			const res = await service.post("/cluster", values);
			message.success(res.data);
			setLoading(false);
			refetch?.();
			handleCancel();
		} catch (error) {
			message.error(error.message);
			setLoading(false);
		}
	};

	return (
		<>
			<Button loading={loading} type="primary" onClick={showModal}>
				Categorize customers
			</Button>
			<Modal
				title="Config parameters"
				open={isModalOpen}
				onOk={form.submit}
				onCancel={handleCancel}>
				<Form
					layout="vertical"
					form={form}
					onFinish={handleOk}
					loading={loading}>
					<Form.Item label="K" name="k" rules={[{ required: true }]}>
						<Input placeholder="input placeholder" />
					</Form.Item>
					<Form.Item label="Iter" name="max_iter" rules={[{ required: true }]}>
						<Input placeholder="input placeholder" />
					</Form.Item>
					<Form.Item label="Tol" name="tol" rules={[{ required: true }]}>
						<Input placeholder="input placeholder" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default SettingKMean;
