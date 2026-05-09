import React, { useState } from 'react';
import axios from 'axios';
import Dog from '../assets/dog.jpg';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  
  // Error state for form validation
  const [errors, setErrors] = useState({});

  //  Email validation function using regex
  // const isValidEmail = (email) => {
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  // Password validation function
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  // ID validation function (only alphanumeric)
  const isValidId = (id) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(id);
  };



  // General form validation function
  const validateForm = () => {
    let validationErrors = {};
    if (!id) {
      validationErrors.id = 'ID is required.';
    } else if (!isValidId(id)) {
      validationErrors.id = 'ID must be alphanumeric.';
    }

    if (!email) {
      validationErrors.email = 'Email is required.';
    } //else if (!isValidEmail(email)) {
      //validationErrors.email = 'Please enter a valid email address.';
    //}

    if (!password) {
      validationErrors.password = 'Password is required.';
    } else if (!isValidPassword(password)) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }

    if (!name) {
      validationErrors.name = 'Name is required.';
    } else if (name.length < 3) {
      validationErrors.name = 'Name must be at least 3 characters long.';
    }

    if (!address) {
      validationErrors.address = 'Address is required.';
    }


    setErrors(validationErrors);

    // Return true if there are no errors
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent submission if form is invalid
    }

    setLoading(true); // Show loading state
    axios
      .post('http://localhost:4000/createUser', {
        ID: id,
        Email: email,
        Password: password,
        Name: name,
        Address: address,
        AnimalType: animalType,
      })
      .then((result) => {
        setLoading(false); // Hide loading state
        console.log(result);
        // Show alert on successful registration
        alert('User registered successfully!');
      })
      .catch((err) => {
        setLoading(false); // Hide loading state
        console.log(err);
        // Show error alert if registration fails
        alert('Error registering user: ' + err.message);
      });
  };

  return (
    <div className="bg-white ">
      <div className="bg-orange-200 mx-14 h-[860px] rounded-2xl flex ">
        <div className="flex-1">
          <h1 className="text-6xl text-center mt-10">Hi there !</h1>
          <div className="text-center mt-11">Welcome to VetCare, Community Dashboard</div>
          <form onSubmit={handleSubmit}>
            <div className="items-center flex justify-center flex-col gap-9">
              <input
                type="text"
                value={id}
                placeholder="ID"
                className="placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 mt-10 text-1xl bg-orange-200 border-4 border-white"
                onChange={(e) => {
                  setId(e.target.value);
                  setErrors({ ...errors, id: '' }); // Clear error on input
                }}
              />
              {errors.id && <div className="text-red-500">{errors.id}</div>}

              <div>
                <input
                  type="email"
                  className="placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 text-1xl bg-orange-200 border-4 border-white"
                  value={email}
                  placeholder="Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: '' }); // Clear error on input
                  }}
                />
                {errors.email && <div className="text-red-500">{errors.email}</div>}
              </div>

              <div>
                <input
                  type="password"
                  className="placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 text-1xl bg-orange-200 border-4 border-white"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: '' }); // Clear error on input
                  }}
                />
                {errors.password && <div className="text-red-500">{errors.password}</div>}
              </div>

              <div>
                <input
                  type="text"
                  className="placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 text-1xl bg-orange-200 border-4 border-white"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: '' }); // Clear error on input
                  }}
                />
                {errors.name && <div className="text-red-500">{errors.name}</div>}
              </div>

              <div>
                <input
                  type="text"
                  className="placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 text-1xl bg-orange-200 border-4 border-white"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setErrors({ ...errors, address: '' }); // Clear error on input
                  }}
                />
                {errors.address && <div className="text-red-500">{errors.address}</div>}
              </div>

              <div>
                <input
                  type="text"
                  className="placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 text-1xl bg-orange-200 border-4 border-white"
                  placeholder="Animal Type (Dog, Cat, Bird)"
                  value={animalType}
                  onChange={(e) => {
                    setAnimalType(e.target.value);
                    
                  }}
                />
              </div>

              <button type="submit" className="rounded-full mt-6 bg-black text-white px-5 w-80 py-2">
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            <div className="text-center mt-10">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500">
                Login
              </a>
            </div>
          </form>
        </div>
        <div className=" ">
          <img src={Dog} alt="logo" className="rounded-2xl h-full" />
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
