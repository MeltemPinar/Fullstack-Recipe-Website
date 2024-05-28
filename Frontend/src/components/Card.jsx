import { MdTimer } from "react-icons/md";
import { Link } from "react-router-dom";
const Card = ({ recipe }) => {
  console.log(recipe);
  return (
    <Link to={`/detail/${recipe.id}`} className="bg-[#f4edd3] rounded-lg p-4">
      <div className=" relative ">
        <img
          className="rounded-lg h-[150px] w-full object-cover"
          src={recipe.image}
        />
        <p className=" absolute bottom-1 left-1 flex bg-[#f4edd3] rounded-lg p-3 font-semibold items-center gap-2">
          <i>
            <MdTimer />
          </i>
          <span>{recipe.recipeTime} dakika</span>
        </p>
      </div>

      <h2 className="text-[#f26d28] font-semibold text-lg my-3 p-2">
        {recipe.recipeName}
      </h2>
      <p className="text-[#3b2901]">{recipe.category}</p>
      <p className="flex gap-3 mt-3">
        <span className="bg-gray-200 text-[#3b2901] rounded-md p-1 line-clamp-1">
          {recipe.ingredients[0]}
        </span>

        <span className="bg-gray-200 text-[#3b2901] rounded-md p-1 line-clamp-1">
          {recipe.ingredients[1]}
        </span>
      </p>
    </Link>
  );
};

export default Card;
