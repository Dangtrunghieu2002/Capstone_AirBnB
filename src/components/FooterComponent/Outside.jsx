import React from "react";

const Outside = () => {
  const data = [
    {
      title: "Lake Martin",
      content: "Căn hộ cho thuê",
    },
    {
      title: "Banff",
      content: "Căn hộ cho thuê",
    },
    {
      title: "Nerja",
      content: "Nhà cho thuê",
    },
    {
      title: "Greer",
      content: "Cabin cho thuê",
    },
    {
      title: "Lake Havasu City",
      content: "Nhà cho thuê",
    },
    {
      title: "Lake Powell",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "North Rim",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Payson",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Pinetop-Lakeside",
      content: "Cabin cho thuê",
    },
    {
      title: "Red Rock",
      content: "Cabin cho thuê",
    },
    {
      title: "Dinner Plain",
      content: "Chỗ ở cho thuê phù hợp với thú cưng",
    },
    {
      title: "Streaky Bay",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Emerald Lake",
      content: "Cabin cho thuê",
    },
    {
      title: "Vancouver Island",
      content: "Căn hộ cao cấp cho thuê",
    },
    {
      title: "Victoria",
      content: "Căn hộ cho thuê",
    },
    {
      title: "Idyllwild-Pine Cove",
      content: "Nhà cho thuê",
    },
    {
      title: "Mammoth Lakes",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Palm Desert",
      content: "Chỗ ở cho thuê phù hợp với thú cưng",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-7">
      {data.map((item, index) => {
        return (
          <div className="space-y-[-4px] cursor-pointer">
            <h3 className="text-[15px] font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {item.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Outside;
