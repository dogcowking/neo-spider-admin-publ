"use client";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";
import { ErrotCauseTable } from "@/components/ErrorCauseTable";
import { PAGES } from "@/constants";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* filters */}
      <div>
        <div className="flex items-center gap-2 py-4">
          <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
          <span className="font-bold text-[#656565]">Condition</span>
          <button
            className="border border-[#999999] bg-[#f6f6f6f6] px-[4px] py-[2px]"
            onClick={() => toggleExpansion()}>
            Enlargement / Reduction
          </button>
        </div>
        <div className="bg-[#dde6f0] px-[10px]">
          <div className="flex justify-between bg-[#dde6f0] p-[5px]">
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#6f7071]">Error code</span>
                  <Input className="w-48 border border-[#999999]" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#6f7071]">Customer ID</span>
                  <Input className="w-48 border border-[#999999]" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#6f7071]">Customer tel</span>
                  <Input className="w-48 border border-[#999999]" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <DropDownList
                  className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                  size={"small"}
                  data={PAGES}
                  defaultValue="20"
                  filterable={false}
                />
                <span className="text-sm font-bold">Items</span>
              </div>
              <Button svgIcon={searchIcon} className="basic-btn">
                Find
              </Button>
            </div>
          </div>
          {isExpanded ? (
            <div className="flex justify-between bg-[#dde6f0] p-[5px]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Input className="w-48 border border-[#999999]" type="date" />
                  <span className="text-sm">~</span>
                  <Input className="w-48 border border-[#999999]" type="date" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <ErrotCauseTable />
    </>
  );
}
