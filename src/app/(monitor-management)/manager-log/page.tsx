"use client";

import { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { searchIcon } from "@progress/kendo-svg-icons";
import { SPORTS, PAGES } from "@/constants";
import { ManageLogTable } from "@/components/ManageLogTable";

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);

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
            Expand / Colapse
          </button>
        </div>
        <div className="flex justify-between gap-4 bg-[#dde6f0] p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">Log tracking number</span>
              <Input className="h-[24px] w-[148px]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold">Channel ID</span>
              <DropDownList
                className="mr-2 h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
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
              <span className="font-bold">Items</span>
            </div>
            <Button svgIcon={searchIcon}>Find</Button>
          </div>
        </div>
      </div>
      {isExpanded ? (
        <div className="flex gap-4 border-t border-[#ccc] bg-[#dde6f0] p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">User ID</span>
              <Input className="h-[24px] w-[148px]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">Result code</span>
              <Input className="h-[24px] w-[148px]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">Outgoing/Incomming</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">Req/Res</span>
              <DropDownList
                className="h-[30px] border bg-[#f6f6f6f6] text-[#656565]"
                size={"small"}
                data={SPORTS}
                defaultValue="Option 1"
                filterable={false}
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* table */}
      <div className="flex items-center gap-2 py-4">
        <img src={"/images/dot_subtitle.gif"} alt="" style={{}} />
        <span className="font-bold text-[#656565]">List</span>
      </div>
      <ManageLogTable />
    </>
  );
}
