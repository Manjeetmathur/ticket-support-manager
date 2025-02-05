
import { React, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthContext/AuthContext'
import { IoLogInOutline } from 'react-icons/io5'


const Login = ( ) => {
       const [isPasswordShown, setIsPasswordShown] = useState(false)
       const [email, setEmail] = useState('')
       const [password, setPassword] = useState('')

       const handleClickShowPassword = () => setIsPasswordShown(show => !show)
       const navigate = useNavigate()
       const {login} = useContext(AuthContext)



       const handleSubmit = async(e) => {
              e.preventDefault()
              try {
                     await login(email,password)
                     navigate("/")
              } catch (error) {
                     console.log(error)
              }
       }

       return (
              <div className='flex  justify-center items-center h-[90vh]   p-6'>
                     <Card className=''>
                     <h1 className='text-2xl font-bold font-serif flex justify-center items-center mt-4 gap-2'>Login <IoLogInOutline /> </h1>
                            <CardContent className='flex justify-center items-center p-6 sm:!p-12'>
                                  
                                   <div className='flex flex-col gap-5'>
                                       
                                          <form noValidate autoComplete='off' onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-5'>
                                                 <TextField autoFocus fullWidth label='Email' value={email} onChange={(e)=> setEmail(e.target.value)}  />
                                                 <TextField
                                                        fullWidth
                                                        label='Password'
                                                        id='outlined-adornment-password'
                                                        type={isPasswordShown ? 'text' : 'password'}
                                                        value={password} onChange={(e)=> setPassword(e.target.value)} 
                                                        InputProps={{
                                                               endAdornment: (
                                                                      <InputAdornment position='end'>
                                                                             <IconButton
                                                                                    size='small'
                                                                                    edge='end'
                                                                                    onClick={handleClickShowPassword}
                                                                                    onMouseDown={e => e.preventDefault()}
                                                                             >
                                                                                    <div className="text-black">
                                                                                           {
                                                                                                  isPasswordShown ? 
                                                                                                  <FaRegEye />:<FaRegEyeSlash />
                                                                                           }
                                                                                    </div>
                                                                                    <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                                                                             </IconButton>
                                                                      </InputAdornment>
                                                               )
                                                        }}
                                                 />
                                                 
                                                 <Button fullWidth variant='contained' type='submit'>
                                                        Log In
                                                 </Button>
                                                 <div className='flex justify-center items-center flex-wrap gap-2'>
                                                        <Typography>New on our platform?</Typography>
                                                        <Link to='/register' className='text-blue-500'>
                                                               Create an account
                                                        </Link>
                                                 </div>
                                                 
                                          </form>
                                   </div>
                            </CardContent>
                     </Card>
              </div>
       )
}

export default Login