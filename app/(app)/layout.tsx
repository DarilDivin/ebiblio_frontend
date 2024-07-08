import Navbar from '@/components/Navbar';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div>
        <Navbar/>
        <div className='mt-[58px]'>
          {children}
        </div>
      </div>
    </>
  )
}

export default AppLayout