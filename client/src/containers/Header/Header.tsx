import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const menuitems = [
  { key: 1, label: <Link to="/aaaa">DEC</Link> },
  { key: 2, label: <Link to="/aaaa/sd">SD</Link> },
  { key: 3, label: <Link to="/aaaa/pk">PK</Link> },
  { key: 4, label: <Link to="/aaaa/status">Status</Link> },
  { key: 5, label: <Link to="/aaaa/clip">Clip</Link> },
  { key: 6, label: <Link to="/aaaa/pwd">Pwd</Link> },
];

const Component = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Menu mode="horizontal" style={{ width: "100%" }} items={menuitems} />
    </Header>
  );
};

export default Component;
