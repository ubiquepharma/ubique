import Image from "next/image";
import { FaSearch } from "react-icons/fa";
const ProductSearch = ({setSearch}) => {

  return (
    <div>
      {/* Search */}
      <div className="flex flex-col justify-between flex-grow md:flex-row gap-4 xl:p-8 lg:p-4 p-4 md:h-[10rem] lg:h-[12rem] xl:h-[20rem] h-[10rem]">
        <div className="w-full h-auto relative">
          <Image
            src={"/images/prod-bg.jpg"}
            alt="product form"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 w-full h-full bg-defined-blue opacity-60"></div>
          <div className="absolute z-10 inset-0 w-full h-full xl:p-16 lg:p-8 p-4 flex flex-col gap-2">
            <h1 className="text-white text-sm md:text-2xl">
              Search using Product or molecule name
            </h1>
            <div className="flex gap-4 w-full">
              <input
                type="text"
                placeholder="Search"
                name="search"
                className="w-[75%] p-1 rounded bg-white"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-defined-orange text-white p-2 w-[25%] rounded ">
                <div className="flex items-center gap-2 justify-center">
                  <FaSearch size={20} />
                  <span>Search</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
