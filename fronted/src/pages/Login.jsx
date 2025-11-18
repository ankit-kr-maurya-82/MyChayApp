import { useState } from "react";
import axios from "axios";

export default function Login() {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f15]">
      <div className="relative border border-green-500/20 shadow-xl shadow-green-500/10 bg-black/40 backdrop-blur-xl p-10 rounded-2xl w-[380px]">

        {/* Coder neon border glow */}
        <div className="absolute inset-0 rounded-2xl border border-green-500/10 pointer-events-none" />

        <h2 className="text-3xl font-bold text-green-400 text-center mb-6 tracking-wider">Login
        </h2>

        <form  className="flex flex-col gap-5">
          <input
            placeholder="Username"
            className="bg-[#0d1117] border border-green-500/30 text-green-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none font-mono"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-[#0d1117] border border-green-500/30 text-green-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none font-mono"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500/20 border border-green-400 text-green-300 font-bold py-3 rounded-lg hover:bg-green-500/30 transition-all font-mono"
          >
          </button>
        </form>

        <button
          className="mt-6 w-full text-green-400 hover:text-green-300 font-mono"
        >
        </button>
      </div>
    </div>
  );
}
