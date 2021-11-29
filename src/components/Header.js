import { PageHeader } from "antd";

const Header = () => {
  const routes = [
    {
      path: "index",
      breadcrumbName: "Home",
    },
    {
      path: "first",
      breadcrumbName: "Documents",
    },
  ];
  return (
    <PageHeader
      className="site-page-header bg-white"
      title="Document Browser"
      breadcrumb={{ routes }}
    />
  );
};

export default Header;
