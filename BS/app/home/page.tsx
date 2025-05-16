

import Link from 'next/link'

function Home() {
  return (
    <>
    <div className='min-w-[740px]'>
        <div className='flex flex-row border-b-2 sticky top-0 z-50 bg-white'>
            <div className='flex-1 flex justify-start items-center ml-7 hover:text-pink-500 hover:fill-pink-500'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              
              </svg>
              <p className='m-3 '>搜索</p>
            </div>
            <div className='flex-1'>
            <div className='flex justify-center items-center mt-7'>  {/* 减少顶部间距 */}
                <h1 className='text-5xl font-thin italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase'>
                    BS STORE
                </h1>
            </div>
            </div>
            <nav className='flex-1'>
                <ul className='flex justify-end flex-grow m-7'>
                    <li className='m-3'>
                      <Link href="/home" className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </Link>
                    </li>
                    <li className='m-3'>
                      <Link href="/me" className="flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </li>
                    <li className='m-3 '>
                      <Link href="#" className="flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <div className="relative w-full h-screen">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    className="absolute inset-0 w-full h-3/4 object-cover"
                    style={{ marginTop: '4rem' }} // 预留顶部导航栏位置
                >
                    <source src="/mp4/eyes.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-end justify-center mb-52">
                    <div className="text-white text-2xl font-thin bg-opacity-50 px-4 py-2 rounded-lg hover:text-3xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300">
                        520-为她甄选
                    </div>
                </div>
            </div>
            <div>
                接下来的内容
            </div>
        </div>
    </div>
    </>
  )
}

export default Home