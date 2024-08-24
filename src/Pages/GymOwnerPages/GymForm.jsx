import React, { useState } from 'react';
import { toast } from 'react-toastify';
import GymForm1 from '../../components/GymForm/GymForm1';
import GymForm2 from '../../components/GymForm/GymForm2';
import api from '../../api/axios.js';

const GymForm = () => {
  const [currentForm, setCurrentForm] = useState('form1');
  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = useState({});

  const handleForm1Submit = (data) => {
    setFormData1(data);
    setCurrentForm('form2');
  };

  const handleForm2Submit = async (data) => {
    setFormData2(data);

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(formData1)) {
        formData.append(key, value);
      }

      for (const [key, value] of Object.entries(data)) {
        if (key === 'images' && Array.isArray(value)) {
          // Append each image file individually under the same "images" key
          value.forEach((file) => {
            formData.append('images', file);
          });
        } else {
          formData.append(key, value);
        }
      }

      // Debugging: Log FormData entries
      for (const [key, value] of formData.entries()) {
        if (key === 'images') {
          console.log('Images:');
          if (value instanceof File) {
            console.log(`File name: ${value.name}, File size: ${value.size}`);
          }
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await api.post(`/gyms`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Response:', response.data);
      toast.success('Your details were saved successfully');
    } catch (error) {
      console.error('Error uploading data:', error);
      toast.error('Failed to save details');
    }
  };

  const handlePrevious = (data) => {
    setFormData2(data);
    setCurrentForm('form1');
  };

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
  );
};

export default GymForm;