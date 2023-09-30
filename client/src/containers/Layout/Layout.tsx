import { useLocation } from "react-router-dom";
import Layout from "antd/es/layout";
// import Header from "../Header";
// import Footer from "../Footer";

const Component = (props: any) => {
  const { pathname } = useLocation();
  return (
    <Layout className="layout">
      {pathname && pathname.startsWith("/gsjdlwdijsdfljwidjfasjdfiwkd") && (
        <>
          {/* <Header /> */}
          {props.children}
          {/* <Footer /> */}
        </>
      )}
    </Layout>
  );
};

export default Component;
