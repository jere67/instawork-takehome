"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserCircle, Clock, Bell, ChevronRight } from "lucide-react"

export default function AddPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    role: "regular",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("/api/team-members/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* primary heading */}
      <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <a href="/"><div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-white">Instawork Team</h1>
        </div></a>
        <div className="flex items-center space-x-4">
          <Clock className="w-5 h-5 text-gray-400" />
          <Bell className="w-5 h-5 text-gray-400" />
          <UserCircle className="w-6 h-6 text-gray-400" />
        </div>
      </header>

      {/* sub heading */}
      <div className="border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Home</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-gray-400">Team Members</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-gray-400">Add Member</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-[#232B42] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Add a team member</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full p-2 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full p-2 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Role</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="role"
                    value="regular"
                    checked={formData.role === "regular"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 focus:ring-blue-500 bg-gray-900 border-gray-700"
                  />
                  <span>Regular - Can't delete members</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 focus:ring-blue-500 bg-gray-900 border-gray-700"
                  />
                  <span>Admin - Can delete members</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-800">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

