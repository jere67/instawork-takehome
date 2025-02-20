"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserCircle, Clock, Bell, ChevronRight, X } from "lucide-react"

const ErrorModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Error</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-white mb-4">Confirm Deletion</h3>
        <p className="text-gray-300 mb-6">Are you sure you want to delete this team member?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EditPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    role: "regular",
  })
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchMember = async () => {
      const response = await fetch(`/api/team-members/${id}/`)
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
      } else {
        navigate("/")
      }
    }

    fetchMember()
  }, [id, navigate])

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?1?\d{10}$/
    if (!phone) return "Phone number is required."
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      return "Please enter a valid 10-digit phone number."
    }
    return "";
  }

const formatPhoneNumber = (value) => {
  if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formattedValue = formatPhoneNumber(value);
      setFormData((prevData) => ({
          ...prevData,
          [name]: formattedValue,
      }));
        const error = validatePhoneNumber(value.replace(/\D/g, ''));
      setPhoneError(error);
    } else {
      setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const phoneError = validatePhoneNumber(formData.phone)

    if (phoneError) {
      setPhoneError(phoneError)
      return;
    }

    const response = await fetch(`/api/team-members/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      navigate("/")
    } else {
      const errorData = await response.json()
      if (errorData.email) {
        setErrorMessage(errorData.email[0])
        setShowErrorModal(true)
      }
    }
  }

  const handleDelete = async () => {
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    setShowConfirmationModal(false);
    const response = await fetch(`/api/team-members/${id}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      navigate("/");
    }
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  };



  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* modals for better ux */}
      <ErrorModal 
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

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
            <span className="text-gray-400">Edit Member</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-[#232B42] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Edit team member</h2>

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
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (10 digits)"
                  className={`w-full p-2 rounded-md bg-gray-900 border ${phoneError ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none`}
                  required
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                )}
              </div>
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

            <div className="flex justify-between pt-6 border-t border-gray-800">
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
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