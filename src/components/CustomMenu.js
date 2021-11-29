import { useState } from "react";
import { useDispatch} from "react-redux";
import {documentActions} from "../store/documentSlice"

import { Layout } from "antd";
import { Typography, Menu, Checkbox, Divider } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const CustomMenu = () => {
  const dispatch = useDispatch();
  const [collapsed, setState] = useState(false);
  const setSidebar = () => {
    setState(!collapsed);
  };
  const onChange = (e) => {
    const setFilter = {
      type: e.target.name,
      active: e.target.checked
    }
    dispatch(documentActions.filterDocuments(setFilter));
  };
  return (
    <Sider
      trigger={null}
      theme="light"
      className="bg-white"
      collapsed={collapsed}
      collapsible
    >
      <Title level={5} className="info">
        Filters
      </Title>
      <Menu
        mode="inline"
        defaultSelectedKeys={["9"]}
        defaultOpenKeys={["sub3"]}
      >
        <SubMenu key="sub1" title="Address">
          <Menu.Item key="1">Adress 1</Menu.Item>
          <Menu.Item key="2">Adress 2</Menu.Item>
          <Menu.Item key="3">Adress 3</Menu.Item>
          <Menu.Item key="4">Adress 4</Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <SubMenu key="sub2" title="Date">
          <Menu.Item key="5">date 1</Menu.Item>
          <Menu.Item key="6">date 2</Menu.Item>
          <Menu.Item key="7">date 3</Menu.Item>
          <Menu.Item key="8">date 4</Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <SubMenu key="sub3" title="Status" className="bg-white">
          <Menu.Item key="9">
            <Checkbox onChange={onChange} name="Received">
              Received
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="10">
            <Checkbox onChange={onChange} name="Printed">
              Printed
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="11">
            <Checkbox onChange={onChange} name="Folded">
              Folded
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="12">
            <Checkbox onChange={onChange} name="Sorted">
              Sorted
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="13">
            <Checkbox onChange={onChange} name="Delivered">
              Delivered
            </Checkbox>
          </Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <SubMenu key="sub4" title="Group">
          <Menu.Item key="14">Group 1</Menu.Item>
          <Menu.Item key="15">Group 2</Menu.Item>
          <Menu.Item key="16">Group 3</Menu.Item>
          <Menu.Item key="17">Group 4</Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <SubMenu key="sub5" title="Date Range">
          <Menu.Item key="18">Range 1</Menu.Item>
          <Menu.Item key="19">Range 2</Menu.Item>
          <Menu.Item key="20">Range 3</Menu.Item>
          <Menu.Item key="21">Range 4</Menu.Item>
        </SubMenu>
      </Menu>
      <Divider className="trigger-border" />
      {collapsed ? (
        <MenuUnfoldOutlined className="trigger" onClick={() => setSidebar()} />
      ) : (
        <MenuFoldOutlined className="trigger" onClick={() => setSidebar()} />
      )}
    </Sider>
  );
};
export default CustomMenu;
