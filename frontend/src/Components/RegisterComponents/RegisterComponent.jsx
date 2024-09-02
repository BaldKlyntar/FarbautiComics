import React from 'react'
import './RegisterComponent.css'
import { Form, redirect, useNavigation, Link} from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/auth/register', data)
        toast.success('Registration Succesful')
        return redirect('/login')

        
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
        
    }

}


const RegisterComponent = () => {

    const navigation = useNavigation()
    console.log(navigation);
    const isSubmitting = navigation.state === 'submitting'
  return (
    <div className="signup">
        <div className="signup-background">
            <Form method='post' className="signup-container">
                <h1>Join Our Comic Book Community!</h1>
                <p>Sign up today to unlock exclusive content, discounts,
                     and a community of fellow comic book enthusiasts.</p>
                <div className="signup-fields">
                    <input name='name' type="text" placeholder='Name' required />
                    <input name='lastName' type="text" placeholder='Last Name' required />
                </div>
                <div className="signup-fields">
                    <input name='username' type="text" placeholder='Username' required />
                    <input name='password' type="password" placeholder='Password' required />
                </div>
                <div className="signup-large-field">
                    <input name='email' type="email" placeholder= 'Email' required />
                </div>
                <div className="signup-large-field">
                    <input name='address' type="text" placeholder= 'Address' required />
                </div>
                <div className="signup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>Subscribe to our NewsLetter!</p>
                </div>
                <button type='submit' disabled= {isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
                </button>
                <p className="signup-login">Already have an account? <Link to='/login'>Login here</Link></p>
            </Form>
        </div>
        
    </div>
  )
}

export default RegisterComponent