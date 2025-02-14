"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserCircle, Plus, Menu, Search, Clock, Bell, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"

export default function ListPage() {
  const [members, setMembers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/team-members/")
      const data = await response.json()
      setMembers(data)
    } catch (error) {
      console.error("Error fetching team members:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div>
        {/* primary heading */}
        <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold dark:text-white">Instawork Team</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <UserCircle className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
        </header>

        {/* sub heading */}
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Home</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Team Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                You have {members.length} team {members.length === 1 ? "member" : "members"}.
              </span>
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* add new members */}
            <button
              onClick={() => navigate("/add")}
              className="h-[300px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 flex items-center justify-center transition-colors"
            >
              <Plus className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </button>

            {/* list members */}
            {members.map((member) => (
              <div
                key={member.id}
                onClick={() => navigate(`/edit/${member.id}`)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <UserCircle className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                      <div>
                        <h3 className="font-medium dark:text-white">
                          {member.first_name} {member.last_name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {member.role === "admin" ? "Admin" : "Member"}
                        </p>
                      </div>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">{member.email}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{member.phone}</div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {member.role === "admin" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          Admin
                        </span>
                      )}
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

