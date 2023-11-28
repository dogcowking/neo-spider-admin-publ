import React from "react";
import { getter } from "@progress/kendo-react-common";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { setGroupIds, setExpandedState } from "@progress/kendo-react-data-tools";
import { EMPLOYEES } from "@/constants";
import { ColumnMenu } from "./ColumnMenu";
import { Button } from "@progress/kendo-react-buttons";

const DATA_ITEM_KEY = "id";
const SELECTED_FIELD = "selected";
const initialDataState = {
  take: 10,
  skip: 0,
  group: [],
};

const processWithGroups = (data: any, dataState: any) => {
  const newDataState = process(data, dataState);
  setGroupIds({
    data: newDataState.data,
    group: dataState.group,
  });
  return newDataState;
};

export function UserManagementTable() {
  const idGetter = getter("id");
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(EMPLOYEES);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<any>({});
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(process(filteredData, dataState));
  const [data, setData] = React.useState(filteredData);

  const onFilterChange = (ev: any) => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = EMPLOYEES.filter((item: any) => {
      let match = false;
      for (const property in item) {
        if (item[property].toString().toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
          match = true;
        }
        if (item[property].toLocaleDateString && item[property].toLocaleDateString().indexOf(value) >= 0) {
          match = true;
        }
      }
      return match;
    });
    setFilteredData(newData);
    let clearedPagerDataState = {
      ...dataState,
      take: 8,
      skip: 0,
    };
    let processedData = process(newData, clearedPagerDataState);
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
    setData(newData);
  };

  const [resultState, setResultState] = React.useState(
    processWithGroups(
      EMPLOYEES.map((item: any) => ({
        ...item,
        ["selected"]: currentSelectedState[idGetter(item)],
      })),
      initialDataState,
    ),
  );

  const dataStateChange = (event: any) => {
    setDataResult(process(filteredData, event.dataState));
    setDataState(event.dataState);
  };

  const onExpandChange = React.useCallback(
    (event: any) => {
      const newData = [...dataResult.data];
      const item = event.dataItem;
      if (item.groupId) {
        const targetGroup = newData.find((d) => d.groupId === item.groupId);
        if (targetGroup) {
          targetGroup.expanded = event.value;
          setDataResult({
            ...dataResult,
            data: newData,
          });
        }
      } else {
        item.expanded = event.value;
        setDataResult({
          ...dataResult,
          data: newData,
        });
      }
    },
    [dataResult],
  );

  const setSelectedValue = (data: any) => {
    let newData = data.map((item: any) => {
      if (item.items) {
        return {
          ...item,
          items: setSelectedValue(item.items),
        };
      } else {
        return {
          ...item,
          ["selected"]: currentSelectedState[idGetter(item)],
        };
      }
    });
    return newData;
  };

  const newData = setExpandedState({
    data: setSelectedValue(resultState.data),
    collapsedIds: [],
  });

  const onHeaderSelectionChange = React.useCallback(
    (event: any) => {
      const checkboxElement = event.syntheticEvent.target;
      const checked = checkboxElement.checked;
      const newSelectedState: any = {};
      data.forEach((item: any) => {
        newSelectedState[idGetter(item)] = checked;
      });
      setCurrentSelectedState(newSelectedState);
      const newData = data.map((item) => ({
        ...item,
        [SELECTED_FIELD]: checked,
      }));
      const newDataResult = processWithGroups(newData, dataState);
      setDataResult(newDataResult);
    },
    [data, dataState],
  );

  const onSelectionChange = (event: any) => {
    const selectedProductId = event.dataItem.id;

    const newData = data.map((item: any) => {
      if (item.id === selectedProductId) {
        item.selected = !item.selected;
      }
      return item;
    });

    setCurrentSelectedState((prevState: any) => ({
      ...prevState,
      [selectedProductId]: !prevState[selectedProductId],
    }));

    const newDataResult = processWithGroups(newData, dataState);
    setDataResult(newDataResult);
  };

  const getNumberOfItems = (data: any) => {
    let count = 0;
    data.forEach((item: any) => {
      if (item.items) {
        count = count + getNumberOfItems(item.items);
      } else {
        count++;
      }
    });
    return count;
  };

  const getNumberOfSelectedItems = (data: any) => {
    let count = 0;
    data.forEach((item: any) => {
      if (item.items) {
        count = count + getNumberOfSelectedItems(item.items);
      } else {
        count = count + (item.selected == true ? 1 : 0);
      }
    });
    return count;
  };

  const handleButtonClick = (row: any) => {
    // Handle button click for the specific row
    console.log(`Button clicked for user: ${row.full_name}`);
  };

  const renderButtonCell = (props: any) => (
    <td>
      <button onClick={() => handleButtonClick(props.dataItem)}>Click me</button>
    </td>
  );

  return (
    <div>
      <ExcelExport>
        <Grid
          style={{
            height: "500px",
          }}
          pageable={{
            pageSizes: true,
          }}
          data={dataResult}
          sortable={false}
          total={resultState.total}
          onDataStateChange={dataStateChange}
          {...dataState}
          onExpandChange={onExpandChange}
          expandField="expanded"
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          onHeaderSelectionChange={onHeaderSelectionChange}
          onSelectionChange={onSelectionChange}
          groupable={false}
          size={"small"}>
          <Column
            field="budget"
            title="User ID"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="full_name"
            title="User Name"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="target"
            title="Rank"
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Emp no"
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Role name"
            headerClassName="justify-center bg-[#adc6f4] col-width15per"
            className="col-width15per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="Belong"
            headerClassName="justify-center bg-[#adc6f4] col-width10per"
            className="col-width10per"
            columnMenu={ColumnMenu}
          />
          <Column
            field="budget"
            title="User status"
            headerClassName="justify-center bg-[#adc6f4] col-width11per"
            className="col-width11per"
            columnMenu={ColumnMenu}
          />
          <Column field="budget" title="Modified  date" width="140px" columnMenu={ColumnMenu} />
          <Column
            field="Menu init"
            title="Menu init"
            width="90px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                      Reset
                    </Button>
                  </td>
                );
              },
            }}
          />
          <Column
            field="Menu authority"
            title="Menu authorityt"
            width="90px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                      Menu
                    </Button>
                  </td>
                );
              },
            }}
          />
          <Column
            field="Status(Error count)"
            title="Status(Error count)"
            width="100px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                      Unloack(0)
                    </Button>
                  </td>
                );
              },
            }}
          />
          <Column
            field="DO Login"
            title="DO Login"
            width="90px"
            headerClassName="justify-center"
            cells={{
              data: ({ dataItem, ...props }) => {
                return (
                  <td {...props.tdProps} style={{ textAlign: "center" }}>
                    <Button size={"small"} className="cell-inside-btn px-4 font-normal" themeColor={"primary"}>
                      Login
                    </Button>
                  </td>
                );
              },
            }}
          />
        </Grid>
      </ExcelExport>
      <GridPDFExport margin="1cm">
        <Grid
          style={{
            height: "500px",
          }}
          pageable={{
            pageSizes: true,
          }}
          data={dataResult}
          sortable={false}
          total={resultState.total}
          onDataStateChange={dataStateChange}
          {...dataState}
          onExpandChange={onExpandChange}
          expandField="expanded"
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          onHeaderSelectionChange={onHeaderSelectionChange}
          onSelectionChange={onSelectionChange}
          groupable={true}
          size={"small"}></Grid>
      </GridPDFExport>
    </div>
  );
}
