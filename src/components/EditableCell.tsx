import { Form } from "antd";

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, inputNode, ...restProps }) => {
	return (
			<td {...restProps}>
				{editing ? (
						<Form.Item
								name={dataIndex}
								style={{
									margin: 0,
								}}
								rules={[
									{
										required: true,
										message: `Please Input ${title}!`,
									},
								]}
						>
							{inputNode}
						</Form.Item>
				) : (
						children
				)}
			</td>
	);
};

export default EditableCell;