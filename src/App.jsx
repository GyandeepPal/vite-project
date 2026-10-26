import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const onsubmit = async (Data) => {
    let r = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    let res = await r.text();

    console.log(Data);
    console.log(res);
  };
  // if (Data.username === "Deep") {
  //   setError("blocked", {
  //     message: "Sorry this user is blocked"
  //   });
  // } else if (Data.username !== "Gyan") {
  //   setError("Gyan", {
  //     message: "Your form is not good"
  //   });
  // }
  // setTimeout((res,rej) => {
  //   res(alert('Summited'))


  // }, 1000);

  // };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="w-[400px] bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-6">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit(onsubmit)}>

          {/* Username */}
          <label className="block text-sm font-semibold mb-1">
            Username
          </label>

          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-1 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "username  must be at least  3 characters",
              },
              maxLength: {
                value: 40,
                message: "username  must be at lassthan  40 characters",
              },
            })}
            type="text"
          />

          {errors.username && (
            <p className="text-red-500 text-xs font-bold italic mb-4">
              {errors.username.message}
            </p>
          )}



          {/* Password */}
          <label className="block text-sm font-semibold mb-1">
            Password
          </label>

          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Password"
            {...register("Password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
          />

          {errors.Password && (
            <p className="text-red-500 text-xs font-bold italic mb-4">
              {errors.Password.message}
            </p>
          )}

          {/* Submit */}
          <input
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold cursor-pointer hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
          />
          {errors.Gyan && (
            <div className="text-red-500">{errors.Gyan.message}</div>
          )}

          {errors.blocked && (
            <div className="text-red-500">
              {errors.blocked.message}
            </div>
          )}
        </form>

        {/* Loading */}
        {isSubmitting && (
          <div className="flex items-center justify-center gap-2 mt-5 text-indigo-600 font-semibold">
            Loading...
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;