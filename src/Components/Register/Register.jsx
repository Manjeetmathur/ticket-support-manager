
import { React, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import { AuthContext } from '../../Context/AuthContext/AuthContext'
import { IoLogInOutline } from "react-icons/io5";

const Register = () => {

       const [isPasswordShown, setIsPasswordShown] = useState(false)
       const { register } = useContext(AuthContext)

       const handleClickShowPassword = () => setIsPasswordShown(show => !show)
       const navigate = useNavigate()

       const [email, setEmail] = useState("")
       const [password, setPassword] = useState("")
       const [role, setrole] = useState("customer")

       const handleRegister = async (e) => {
              e.preventDefault()
              try {
                     const r = await register(email, password, role)
                     console.log(r)
                     navigate("/login")
              } catch (error) {
                     console.log(error)
              }
       }
       console.log(role)
       return (
              <div className='flex flex-col justify-center items-center h-[90vh] relative p-6'>

                     <Card className='flex flex-col sm:is-[450px]'>
                            <h1 className='text-2xl font-bold font-serif flex justify-center items-center mt-4 gap-2'>Register yourself <IoLogInOutline /> </h1>
                            <CardContent className='p-6 sm:!p-12'>
                                   <Link href='/' className='flex justify-center items-start mbe-6'>
                                   </Link>

                                   <div className='flex flex-col gap-5'>

                                          <form noValidate autoComplete='off' onSubmit={e => handleRegister(e)} className='flex flex-col gap-5'>
                                                 <TextField fullWidth label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                 <TextField
                                                        fullWidth
                                                        label='Password'
                                                        type={isPasswordShown ? 'text' : 'password'}
                                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                                        InputProps={{
                                                               endAdornment: (
                                                                      <InputAdornment position='end'>
                                                                             <IconButton
                                                                                    size='small'
                                                                                    edge='end'
                                                                                    onClick={handleClickShowPassword}
                                                                                    onMouseDown={e => e.preventDefault()}
                                                                             >
                                                                                    <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                                                                             </IconButton>
                                                                      </InputAdornment>
                                                               )
                                                        }}
                                                 />
                                                 <select value={role} onChange={(e) => setrole(e.target.value)} className='border-[1px] rounded-sm border-gray-400 p-1 '>
                                                        <option value="customer">Customer</option>
                                                        <option value="agent">Agent</option>
                                                 </select>

                                                 <FormControlLabel
                                                        control={<Checkbox />}
                                                        label={
                                                               <>
                                                                      <span>I agree to </span>
                                                                      <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                                                                             privacy policy & terms
                                                                      </Link>
                                                               </>
                                                        }
                                                 />
                                                 <Button fullWidth variant='contained' type='submit'>
                                                        Sign Up
                                                 </Button>
                                                 <div className='flex justify-center items-center flex-wrap gap-2'>
                                                        <Typography>Already have an account?</Typography>
                                                        <Link to='/login' className='text-blue-500 ' >
                                                               Sign in instead
                                                        </Link>
                                                 </div>

                                          </form>
                                   </div>
                            </CardContent>
                     </Card>
              </div>
       )
}

export default Register