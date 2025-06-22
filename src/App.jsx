import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomeRoute } from "@/routes/HomeRoute"
import { AddBookRoute } from "@/routes/AddBookRoute"
import "./App.css"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/add" element={<AddBookRoute />} />
      </Routes>
    </BrowserRouter>
  )
}