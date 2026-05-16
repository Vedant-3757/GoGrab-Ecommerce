import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

function NotFound() {

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
      }}
      className="min-h-screen bg-gray-100 flex items-center justify-center px-6"
    >

      <div className="bg-white rounded-3xl shadow-xl p-10 sm:p-14 text-center max-w-xl w-full">

        <div className="text-8xl mb-6">
          🚫
        </div>

        <h1 className="text-5xl font-bold mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist
          or may have been moved.
        </p>

        <button
          onClick={() =>
            navigate("/", { replace: true })
          }
          className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
        >
          Back To Home
        </button>

      </div>

    </motion.div>
  );
}

export default NotFound;