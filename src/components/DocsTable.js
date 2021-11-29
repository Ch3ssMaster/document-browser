import { useState, useEffect, Fragment } from "react";
import {
  fetchAllDocuments,
  quantity,
  deleteDocument,
  userFilters,
} from "../store/documentSlice";
import {
  Table,
  Button,
  Select,
  Space,
  Typography,
  Alert,
  Empty,
  Spin,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;
const { Title } = Typography;

const DocTable = () => {
  const dispatch = useDispatch();
  const documentState = useSelector((state) => state.document);
  const savingNewDocument = useSelector(
    (state) => state.document.documents.addingDocument
  );
  const deletingDocument = useSelector(
    (state) => state.document.documents.deletingDocument
  );
  const totalDocuments = useSelector(quantity);
  const customFilters = useSelector(userFilters);
  const [sortedInfo, orderData] = useState({
    order: "modified",
    columnKey: "descend",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultSelect, setDefaultSelect] = useState("Date");
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  const columns = [
    {
      title: "Channel",
      dataIndex: "channel",
      width: 100,
      ellipsis: false,
    },
    {
      title: "Document name",
      dataIndex: "name",
      width: 200,
      render: (text) => (
        <a href="http://localhost:3000/document-browser">{text}</a>
      ),
      //ellipsis: true,
    },
    {
      title: "Group",
      dataIndex: "group",
      width: 100,
      render: (text) => (
        <a href="http://localhost:3000/document-browser">{text}</a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
    },
    {
      title: "Date modified",
      dataIndex: "modified",
      width: 150,
      sorter: (a, b) => a.modified > b.modified,
      sortDirections: ["ascend", "descend", "ascend"],
      sortOrder: sortedInfo.columnKey === "modified" && sortedInfo.order,
      defaultSortOrder: "ascend",
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 100,
    },
    {
      title: "Addres",
      dataIndex: "address",
      width: 200,
      render: (text) => (
        <a href="http://localhost:3000/document-browser">{text}</a>
      ),
    },
    {
      title: "Delete",
      dataIndex: "id",
      width: 50,
      render: (text, record, index) => (
        <DeleteOutlined
          key={text}
          onClick={() => {
            dispatch(deleteDocument(text));
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, [dispatch]);

  useEffect(() => {
    if (documentState.status === "Succeeded") {
      let documents = [];
      documentState.documents.data.forEach((doc) => {
        if (customFilters.includes(doc.status)) {
          documents.push(doc);
        }
      });
      setFilteredDocuments(documents);
    }
  }, [customFilters, documentState.status, documentState.documents.data]);

  const handleChange = (pagination, filteredInfo, sorter) => {
    if (pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    orderData({
      order: sorter.order,
      columnKey: sorter.field,
    });
  };

  const resetOrder = () => {
    orderData({ sortedInfo: null });
    setDefaultSelect("Date");
  };

  const setDateSort = (order) => {
    setDefaultSelect(order);
    orderData({
      order: order,
      columnKey: "modified",
    });
  };

  return (
    <div>
      <Space className="table-header" align="center">
        <Title level={5}>Dashboard</Title>
        <Space size={"small"}>
          <Select
            defaultValue={defaultSelect}
            value={defaultSelect}
            onChange={setDateSort}
            bordered={false}
          >
            <Option value="descend">descend</Option>
            <Option value="ascend">ascend</Option>
          </Select>
          <Button onClick={resetOrder}>Reset</Button>
        </Space>
      </Space>
      {Object.keys(documentState.documents.data).length <= 0 &&
        documentState.status === "succeeded" &&
        !savingNewDocument && (
          <Fragment>
            <Empty />
            <Alert
              message="No documents were loaded. If something went wrong, please contact with the site admin."
              type="error"
            />
          </Fragment>
        )}
      {documentState.documents.loading && !savingNewDocument && (
        <Spin size="large" tip="Loading..." />
      )}
      {Object.keys(documentState.documents.data).length <= 0 &&
        documentState.status === "failed" &&
        !savingNewDocument && (
          <Fragment>
            <Alert message={documentState.error} type="error" />
            <Empty />
          </Fragment>
        )}
      {documentState.status === "Failed" && deletingDocument && (
        <Alert
          message={documentState.status + " deleting document"}
          type="error"
          description={documentState.error}
          closable
        />
      )}
      {documentState.status === "Succeeded" && deletingDocument && (
        <Alert
          message={documentState.status + " deleting document"}
          description="The document was successfully deleted!"
          type="success"
          closable
        />
      )}
      {Object.keys(documentState.documents.data).length > 0 && (
        <Table
          columns={columns}
          dataSource={
            (customFilters.length > 0 && filteredDocuments) ||
            documentState.documents.data
          }
          pagination={{
            total:
              (customFilters.length > 0 && filteredDocuments.length) ||
              totalDocuments,
            current: currentPage,
            defaultCurrent: 1,
            defaultPageSize: 10,
            pageSize: 10,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          loading={documentState.documents.loading}
          onChange={handleChange}
          scroll={{ x: 600 }}
        />
      )}
    </div>
  );
};
export default DocTable;
