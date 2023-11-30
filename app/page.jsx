/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("please upload image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post("/api/upload", formData);
    const data = await response.data;
    FetchImage();
  };

  const FetchImage = async () => {
    const response = await axios.get("/api/upload");
    const data = await response.data;
    setAllImage(data?.files);
  };

  useEffect(() => {
    FetchImage();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmitHandler} className="w-1/2 mx-auto flex flex-col gap-5">
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="" />
        <div className="flex justify-center items-center">
          <button type="submit" className="px-12 py-3 rounded text-white bg-red-500">
            Upload
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {allImage &&
          allImage.length > 0 &&
          allImage.map((cur, i) => (
            <div key={i} className="max-w-md mx-auto mb-4">
              <div className="bg-white rounded-lg overflow-hidden">
                <img className="w-full h-64 object-cover" src={`./images/${cur}`} alt={`image${i}`} />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
