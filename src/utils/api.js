import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTE2ZTQ4MzE2NWMwNDYzOWU0ZTg0YTBkM2VmZWRmMiIsIm5iZiI6MTczMTA3NzI5My45OTUwMDAxLCJzdWIiOiI2NzJlMjRhZGJlNzZiMDY0NGIzZTA4MmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vEZMuL-sGS_nN3a5zuJ2SaSXoJg7SyXLuJuNbrW67hw`,
  },
});

export default api;
