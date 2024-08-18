import React, { useState } from 'react'
import { toast } from 'react-toastify'
import GymForm1 from '../../components/GymForm/GymForm1'
import GymForm2 from '../../components/GymForm/GymForm2'
import useAuth from '../../hooks/useAuth'
import api from '../../api/axios.js'


const GymForm = () => {
  // State to track which form is currently displayed
  const [currentForm, setCurrentForm] = useState('form1')
  const [formData1, setFormData1] = useState({})
  const [formData2, setFormData2] = useState({})
  const { isAuthenticated } = useAuth();

  // Function to handle form submission and transition to next form
  const handleForm1Submit = (data) => {
    setFormData1(data) // Store form1 data
    setCurrentForm('form2') // Transition to form2
  }

  // Function to handle form2 submission
  const handleForm2Submit = async (data) => {
    setFormData2(data) // Store form2 data

    try {
      // Combine formData from form1 with form2 data
      // Create a new FormData instance
      const formData = new FormData();
      // Append data from formData1 to FormData
      for (const [key, value] of Object.entries(formData1)) {
        formData.append(key, value);
      }

      // Append data from form2 to FormData
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }


      // Iterate over FormData entries and log them
      for (const [key, value] of formData.entries()) {
        if (key === 'images') {
          // Handle and log image file details separately
          console.log('Images:');
          for (const file of value) {
            console.log(`File name: ${file.name}, File size: ${file.size}`);
          }
        } else {
          // Log other form data entries
          console.log(`${key}: ${value}`);
        }
      }


      const response = (await api.post(`/gyms`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }));

      console.log("response : " + response.data);

      toast.success('Your details saved successfully')
    } catch (error) {
      toast.error('Failed to save details')
    }
  }

  // Function to handle navigation back to form1
  const handlePrevious = (data) => {
    setFormData2(data)
    setCurrentForm('form1') // Transition back to form1
  }

  return (
    <div>
      {currentForm === 'form1' && (
        <GymForm1 onSubmit={handleForm1Submit} initialData={formData1} />
      )}
      {currentForm === 'form2' && (
        <GymForm2
          onSubmit={handleForm2Submit}
          initialData={formData2}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  )
}

export default GymForm
