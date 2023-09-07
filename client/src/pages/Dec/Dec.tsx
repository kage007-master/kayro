import { Content } from "antd/es/layout/layout";
import { Button, Space, Input, Table, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { gets, autoCheck, manualCheck } from "../../store/dec";
import { useParams } from "react-router-dom";

interface UserParams {
  [key: string]: string | undefined;
}

const Component = () => {
  const { id } = useParams<UserParams>();
  const { data, totalCnt, loading } = useSelector(
    (state: RootState) => state.dec
  );

  const [page, setPage] = useState(1);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    {
      dataIndex: "string",
      title: "String",
      render: (text: string) => <>{text.substr(0, 50)}</>,
    },
  ];

  useEffect(() => {
    dispatch(gets({ id, page }));
  }, [page]);

  const onAutoCheck = () => {
    dispatch(autoCheck({ id, page }));
  };

  const onManualCheck = () => {
    if (password.length) dispatch(manualCheck({ id, password }));
  };

  return (
    <Content>
      <Space wrap>
        Password:
        <Input
          placeholder="Input password."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onManualCheck} type="primary" size={"large"}>
          Manual Dec
        </Button>
        <Button onClick={onAutoCheck} type="primary" size={"large"}>
          Auto Dec
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
        current={page}
        onChange={(page) => setPage(page)}
        total={totalCnt}
      />
    </Content>
  );
};

export default Component;
