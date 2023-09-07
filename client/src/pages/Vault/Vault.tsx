import { Content } from "antd/es/layout/layout";
import { Space, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { gets } from "../../store/vault";
import { Link } from "react-router-dom";

const Component = () => {
  const { data, loading } = useSelector((state: RootState) => state.vault);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  const columns = [
    {
      dataIndex: "vault",
      title: "Vault",
      render: (text: string, data: any) => (
        <Link to={`/aaaa/dec/${data._id}`}>{text.substr(0, 50)}</Link>
      ),
    },
    {
      dataIndex: "addr",
      title: "Addr",
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (status: boolean) => (status ? <>Checked</> : <>Unchecked</>),
    },
  ];

  useEffect(() => {
    dispatch(gets());
  }, []);

  return (
    <Content>
      <Space wrap>
        Show Checked:
        <Switch onChange={onChange} checked={checked} />
      </Space>
      <Table
        columns={columns}
        dataSource={data.filter((item) => checked || item.status === false)}
        loading={loading}
      />
    </Content>
  );
};

export default Component;
