import React from 'react'

export const LoginPage = () => {
  return (
    <div>
        <div className='login_from'>
            <div>
               <label>Email</label>
                <input placeholder="Enter your username" type='text'></input>
            </div>
            <div>
               <label>Password</label>
               <input type="password" placeholder="Enter your password"></input>
            </div>
            <div >
				<input type="submit" class="button" value="Sign In"></input>
			</div>
        </div>
    </div>
  )
}