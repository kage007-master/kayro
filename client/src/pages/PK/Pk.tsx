import { Content } from "antd/es/layout/layout";
import { Button, Space, Input, Table, Pagination, Modal, Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { gets, calc, add, visible } from "../../store/pk";

const Component = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, totalCnt, loading } = useSelector(
    (state: RootState) => state.pk
  );

  const [page, setPage] = useState(1);
  const [all, setAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [PK, setPK] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setPK("");
    dispatch(add({ data: PK, addr: "UNKNOWN" }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (checked: boolean) => {
    setAll(checked);
    setPage(1);
  };

  const copyStringToClipboard = (string: string) => {
    const handler = (event: any) => {
      event.clipboardData.setData("text/plain", string);
      event.preventDefault();
      document.removeEventListener("copy", handler, true);
    };
    document.addEventListener("copy", handler, true);
    document.execCommand("copy");
  };

  const columns = [
    {
      key: "Pub",
      dataIndex: "Pub",
      title: "Public",
      render: (text: string) => (
        <a href={`https://debank.com/profile/${text}`}>{text}</a>
      ),
    },
    {
      dataIndex: "TOTAL",
      title: "TOTAL",
    },
    {
      dataIndex: "addr",
      title: "Addr",
    },
    {
      dataIndex: "zero",
      title: "Action",
      render: (zero: boolean, record: any) => (
        <>
          <Button
            type={zero ? "primary" : "default"}
            onClick={() => {
              dispatch(visible({ id: record._id }));
            }}
          >
            {zero ? "S" : "H"}
          </Button>
          <Button onClick={() => copyStringToClipboard(record.Pub)}>P</Button>
          <Button onClick={() => copyStringToClipboard(record.pk)}>C</Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(gets({ page, all }));
  }, [page, all]);

  return (
    <Content>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space wrap>
          Show All:
          <Switch onChange={onChange} />
          <Button
            type="primary"
            size={"large"}
            disabled={loading}
            onClick={() => dispatch(calc({ page, all }))}
          >
            Calc
          </Button>
          <Button
            type="primary"
            size={"large"}
            disabled={loading}
            onClick={showModal}
          >
            Add New
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
        />
        <Pagination
          simple
          disabled={loading}
          current={page}
          onChange={(page) => setPage(page)}
          total={totalCnt}
        />
        <Modal
          title="Add New PK"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            placeholder="Input PK."
            value={PK}
            onChange={(e) => setPK(e.target.value)}
          />
        </Modal>
      </Space>
    </Content>
  );
};

export default Component;
