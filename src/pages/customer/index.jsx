import { Button, Table } from "antd";
import { useFetch } from "../../hooks";
import { useCreateCols } from "./hooks";

const Customer = () => {
  const { data, loading } = useFetch("/customers", (data) => data?.data);
  const columns = useCreateCols();

  return (
    <>
      <div
        className="flex-between"
        style={{
          paddingBottom: 20,
        }}
      >
        <Button loading={loading} type="primary">
          Add
        </Button>
        <Button loading={loading} type="primary" onClick={() => {}}>
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
