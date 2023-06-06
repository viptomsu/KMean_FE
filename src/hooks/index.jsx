import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import service from "../api";

export const useFetch = (url, handleData = (x) => x) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();
	const [reload, setReload] = useState(false);

	const refetch = useCallback(() => {
		setReload((prev) => !prev);
	}, []);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const { data } = await service.get(url);
				setData(handleData(data));
				setLoading(false);
			} catch (error) {
				setLoading(false);
				message.error(error.message);
			}
		})();
	}, [reload]);

	return {
		refetch,
		loading,
		data,
	};
};
