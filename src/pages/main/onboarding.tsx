import { useNavigate } from 'react-router';
import logo from '../../assets/images/taskinrbg.png'
import imgdesc from '../../assets/images/descrbg.png'

const Onboarding = () => {
  const navigate = useNavigate();

  const signup = () => {
    navigate('/login');
  };

  return (
    <section className='h-dvh bg-[#212845]'>
        <div className='flex justify-center items-center'>
            <img src={logo} className='w-[200px]' alt="" />
        </div>
        <div className='flex items-center justify-center'>
            <div className='flex flex-col gap-4 items-center'>
                <h1 className='text-[#fff] text-4xl font-bold mb-2'>Hello👋,Bienvenue sur Taskin !</h1>
                <p className='text-lg font-semibold text-white mb-3'>Votre fidèle assistant de gestion.</p>
                <div className='flex relative gap-4 h-[300px] mt-4 bg-[#212845] border-2 border-[#ed6d8b] rounded-lg'>
                    <div className='w-[300px]'>
                        <img src={imgdesc} className='w-full' alt=""/>
                    </div>
                    <div className='flex flex-col gap-2 justify-center items-center w-[1/2] pr-8'>
                        <h2 className='text-[#fff] text-xl text-center font-semibold mb-2 mr-6'>Comment ça marche?</h2>
                        <ul className='list-disc flex flex-col gap-2'>
                            <li className='text-[#fff] text-sm font-medium'>Créez et organisez vos tâches</li>
                            <li className='text-[#fff] text-sm font-medium'>Glissez-déposez pour réorganiser</li>
                            <li className='text-[#fff] text-sm font-medium'>Travailler en équipe</li>
                            <li className='text-[#fff] text-sm font-medium'>Activez le thème clair/sombre selon <br />vos préférences</li>
                        </ul>
                        <button className='bg-[#ed6d8b] relative hover:bg-[#ec345f] cursor-pointer rounded-full py-1 mt-4 text-white w-1/2' onClick={signup}>
                          <span className="absolute inset-0 animate-shine pointer-events-none"></span>S'inscrire
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Onboarding;