import axios from "axios";
import { useState, useEffect } from "react";
import { URL_API } from "../helpers";

function usePagination2(pageNumber, endpoint) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataReviews, setDataReviews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  console.log(endpoint, pageNumber);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: URL_API + endpoint,
      params: { page: pageNumber },
      // cancelToken kita gunakan sebagai cleanup effect
      // jadi disini usePagination ga akan dijalankan setiap query berubah
      // dia menerima parameter berupa function yang akan mengubah cancel variable jadi c
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log("jalan");

        setDataReviews((dataReviews) => {
          return [...dataReviews, ...res.data.dataUser];
        });

        // Ini di cek apa masih ada data yang belum di load
        setHasMore(res.data.dataUser.length >= 5);
        setLoading(false);
      })
      .catch((e) => {
        // Ini artinya jika error dari cancel token maka gpp karena memang sengaja kita setting untuk error
        if (axios.isCancel(e)) return;
        setError(true);
        setLoading(false);
      });
    // untuk menggunakan cleanup effect maka kita perlu return sebuah function dalam useEffect
    return () => cancel();
  }, [pageNumber]);
  return { loading, error, dataReviews, hasMore };
}

export default usePagination2;
