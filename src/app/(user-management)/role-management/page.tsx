"use client";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PAGES, SPORTS } from "@/constants";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { RoleManagementTable } from "@/components/RoleManagementTable";
import { arrowRightIcon } from "@progress/kendo-svg-icons";
import React from "react";

export default function Page() {
  return (
    <>
      <>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" />
          <span>Condition</span>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-row" style={{ minWidth: "120px" }}>
              <DropDownList
                className="mr-2"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
                style={{ width: "148px" }}
              />
              <Input className="h-[24px] w-[148px]" />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <DropDownList size={"small"} data={PAGES} defaultValue="20" filterable={false} />
              <span>Items</span>
            </div>
            <Button imageUrl="/images/refresh.png" className="basic-btn">
              Find
            </Button>
          </div>
        </div>
      </>
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span>List</span>
        </div>
        <RoleManagementTable />
      </div>

      <div className="flex justify-end">
        <Button svgIcon={arrowRightIcon} className="mt-2 flex items-center  justify-end">
          ADD
        </Button>
      </div>
    </>
  );
}