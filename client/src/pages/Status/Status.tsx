import { Content } from "antd/es/layout/layout";
import { Button, Space, Table } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getStatus } from "../../store/status";

const Component = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.status);

  const columns = [
    {
      dataIndex: "addr",
      title: "Addr",
    },
    {
      dataIndex: "time",
      title: "Time",
    },
    {
      dataIndex: "chance",
      title: "Chance",
    },
    {
      dataIndex: "version",
      title: "Version",
    },
  ];

  useEffect(() => {
    dispatch(getStatus());
  }, []);

  return (
    <Content>
      <Space wrap>
        <Button
          type="primary"
          size={"large"}
          loading={loading}
          disabled={loading}
        >
          Delete
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} loading={loading} />
    </Content>
  );
};

export default Component;
