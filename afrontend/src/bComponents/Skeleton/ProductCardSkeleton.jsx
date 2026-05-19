function ProductCardSkeleton() {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        overflow-hidden
        animate-pulse
      "
    >

      <div
        className="
          w-full
          h-56
          bg-gray-300
        "
      />

      <div className="p-5 space-y-4">

        <div
          className="
            h-6
            bg-gray-300
            rounded-lg
            w-3/4
          "
        />

        <div
          className="
            h-4
            bg-gray-200
            rounded-lg
            w-full
          "
        />

        <div
          className="
            h-4
            bg-gray-200
            rounded-lg
            w-5/6
          "
        />

        <div
          className="
            h-8
            bg-gray-300
            rounded-xl
            w-1/3
          "
        />

        <div
          className="
            h-12
            bg-gray-300
            rounded-2xl
            w-full
          "
        />

      </div>

    </div>

  );

}

export default ProductCardSkeleton;