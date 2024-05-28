import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { MdTimer } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

const Detailpage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:4000/api/recipes/${id}`)
      .then((res) => setData(res.data.recipe))
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsLoading(false));
  }, []);
  console.log(data);
  const handleDelete = () => {
    if (confirm("Silmek istediğinizden emin misiniz?")) {
      axios
        .delete(`http://127.0.0.1:4000/api/recipes/${id}`)
        .then(() => {
          toast.warn("Tarif silindi");
          navigate("/");
        })
        .catch(() => {
          toast.error("Silme başarısız");
        });
    }
  };
  return (
    <div className="flex-1 bg-gray-200 p-5 h-screen overflow-auto">
      <div className="flex justify-between">
        <Link
          to={-1}
          className="flex item-center gap-4 hover:text-[#f26d28] p-1 rounded-md"
        >
          <IoArrowBackSharp className="text-3xl" /> Geri
        </Link>
        <button
          onClick={handleDelete}
          className="bg-[] flex items-center gap-3 px-4 py-2 rounded-md text-[#3b2901] hover:text-[#f26d28]"
        >
          <FaTrashCan />
          Sil
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
          <div className=" max-w-5xl m-auto my-10 flex flex-col gap-10">
            <h1 className="text-3xl font-bold">{data.recipeName}</h1>
            <div className="flex gap-4">
              <span className="text-[#f26d28] p-1 rounded-lg  font-semibold">
                {data.category}
              </span>

              <span className="text-[#f26d28] py-2 px-4 rounded-lg  font-semibold flex items-center gap-3">
                <MdTimer />
                {data.recipeTime} dakika
              </span>
            </div>
            <img
              className="rounded-lg max-h-[400px]"
              src={data.image}
              alt={data.recipeName}
            />
            <div>
              <h1 className="text-2xl font-bold mb-4 text-[#f26d28]">
                Malzemeler
              </h1>
              <ul className=" font-semibold text-lg ">
                {data.ingredients.map((ingredient) => (
                  <li>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-4 text-[#f26d28]">Tarif</h1>
              <ol className=" font-semibold text-lg list-decimal ps-4">
                {data.instructions.map((item) => (
                  <li>{item}</li>
                ))}
              </ol>
            </div>
            <div>
              <h1 className="tetx-2xl font-bold mb-4 text-[#f26d28]">
                Sunum Önerisi
              </h1>
              <p className="font-semibold text-lg">{data.serveingSuggestion}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detailpage;
