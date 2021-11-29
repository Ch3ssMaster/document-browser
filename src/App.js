import "./App.css";
//import store from "../reducers/store";

import Header from "./components/Header";
import NewDoc from "./components/NewDoc";
import DocsTable from "./components/DocsTable";
import CustomMenu from "./components/CustomMenu";
import { Layout } from "antd";

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <CustomMenu />
        <Layout>
          <Header />
          <Content className="bg-white new-doc">
            <NewDoc />
          </Content>
          <Content className="bg-white doc-table">
            <DocsTable />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
