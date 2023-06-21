import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Input, InputNumber, Button, message, ColorPicker } from 'antd';
import service from "../api/index.js";

const EditableTable = () => {
	const [data, setData] = useState([]);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await service.get('/groups'); // Replace '/api/data' with your API endpoint
			setData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	const handleEdit = useCallback(() => {
		setEditing(true);
	}, []);

	const handleCancel = useCallback(() => {
		setEditing(false);
	}, []);

	const handleSave = useCallback(async () => {
		setEditing(false);
		try {
			setLoading(true);
			await service.post('/groups', data); // Replace '/api/save' with your API endpoint
			message.success('Data saved successfully!');
		} catch (error) {
			console.log(error);
			message.error('Error saving data:', error.message);
		} finally {
			setLoading(false);
		}
	}, [data]);

	const handleChange = useCallback((value, record, field) => {
		const newData = [...data];
		const targetIndex = newData.findIndex((item) => item.id === record.id);
		if (targetIndex > -1) {
			newData[targetIndex][field] = value;
			setData(newData);
		}
	}, [data]);

	const columns = useMemo(
			() => [
				{
					title: "Id",
					dataIndex: "id",
					width: 50,
				},
				{
					title: 'Name',
					dataIndex: 'name',
					render: (_, record) =>
							editing ? (
									<Input value={record.name} onChange={(e) => handleChange(e.target.value, record, 'name')} />
							) : (
									record.name
							),
				},
				{
					title: 'Description',
					dataIndex: 'desc',
					render: (_, record) =>
							editing ? (
									<Input value={record.desc} onChange={(e) => handleChange(e.target.value, record, 'desc')} />
							) : (
									record.desc
							),
				},
				{
					title: 'Color',
					dataIndex: 'color',
					width: 75,
					render: (_, record) => (
							<ColorPicker value={record.color} onChange={(color) => handleChange(color?.toHexString(), record, 'color')} disabled={!editing} />
					)
,
				},
			],
			[editing, handleChange]
	);

	return (
			<>
				<div style={{paddingBottom: 20}}>
					{editing ? (
							<>
								<Button type="primary" onClick={handleSave} disabled={loading} loading={loading}>
									Save
								</Button>
								<Button onClick={handleCancel} style={{ marginLeft: '10px' }} disabled={loading} loading={loading}>
									Cancel
								</Button>
							</>
					) : (
							<Button type="primary" onClick={handleEdit} disabled={loading} loading={loading}>
								Edit
							</Button>
					)}
				</div>
				<Table dataSource={data} columns={columns} loading={loading} pagination={false} rowKey="key" bordered />
			</>
	);
};

export default EditableTable;
