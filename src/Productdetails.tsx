import { useParams } from "react-router-dom";
import "../src/assets/css/productdetails.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "./Navbar";
export default function Productdetails() {
  const param = useParams();
  let fetchUrl = "https://fakestoreapi.com/products/" + param.id;
  const {
    data: blogsdetails,
    error,
    isLoading,
  } = useQuery<any, Error>({
    queryKey: ["blogs", param.id],
    queryFn: () => axios.get(fetchUrl).then((res) => res.data),
  });
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading....</p>;
  console.log(blogsdetails);
  return (
    <>
      <Navbar />
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  data-type="image"
                  href={blogsdetails.image}>
                  <img
                    className="rounded-4 fit prod-img"
                    src={blogsdetails.image}
                  />
                </a>
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{blogsdetails.title}</h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <span className="ms-1">
                      {blogsdetails.rating.rate ?? ""}
                    </span>
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                    {blogsdetails.rating.count}
                    &nbsp;review
                  </span>
                  <span className="text-success ms-2">In stock</span>
                </div>

                <div className="mb-3">
                  <span className="h5">${blogsdetails.price}</span>
                  <span className="text-muted">/per item</span>
                </div>

                <p>{blogsdetails.description}</p>

                <div className="row">
                  <dt className="col-3">Category:</dt>
                  <dd className="col-9">{blogsdetails.category}</dd>
                </div>
                <hr />
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
