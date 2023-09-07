import { Content } from "antd/es/layout/layout";
import { Button, Space, Table, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { add, gets } from "../../store/seed";

const Component = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.seed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seed, setSeed] = useState("");
  const [addr, setAddr] = useState("UNKNOWN");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(add({ data: seed, addr }));
    setSeed("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      dataIndex: "seed",
      title: "Seed",
      render: (text: string) => <>{text.substr(0, 50)}</>,
    },
    {
      dataIndex: "addr",
      title: "Addr",
    },
    {
      dataIndex: "numberOfAccounts",
      title: "Number Of Accounts",
    },
  ];

  useEffect(() => {
    dispatch(gets());
  }, []);

  return (
    <Content>
      <Space wrap>
        <Button
          type="primary"
          size={"large"}
          loading={loading}
          disabled={loading}
          onClick={showModal}
        >
          Add New
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} loading={loading} />
      <Modal
        title="Add New Seed"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Input seed."
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
        <Input
          placeholder="Input Addr."
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
        />
      </Modal>
    </Content>
  );
};

export default Component;
