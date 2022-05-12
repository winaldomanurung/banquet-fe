import axios from "axios";
import { useState, useEffect } from "react";
import { URL_API } from "../helpers";

function usePagination(pageNumber, endpoint, userId = "") {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataRestaurants, setDataRestaurants] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: URL_API + endpoint,
      params: { page: pageNumber, userId: userId },
      // cancelToken kita gunakan sebagai cleanup effect
      // jadi disini usePagination ga akan dijalankan setiap query berubah
      // dia menerima parameter berupa function yang akan mengubah cancel variable jadi c
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setDataRestaurants((dataRestaurants) => {
          return [...dataRestaurants, ...res.data.dataUser];
        });
        // Ini di cek apa masih ada data yang belum di load
        setHasMore(
          // dataRestaurants.length < res.data.token[0].totalRestaurants - 1
          res.data.dataUser.length > 0
        );
        setIsVerified(res.data.token[1].isVerified);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((e) => {
        // Ini artinya jika error dari cancel token maka gpp karena memang sengaja kita setting untuk error
        if (axios.isCancel(e)) return;
        setError(true);
      });
    // untuk menggunakan cleanup effect maka kita perlu return sebuah function dalam useEffect
    return () => cancel();
  }, [pageNumber]);
  return { loading, error, dataRestaurants, hasMore, isVerified };
}

export default usePagination;
