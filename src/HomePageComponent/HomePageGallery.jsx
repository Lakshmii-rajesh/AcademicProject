import React, { useState } from "react";

const Images = {
  All: [
    "public/image.jpg",
    "i1.jpg",
    "i2.jpg",
    "i3.jpg",
    "i4.jpg",
    "i5.jpg",
    
  ],
  Dental: [
    "https://i.pinimg.com/736x/c3/58/c5/c358c5bc5721515715d680e6b040116b.jpg",
    "https://i.pinimg.com/736x/3e/4d/22/3e4d2232ef6dfd312114b425d5f2d1b4.jpg",
    "https://i.pinimg.com/736x/33/47/35/3347358a1a3a3d2936b6f3c037e719b9.jpg",
    "https://dentatur.com/wp-content/uploads/2023/06/1684392097-1684392097-1-1.jpg",
    "https://www.sodentalcollege.com/wp-content/uploads/2018/11/dental-hygienist-schooling.jpeg",
    "https://images.pexels.com/photos/287237/pexels-photo-287237.jpeg?cs=srgb&dl=pexels-fr3nks-287237.jpg&fm=jpg",
  ],
  Cardiology:
  [
    "https://i.pinimg.com/736x/51/f1/b1/51f1b12fcddbd7f4af2f3a94ea798e3e.jpg",
    "https://i.pinimg.com/1200x/74/d4/b3/74d4b36b7c1829c32d35d0e54b835ead.jpg",
    "https://i.pinimg.com/1200x/7a/89/83/7a8983a16d9ab264427ebeb13640a060.jpg",
    "https://i.pinimg.com/736x/ad/89/04/ad890494db96cef8e0add6fac73bffba.jpg",
    "https://i.pinimg.com/736x/1f/f5/58/1ff558292cabf2a49c39d35bf9cb5d94.jpg",
    "https://i.pinimg.com/736x/72/f5/7e/72f57e6af335d5e9ddd4164aee0cdab8.jpg",
  ],
  Dermatology: [
    "https://i.pinimg.com/736x/8b/67/46/8b6746d604826728cf433b1ed3d87cd7.jpg",
    "https://i.pinimg.com/736x/84/db/6d/84db6d6e64d203254126d52b017f398f.jpg",
    "https://i.pinimg.com/1200x/cd/03/1e/cd031ecd0bcd5406da74fde90e9ae659.jpg",
    "https://i.pinimg.com/1200x/02/34/db/0234db65e1b6177830aefdfd7eb376c8.jpg",
    "https://i.pinimg.com/736x/13/90/c7/1390c730eef36b9fa0891fc74d9bdd6d.jpg",
    "https://i.pinimg.com/736x/19/08/37/19083784e536b0419e210ee161e318b4.jpg",
  ],
  Neurology: [
    "https://i.pinimg.com/736x/f6/62/f9/f662f9ddca9fc4d41d084126619231b0.jpg",
    "https://i.pinimg.com/736x/5f/92/4c/5f924c0d30cf8ff63de65ff9c996ab84.jpg",
    "https://i.pinimg.com/736x/da/94/6f/da946f31ba4212a67fa06a7ad8f9790e.jpg",
    "https://i.pinimg.com/736x/d5/bc/17/d5bc17812e5dce1d4868b26bcf08c0d7.jpg",
    "https://i.pinimg.com/736x/74/7b/3e/747b3eebebef12bb08a9d800978704a0.jpg",
    "https://i.pinimg.com/736x/55/92/d5/5592d54e926d5bb1252aae8657ed6805.jpg",
  ],
  Ophthamology: [
    "https://i.pinimg.com/736x/ec/d5/c9/ecd5c9162d49db11519b5c96358e5d8b.jpg",
    "https://i.pinimg.com/736x/1e/54/fc/1e54fcb6f415c1cbb05ed28bd9d19c9f.jpg",
    "https://i.pinimg.com/736x/9a/eb/84/9aeb84fe50fe9ab7f12248f8f601b7dc.jpg",
    "https://i.pinimg.com/736x/72/df/fb/72dffb85eb2aa161eec74472936724cb.jpg",
    "https://i.pinimg.com/736x/f0/f8/9e/f0f89e588a96b6a13df8642005b40abc.jpg",
    "https://i.pinimg.com/736x/32/f2/db/32f2db8c9d2e60fb07950c6177638319.jpg",
  ],
};

const HomePageGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="gallery flex flex-col gap-10 justify-center items-center px-4">
      <div className="flex flex-wrap gap-4 justify-center p-3 ">
        {Object.keys(Images).map((img) => (
          <button
          
            key={img}
            className="bg-white cursor-pointer border-blue-400 border-2 text-blue-500 px-4 py-2 text-sm md:text-lg rounded-lg font-semibold hover:bg-blue-400 hover:border-white hover:text-white transition duration-300"
            onClick={() => setSelectedCategory(img)}>
            {img}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {Images[selectedCategory].map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            className=" cursor-pointer h-64 w-full sm:w-72 md:w-80 lg:w-96 rounded-lg object-cover transition-all hover:-translate-y-1 hover:scale-110"
          />
        ))}
      </div>
    </div>
  );
  ``
};
export default HomePageGallery;