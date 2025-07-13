import { useMemo, useState } from "react";
import data from "../../data.json";
import ProductCard from "../product/productCard";

const ProductGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const newCategories = [...new Set(data.map((product) => product.category))];
    return newCategories.sort();
  }, []);

  const filteredData = useMemo(() => {
    if (selectedCategory === "all") {
      return data;
    }
    return data.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, data]);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="grid gap-y-6 md:col-span-2 ">
      <div className="flex justify-between gap-4 items-center">
        <h2 className="text-3xl font-bold text-rose-900">Dessert </h2>
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border-2 border-rose-400 rounded-3xl px-4 py-2 text-lg text-rose-900 hover:border-red hover:text-red transition-colors duration-200"
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredData.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductGallery;
