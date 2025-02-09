import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'

const SignUp = () => {
  const [formData,setFormData] =useState({
    username:"",
    email:"",
    password:"",
    number:"",
    description:"",
    profileImg:""
  })

  const {mutate} = useMutation({
    mutationFn:async({email,username,password,number,description,profileImg})=>{
      try {
        const res = await fetch("/api/auth/Signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,username,password,number,description,profileImg})
        });
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.error || "Failed to sign up");
        }
        console.log(data);
        
      } catch (error) {
        console.log(error);
        throw error;
        
        
      }
    },
    onSuccess:()=>{
      alert("SIgnUp Successfull");
    }
  })

  const handleInputChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    
  }

  const handleFormData=(e)=>{
    e.preventDefault();
    mutate(formData);
    // console.log(formData);
    
    
  }

  return (
    <div>
      <form onSubmit={handleFormData}>
        <input name="username" type="text" placeholder="username" onChange={handleInputChange} value={formData.username}/>
        <input name='password' type="password" placeholder="Password" onChange={handleInputChange}  value={formData.password}/>
        <input name='number' type="text" placeholder="number" onChange={handleInputChange} value={formData.number} />
        <input name='email' type="email" placeholder="email" onChange={handleInputChange} value={formData.email} />
        <input name='description' type="text" placeholder="description" onChange={handleInputChange} value={formData.description} />
        <input name='profileImg' type="file" placeholder="profileImage" onChange={handleInputChange} value={formData.profileImg} />
        <button type="submit">Sign Up</button>
      </form>
      
    </div>
  )
}

export default SignUp