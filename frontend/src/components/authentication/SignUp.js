
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const SignUp = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    //const [phone,setPhone] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [pic,setPic] = useState();
    const [show, setShow] = useState(false);
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => setShow(!show);
    const postDetails = (pics) => { 
        setLoading(true);
        if (pics===undefined){
            toast({
                title: 'Please upload an image',
                status: 'warning',
                duration: 6000,
                isClosable: true,
                position: "bottom",
            });
            return ;
        }
        if (pics.type==="image/jpeg" || pics.type==="image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","dixkgx2cb");
            fetch('https://api.cloudinary.com/v1_1/dixkgx2cb/image/upload',{
                method: 'post',
                body: data
            })
            .then((res) => res.json())
            .then((data) => {
                setPic(data.url.toString());
                //console.log(data.url.toString());
                console.log(data);
                setLoading(false);  //because pic has been loaded so we have to stop the loading ui
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        }
        else {
            toast({
                title: 'Please upload an image',
                status: 'warning',
                duration: 6000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

    };
    const submitHandler = async () => { 
        setLoading(true);
        if (!name || !email || !password || !confirmPassword){
            toast({
                title: 'Please fill all the fields!',
                status: 'warning',
                duration: 6000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return ;
        }
        if (password!==confirmPassword){
            toast({
                title: 'Password not matched!',
                status: 'warning',
                duration: 6000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return ;
        }
        try {
            const config = {
                headers : {
                    "Content-type": "application/json",
                },
            };//here we are calling the api for the database api/user/ -> registerUser
            const {data} = await axios.post(
                "/api/user",
                {name, email, password, pic},
                config
            );
            
            toast({
                title: 'Registration successful',
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            history.push("/chats");

        } catch (error) {
            toast({
                title: 'Error occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };
    
    return (
    <VStack>
        <FormControl id='first_name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                placeholder='Enter your name' 
                onChange={(e) => setName(e.target.value)}
            />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                placeholder='Enter your email'
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        {/* <FormControl id='phone' isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input 
                placeholder='Enter your phone number'
                onChange={(e) => setPhone(e.target.value)} 
            />
        </FormControl> */}
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='confirm_password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Re-enter your password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic'>
            <FormLabel>Upload your picture</FormLabel>
            <Input
                type='file'
                accept='image/*'
                onChange={(e) => postDetails(e.target.files[0])} 
            />
        </FormControl>
        <Button
            colorScheme='blue'
            width="100%"
            marginTop="15px"
            onClick={submitHandler}
            isLoading = {loading}
        >
            Sign Up
        </Button>
    </VStack>
  );
};

export default SignUp;