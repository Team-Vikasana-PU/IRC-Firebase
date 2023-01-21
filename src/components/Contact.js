
import Navbar from './Navbar'
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className='w-full flex flex-col items-center pt-32 px-10'>
                
                <h2 className='font-circular text-3xl md:text-6xl text-gradientPink mb-10'>About</h2>

                <div className='flex'>
                <div className='w-full flex flex-col'>
                    
                    <div className='flex flex-col mb-10'>
                        <h1 className='text-gradientBlue font-tele text-2xl'>Email:</h1>
                        <div className='flex items-center mt-5'>
                            <MailIcon />
                            <a className='ml-2 underline text-lg' href="mailto:irc@presidencyuniversity.in" target="_blank">irc@presidencyuniversity.in</a>
                        </div>
                    </div>
                    
                    <div className='flex flex-col mb-10'>
                        <h1 className='text-gradientBlue font-tele text-2xl'>Mobile:</h1>
                        <div className='flex items-center mt-5'>
                            <LocalPhoneIcon />
                            <a className='ml-2 underline text-lg' href="tel:+91 91489 10420" target="_blank">+91 91489 10420 (Aditya - Incharge IRC 2023)</a>
                        </div>
                        <div className='flex items-center mt-5'>
                            <LocalPhoneIcon />
                            <a className='ml-2 underline text-lg' href="tel:+91 94485 50211" target="_blank">+91 94485 50211 (Zain - Incharge IRC 2023)</a>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        
        </>
    )
}

export default Contact;