import axios from "axios";
import { useState, useEffect } from "react";

function usePagination(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // Untuk menghapus result query yang lama
  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      // cancelToken kita gunakan sebagai cleanup effect
      // jadi disini usePagination ga akan dijalankan setiap query berubah
      // dia menerima parameter berupa function yang akan mengubah cancel variable jadi c
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData((data) => {
          // set digunakan untuk remove all duplicate di dalam array
          return [...new Set([...data, ...res.data.docs.map((b) => b.title)])];
        });
        // Ini di cek apa masih ada data yang belum di load
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        // Ini artinya jika error dari cancel token maka gpp karena memang sengaja kita setting untuk error
        if (axios.isCancel(e)) return;
        setError(true);
      });
    // untuk menggunakan cleanup effect maka kita perlu return sebuah function dalam useEffect
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, data, hasMore };
}

export default usePagination;
