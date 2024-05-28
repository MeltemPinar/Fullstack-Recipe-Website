import { useEffect, useState } from "react";

import { IoSearch } from "react-icons/io5";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Error from "../components/Error";
import { useDebounce } from "@uidotdev/usehooks";
const MainPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  useEffect(() => {
    setIsLoading(true);
    const params = {
      title: debouncedSearchTerm,
      order: order,
    };
    axios
      .get(`http://127.0.0.1:4000/api/recipes`, { params })
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [debouncedSearchTerm, order]);

  return (
    <div className="bg-gray-200 text-[#3b2901]">
      <main className="flex-1  bg-gray-200 p-4 h-screen overflow-auto">
        <section>
          <div className=" flex bg-[#f4edd3]  gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg">
            <IoSearch className="text-xl" />
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none bg-[#f4edd3] text-[#f26d28]"
              type="text"
            />
          </div>
        </section>
        <section className="mt-5">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h1 className=" text-3xl my-5 ">
                  {data.results} Tarif bulundu
                </h1>

                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="rounded-md p-2"
                >
                  <option selected disabled>
                    Süreye Göre
                  </option>
                  <option value={"asc"}>Artan</option>
                  <option value={"desc"}>Azalan</option>
                </select>
              </div>

              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data.recipes.map((recipe) => (
                  <Card key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default MainPage;
