import { Divider, Input, Select, Space, Table, Typography } from "antd";
import { useState } from "react";

const SearchableTable = (props) => {
  const [selectedField, setSelectedField] = useState();
  const [filterVal, setFilterVal] = useState();

  return (
    <div>
      <Divider />
      <Space>
        <Typography>Field :</Typography>
        <Select
          style={{ width: 200 }}
          options={props?.columns
            ?.filter((c) => !c.title.toLowerCase().includes("action"))
            ?.map((column) => ({
              label: column.title,
              value: column.dataIndex,
            }))}
          onSelect={(e) => {
            setSelectedField(e);
          }}
        />
        <Typography>Search :</Typography>
        <Input
          disabled={!selectedField}
          onChange={(e) => {
            setFilterVal(e.target.value);
          }}
        />
      </Space>
      <Divider />
      <Table
        {...props}
        columns={props.columns.map((c) => ({
          ...c,
          sorter: (a, b) => a[c.dataIndex] - b[c.dataIndex],
        }))}
        dataSource={props?.dataSource?.filter((d) => {
          console.log(selectedField, String(d[selectedField]), filterVal);
          if (!filterVal) {
            return true;
          } else {
            return String(d[selectedField]).includes(filterVal);
          }
        })}
      />
    </div>
  );
};

export default SearchableTable;
