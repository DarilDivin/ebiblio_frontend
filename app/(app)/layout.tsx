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
        <div className='mt-[58px] min-h-screen'>
          {children}
        </div>
        <div className='flex h-16 justify-center items-center bg-primary/10 textf-primary-foreground/70 font-semibold text-sm'>
          <p>© 2024 - Divin & Euvince. All Right Reserved</p>
        </div>
      </div>
    </>
  )
}

export default AppLayout