// CGP
import React from "react";
import Link from "next/link";
import Image from "next/image";

function TopCategoryList({ categoryList, selectedCategory }) {
  // Decode and normalize selected category for comparison
  const decodedSelected = decodeURIComponent(selectedCategory).toLowerCase();

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5
     justify-items-center items-center mt-5 gap-9 "
    >
      {categoryList?.map((category) => {
        const isSelected = decodedSelected === category.name.toLowerCase();
        return (
          <Link
            key={category.id}
            href={`/products-category/${encodeURIComponent(category.name)}`}
            className={`group flex flex-col items-center text-center p-3 w-40 h-40 transition-all rounded-2xl mt-10 ${
              isSelected
                ? "bg-[#FF0000] text-white"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            <Image
              src={`http://localhost:1337${category.icon?.[0]?.url}`}
              width={90}
              height={90}
              alt={`${category.name} icon`}
              className="hover:scale-125 transition-all rounded-full"
            />
            <small className="font-bold capitalize mt-5">{category.name}</small>
          </Link>
        );
      })}
    </div>
  );
}

export default TopCategoryList;

/////////////////////////////////////////////////////////////////////////

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// function TopCategoryList({ categoryList, selectedCategory }) {
//   return (
//     <div
//       className="grid grid-cols-2   sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5
//         justify-items-center items-center mt-5 gap-9"
//     >
//       {categoryList?.map((category, index) => (
//         <Link
//           href={`/products-category/${encodeURIComponent(category.name)}`}
//           key={category.id}
//           className={`
//     flex flex-col items-center text-center p-3 w-40 h-40
//     group transition-all
//     ${
//       selectedCategory === category.name
//         ? "bg-[#ffcc00] text-dark"
//         : "bg-amber-100 text-amber-500"
//     }
//   `}
//         >
//           <Image
//             src={`http://localhost:1337${category.icon?.[0]?.url}`}
//             width={90}
//             height={90}
//             alt={`${category.name} icon`}
//             className="group-hover:scale-125 transition-all rounded-full"
//           />
//           <small className="font-bold capitalize mt-5">{category.name}</small>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default TopCategoryList;
