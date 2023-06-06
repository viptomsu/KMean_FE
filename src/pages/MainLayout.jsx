import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items = [
	getItem("View Data", "chart", <PieChartOutlined />),
	getItem("Customer", "customers", <TeamOutlined />),
	getItem("Config Parameters", "config", <DesktopOutlined />),
	getItem("Files", "9", <FileOutlined />),
];

const MainLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const selectedKey = pathname.split("/")[1];

	return (
		<Layout
			style={{
				height: "100vh",
				overflowY: "hidden",
			}}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					defaultSelectedKeys={["1"]}
					selectedKeys={[selectedKey]}
					onSelect={({ selectedKeys }) => {
						navigate(`/${selectedKeys[0]}`);
					}}
					mode="inline"
					items={items}
				/>
			</Sider>
			<Layout
				style={{
					display: "flex",
					flexDirection: "column",
				}}>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				/>
				<Content
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
					}}>
					<div
						style={{
							padding: 16,
							margin: 16,
							background: colorBgContainer,
							overflowY: "auto",
							flex: 1,
						}}>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};
export default MainLayout;
