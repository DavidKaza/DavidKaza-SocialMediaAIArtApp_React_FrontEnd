import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const socialClient = axios.create({
  withCredentials: true,
<<<<<<< HEAD
  baseURL: 'http://project3-env.eba-fufsnv9d.us-east-1.elasticbeanstalk.com/',
=======
  
  //http://localhost:8080
  //http://project3-env.eba-fufsnv9d.us-east-1.elasticbeanstalk.com
<<<<<<< HEAD
  baseURL: 'http://project3-env.eba-fufsnv9d.us-east-1.elasticbeanstalk.com',
>>>>>>> profile
=======
  baseURL: 'http://localhost:8080',
>>>>>>> main
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  },
});

export interface socialApiResponse {
  status: number;
  payload: any;
}

export default socialClient;
