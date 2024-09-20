import React from "react";

const Cultural = () => {
  const data = [
    {
      title: "Phoenix",
      content: "Biệt thự cho thuê",
    },
    {
      title: "Hot Springs",
      content: "Cabin cho thuê",
    },
    {
      title: "Los Angeles",
      content: "Căn hộ cao cấp cho thuê",
    },
    {
      title: "San Diego",
      content: "Nhà cho thuê",
    },
    {
      title: "San Francisco",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Barcelona",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Prague",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Washington",
      content: "Chỗ ở cho thuê phù hợp với thú cưng",
    },
    {
      title: "Keswick",
      content: "Nhà cho thuê",
    },
    {
      title: "London",
      content: "Dinh thự cho thuê",
    },
    {
      title: "Scarborough",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Sherwood Forest",
      content: "Cabin cho thuê",
    },
    {
      title: "York",
      content: "Chỗ ở cho thuê phù hợp với gia đình",
    },
    {
      title: "Paris",
      content: "Nhà cho thuê",
    },
    {
      title: "Rhodes",
      content: "Căn hộ cho thuê",
    },
    {
      title: "Nashville",
      content: "Nhà nghỉ dưỡng cho thuê",
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

export default Cultural;
