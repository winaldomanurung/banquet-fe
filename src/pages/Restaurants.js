import React, { useState, useRef, useCallback } from "react";
import styles from "./Restaurants.module.css";
import { URL_API } from "../helpers";
import { Link } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import RestaurantCard from "../components/RestaurantCard";
import Spinner from "../components/Spinner";

function Restaurants() {
  const [pageNumber, setPageNumber] = useState(1);

  const { dataRestaurants, hasMore, loading, error } = usePagination(
    pageNumber,
    "/restaurants"
  );

  console.log(dataRestaurants);

  const observer = useRef();
  const lastDataElementRef = useCallback(
    (node) => {
      // Kalau kita sedang loading maka kita gamau trigger infinite scroll, makanya di return
      if (loading) return;
      // Jika kita sudah ketemu last element, maka disconnect attribute last elementnya
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPageNumber((pageNumber) => pageNumber + 1);
        }
      });
      // Jika kita ketemu last element maka pastikan observer to observe it
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  console.log(hasMore);
  console.log(loading);
  console.log(error);
  console.log(pageNumber);

  return (
    <div className={styles.container}>
      {loading ? <Spinner /> : ""}
      <div className={styles["data-render"]}>
        <div className={styles.title}>All Restaurants</div>
        <div className={styles["cards-container"]}>
          {dataRestaurants.map((restaurant, index) => {
            if (dataRestaurants.length === index + 1) {
              return (
                <div ref={lastDataElementRef}>
                  <RestaurantCard
                    name={restaurant.name}
                    image={URL_API + restaurant.restaurantImageUrl}
                    description={restaurant.description}
                    key={restaurant.restaurantId}
                    id={restaurant.restaurantId}
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <RestaurantCard
                    name={restaurant.name}
                    image={URL_API + restaurant.restaurantImageUrl}
                    description={restaurant.description}
                    key={restaurant.restaurantId}
                    id={restaurant.restaurantId}
                  />
                </div>
              );
            }
          })}
          {/* <div>{loading && "Loading..."}</div>
          <div>{error && "Error..."}</div> */}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import styles from "./Restaurants.module.css";

// import axios from "axios";
// import { URL_API } from "../helpers";
// import { Link } from "react-router-dom";
// import usePagination from "../hooks/usePagination";
// import RestaurantCard from "../components/RestaurantCard";

// function Restaurants() {
//   const [restaurants, setRestaurants] = useState("");

//   const [query, setQuery] = useState("");
//   const [pageNumber, setPageNumber] = useState("");

//   const { data, hasMore, loading, error } = usePagination(query, pageNumber);

//   // useRef kita gunakan untuk menyimpan suatu nilai yang kita ingin untuk persist di dalam rerender process
//   // useRef juga bisa digunakan untuk membuat reference ke DOM element
//   // useRef juga bisa digunakan untuk membuat reference ke DOM API
//   // Disini kita gunakan useRef untuk membuat reference ke DOM API, dalam hal ini intersection observer. Dia digunakan untuk mereference ke hasil query terakhir kita. Namun karena dia hanya reference, dia ga akan mengakibatkan rerender kalau intersection observer sudah mencapai hasil terakhir. Untuk itu kita perlu tambahan useCallback.
//   const observer = useRef();

//   // Kita kasih reference dengan useCallback ke element terakhir. Jadi ketika kapanpun element ini ter create, function di dalam useCallback akan dijalankan
//   const lastDataElementRef = useCallback(
//     (node) => {
//       // Kalau kita sedang loading maka kita gamau trigger infinite scroll, makanya di return
//       if (loading) return;
//       // Jika kita sudah ketemu last element, maka disconnect attribute last elementnya
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           // console.log("visible");
//           setPageNumber((pageNumber) => pageNumber + 1);
//         }
//       });
//       // Jika kita ketemu last element maka pastikan observer to observe it
//       if (node) observer.current.observe(node);
//       console.log(node);
//     },
//     [loading, hasMore]
//   );

//   usePagination(query, pageNumber);

//   function handleSearch(e) {
//     setQuery(e.target.value);
//     setPageNumber(1);
//   }

//   useEffect(() => {
//     axios
//       .get(URL_API + "/restaurants")
//       .then((res) => {
//         console.log(res.data);
//         setRestaurants(res.data.dataUser);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   // console.log(restaurants);

//   // console.log(restaurants);
//   const generateRestaurantsCard = () => {
//     let rawData = [...restaurants];

//     // const dataPaginated = rawData.slice(
//     //   beginningIndex,
//     //   beginningIndex + itemPerPage
//     // );

//     return rawData.map((restaurant, index) => {
//       return (
//         <RestaurantCard
//           name={restaurant.name}
//           image={URL_API + restaurant.restaurantImageUrl}
//           description={restaurant.description}
//           key={restaurant.restaurantId}
//           id={restaurant.restaurantId}
//         />
//       );
//     });
//   };

//   return (
//     <div className={styles.container}>
//       <input type="text" onChange={handleSearch} value={query} />
//       {data.map((item, index) => {
//         if (data.length === index + 1) {
//           return (
//             <div ref={lastDataElementRef} key={item}>
//               {item}
//             </div>
//           );
//         } else {
//           return <div key={item}>{item}</div>;
//         }
//       })}
//       <div>{loading && "Loading..."}</div>
//       <div>{error && "Error..."}</div>
//       <div className={styles["data-render"]}>
//         <div className={styles.title}>All Restaurants</div>
//         <div className={styles["cards-container"]}>
//           {generateRestaurantsCard()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Restaurants;
