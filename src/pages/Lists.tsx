import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Lists = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/products");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      });
    },
  });

  const handleRemove = (id) => {
    if (confirm("Ban chac chan muon xoa khong")) {
      mutation.mutate(id);
    }
  };

  console.log(data, "data");
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Link to="add">Them san pham</Link>
      <table
        style={{ width: "1000px", textAlign: "center" }}
        className="table table-bordererd"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>#</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() => handleRemove(item?.id)}
                  className="btn btn-danger"
                >
                  Xoa
                </button>
                <button className="btn btn-primary">Cap nhat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Lists;
