import React from "react";

const Regular = () => {
  const data = [
    {
      title: "Canmore",
      content: "Căn hộ cho thuê",
    },
    {
      title: "Benalmádena",
      content: "Nhà cho thuê trên bãi biển",
    },
    {
      title: "Marbella",
      content: "Căn hộ cho thuê",
    },
    {
      title: "Prescott",
      content: "Nhà nghỉ thôn dã cho thuê",
    },
    {
      title: "Scottsdale",
      content: "Chỗ ở cho thuê có hồ bơi",
    },
    {
      title: "Tucson",
      content: "Căn hộ cao cấp cho thuê",
    },
    {
      title: "Jasper",
      content: "Cabin cho thuê",
    },
    {
      title: "Mountain View",
      content: "Chỗ ở cho thuê phù hợp với gia đình",
    },
    {
      title: "Devonport",
      content: "Nhà nghỉ thôn dã cho thuê",
    },
    {
      title: "Mallacoota",
      content: "Nhà cho thuê trên bãi biển",
    },
    {
      title: "Ibiza",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Anaheim",
      content: "Căn hộ cao cấp cho thuê",
    },
    {
      title: "Monterey",
      content: "Căn hộ cho thuê",
    },
    {
      title: "Paso Robles",
      content: "Nhà nghỉ thôn dã cho thuê",
    },
    {
      title: "Santa Barbara",
      content: "Chỗ ở cho thuê hướng biển",
    },
    {
      title: "Sonoma",
      content: "Nhà nghỉ thôn dã cho thuê",
    },
    {
      title: "La Serena",
      content: "Chỗ ở cho thuê hướng biển",
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

export default Regular;
